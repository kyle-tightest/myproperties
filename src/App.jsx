import React, { useState, useEffect } from 'react';
import PropertyCard from './components/PropertyCard';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'viewedonline', label: 'Seen' },
  { key: 'contactedagent', label: 'Contacted' },
  { key: 'viewedproperty', label: 'Inspected' },
  { key: 'madeoffer', label: 'Offered' },
];

function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/get-properties')
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setFilteredProperties(data);
      });
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(properties.filter(p => p[filter]));
    }
  }, [filter, properties]);

  const handleStatusChange = (id, status) => {
    fetch('/api/update-property-status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    })
      .then(res => res.json())
      .then(() => {
        const updatedProperties = properties.map(p => (p.id === id ? { ...p, ...status } : p));
        setProperties(updatedProperties);
      });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-mono">
      <header className="bg-gray-800 border-b-2 border-cyan-400 p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-400 tracking-wider">MyProperties</h1>
        <div className="flex space-x-4">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-md ${filter === key ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>
      <main className="p-8 relative z-10">
        <div className="grid grid-cols-1 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} onStatusChange={handleStatusChange} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import PropertyCard from './components/PropertyCard';

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
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700'}`}>All</button>
          <button onClick={() => setFilter('viewedonline')} className={`px-4 py-2 rounded-md ${filter === 'viewedonline' ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700'}`}>Viewed</button>
          <button onClick={() => setFilter('contactedagent')} className={`px-4 py-2 rounded-md ${filter === 'contactedagent' ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700'}`}>Contacted</button>
          <button onClick={() => setFilter('viewedproperty')} className={`px-4 py-2 rounded-md ${filter === 'viewedproperty' ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700'}`}>Inspected</button>
          <button onClick={() => setFilter('madeoffer')} className={`px-4 py-2 rounded-md ${filter === 'madeoffer' ? 'bg-cyan-400 text-gray-900' : 'bg-gray-700'}`}>Offered</button>
        </div>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} onStatusChange={handleStatusChange} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
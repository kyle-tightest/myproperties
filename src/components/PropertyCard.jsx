import React from 'react';

const PropertyCard = ({ property, onStatusChange }) => {
  const handleStatusChange = (statusField) => {
    const newStatus = { ...property, [statusField]: !property[statusField] };
    onStatusChange(property.id, newStatus);
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-cyan-400/50 transition-shadow duration-300">
      <img src={property.imageurl} alt={property.title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-cyan-400">{property.title}</h2>
        <p className="text-gray-400">{property.location}</p>
        <p className="text-lg font-semibold text-white mt-2">{property.price}</p>
        <div className="flex justify-between items-center mt-4">
          <a href={property.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">View Listing</a>
          <div className="flex space-x-2">
            <button onClick={() => handleStatusChange('viewedonline')} className={`w-6 h-6 rounded-full ${property.viewedonline ? 'bg-green-500' : 'bg-gray-600'}`} title="Viewed Online"></button>
            <button onClick={() => handleStatusChange('contactedagent')} className={`w-6 h-6 rounded-full ${property.contactedagent ? 'bg-green-500' : 'bg-gray-600'}`} title="Contacted Agent"></button>
            <button onClick={() => handleStatusChange('viewedproperty')} className={`w-6 h-6 rounded-full ${property.viewedproperty ? 'bg-green-500' : 'bg-gray-600'}`} title="Viewed Property"></button>
            <button onClick={() => handleStatusChange('madeoffer')} className={`w-6 h-6 rounded-full ${property.madeoffer ? 'bg-green-500' : 'bg-gray-600'}`} title="Made Offer"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
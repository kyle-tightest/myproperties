import React from 'react';

// A mapping for the labels of the status buttons, consistent with the filters in App.jsx
const statusConfig = {
  viewedonline: { label: 'Seen' },
  contactedagent: { label: 'Contacted' },
  viewedproperty: { label: 'Inspected' },
  madeoffer: { label: 'Offered' },
};

const PropertyCard = ({ property, onStatusChange }) => {
  const handleStatusChange = (statusField) => {
    const newStatus = { [statusField]: !property[statusField] };
    onStatusChange(property.id, newStatus);
  };

  const handleViewListingClick = () => {
    if (!property.viewedonline) {
      onStatusChange(property.id, { viewedonline: true });
    }
  };

  return (
    <div className="bg-gray-800 border-2 border-gray-700 rounded-lg shadow-lg hover:shadow-cyan-400/50 transition-shadow duration-300 overflow-hidden flex">
      <img
        src={property.imageurl}
        alt={property.title}
        className="w-48 h-48 md:w-[300px] md:h-[300px] object-cover flex-shrink-0"
      />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-bold text-cyan-400">{property.title}</h2>
        <p className="text-gray-400">{property.location}</p>
        <p className="text-lg font-semibold text-white mt-2">{property.price}</p>
        <div className="flex justify-between items-center mt-auto pt-4">
          <a href={property.url} onClick={handleViewListingClick} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
            View Listing
          </a>
          <div className="flex flex-wrap gap-2 justify-end">
            {Object.entries(statusConfig).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => handleStatusChange(key)}
                className={`px-3 py-1 text-xs rounded-full flex items-center transition-colors ${
                  property[key] ? 'bg-green-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
                title={`Mark as ${label}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
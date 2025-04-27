import React from 'react';

const Card = ({ title, value, icon }) => {
  return (
    <div className="card flex items-center space-x-4">
      <div className="text-3xl text-secondary">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
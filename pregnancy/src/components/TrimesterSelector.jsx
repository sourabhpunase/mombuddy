import { useState } from 'react';

/**
 * Component for selecting pregnancy trimester
 */
const TrimesterSelector = ({ onSelect, selectedStage }) => {
  const trimesters = [
    {
      id: 1,
      name: "First Trimester",
      weeks: "Weeks 1-12",
      color: "bg-pink-100",
      borderColor: "border-pink-400",
      textColor: "text-pink-800",
      description: "The beginning of your pregnancy journey."
    },
    {
      id: 2,
      name: "Second Trimester",
      weeks: "Weeks 13-27",
      color: "bg-purple-100",
      borderColor: "border-purple-400",
      textColor: "text-purple-800",
      description: "Often called the 'golden period' of pregnancy."
    },
    {
      id: 3,
      name: "Third Trimester",
      weeks: "Weeks 28-40+",
      color: "bg-blue-100",
      borderColor: "border-blue-400",
      textColor: "text-blue-800",
      description: "The final stretch before meeting your baby."
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      {trimesters.map((trimester) => (
        <div 
          key={trimester.id}
          className={`${trimester.color} ${selectedStage === trimester.id ? `border-4 ${trimester.borderColor}` : 'border border-gray-200'} 
            rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg flex-1 max-w-sm mx-auto md:mx-0 trimester-card`}
          onClick={() => onSelect(trimester.id)}
        >
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-full ${trimester.borderColor} bg-white flex items-center justify-center text-xl font-bold ${trimester.textColor}`}>
              {trimester.id}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-gray-800">{trimester.name}</h3>
              <p className="text-gray-600">{trimester.weeks}</p>
            </div>
          </div>
          <p className="text-gray-700">{trimester.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrimesterSelector;
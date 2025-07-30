import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Baby, Heart } from 'lucide-react';

const Trimesters = () => {
  const [selectedTrimester, setSelectedTrimester] = useState(1);

  const trimesters = [
    {
      id: 1,
      title: 'First Trimester',
      weeks: 'Weeks 1-12',
      icon: Calendar,
      color: 'pink',
      description: 'Foundation stage with rapid development',
      details: 'Major organs form, morning sickness common, frequent urination, fatigue.',
      tips: ['Take prenatal vitamins', 'Avoid alcohol and smoking', 'Get plenty of rest']
    },
    {
      id: 2,
      title: 'Second Trimester',
      weeks: 'Weeks 13-27',
      icon: Heart,
      color: 'purple',
      description: 'The golden period of pregnancy',
      details: 'Energy returns, baby movements felt, anatomy scan performed.',
      tips: ['Start prenatal classes', 'Plan nursery', 'Continue healthy diet']
    },
    {
      id: 3,
      title: 'Third Trimester',
      weeks: 'Weeks 28-40',
      icon: Baby,
      color: 'blue',
      description: 'Final preparation for birth',
      details: 'Rapid weight gain, frequent checkups, prepare for delivery.',
      tips: ['Pack hospital bag', 'Finalize birth plan', 'Practice breathing exercises']
    }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Pregnancy Trimesters
        </motion.h1>

        {/* Trimester Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-white rounded-full p-2 shadow-lg">
            {trimesters.map((trimester) => (
              <button
                key={trimester.id}
                onClick={() => setSelectedTrimester(trimester.id)}
                className={`px-6 py-3 rounded-full transition-all ${
                  selectedTrimester === trimester.id
                    ? `bg-${trimester.color}-600 text-white`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {trimester.title}
              </button>
            ))}
          </div>
        </div>

        {/* Trimester Details */}
        <motion.div
          key={selectedTrimester}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {trimesters.map((trimester) => 
            trimester.id === selectedTrimester && (
              <div key={trimester.id} className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <trimester.icon className={`h-12 w-12 text-${trimester.color}-600 mr-4`} />
                    <div>
                      <h2 className="text-3xl font-bold">{trimester.title}</h2>
                      <p className="text-gray-600">{trimester.weeks}</p>
                    </div>
                  </div>
                  <p className="text-lg mb-6">{trimester.description}</p>
                  <p className="text-gray-700 mb-6">{trimester.details}</p>
                  
                  <h3 className="text-xl font-semibold mb-4">Key Tips:</h3>
                  <ul className="space-y-2">
                    {trimester.tips.map((tip, index) => (
                      <li key={index} className="flex items-center">
                        <div className={`w-2 h-2 bg-${trimester.color}-600 rounded-full mr-3`}></div>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className={`bg-${trimester.color}-50 rounded-xl p-6`}>
                  <h3 className="text-xl font-semibold mb-4">Week by Week</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold">Baby Development</h4>
                      <p className="text-sm text-gray-600">Track your baby's growth milestones</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold">Your Body Changes</h4>
                      <p className="text-sm text-gray-600">Understand what's happening to you</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold">Appointments</h4>
                      <p className="text-sm text-gray-600">Important checkups and tests</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Trimesters;
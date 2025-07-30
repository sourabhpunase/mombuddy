import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Coffee, Fish, Milk } from 'lucide-react';

const NutritionGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState('recommended');

  const nutritionData = {
    recommended: [
      { name: 'Leafy Greens', icon: Apple, benefit: 'Rich in folate and iron', color: 'green' },
      { name: 'Lean Proteins', icon: Fish, benefit: 'Essential for baby development', color: 'blue' },
      { name: 'Dairy Products', icon: Milk, benefit: 'Calcium for bone development', color: 'purple' },
      { name: 'Whole Grains', icon: Apple, benefit: 'Energy and fiber', color: 'orange' }
    ],
    avoid: [
      { name: 'Raw Fish', icon: Fish, reason: 'Risk of foodborne illness', color: 'red' },
      { name: 'High Mercury Fish', icon: Fish, reason: 'Can harm baby\'s development', color: 'red' },
      { name: 'Excessive Caffeine', icon: Coffee, reason: 'Limit to 200mg per day', color: 'red' },
      { name: 'Unpasteurized Dairy', icon: Milk, reason: 'Risk of listeria', color: 'red' }
    ]
  };

  const mealPlan = [
    { meal: 'Breakfast', foods: ['Oatmeal with berries', 'Greek yogurt', 'Prenatal vitamin'] },
    { meal: 'Lunch', foods: ['Grilled chicken salad', 'Whole grain bread', 'Milk'] },
    { meal: 'Dinner', foods: ['Salmon with vegetables', 'Brown rice', 'Water'] },
    { meal: 'Snacks', foods: ['Nuts', 'Fruit', 'Cheese'] }
  ];

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Nutrition Guide
        </motion.h1>

        {/* Category Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setSelectedCategory('recommended')}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === 'recommended'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Recommended Foods
            </button>
            <button
              onClick={() => setSelectedCategory('avoid')}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === 'avoid'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Foods to Avoid
            </button>
          </div>
        </div>

        {/* Food Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {nutritionData[selectedCategory].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <item.icon className={`h-12 w-12 text-${item.color}-600 mb-4`} />
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {selectedCategory === 'recommended' ? item.benefit : item.reason}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Daily Meal Plan */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sample Daily Meal Plan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealPlan.map((meal, index) => (
              <motion.div
                key={meal.meal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold mb-3 text-purple-800">{meal.meal}</h3>
                <ul className="space-y-2">
                  {meal.foods.map((food, foodIndex) => (
                    <li key={foodIndex} className="text-sm text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-pink-600 rounded-full mr-2"></div>
                      {food}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Nutrition Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Key Nutrition Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Essential Nutrients:</h4>
              <ul className="text-sm space-y-1">
                <li>• Folate: 600-800 mcg daily</li>
                <li>• Iron: 27 mg daily</li>
                <li>• Calcium: 1000 mg daily</li>
                <li>• Protein: 75-100g daily</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Hydration:</h4>
              <ul className="text-sm space-y-1">
                <li>• Drink 8-10 glasses of water daily</li>
                <li>• Limit caffeine to 200mg per day</li>
                <li>• Avoid alcohol completely</li>
                <li>• Consider herbal teas</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NutritionGuide;
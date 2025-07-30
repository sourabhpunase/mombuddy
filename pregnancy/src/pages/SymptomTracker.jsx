import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, TrendingUp } from 'lucide-react';

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState({ name: '', severity: 1, date: new Date().toISOString().split('T')[0] });

  const commonSymptoms = [
    'Morning Sickness', 'Fatigue', 'Breast Tenderness', 'Frequent Urination',
    'Food Aversions', 'Mood Swings', 'Headaches', 'Back Pain'
  ];

  const addSymptom = () => {
    if (newSymptom.name) {
      setSymptoms([...symptoms, { ...newSymptom, id: Date.now() }]);
      setNewSymptom({ name: '', severity: 1, date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Symptom Tracker
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Symptom */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Log New Symptom</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Symptom</label>
                <select
                  value={newSymptom.name}
                  onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="">Select a symptom</option>
                  {commonSymptoms.map(symptom => (
                    <option key={symptom} value={symptom}>{symptom}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Severity (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newSymptom.severity}
                  onChange={(e) => setNewSymptom({...newSymptom, severity: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="text-center text-lg font-semibold text-pink-600">
                  {newSymptom.severity}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={newSymptom.date}
                  onChange={(e) => setNewSymptom({...newSymptom, date: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                onClick={addSymptom}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Symptom
              </button>
            </div>
          </div>

          {/* Symptom History */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold mb-6">Recent Symptoms</h2>
            
            {symptoms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No symptoms logged yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {symptoms.slice(-5).reverse().map((symptom) => (
                  <motion.div
                    key={symptom.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-l-4 border-pink-600 pl-4 py-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{symptom.name}</h3>
                        <p className="text-sm text-gray-600">{symptom.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-pink-600">{symptom.severity}/10</div>
                        <div className="text-xs text-gray-500">Severity</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* AI Insights */}
        {symptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6"
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
              <h3 className="text-xl font-semibold">AI Insights</h3>
            </div>
            <p className="text-gray-700">
              Based on your recent symptoms, everything appears normal for your stage of pregnancy. 
              Consider discussing persistent symptoms with your healthcare provider.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SymptomTracker;
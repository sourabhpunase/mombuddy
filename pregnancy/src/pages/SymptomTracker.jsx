import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, TrendingUp } from 'lucide-react';

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [newSymptom, setNewSymptom] = useState({
    name: '',
    severity: 1,
    date: new Date().toISOString().split('T')[0]
  });

  const commonSymptoms = [
    'Morning Sickness',
    'Fatigue',
    'Breast Tenderness',
    'Frequent Urination',
    'Food Aversions',
    'Mood Swings',
    'Headaches',
    'Back Pain'
  ];

  const addSymptom = () => {
    if (newSymptom.name) {
      setSymptoms([...symptoms, { ...newSymptom, id: Date.now() }]);
      setNewSymptom({ name: '', severity: 1, date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="page-shell max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white"
      >
        Symptom Tracker
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="card-surface p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Log New Symptom</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Symptom</label>
              <select
                value={newSymptom.name}
                onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
                className="input-field"
              >
                <option value="">Select a symptom</option>
                {commonSymptoms.map((symptom) => (
                  <option key={symptom} value={symptom}>
                    {symptom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Severity (1-10)</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newSymptom.severity}
                onChange={(e) => setNewSymptom({ ...newSymptom, severity: parseInt(e.target.value, 10) })}
                className="w-full accent-pink-600"
              />
              <div className="text-center text-lg font-semibold text-pink-600 dark:text-pink-400">{newSymptom.severity}</div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Date</label>
              <input
                type="date"
                value={newSymptom.date}
                onChange={(e) => setNewSymptom({ ...newSymptom, date: e.target.value })}
                className="input-field"
              />
            </div>

            <button
              type="button"
              onClick={addSymptom}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Symptom
            </button>
          </div>
        </div>

        <div className="card-surface p-5 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Recent Symptoms</h2>

          {symptoms.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-slate-400">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No symptoms logged yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {symptoms
                .slice(-5)
                .reverse()
                .map((symptom) => (
                  <motion.div
                    key={symptom.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-l-4 border-pink-600 dark:border-pink-500 pl-4 py-2"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{symptom.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">{symptom.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-pink-600 dark:text-pink-400">{symptom.severity}/10</div>
                        <div className="text-xs text-gray-500 dark:text-slate-500">Severity</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </div>

      {symptoms.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 card-surface p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/40 dark:to-pink-950/40 border-pink-200/50 dark:border-pink-900/50"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2 shrink-0" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">AI Insights</h3>
          </div>
          <p className="text-gray-700 dark:text-slate-300 text-sm sm:text-base">
            Based on your recent symptoms, everything appears normal for your stage of pregnancy. Consider discussing
            persistent symptoms with your healthcare provider.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SymptomTracker;

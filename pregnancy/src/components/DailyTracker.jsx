import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Pill, Heart, Moon, Sun, Bell, CheckCircle, Plus, Target, TrendingUp, Calendar } from 'lucide-react';

const DailyTracker = () => {
  const [todayData, setTodayData] = useState({
    water: 0,
    supplements: [],
    symptoms: [],
    mood: '',
    sleep: 0,
    exercise: false,
    weight: '',
    notes: ''
  });

  const [reminders, setReminders] = useState([]);
  const [showAddReminder, setShowAddReminder] = useState(false);

  const waterGoal = 8; // glasses
  const supplementSchedule = [
    { name: 'Folic Acid', time: '08:00', taken: false, color: 'rose' },
    { name: 'Prenatal Vitamin', time: '08:00', taken: false, color: 'purple' },
    { name: 'Iron', time: '12:00', taken: false, color: 'orange' },
    { name: 'Omega-3', time: '18:00', taken: false, color: 'blue' },
    { name: 'Magnesium', time: '21:00', taken: false, color: 'emerald' }
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Great', color: 'emerald' },
    { emoji: '🙂', label: 'Good', color: 'blue' },
    { emoji: '😐', label: 'Okay', color: 'yellow' },
    { emoji: '😔', label: 'Low', color: 'orange' },
    { emoji: '😰', label: 'Anxious', color: 'red' }
  ];

  const commonSymptoms = [
    'Nausea', 'Fatigue', 'Headache', 'Back pain', 'Breast tenderness',
    'Heartburn', 'Constipation', 'Mood swings', 'Insomnia', 'Cramping'
  ];

  const [supplements, setSupplements] = useState(supplementSchedule);

  const addWater = () => {
    setTodayData(prev => ({ ...prev, water: Math.min(prev.water + 1, 12) }));
  };

  const toggleSupplement = (index) => {
    setSupplements(prev => prev.map((supp, i) => 
      i === index ? { ...supp, taken: !supp.taken } : supp
    ));
  };

  const toggleSymptom = (symptom) => {
    setTodayData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const getWaterPercentage = () => (todayData.water / waterGoal) * 100;
  const getSupplementsCompleted = () => supplements.filter(s => s.taken).length;

  useEffect(() => {
    // Set up notifications for supplements
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    supplements.forEach(supp => {
      const [hours, minutes] = supp.time.split(':').map(Number);
      const suppTime = hours * 100 + minutes;
      
      if (Math.abs(currentTime - suppTime) <= 5 && !supp.taken) {
        // Show notification (in real app, use browser notifications)
        setReminders(prev => [...prev, {
          id: Date.now(),
          message: `Time to take your ${supp.name}!`,
          type: 'supplement',
          time: new Date().toLocaleTimeString()
        }]);
      }
    });
  }, [supplements]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Daily Wellness Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your daily habits and get personalized insights for optimal pregnancy health
          </p>
        </motion.div>

        {/* Active Reminders */}
        <AnimatePresence>
          {reminders.map(reminder => (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 animate-bounce" />
                  <span className="font-semibold">{reminder.message}</span>
                </div>
                <button
                  onClick={() => setReminders(prev => prev.filter(r => r.id !== reminder.id))}
                  className="text-white/80 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Water Intake */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Droplets className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Water Intake</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{todayData.water}</div>
                <div className="text-sm text-gray-500">/ {waterGoal} glasses</div>
              </div>
            </div>

            {/* Water Progress */}
            <div className="mb-6">
              <div className="bg-blue-100 rounded-full h-4 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${getWaterPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-center text-sm text-gray-600">
                {Math.round(getWaterPercentage())}% of daily goal
              </div>
            </div>

            <button
              onClick={addWater}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-black py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Glass
            </button>

            {/* Water glasses visualization */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[...Array(waterGoal)].map((_, i) => (
                <div
                  key={i}
                  className={`h-8 rounded-lg transition-all ${
                    i < todayData.water 
                      ? 'bg-gradient-to-t from-blue-500 to-cyan-400' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Supplements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Pill className="w-8 h-8 text-purple-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Supplements</h3>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">{getSupplementsCompleted()}</div>
                <div className="text-sm text-gray-500">/ {supplements.length} taken</div>
              </div>
            </div>

            <div className="space-y-3">
              {supplements.map((supplement, index) => (
                <motion.div
                  key={supplement.name}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    supplement.taken
                      ? `bg-${supplement.color}-50 border-${supplement.color}-300`
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSupplement(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{supplement.name}</div>
                      <div className="text-sm text-gray-500">{supplement.time}</div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      supplement.taken
                        ? `bg-${supplement.color}-500 border-${supplement.color}-500`
                        : 'border-gray-300'
                    }`}>
                      {supplement.taken && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mood & Symptoms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 shadow-xl border border-pink-100"
          >
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-pink-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">How are you feeling?</h3>
            </div>

            {/* Mood Selection */}
            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-3">Mood</h4>
              <div className="flex justify-between">
                {moodOptions.map(mood => (
                  <button
                    key={mood.label}
                    onClick={() => setTodayData(prev => ({ ...prev, mood: mood.label }))}
                    className={`p-3 rounded-xl transition-all ${
                      todayData.mood === mood.label
                        ? `bg-${mood.color}-100 border-2 border-${mood.color}-300`
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="text-2xl mb-1">{mood.emoji}</div>
                    <div className="text-xs text-gray-600">{mood.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Symptoms</h4>
              <div className="grid grid-cols-2 gap-2">
                {commonSymptoms.slice(0, 6).map(symptom => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`p-2 rounded-lg text-sm transition-all ${
                      todayData.symptoms.includes(symptom)
                        ? 'bg-pink-100 text-pink-800 border-2 border-pink-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Tracking */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Sleep & Exercise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Moon className="w-8 h-8 text-indigo-500 mr-3" />
              Sleep & Activity
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hours of Sleep Last Night
                </label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  step="0.5"
                  value={todayData.sleep}
                  onChange={(e) => setTodayData(prev => ({ ...prev, sleep: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="8"
                />
              </div>

              <div>
                <label className="flex items-center p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={todayData.exercise}
                    onChange={(e) => setTodayData(prev => ({ ...prev, exercise: e.target.checked }))}
                    className="mr-3 w-5 h-5 text-indigo-600"
                  />
                  <div className="flex items-center">
                    <Sun className="w-5 h-5 text-orange-500 mr-2" />
                    <span className="font-medium">Exercised Today</span>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (optional)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={todayData.weight}
                  onChange={(e) => setTodayData(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="kg"
                />
              </div>
            </div>
          </motion.div>

          {/* Daily Summary & Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl p-6 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
              Daily Summary
            </h3>

            {/* Progress Overview */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(getWaterPercentage())}%</div>
                <div className="text-sm text-blue-700">Hydration</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round((getSupplementsCompleted() / supplements.length) * 100)}%
                </div>
                <div className="text-sm text-purple-700">Supplements</div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Notes
              </label>
              <textarea
                value={todayData.notes}
                onChange={(e) => setTodayData(prev => ({ ...prev, notes: e.target.value }))}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="How are you feeling today? Any observations or thoughts..."
              />
            </div>

            <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black py-3 rounded-xl hover:shadow-lg transition-all">
              Save Today's Data
            </button>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-6"
        >
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-semibold text-purple-800">AI Insights & Recommendations</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-xl p-4">
              <h4 className="font-semibold text-purple-700 mb-2">Hydration Pattern</h4>
              <p className="text-sm text-gray-700">
                Great progress! You're {Math.round(getWaterPercentage())}% towards your daily goal. 
                Try drinking a glass every 2 hours for optimal hydration.
              </p>
            </div>
            <div className="bg-white/50 rounded-xl p-4">
              <h4 className="font-semibold text-purple-700 mb-2">Supplement Adherence</h4>
              <p className="text-sm text-gray-700">
                {getSupplementsCompleted() === supplements.length 
                  ? "Perfect! You've taken all supplements today." 
                  : `${supplements.length - getSupplementsCompleted()} supplements remaining. Set reminders for better consistency.`
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DailyTracker;
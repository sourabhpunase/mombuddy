import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle, Play, Star, Target, Trophy, Zap, Heart, Brain, Activity } from 'lucide-react';

const PregnancyPlan30Days = ({ userProfile, stage = 'pre-conception' }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showCharacter, setShowCharacter] = useState(true);

  const stageConfigs = {
    'pre-conception': {
      title: '30-Day Pre-Conception Optimization',
      character: '👩‍⚕️',
      color: 'rose',
      gradient: 'from-rose-400 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-100'
    },
    'first-trimester': {
      title: '30-Day First Trimester Wellness',
      character: '🤱',
      color: 'purple',
      gradient: 'from-purple-400 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-100'
    },
    'second-trimester': {
      title: '30-Day Second Trimester Energy',
      character: '🤰',
      color: 'emerald',
      gradient: 'from-emerald-400 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-100'
    },
    'third-trimester': {
      title: '30-Day Birth Preparation',
      character: '👶',
      color: 'blue',
      gradient: 'from-blue-400 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-100'
    }
  };

  const config = stageConfigs[stage];

  const generateDailyPlan = (day) => {
    const plans = {
      'pre-conception': {
        1: {
          title: 'Foundation Day',
          character: '👩‍⚕️',
          activities: [
            { type: 'supplement', name: 'Start Folic Acid', duration: '2 min', icon: '💊' },
            { type: 'nutrition', name: 'Green Smoothie', duration: '10 min', icon: '🥬' },
            { type: 'exercise', name: 'Morning Walk', duration: '20 min', icon: '🚶‍♀️' },
            { type: 'mindfulness', name: 'Fertility Meditation', duration: '10 min', icon: '🧘‍♀️' }
          ],
          tips: 'Start your journey with basic supplements and gentle movement',
          nutrition: 'Focus on leafy greens and whole foods',
          exercise: 'Light cardio to boost circulation'
        },
        7: {
          title: 'Week 1 Complete',
          character: '🌟',
          activities: [
            { type: 'assessment', name: 'Progress Check', duration: '15 min', icon: '📊' },
            { type: 'nutrition', name: 'Meal Prep Sunday', duration: '60 min', icon: '🍽️' },
            { type: 'exercise', name: 'Prenatal Yoga', duration: '30 min', icon: '🧘‍♀️' },
            { type: 'education', name: 'Fertility Learning', duration: '20 min', icon: '📚' }
          ],
          tips: 'Celebrate your first week of preparation!',
          nutrition: 'Prep healthy meals for the upcoming week',
          exercise: 'Introduce yoga for flexibility and relaxation'
        },
        15: {
          title: 'Mid-Point Milestone',
          character: '🎯',
          activities: [
            { type: 'medical', name: 'Health Screening', duration: '90 min', icon: '🏥' },
            { type: 'supplement', name: 'Vitamin D Check', duration: '5 min', icon: '☀️' },
            { type: 'exercise', name: 'Strength Training', duration: '45 min', icon: '💪' },
            { type: 'partner', name: 'Partner Planning', duration: '30 min', icon: '💑' }
          ],
          tips: 'Time for comprehensive health assessment',
          nutrition: 'Add vitamin D rich foods',
          exercise: 'Build strength for pregnancy'
        },
        30: {
          title: 'Conception Ready!',
          character: '🎉',
          activities: [
            { type: 'celebration', name: 'Achievement Review', duration: '20 min', icon: '🏆' },
            { type: 'planning', name: 'Next Phase Prep', duration: '30 min', icon: '📋' },
            { type: 'exercise', name: 'Fertility Yoga', duration: '45 min', icon: '🧘‍♀️' },
            { type: 'mindfulness', name: 'Gratitude Practice', duration: '15 min', icon: '🙏' }
          ],
          tips: 'You\'re now optimally prepared for conception!',
          nutrition: 'Maintain your healthy eating patterns',
          exercise: 'Continue your established routine'
        }
      },
      'first-trimester': {
        1: {
          title: 'Pregnancy Begins',
          character: '🤱',
          activities: [
            { type: 'supplement', name: 'Prenatal Vitamins', duration: '2 min', icon: '💊' },
            { type: 'nutrition', name: 'Anti-Nausea Snacks', duration: '15 min', icon: '🍪' },
            { type: 'rest', name: 'Extra Sleep', duration: '60 min', icon: '😴' },
            { type: 'hydration', name: 'Ginger Tea', duration: '10 min', icon: '🫖' }
          ],
          tips: 'Focus on rest and gentle nourishment',
          nutrition: 'Small, frequent meals to combat nausea',
          exercise: 'Light walking as tolerated'
        }
      }
    };

    const stagePlans = plans[stage] || plans['pre-conception'];
    return stagePlans[day] || generateDefaultDay(day);
  };

  const generateDefaultDay = (day) => ({
    title: `Day ${day}`,
    character: config.character,
    activities: [
      { type: 'supplement', name: 'Daily Vitamins', duration: '2 min', icon: '💊' },
      { type: 'nutrition', name: 'Healthy Meal', duration: '30 min', icon: '🥗' },
      { type: 'exercise', name: 'Movement', duration: '20 min', icon: '🏃‍♀️' },
      { type: 'mindfulness', name: 'Relaxation', duration: '10 min', icon: '🧘‍♀️' }
    ],
    tips: 'Continue your healthy routine',
    nutrition: 'Focus on nutrient-dense foods',
    exercise: 'Stay active with gentle movement'
  });

  const completeDay = (day) => {
    if (!completedDays.includes(day)) {
      setCompletedDays(prev => [...prev, day]);
    }
  };

  const getCompletionPercentage = () => {
    return (completedDays.length / 30) * 100;
  };

  const currentPlan = generateDailyPlan(currentDay);

  return (
    <div className={`min-h-screen py-20 px-6 bg-gradient-to-br ${config.bgGradient}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-6xl font-bold mb-6 bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
            {config.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Your personalized 30-day journey with daily activities, nutrition, and wellness guidance
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Trophy className={`w-8 h-8 text-${config.color}-600 mr-3`} />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Your Progress</h2>
                <p className="text-gray-600">Day {currentDay} of 30</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold text-${config.color}-600`}>
                {Math.round(getCompletionPercentage())}%
              </div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-4">
              <motion.div
                className={`bg-gradient-to-r ${config.gradient} h-4 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${getCompletionPercentage()}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Day 1</span>
              <span>{completedDays.length} days completed</span>
              <span>Day 30</span>
            </div>
          </div>

          {/* Day Selector */}
          <div className="grid grid-cols-10 gap-2">
            {[...Array(30)].map((_, index) => {
              const day = index + 1;
              const isCompleted = completedDays.includes(day);
              const isCurrent = currentDay === day;
              
              return (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`aspect-square rounded-xl font-semibold text-sm transition-all ${
                    isCompleted
                      ? 'bg-green-500 text-white shadow-lg'
                      : isCurrent
                        ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-400'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4 mx-auto" /> : day}
                </button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Character & Daily Plan */}
          <div className="lg:col-span-2 space-y-8">
            {/* Character Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center"
            >
              <div className="text-8xl mb-4">{currentPlan.character}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentPlan.title}</h2>
              <p className={`text-${config.color}-600 font-semibold`}>Day {currentDay} Activities</p>
            </motion.div>

            {/* Daily Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Today's Activities</h3>
                <button
                  onClick={() => completeDay(currentDay)}
                  disabled={completedDays.includes(currentDay)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center font-semibold hover:from-blue-700 hover:to-purple-700"
                >
                  {completedDays.includes(currentDay) ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Target className="w-5 h-5 mr-2" />
                      Mark Complete
                    </>
                  )}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {currentPlan.activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedActivity === index
                        ? 'bg-blue-50 border-blue-400 shadow-lg'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedActivity(selectedActivity === index ? null : index)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{activity.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold text-${config.color}-600`}>
                          {activity.duration}
                        </div>
                        <Play className="w-4 h-4 text-gray-400 mt-1" />
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedActivity === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-200 pt-3 mt-3"
                        >
                          <p className="text-sm text-gray-700 mb-3">
                            Detailed instructions for {activity.name.toLowerCase()} will appear here.
                          </p>
                          <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-black py-2 rounded-lg hover:shadow-md transition-all text-sm font-semibold">
                            Start Activity
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Tips & Guidance */}
          <div className="space-y-8">
            {/* Daily Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Star className={`w-6 h-6 text-${config.color}-500 mr-2`} />
                <h3 className="text-xl font-bold text-gray-800">Today's Tips</h3>
              </div>
              <div className={`bg-${config.color}-50 rounded-xl p-4 border border-${config.color}-200 mb-4`}>
                <p className={`text-${config.color}-800 font-medium`}>{currentPlan.tips}</p>
              </div>
            </motion.div>

            {/* Nutrition Focus */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Nutrition Focus</h3>
              </div>
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-red-800">{currentPlan.nutrition}</p>
              </div>
            </motion.div>

            {/* Exercise Guidance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Exercise Focus</h3>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <p className="text-green-800">{currentPlan.exercise}</p>
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Achievements</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Week 1 Warrior', unlocked: completedDays.length >= 7, icon: '🏆' },
                  { name: 'Consistency Champion', unlocked: completedDays.length >= 14, icon: '⭐' },
                  { name: 'Wellness Master', unlocked: completedDays.length >= 21, icon: '👑' },
                  { name: 'Journey Complete', unlocked: completedDays.length >= 30, icon: '🎉' }
                ].map((badge, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-3 rounded-xl ${
                      badge.unlocked
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-gray-50 border border-gray-200 opacity-50'
                    }`}
                  >
                    <span className="text-2xl mr-3">{badge.icon}</span>
                    <div>
                      <div className={`font-semibold ${badge.unlocked ? 'text-yellow-800' : 'text-gray-600'}`}>
                        {badge.name}
                      </div>
                      {badge.unlocked && (
                        <div className="text-xs text-yellow-600">Unlocked!</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyPlan30Days;
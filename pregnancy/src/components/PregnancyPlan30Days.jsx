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
    <div className="page-shell max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#a96f86] to-[#8f7287] bg-clip-text text-transparent">
            {config.title}
          </h1>
          <p className="text-xl text-body max-w-4xl mx-auto">
            Your personalized 30-day journey with daily activities, nutrition, and wellness guidance
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-glass p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-[#a96f86] mr-3" />
              <div>
                <h2 className="text-3xl font-bold">Your Progress</h2>
                <p className="text-body">Day {currentDay} of 30</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[#8e6074]">
                {Math.round(getCompletionPercentage())}%
              </div>
              <div className="text-sm text-body">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-[var(--care-border)] rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-[#d39ab0] to-[#a96f86] h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${getCompletionPercentage()}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <div className="flex justify-between text-xs text-body mt-2">
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
                      ? 'bg-[#a7c9b8] text-[#244236] shadow-lg'
                      : isCurrent
                        ? 'bg-[#f3e2ea] text-[#8e6074] ring-2 ring-[#d39ab0]'
                        : 'bg-[var(--care-surface-muted)] text-[var(--care-text)] hover:bg-[#f4e7ed]'
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
              className="card-surface p-8 text-center"
            >
              <div className="text-8xl mb-4">{currentPlan.character}</div>
              <h2 className="text-3xl font-bold mb-2">{currentPlan.title}</h2>
              <p className="text-[#8e6074] font-semibold">Day {currentDay} Activities</p>
            </motion.div>

            {/* Daily Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-surface p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Today's Activities</h3>
                <button
                  onClick={() => completeDay(currentDay)}
                  disabled={completedDays.includes(currentDay)}
                  className="px-6 py-3 bg-gradient-to-r from-[#c28aa0] to-[#8f7287] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center font-semibold"
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
                        ? 'bg-[#f7eaf0] border-[#d39ab0] shadow-lg'
                        : 'bg-[var(--care-surface-muted)] border-[var(--care-border)] hover:border-[var(--care-border-strong)]'
                    }`}
                    onClick={() => setSelectedActivity(selectedActivity === index ? null : index)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{activity.icon}</span>
                        <div>
                          <h4 className="font-semibold">{activity.name}</h4>
                          <p className="text-sm text-body capitalize">{activity.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-[#8e6074]">
                          {activity.duration}
                        </div>
                        <Play className="w-4 h-4 text-[var(--care-text-muted)] mt-1" />
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedActivity === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-[var(--care-border)] pt-3 mt-3"
                        >
                          <p className="text-sm text-body mb-3">
                            Detailed instructions for {activity.name.toLowerCase()} will appear here.
                          </p>
                          <button className="w-full bg-gradient-to-r from-[#d39ab0] to-[#a96f86] text-white py-2 rounded-lg hover:shadow-md transition-all text-sm font-semibold">
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
              className="card-surface p-6"
            >
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-[#a96f86] mr-2" />
                <h3 className="text-xl font-bold">Today's Tips</h3>
              </div>
              <div className="surface-muted rounded-xl p-4 mb-4">
                <p className="text-[#8e6074] font-medium">{currentPlan.tips}</p>
              </div>
            </motion.div>

            {/* Nutrition Focus */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-surface p-6"
            >
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 text-[#a96f86] mr-2" />
                <h3 className="text-xl font-bold">Nutrition Focus</h3>
              </div>
              <div className="surface-muted rounded-xl p-4">
                <p className="text-body">{currentPlan.nutrition}</p>
              </div>
            </motion.div>

            {/* Exercise Guidance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card-surface p-6"
            >
              <div className="flex items-center mb-4">
                <Activity className="w-6 h-6 text-[#a96f86] mr-2" />
                <h3 className="text-xl font-bold">Exercise Focus</h3>
              </div>
              <div className="surface-muted rounded-xl p-4">
                <p className="text-body">{currentPlan.exercise}</p>
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="card-surface p-6"
            >
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-[#a96f86] mr-2" />
                <h3 className="text-xl font-bold">Achievements</h3>
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
                        ? 'bg-[#faf4e4] border border-[#e2d0a5]'
                        : 'bg-[var(--care-surface-muted)] border border-[var(--care-border)] opacity-50'
                    }`}
                  >
                    <span className="text-2xl mr-3">{badge.icon}</span>
                    <div>
                      <div className={`font-semibold ${badge.unlocked ? 'text-[#6b5730]' : 'text-[var(--care-text-muted)]'}`}>
                        {badge.name}
                      </div>
                      {badge.unlocked && (
                        <div className="text-xs text-[#9c7e43]">Unlocked!</div>
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

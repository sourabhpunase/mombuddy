import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Heart, Activity, TrendingUp, Calendar, Bell, Target, Brain, Zap, Play } from 'lucide-react';

const FetalHealthTracker = ({ currentWeek = 20 }) => {
  const [kickCount, setKickCount] = useState(0);
  const [kickTimer, setKickTimer] = useState(null);
  const [heartRate, setHeartRate] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [weeklyData, setWeeklyData] = useState({});

  const aiModels = {
    fetal: 'FetalHealth-Monitor-v4.1',
    movement: 'MovementPattern-AI-v3.2',
    growth: 'GrowthPredictor-v2.8',
    wellness: 'FetalWellness-AI-v3.5'
  };

  const fetalMilestones = {
    16: {
      size: 'Avocado (11cm)',
      weight: '100g',
      developments: ['Can hear sounds', 'Sex organs visible', 'Facial expressions'],
      movements: 'First movements (quickening)',
      heartRate: '150-170 bpm',
      avatar: '👶',
      activities: ['Talk to baby', 'Play music', 'Gentle belly massage']
    },
    20: {
      size: 'Banana (16cm)',
      weight: '300g',
      developments: ['Halfway point!', 'Hair growing', 'Can swallow'],
      movements: 'Regular movements felt',
      heartRate: '140-160 bpm',
      avatar: '🤱',
      activities: ['Kick counting', 'Reading aloud', 'Prenatal yoga']
    },
    24: {
      size: 'Corn (30cm)',
      weight: '600g',
      developments: ['Viability milestone', 'Lungs developing', 'Brain growth spurt'],
      movements: 'Strong, regular kicks',
      heartRate: '130-150 bpm',
      avatar: '👶',
      activities: ['Daily kick counts', 'Classical music', 'Belly photography']
    },
    28: {
      size: 'Eggplant (37cm)',
      weight: '1kg',
      developments: ['Eyes open', 'Rapid brain development', 'Fat accumulation'],
      movements: 'Distinct sleep/wake cycles',
      heartRate: '120-140 bpm',
      avatar: '🤰',
      activities: ['Movement tracking', 'Light stimulation', 'Prenatal massage']
    },
    32: {
      size: 'Squash (43cm)',
      weight: '1.7kg',
      developments: ['Bones hardening', 'Practicing breathing', 'Immune system developing'],
      movements: 'Less space, stronger movements',
      heartRate: '110-130 bpm',
      avatar: '👶',
      activities: ['Position awareness', 'Breathing exercises', 'Birth preparation']
    },
    36: {
      size: 'Papaya (47cm)',
      weight: '2.6kg',
      developments: ['Lungs nearly mature', 'Fat stores increasing', 'Head down position'],
      movements: 'Powerful but less frequent',
      heartRate: '110-130 bpm',
      avatar: '🤱',
      activities: ['Daily monitoring', 'Optimal positioning', 'Birth readiness']
    }
  };

  const getCurrentMilestone = () => {
    const weeks = Object.keys(fetalMilestones).map(Number).sort((a, b) => a - b);
    const currentMilestone = weeks.reduce((prev, curr) => 
      currentWeek >= curr ? curr : prev
    );
    return fetalMilestones[currentMilestone] || fetalMilestones[20];
  };

  const startKickCounting = () => {
    setIsTracking(true);
    setKickCount(0);
    setKickTimer(Date.now());
  };

  const recordKick = () => {
    if (isTracking) {
      setKickCount(prev => prev + 1);
    }
  };

  const stopKickCounting = () => {
    setIsTracking(false);
    const duration = kickTimer ? (Date.now() - kickTimer) / 1000 / 60 : 0; // minutes
    
    // Save kick count data
    const today = new Date().toDateString();
    setWeeklyData(prev => ({
      ...prev,
      [today]: {
        kicks: kickCount,
        duration: Math.round(duration),
        timestamp: new Date()
      }
    }));
  };

  const generateFetalHealthInsights = () => {
    const milestone = getCurrentMilestone();
    const recentData = Object.values(weeklyData).slice(-7);
    const avgKicks = recentData.length > 0 
      ? recentData.reduce((sum, day) => sum + day.kicks, 0) / recentData.length 
      : 0;

    return {
      overall: avgKicks >= 10 ? 'Excellent' : avgKicks >= 6 ? 'Good' : 'Monitor Closely',
      insights: [
        `Baby is ${milestone.size} and weighs approximately ${milestone.weight}`,
        `Expected heart rate: ${milestone.heartRate}`,
        `Movement pattern: ${milestone.movements}`,
        avgKicks > 0 ? `Average daily kicks: ${Math.round(avgKicks)}` : 'Start tracking movements'
      ],
      recommendations: milestone.activities,
      aiAnalysis: generateAIAnalysis(milestone, avgKicks)
    };
  };

  const generateAIAnalysis = (milestone, avgKicks) => {
    return `**AI Fetal Health Analysis - Week ${currentWeek}:**

**Development Status:** ${milestone.developments.join(', ')}

**Movement Assessment:** ${
  avgKicks >= 10 ? 'Excellent activity levels indicate healthy development' :
  avgKicks >= 6 ? 'Good movement patterns, continue monitoring' :
  avgKicks > 0 ? 'Monitor movements more closely, consult if concerns' :
  'Begin daily kick counting to establish baseline'
}

**Recommendations:**
• ${milestone.activities.join('\n• ')}

**Next Milestone:** Continue monitoring for consistent movement patterns and growth progression.

*Generated by ${aiModels.fetal}*`;
  };

  const milestone = getCurrentMilestone();
  const healthInsights = generateFetalHealthInsights();

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
            Fetal Health Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Monitor your baby's development with AI-powered insights and daily tracking
          </p>
        </motion.div>

        {/* AI Models Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-xl"
        >
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">AI Fetal Health Models</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(aiModels).map(([key, model]) => (
              <div key={key} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-3 border-2 border-purple-200">
                <div className="text-xs text-purple-700 font-bold uppercase">{key}</div>
                <div className="text-sm text-gray-700 font-mono">{model}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Baby Development Display */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Milestone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl text-center"
            >
              <div className="text-8xl mb-6">{milestone.avatar}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Week {currentWeek}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2">Size & Weight</h3>
                  <p className="text-blue-700">{milestone.size}</p>
                  <p className="text-blue-600">{milestone.weight}</p>
                </div>
                <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
                  <h3 className="font-bold text-purple-800 mb-2">Heart Rate</h3>
                  <p className="text-purple-700">{milestone.heartRate}</p>
                  <p className="text-purple-600">Normal range</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-200">
                <h3 className="font-bold text-pink-800 mb-4">Key Developments</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {milestone.developments.map((dev, index) => (
                    <div key={index} className="bg-white/70 rounded-lg p-3 border border-pink-300">
                      <span className="text-pink-700 font-medium">{dev}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Kick Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Activity className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Kick Counter</h3>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600">{kickCount}</div>
                  <div className="text-sm text-gray-500">Today's kicks</div>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-6xl mb-4">👶</div>
                <p className="text-gray-600 mb-4">
                  {isTracking 
                    ? "Tap the button below each time you feel baby move" 
                    : "Start a kick counting session to monitor baby's activity"
                  }
                </p>
                
                {isTracking && (
                  <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 mb-4">
                    <p className="text-green-800 font-semibold">
                      Session active - Goal: 10 kicks in 2 hours
                    </p>
                    <p className="text-green-600 text-sm">
                      Time elapsed: {kickTimer ? Math.round((Date.now() - kickTimer) / 1000 / 60) : 0} minutes
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                {!isTracking ? (
                  <button
                    onClick={startKickCounting}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-bold text-lg"
                  >
                    <Play className="w-5 h-5 inline mr-2" />
                    Start Counting
                  </button>
                ) : (
                  <>
                    <button
                      onClick={recordKick}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-bold text-lg transform hover:scale-105"
                    >
                      <Heart className="w-5 h-5 inline mr-2" />
                      Record Kick
                    </button>
                    <button
                      onClick={stopKickCounting}
                      className="px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:shadow-lg transition-all font-bold"
                    >
                      Stop Session
                    </button>
                  </>
                )}
              </div>

              {/* Recent Kick Data */}
              {Object.keys(weeklyData).length > 0 && (
                <div className="mt-6 bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-3">Recent Activity</h4>
                  <div className="grid grid-cols-7 gap-2">
                    {Object.entries(weeklyData).slice(-7).map(([date, data]) => (
                      <div key={date} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">
                          {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          data.kicks >= 10 ? 'bg-green-500 text-white' :
                          data.kicks >= 6 ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {data.kicks}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Development Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-orange-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Recommended Activities</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {milestone.activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200 text-center hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="text-3xl mb-3">
                      {index === 0 ? '🗣️' : index === 1 ? '🎵' : '🤲'}
                    </div>
                    <h4 className="font-bold text-orange-800 mb-2">{activity}</h4>
                    <p className="text-orange-600 text-sm">
                      {index === 0 ? 'Helps with language development' :
                       index === 1 ? 'Stimulates brain development' :
                       'Promotes bonding and relaxation'}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - AI Insights */}
          <div className="space-y-8">
            {/* Health Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Health Status</h3>
              </div>

              <div className={`text-center p-4 rounded-xl mb-4 ${
                healthInsights.overall === 'Excellent' ? 'bg-green-100 border-2 border-green-300' :
                healthInsights.overall === 'Good' ? 'bg-yellow-100 border-2 border-yellow-300' :
                'bg-orange-100 border-2 border-orange-300'
              }`}>
                <div className={`text-2xl font-bold ${
                  healthInsights.overall === 'Excellent' ? 'text-green-700' :
                  healthInsights.overall === 'Good' ? 'text-yellow-700' :
                  'text-orange-700'
                }`}>
                  {healthInsights.overall}
                </div>
                <div className="text-sm text-gray-600">Overall Assessment</div>
              </div>

              <div className="space-y-3">
                {healthInsights.insights.map((insight, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700 text-sm">{insight}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">AI Analysis</h3>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border-2 border-purple-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-medium leading-relaxed">
                  {healthInsights.aiAnalysis}
                </pre>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-yellow-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-black py-3 rounded-xl hover:shadow-lg transition-all font-semibold">
                  Schedule Ultrasound
                </button>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-black py-3 rounded-xl hover:shadow-lg transition-all font-semibold">
                  Export Movement Data
                </button>
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-black py-3 rounded-xl hover:shadow-lg transition-all font-semibold">
                  Contact Doctor
                </button>
              </div>
            </motion.div>

            {/* Emergency Alert */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 rounded-3xl p-6 border-2 border-red-200"
            >
              <div className="flex items-center mb-4">
                <Bell className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-xl font-bold text-red-800">When to Call Doctor</h3>
              </div>

              <div className="space-y-2 text-sm text-red-700">
                <div>• No movement for 24+ hours</div>
                <div>• Sudden decrease in movement</div>
                <div>• Less than 10 kicks in 2 hours</div>
                <div>• Unusual movement patterns</div>
                <div>• Any concerns about baby's wellbeing</div>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-bold">
                Emergency Contact
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetalHealthTracker;
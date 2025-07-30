import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Target, TrendingUp, Zap, Clock, Heart, Moon } from 'lucide-react';

const AIActivityTracker = ({ userStage = 'second-trimester', currentWeek = 20 }) => {
  const [activities, setActivities] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [behaviorPattern, setBehaviorPattern] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiModels = {
    behavior: 'BehaviorAnalytics-Pregnancy-v2.1',
    activity: 'ActivityOptimizer-Maternal-v3.0',
    wellness: 'WellnessPredictor-AI-v1.8',
    personalization: 'PersonalizedRecommender-v2.5'
  };

  const activityCategories = {
    physical: {
      name: 'Physical Activity',
      icon: Activity,
      color: 'emerald',
      activities: ['walking', 'prenatal-yoga', 'swimming', 'strength-training', 'stretching']
    },
    nutrition: {
      name: 'Nutrition',
      icon: Heart,
      color: 'rose',
      activities: ['meal-planning', 'supplement-taking', 'hydration', 'mindful-eating', 'cooking']
    },
    wellness: {
      name: 'Mental Wellness',
      icon: Brain,
      color: 'purple',
      activities: ['meditation', 'journaling', 'breathing-exercises', 'therapy', 'reading']
    },
    sleep: {
      name: 'Sleep & Recovery',
      icon: Moon,
      color: 'blue',
      activities: ['sleep-tracking', 'nap-time', 'relaxation', 'bath-time', 'massage']
    },
    medical: {
      name: 'Medical Care',
      icon: Target,
      color: 'orange',
      activities: ['prenatal-visits', 'lab-tests', 'ultrasounds', 'symptom-tracking', 'medication']
    }
  };

  const generatePersonalizedActivities = () => {
    const stageBasedActivities = {
      'pre-conception': [
        { name: 'Folic Acid Supplementation', category: 'nutrition', frequency: 'daily', importance: 'critical', aiScore: 98 },
        { name: 'Cycle Tracking', category: 'medical', frequency: 'daily', importance: 'high', aiScore: 95 },
        { name: 'Preconception Vitamins', category: 'nutrition', frequency: 'daily', importance: 'high', aiScore: 92 },
        { name: 'Stress Reduction', category: 'wellness', frequency: 'daily', importance: 'medium', aiScore: 88 }
      ],
      'first-trimester': [
        { name: 'Prenatal Vitamin', category: 'nutrition', frequency: 'daily', importance: 'critical', aiScore: 99 },
        { name: 'Nausea Management', category: 'wellness', frequency: 'as-needed', importance: 'high', aiScore: 94 },
        { name: 'Gentle Walking', category: 'physical', frequency: '3x/week', importance: 'medium', aiScore: 85 },
        { name: 'Adequate Sleep', category: 'sleep', frequency: 'daily', importance: 'high', aiScore: 91 }
      ],
      'second-trimester': [
        { name: 'Iron Supplementation', category: 'nutrition', frequency: 'daily', importance: 'critical', aiScore: 96 },
        { name: 'Prenatal Yoga', category: 'physical', frequency: '4x/week', importance: 'high', aiScore: 93 },
        { name: 'Anatomy Scan Prep', category: 'medical', frequency: 'once', importance: 'critical', aiScore: 98 },
        { name: 'Pelvic Floor Exercises', category: 'physical', frequency: 'daily', importance: 'high', aiScore: 89 }
      ],
      'third-trimester': [
        { name: 'Birth Plan Creation', category: 'medical', frequency: 'once', importance: 'high', aiScore: 94 },
        { name: 'Hospital Bag Packing', category: 'medical', frequency: 'once', importance: 'medium', aiScore: 87 },
        { name: 'Breathing Exercises', category: 'wellness', frequency: 'daily', importance: 'high', aiScore: 92 },
        { name: 'Perineal Massage', category: 'physical', frequency: 'daily', importance: 'medium', aiScore: 85 }
      ]
    };

    return stageBasedActivities[userStage] || stageBasedActivities['second-trimester'];
  };

  const analyzeBehaviorPattern = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const pattern = {
        consistency: Math.floor(Math.random() * 30) + 70, // 70-100%
        preferredTime: ['morning', 'afternoon', 'evening'][Math.floor(Math.random() * 3)],
        activityTypes: ['physical', 'wellness', 'nutrition'],
        adherenceRate: Math.floor(Math.random() * 20) + 80, // 80-100%
        motivationFactors: ['health-benefits', 'baby-development', 'energy-levels'],
        challenges: ['time-constraints', 'fatigue', 'nausea']
      };
      
      setBehaviorPattern(pattern);
      generateAIRecommendations(pattern);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateAIRecommendations = (pattern) => {
    const recommendations = [
      {
        type: 'optimization',
        title: 'Optimize Activity Timing',
        description: `Based on your ${pattern.preferredTime} preference, schedule high-energy activities during this time.`,
        impact: 'high',
        model: aiModels.behavior
      },
      {
        type: 'personalization',
        title: 'Customize Exercise Intensity',
        description: `Your adherence rate of ${pattern.adherenceRate}% suggests you respond well to moderate intensity workouts.`,
        impact: 'medium',
        model: aiModels.activity
      },
      {
        type: 'wellness',
        title: 'Address Fatigue Patterns',
        description: 'AI detected fatigue as a challenge. Recommend iron level check and energy-boosting activities.',
        impact: 'high',
        model: aiModels.wellness
      },
      {
        type: 'behavioral',
        title: 'Habit Stacking Opportunity',
        description: 'Link new activities to existing strong habits for better consistency.',
        impact: 'medium',
        model: aiModels.personalization
      }
    ];
    
    setAiRecommendations(recommendations);
  };

  useEffect(() => {
    setActivities(generatePersonalizedActivities());
  }, [userStage]);

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Brain className="w-8 h-8 text-cyan-400 mr-3" />
          <div>
            <h2 className="text-3xl font-bold text-white">AI Activity Tracker</h2>
            <p className="text-gray-400">Personalized for {userStage.replace('-', ' ')} - Week {currentWeek}</p>
          </div>
        </div>
        <button
          onClick={analyzeBehaviorPattern}
          disabled={isAnalyzing}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Behavior'}
        </button>
      </div>

      {/* AI Models */}
      <div className="bg-gray-700/30 rounded-xl p-4 mb-6">
        <div className="text-sm text-gray-400 mb-2">Powered by AI Models:</div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(aiModels).map(([key, model]) => (
            <div key={key} className="text-xs">
              <span className="text-cyan-400 font-semibold uppercase">{key}:</span>
              <span className="text-gray-300 font-mono ml-1">{model}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personalized Activities */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Personalized Activities</h3>
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const category = activityCategories[activity.category];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-${category.color}-900/20 border border-${category.color}-700/50 rounded-xl p-4`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <category.icon className={`w-5 h-5 text-${category.color}-400 mr-2`} />
                      <div>
                        <div className="font-semibold text-white">{activity.name}</div>
                        <div className="text-xs text-gray-400">{category.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold text-${category.color}-400`}>
                        {activity.aiScore}%
                      </div>
                      <div className="text-xs text-gray-400">AI Score</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="text-xs text-gray-400">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {activity.frequency}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        activity.importance === 'critical' ? 'bg-red-900/50 text-red-400' :
                        activity.importance === 'high' ? 'bg-orange-900/50 text-orange-400' :
                        'bg-gray-900/50 text-gray-400'
                      }`}>
                        {activity.importance}
                      </div>
                    </div>
                    <button className={`px-3 py-1 bg-${category.color}-600 text-white rounded text-xs hover:bg-${category.color}-700 transition-colors`}>
                      Track
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Insights & Recommendations */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">AI Insights</h3>
          
          {/* Behavior Pattern */}
          {Object.keys(behaviorPattern).length > 0 && (
            <div className="bg-purple-900/20 border border-purple-700/50 rounded-xl p-4 mb-4">
              <h4 className="font-semibold text-purple-400 mb-3">Behavior Analysis</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-gray-400">Consistency</div>
                  <div className="text-white font-semibold">{behaviorPattern.consistency}%</div>
                </div>
                <div>
                  <div className="text-gray-400">Adherence Rate</div>
                  <div className="text-white font-semibold">{behaviorPattern.adherenceRate}%</div>
                </div>
                <div>
                  <div className="text-gray-400">Preferred Time</div>
                  <div className="text-white font-semibold capitalize">{behaviorPattern.preferredTime}</div>
                </div>
                <div>
                  <div className="text-gray-400">Main Challenge</div>
                  <div className="text-white font-semibold capitalize">{behaviorPattern.challenges?.[0]?.replace('-', ' ')}</div>
                </div>
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      rec.impact === 'high' ? 'bg-red-400' :
                      rec.impact === 'medium' ? 'bg-yellow-400' :
                      'bg-green-400'
                    }`}></div>
                    <div className="font-semibold text-white text-sm">{rec.title}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    rec.impact === 'high' ? 'bg-red-900/50 text-red-400' :
                    rec.impact === 'medium' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-green-900/50 text-green-400'
                  }`}>
                    {rec.impact}
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{rec.description}</p>
                <div className="text-xs text-cyan-400 font-mono">{rec.model}</div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-2">
            <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 rounded-lg text-sm hover:shadow-lg transition-all">
              Generate Weekly Plan
            </button>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-sm hover:shadow-lg transition-all">
              Export Activity Data
            </button>
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 rounded-lg text-sm hover:shadow-lg transition-all">
              Share with Healthcare Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIActivityTracker;
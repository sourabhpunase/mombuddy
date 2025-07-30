import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Star, Target } from 'lucide-react';

const ProgressTracker = ({ userGoal }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  const journeyStages = {
    planning: [
      { id: 1, title: 'Health Assessment', description: 'Complete pre-conception health screening', duration: '1 week', link: '/pre-conception' },
      { id: 2, title: 'Supplement Protocol', description: 'Start folic acid and prenatal vitamins', duration: '3 months', link: '/daily-tracker' },
      { id: 3, title: 'Lifestyle Optimization', description: 'Implement diet and exercise changes', duration: '2-3 months', link: '/nutrition' },
      { id: 4, title: 'Partner Preparation', description: 'Partner health optimization', duration: '1 month', link: '/fertility' },
      { id: 5, title: 'Conception Ready', description: 'Begin trying to conceive', duration: 'Ongoing', link: '/fertility' }
    ],
    trying: [
      { id: 1, title: 'Cycle Tracking', description: 'Track ovulation and fertile windows', duration: '3-6 cycles', link: '/fertility' },
      { id: 2, title: 'Timing Optimization', description: 'Perfect conception timing', duration: 'Each cycle', link: '/fertility' },
      { id: 3, title: 'Health Monitoring', description: 'Track symptoms and health markers', duration: 'Daily', link: '/daily-tracker' },
      { id: 4, title: 'Stress Management', description: 'Maintain emotional wellness', duration: 'Ongoing', link: '/community' },
      { id: 5, title: 'Conception Success', description: 'Positive pregnancy test', duration: 'Variable', link: '/pregnancy-journey' }
    ],
    pregnant: [
      { id: 1, title: 'First Prenatal Visit', description: 'Confirm pregnancy and initial screening', duration: '6-8 weeks', link: '/ai-analysis' },
      { id: 2, title: 'First Trimester Care', description: 'Manage early pregnancy symptoms', duration: '12 weeks', link: '/symptoms' },
      { id: 3, title: 'Second Trimester Monitoring', description: 'Anatomy scan and glucose screening', duration: '13-27 weeks', link: '/weekly-guide' },
      { id: 4, title: 'Third Trimester Prep', description: 'Birth plan and final preparations', duration: '28-40 weeks', link: '/birth-plan' },
      { id: 5, title: 'Birth & Delivery', description: 'Welcome your baby', duration: '40 weeks', link: '/natural-birth' }
    ]
  };

  const stages = journeyStages[userGoal?.id] || journeyStages.planning;

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
      
      // Auto-advance to next stage
      const nextStage = stages.findIndex(stage => stage.id === stepId) + 1;
      if (nextStage < stages.length) {
        setTimeout(() => {
          setCurrentStage(nextStage);
        }, 1000);
      }
    }
  };

  const getProgressPercentage = () => {
    return (completedSteps.length / stages.length) * 100;
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Your Journey Progress</h2>
          <p className="text-gray-600">{userGoal?.title || 'Planning to Conceive'}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold text-purple-600">{Math.round(getProgressPercentage())}%</div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Start</span>
          <span>{completedSteps.length} of {stages.length} completed</span>
          <span>Goal Achieved</span>
        </div>
      </div>

      {/* Journey Steps */}
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const isCompleted = completedSteps.includes(stage.id);
          const isCurrent = currentStage === index;
          const isUpcoming = index > currentStage;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                isCompleted 
                  ? 'bg-green-50 border-green-300 shadow-md' 
                  : isCurrent 
                    ? 'bg-purple-50 border-purple-300 shadow-lg ring-2 ring-purple-200' 
                    : isUpcoming
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-gray-300'
              }`}
              onClick={() => !isCompleted && handleStepComplete(stage.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                    isCompleted 
                      ? 'bg-green-500' 
                      : isCurrent 
                        ? 'bg-purple-500' 
                        : 'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold">{stage.id}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${
                      isCompleted ? 'text-green-800' : isCurrent ? 'text-purple-800' : 'text-gray-600'
                    }`}>
                      {stage.title}
                    </h3>
                    <p className={`mb-3 ${
                      isCompleted ? 'text-green-700' : isCurrent ? 'text-purple-700' : 'text-gray-500'
                    }`}>
                      {stage.description}
                    </p>
                    
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-gray-600">{stage.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center text-green-600 mb-2"
                    >
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">Completed</span>
                    </motion.div>
                  )}
                  
                  {isCurrent && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="flex items-center text-purple-600"
                    >
                      <span className="text-sm font-semibold mr-1">Current</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}

                  <a
                    href={stage.link}
                    className={`mt-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isCompleted 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : isCurrent 
                          ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
                          : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isCompleted ? 'Review' : isCurrent ? 'Start Now' : 'Coming Up'}
                  </a>
                </div>
              </div>

              {/* Connection Line */}
              {index < stages.length - 1 && (
                <div className={`absolute left-10 top-20 w-0.5 h-8 ${
                  completedSteps.includes(stage.id) ? 'bg-green-300' : 'bg-gray-300'
                }`} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Badge */}
      {getProgressPercentage() === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-center text-white"
        >
          <Target className="w-12 h-12 mx-auto mb-3" />
          <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
          <p>You've completed your {userGoal?.title.toLowerCase()} journey!</p>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressTracker;
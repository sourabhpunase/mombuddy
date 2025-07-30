import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Maximize, Clock, User, Star, Brain } from 'lucide-react';

const VideoTutorial = ({ 
  title, 
  duration, 
  instructor, 
  topics, 
  userProfile, 
  aiGenerated = false, 
  model = '',
  category = 'general' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const categoryColors = {
    'pre-conception': 'from-rose-500 to-pink-600',
    'fertility': 'from-emerald-500 to-teal-600',
    'pregnancy': 'from-purple-500 to-indigo-600',
    'birth': 'from-blue-500 to-cyan-600',
    'postpartum': 'from-orange-500 to-red-600',
    'general': 'from-gray-500 to-gray-600'
  };

  const generatePersonalizedContent = () => {
    const personalizations = [];
    
    if (userProfile?.age > 35) {
      personalizations.push('Advanced maternal age considerations');
    }
    if (userProfile?.previousCSection) {
      personalizations.push('VBAC preparation techniques');
    }
    if (userProfile?.currentWeek) {
      personalizations.push(`Week ${userProfile.currentWeek} specific guidance`);
    }
    if (userProfile?.riskFactors?.length > 0) {
      personalizations.push('Risk factor management');
    }

    return personalizations;
  };

  const transcript = [
    { time: '0:00', speaker: 'AI Instructor', text: `Welcome to your personalized ${category} tutorial.` },
    { time: '0:15', speaker: 'AI Instructor', text: 'This content has been customized based on your profile and current needs.' },
    { time: '0:30', speaker: 'AI Instructor', text: 'Let\'s begin with the key concepts you need to know.' },
    { time: '1:00', speaker: 'AI Instructor', text: 'Remember, every pregnancy is unique, and this guidance is tailored specifically for you.' }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* Video Player */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black">
        {/* Video Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🎥</div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-300">{duration}</p>
          </div>
        </div>

        {/* AI Generated Badge */}
        {aiGenerated && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
            <Brain className="w-4 h-4 mr-1" />
            AI Generated
          </div>
        )}

        {/* Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </motion.button>
        </div>

        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <div className="flex-1 bg-white/20 rounded-full h-1">
              <div 
                className={`bg-gradient-to-r ${categoryColors[category]} h-1 rounded-full transition-all`}
                style={{ width: `${(currentTime / 100) * 100}%` }}
              />
            </div>
            
            <span className="text-white text-sm">0:00 / {duration}</span>
            
            <button className="text-white hover:text-gray-300 transition-colors">
              <Volume2 className="w-5 h-5" />
            </button>
            
            <button className="text-white hover:text-gray-300 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Information */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{duration}</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span className="text-sm">{instructor || 'AI Instructor'}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span className="text-sm">4.9/5</span>
              </div>
            </div>
          </div>
          
          <div className={`px-3 py-1 bg-gradient-to-r ${categoryColors[category]} text-white rounded-full text-sm font-semibold`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        </div>

        {/* Topics Covered */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Topics Covered:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {topics.map((topic, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <div className={`w-2 h-2 bg-gradient-to-r ${categoryColors[category]} rounded-full mr-2`}></div>
                <span className="text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Content */}
        {aiGenerated && userProfile && (
          <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
              <Brain className="w-4 h-4 mr-2" />
              Personalized for You:
            </h4>
            <div className="space-y-2">
              {generatePersonalizedContent().map((item, index) => (
                <div key={index} className="flex items-center text-purple-700">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            {model && (
              <div className="mt-3 text-xs text-purple-600">
                Generated by {model}
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className={`flex-1 bg-gradient-to-r ${categoryColors[category]} text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold`}>
            Start Learning
          </button>
          <button 
            onClick={() => setShowTranscript(!showTranscript)}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
          >
            {showTranscript ? 'Hide' : 'Show'} Transcript
          </button>
        </div>

        {/* Transcript */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-200"
            >
              <h4 className="font-semibold text-gray-800 mb-4">Video Transcript:</h4>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {transcript.map((entry, index) => (
                  <div key={index} className="flex">
                    <div className="text-xs text-gray-500 w-12 flex-shrink-0 mt-1">
                      {entry.time}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-gray-700">{entry.speaker}:</div>
                      <div className="text-sm text-gray-600">{entry.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoTutorial;
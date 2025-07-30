import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Baby, Heart, Brain, Pill, Activity, Book, Video } from 'lucide-react';

const WeeklyGuide = () => {
  const [selectedWeek, setSelectedWeek] = useState(20);

  const weeklyData = {
    4: {
      babySize: 'Poppy seed (2mm)',
      babyDev: 'Heart begins to beat, neural tube forms',
      momChanges: 'Missed period, implantation bleeding possible',
      supplements: ['Folic Acid 800mcg', 'Prenatal vitamin'],
      nutrition: ['Leafy greens', 'Citrus fruits', 'Whole grains'],
      exercise: 'Continue normal activities, avoid overheating',
      warning: 'Severe cramping, heavy bleeding',
      videoTopic: 'Early Pregnancy Signs'
    },
    8: {
      babySize: 'Raspberry (16mm)',
      babyDev: 'All major organs forming, limb buds appear',
      momChanges: 'Morning sickness peaks, breast tenderness',
      supplements: ['Folic Acid 800mcg', 'Vitamin B6 for nausea'],
      nutrition: ['Ginger for nausea', 'Small frequent meals', 'Crackers'],
      exercise: 'Gentle walking, avoid contact sports',
      warning: 'Severe vomiting, dehydration',
      videoTopic: 'Managing Morning Sickness'
    },
    12: {
      babySize: 'Lime (54mm)',
      babyDev: 'Reflexes developing, kidneys producing urine',
      momChanges: 'End of first trimester, energy may return',
      supplements: ['Prenatal vitamin', 'Continue folic acid'],
      nutrition: ['Protein-rich foods', 'Calcium sources', 'Iron-rich foods'],
      exercise: 'Prenatal yoga, swimming',
      warning: 'Persistent severe symptoms',
      videoTopic: 'First Trimester Recap'
    },
    16: {
      babySize: 'Avocado (108mm)',
      babyDev: 'Can hear sounds, sex organs visible',
      momChanges: 'Increased energy, showing more',
      supplements: ['Iron 27mg', 'Calcium 1000mg', 'DHA 200mg'],
      nutrition: ['Lean meats', 'Fish (low mercury)', 'Dairy products'],
      exercise: 'Moderate cardio, strength training',
      warning: 'Unusual discharge, severe pain',
      videoTopic: 'Second Trimester Energy'
    },
    20: {
      babySize: 'Banana (160mm)',
      babyDev: 'Halfway point! Can swallow, hair growing',
      momChanges: 'Anatomy scan, feeling baby movements',
      supplements: ['Iron', 'Calcium', 'DHA', 'Vitamin D'],
      nutrition: ['Colorful vegetables', 'Whole grains', 'Healthy fats'],
      exercise: 'Walking, swimming, prenatal classes',
      warning: 'No fetal movement, severe headaches',
      videoTopic: 'Anatomy Scan Explained'
    },
    24: {
      babySize: 'Corn (300mm)',
      babyDev: 'Viability milestone, lungs developing',
      momChanges: 'Glucose screening, weight gain',
      supplements: ['Iron', 'Calcium', 'DHA', 'Vitamin K'],
      nutrition: ['Complex carbs', 'Protein', 'Limit sugar'],
      exercise: 'Modified exercises, avoid lying flat',
      warning: 'Signs of gestational diabetes',
      videoTopic: 'Viability Milestone'
    },
    28: {
      babySize: 'Eggplant (370mm)',
      babyDev: 'Eyes open, rapid brain development',
      momChanges: 'Third trimester begins, frequent checkups',
      supplements: ['Iron', 'Calcium', 'DHA', 'Probiotics'],
      nutrition: ['High-fiber foods', 'Protein', 'Healthy snacks'],
      exercise: 'Gentle yoga, walking, pelvic exercises',
      warning: 'Decreased fetal movement, preterm labor signs',
      videoTopic: 'Third Trimester Preparation'
    },
    32: {
      babySize: 'Squash (430mm)',
      babyDev: 'Bones hardening, practicing breathing',
      momChanges: 'Shortness of breath, back pain',
      supplements: ['Vitamin K', 'Omega-3', 'Probiotics'],
      nutrition: ['Small frequent meals', 'Calcium', 'Iron'],
      exercise: 'Prenatal yoga, walking, birthing ball',
      warning: 'Severe swelling, vision changes',
      videoTopic: 'Baby Brain Development'
    },
    36: {
      babySize: 'Papaya (470mm)',
      babyDev: 'Lungs nearly mature, gaining weight',
      momChanges: 'Weekly checkups, preparing for birth',
      supplements: ['Vitamin K', 'Probiotics', 'Evening primrose oil'],
      nutrition: ['Energy-rich foods', 'Dates', 'Red raspberry leaf tea'],
      exercise: 'Birth preparation exercises, walking',
      warning: 'Regular contractions, fluid leakage',
      videoTopic: 'Birth Preparation'
    },
    40: {
      babySize: 'Watermelon (510mm)',
      babyDev: 'Fully developed, ready for birth!',
      momChanges: 'Due date, signs of labor',
      supplements: ['Vitamin K', 'Probiotics'],
      nutrition: ['Light, easy-to-digest foods', 'Stay hydrated'],
      exercise: 'Gentle walking, relaxation techniques',
      warning: 'Labor signs, decreased movement',
      videoTopic: 'Labor and Delivery'
    }
  };

  const getAIGuidance = (week) => {
    const data = weeklyData[week];
    if (!data) return 'Select a week to get AI guidance';

    return `**Week ${week} AI Specialist Guidance:**

**🍼 Baby Development:**
Your baby is now the size of a ${data.babySize}. ${data.babyDev}

**👩 Your Body Changes:**
${data.momChanges}

**💊 Essential Supplements:**
${data.supplements.map(s => `• ${s}`).join('\n')}

**🥗 Nutrition Focus:**
${data.nutrition.map(n => `• ${n}`).join('\n')}

**🏃‍♀️ Exercise Recommendations:**
${data.exercise}

**⚠️ Warning Signs:**
Contact your doctor immediately if you experience: ${data.warning}

**🎥 Educational Focus:**
This week's learning topic: ${data.videoTopic}

**AI Personalized Tips:**
${week <= 12 ? 'Focus on folic acid and managing early symptoms. Rest when needed.' :
  week <= 27 ? 'Optimize nutrition for rapid growth. Stay active and prepare for baby.' :
  'Prepare for birth. Monitor baby movements and practice relaxation techniques.'}`;
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
            Weekly Pregnancy Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Detailed week-by-week guidance with AI-powered insights for your pregnancy journey.
          </p>
        </motion.div>

        {/* Week Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-violet-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Select Week</h2>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-violet-600">Week {selectedWeek}</div>
              <div className="text-gray-600">
                {selectedWeek <= 12 ? 'First Trimester' : 
                 selectedWeek <= 27 ? 'Second Trimester' : 'Third Trimester'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-6">
            {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map(week => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`p-3 rounded-xl font-semibold transition-all ${
                  selectedWeek === week
                    ? 'bg-violet-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-violet-100'
                }`}
              >
                {week}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-r from-violet-100 to-rose-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Baby className="w-6 h-6 text-violet-600 mr-2" />
                <span className="font-semibold">Baby Size: {weeklyData[selectedWeek]?.babySize}</span>
              </div>
              <div className="flex items-center">
                <Video className="w-6 h-6 text-rose-600 mr-2" />
                <span className="font-semibold">Topic: {weeklyData[selectedWeek]?.videoTopic}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Book className="w-8 h-8 text-fuchsia-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Week {selectedWeek} Details</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Baby className="w-6 h-6 text-pink-600 mr-2" />
                  <h3 className="text-xl font-semibold">Baby Development</h3>
                </div>
                <p className="text-gray-700">{weeklyData[selectedWeek]?.babyDev}</p>
                <div className="mt-2 text-sm text-pink-600 font-semibold">
                  Size: {weeklyData[selectedWeek]?.babySize}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Heart className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold">Your Body</h3>
                </div>
                <p className="text-gray-700">{weeklyData[selectedWeek]?.momChanges}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Pill className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold">Supplements</h3>
                </div>
                <ul className="space-y-1">
                  {weeklyData[selectedWeek]?.supplements.map((supp, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      {supp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Activity className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold">Exercise</h3>
                </div>
                <p className="text-gray-700">{weeklyData[selectedWeek]?.exercise}</p>
              </div>
            </div>
          </motion.div>

          {/* AI Guidance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-rose-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">AI Weekly Guidance</h2>
            </div>

            <div className="bg-gradient-to-br from-violet-50 to-rose-50 rounded-xl p-6 mb-6">
              <pre className="whitespace-pre-wrap text-gray-700 font-medium leading-relaxed text-sm">
                {getAIGuidance(selectedWeek)}
              </pre>
            </div>

            {/* Educational Video Placeholder */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 text-center">
              <Video className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Educational Video</h3>
              <p className="text-gray-600 mb-4">{weeklyData[selectedWeek]?.videoTopic}</p>
              <button className="bg-gradient-to-r from-violet-600 to-rose-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                Watch Video
              </button>
            </div>
          </motion.div>
        </div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Quick Week Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { weeks: '4-8', label: 'Early Signs', color: 'rose' },
              { weeks: '9-12', label: 'First Tri End', color: 'pink' },
              { weeks: '13-20', label: 'Golden Period', color: 'purple' },
              { weeks: '21-28', label: 'Growth Phase', color: 'violet' },
              { weeks: '29-40', label: 'Birth Prep', color: 'blue' }
            ].map((phase, idx) => (
              <div key={idx} className={`bg-${phase.color}-50 border-2 border-${phase.color}-200 rounded-xl p-4 text-center`}>
                <div className={`text-lg font-bold text-${phase.color}-600`}>{phase.weeks}</div>
                <div className={`text-sm text-${phase.color}-700`}>{phase.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeeklyGuide;
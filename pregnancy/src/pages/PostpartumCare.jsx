import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Heart, Brain, Moon, Droplets, Activity, Calendar, Bell, Star, TrendingUp, Shield, Sun } from 'lucide-react';

const PostpartumCare = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [recoveryStage, setRecoveryStage] = useState('immediate');
  const [userProfile, setUserProfile] = useState({
    deliveryType: 'vaginal',
    breastfeeding: true,
    complications: false
  });

  const aiModels = {
    recovery: 'PostpartumAI-Recovery-v3.4',
    lactation: 'LactationSupport-AI-v2.8',
    mental: 'MaternalMentalHealth-v4.1',
    nutrition: 'PostpartumNutrition-v2.6',
    exercise: 'RecoveryFitness-AI-v1.9'
  };

  const recoveryStages = {
    immediate: {
      title: 'Immediate Recovery (0-2 weeks)',
      color: 'rose',
      gradient: 'from-rose-400 to-pink-500',
      focus: 'Healing & Bonding',
      keyPoints: [
        'Physical healing from delivery',
        'Establishing breastfeeding',
        'Bonding with baby',
        'Managing pain and discomfort',
        'Getting adequate rest'
      ]
    },
    early: {
      title: 'Early Recovery (2-6 weeks)',
      color: 'purple',
      gradient: 'from-purple-400 to-indigo-500',
      focus: 'Adjustment & Routine',
      keyPoints: [
        'Developing feeding routines',
        'Managing sleep deprivation',
        'Emotional adjustment',
        'Gradual activity increase',
        'Partner relationship changes'
      ]
    },
    extended: {
      title: 'Extended Recovery (6 weeks - 6 months)',
      color: 'emerald',
      gradient: 'from-emerald-400 to-teal-500',
      focus: 'Rebuilding & Strengthening',
      keyPoints: [
        'Return to exercise',
        'Hormonal rebalancing',
        'Career/life planning',
        'Relationship rebuilding',
        'Long-term health focus'
      ]
    }
  };

  const weeklyGuidance = {
    1: {
      physical: 'Focus on rest and healing. Expect heavy bleeding (lochia) and cramping.',
      emotional: 'Baby blues are normal. Seek support if feelings persist beyond 2 weeks.',
      nutrition: 'High protein, iron-rich foods. Extra 500 calories if breastfeeding.',
      exercise: 'Gentle walking only. Avoid stairs when possible.',
      baby: 'Frequent feeding (8-12 times daily). Skin-to-skin contact.',
      warning: 'Heavy bleeding, fever >100.4°F, severe headaches'
    },
    2: {
      physical: 'Bleeding should lighten. Perineal healing continues.',
      emotional: 'Mood swings normal. Establish support network.',
      nutrition: 'Continue high-calorie, nutrient-dense foods.',
      exercise: 'Short walks, gentle stretching. Listen to your body.',
      baby: 'Growth spurts common. Cluster feeding normal.',
      warning: 'Signs of infection, persistent sadness, feeding difficulties'
    },
    6: {
      physical: 'Medical clearance for normal activities. Contraception discussion.',
      emotional: 'Adjustment period continues. Consider counseling if needed.',
      nutrition: 'Balanced diet with adequate hydration.',
      exercise: 'Gradual return to pre-pregnancy activities.',
      baby: 'More predictable patterns emerging.',
      warning: 'Postpartum depression symptoms, relationship strain'
    },
    12: {
      physical: 'Core strength rebuilding. Hormonal changes continue.',
      emotional: 'Identity adjustment as mother. Career planning.',
      nutrition: 'Maintain healthy eating patterns.',
      exercise: 'Structured exercise program safe to begin.',
      baby: 'Sleep patterns improving. Social smiles.',
      warning: 'Persistent fatigue, mood changes, physical limitations'
    }
  };

  const breastfeedingSupport = {
    positioning: [
      { name: 'Cradle Hold', description: 'Classic position for established feeders', video: 'cradle-hold.mp4' },
      { name: 'Cross-Cradle', description: 'Better control for newborns', video: 'cross-cradle.mp4' },
      { name: 'Football Hold', description: 'Great for C-section recovery', video: 'football-hold.mp4' },
      { name: 'Side-Lying', description: 'Perfect for night feeds', video: 'side-lying.mp4' }
    ],
    troubleshooting: [
      { issue: 'Sore Nipples', solution: 'Check latch, use lanolin cream, air dry', severity: 'common' },
      { issue: 'Low Supply', solution: 'Increase frequency, stay hydrated, consider galactagogues', severity: 'moderate' },
      { issue: 'Engorgement', solution: 'Frequent feeding, cold compresses, gentle massage', severity: 'common' },
      { issue: 'Mastitis', solution: 'Continue feeding, antibiotics if needed, rest', severity: 'serious' }
    ]
  };

  const mentalHealthSupport = {
    babyBlues: {
      symptoms: ['Mood swings', 'Crying spells', 'Anxiety', 'Difficulty sleeping'],
      duration: '2 weeks postpartum',
      management: ['Rest', 'Support system', 'Nutrition', 'Gentle exercise']
    },
    postpartumDepression: {
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Difficulty bonding'],
      duration: 'Can occur up to 1 year postpartum',
      management: ['Professional help', 'Therapy', 'Medication if needed', 'Support groups']
    },
    postpartumAnxiety: {
      symptoms: ['Excessive worry', 'Racing thoughts', 'Physical symptoms', 'Avoidance'],
      duration: 'Variable onset and duration',
      management: ['Relaxation techniques', 'Therapy', 'Medication', 'Lifestyle changes']
    }
  };

  const generatePersonalizedPlan = () => {
    const currentGuidance = weeklyGuidance[currentWeek] || weeklyGuidance[1];
    const stage = recoveryStages[recoveryStage];
    
    return {
      stage: stage,
      guidance: currentGuidance,
      aiRecommendations: generateAIRecommendations(),
      customVideo: generateCustomVideo(),
      clothingGuidance: generateClothingGuidance(),
      biologicalInsights: generateBiologicalInsights()
    };
  };

  const generateAIRecommendations = () => {
    return {
      recovery: `Based on ${userProfile.deliveryType} delivery at week ${currentWeek}: Focus on gentle movement and adequate rest. Your body is producing relaxin hormone for 5 months postpartum.`,
      nutrition: `Breastfeeding mothers need 500 extra calories daily. Emphasize protein (25g extra), calcium (1300mg), and omega-3 fatty acids for brain development.`,
      exercise: currentWeek < 6 ? 'Walking only. Core exercises contraindicated until medical clearance.' : 'Begin pelvic floor rehabilitation. Avoid high-impact activities until 12 weeks.',
      mental: 'Oxytocin and prolactin levels are high, promoting bonding but may cause mood fluctuations. Practice mindfulness and seek support.',
      sleep: 'Sleep when baby sleeps. REM sleep is crucial for emotional regulation and milk production.'
    };
  };

  const generateCustomVideo = () => {
    return {
      title: `Week ${currentWeek} Recovery Guide`,
      duration: '8:45',
      topics: [
        `${userProfile.deliveryType} delivery recovery`,
        currentWeek < 6 ? 'Immediate care techniques' : 'Exercise progression',
        userProfile.breastfeeding ? 'Breastfeeding optimization' : 'Formula feeding support',
        'Emotional wellness strategies'
      ],
      aiGenerated: true,
      model: aiModels.recovery
    };
  };

  const generateClothingGuidance = () => {
    return {
      immediate: {
        tops: 'Nursing-friendly tops with easy access, soft fabrics like bamboo or organic cotton',
        bottoms: 'High-waisted, supportive underwear, loose-fitting pants or dresses',
        support: 'Well-fitted nursing bras, abdominal binders if recommended',
        fabrics: 'Breathable, moisture-wicking materials to prevent infections'
      },
      biological: 'Loose clothing prevents restriction of lymphatic drainage and promotes healing. Compression garments can aid in uterine involution.',
      seasonal: {
        summer: 'Light, breathable fabrics. UV protection for sensitive postpartum skin.',
        winter: 'Layering for easy nursing access. Warm but not restrictive clothing.',
        spring: 'Transitional pieces that accommodate changing body shape.',
        fall: 'Comfortable layers for temperature regulation during hormonal changes.'
      }
    };
  };

  const generateBiologicalInsights = () => {
    return {
      hormonal: {
        week: currentWeek,
        changes: [
          'Estrogen and progesterone levels dropping rapidly',
          'Prolactin elevated if breastfeeding',
          'Oxytocin surges during feeding and bonding',
          'Relaxin present for up to 5 months postpartum'
        ],
        effects: [
          'Joint laxity and potential instability',
          'Mood fluctuations and emotional sensitivity',
          'Breast changes and milk production',
          'Uterine contractions during feeding'
        ]
      },
      physical: {
        uterus: 'Involuting back to pre-pregnancy size over 6 weeks',
        abdominal: 'Diastasis recti may be present, requiring specific exercises',
        pelvic: 'Pelvic floor muscles need rehabilitation regardless of delivery type',
        cardiovascular: 'Blood volume returning to normal, potential for orthostatic hypotension'
      }
    };
  };

  const [personalizedPlan, setPersonalizedPlan] = useState(generatePersonalizedPlan());

  useEffect(() => {
    setPersonalizedPlan(generatePersonalizedPlan());
  }, [currentWeek, recoveryStage, userProfile]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            New Mom Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive postpartum care with AI-powered guidance for your recovery journey
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
            <h2 className="text-2xl font-bold text-gray-800">Specialized AI Models</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(aiModels).map(([key, model]) => (
              <div key={key} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
                <div className="text-xs text-purple-600 font-semibold uppercase">{key}</div>
                <div className="text-sm text-gray-700 font-mono">{model}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recovery Stage Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg">
            {Object.entries(recoveryStages).map(([key, stage]) => (
              <button
                key={key}
                onClick={() => setRecoveryStage(key)}
                className={`px-6 py-3 rounded-xl transition-all ${
                  recoveryStage === key
                    ? `bg-gradient-to-r ${stage.gradient} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="font-semibold">{stage.title}</div>
                <div className="text-xs opacity-80">{stage.focus}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Week Selector & Current Guidance */}
          <div className="lg:col-span-2 space-y-8">
            {/* Week Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Recovery Timeline</h3>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">Week {currentWeek}</div>
                  <div className="text-sm text-gray-500">Postpartum</div>
                </div>
              </div>

              <div className="mb-6">
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Week 1</span>
                  <span>Week 12</span>
                  <span>Week 24</span>
                </div>
              </div>

              {/* Current Week Guidance */}
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(personalizedPlan.guidance).map(([category, guidance]) => (
                  <div key={category} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 capitalize mb-2 flex items-center">
                      {category === 'physical' && <Heart className="w-4 h-4 mr-2 text-rose-500" />}
                      {category === 'emotional' && <Brain className="w-4 h-4 mr-2 text-purple-500" />}
                      {category === 'nutrition' && <Sun className="w-4 h-4 mr-2 text-orange-500" />}
                      {category === 'exercise' && <Activity className="w-4 h-4 mr-2 text-green-500" />}
                      {category === 'baby' && <Baby className="w-4 h-4 mr-2 text-blue-500" />}
                      {category === 'warning' && <Shield className="w-4 h-4 mr-2 text-red-500" />}
                      {category}
                    </h4>
                    <p className="text-sm text-gray-600">{guidance}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Breastfeeding Support */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <Droplets className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Breastfeeding Support</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">Positioning Techniques</h4>
                  <div className="space-y-3">
                    {breastfeedingSupport.positioning.map((position, index) => (
                      <div key={index} className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-blue-800">{position.name}</h5>
                          <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                            Watch Video
                          </button>
                        </div>
                        <p className="text-sm text-blue-700">{position.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">Common Issues</h4>
                  <div className="space-y-3">
                    {breastfeedingSupport.troubleshooting.map((issue, index) => (
                      <div key={index} className={`rounded-xl p-4 border ${
                        issue.severity === 'serious' ? 'bg-red-50 border-red-200' :
                        issue.severity === 'moderate' ? 'bg-orange-50 border-orange-200' :
                        'bg-green-50 border-green-200'
                      }`}>
                        <h5 className={`font-semibold mb-2 ${
                          issue.severity === 'serious' ? 'text-red-800' :
                          issue.severity === 'moderate' ? 'text-orange-800' :
                          'text-green-800'
                        }`}>
                          {issue.issue}
                        </h5>
                        <p className={`text-sm ${
                          issue.severity === 'serious' ? 'text-red-700' :
                          issue.severity === 'moderate' ? 'text-orange-700' :
                          'text-green-700'
                        }`}>
                          {issue.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mental Health Support */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <Brain className="w-8 h-8 text-purple-500 mr-3" />
                <h3 className="text-2xl font-bold text-gray-800">Mental Health Support</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(mentalHealthSupport).map(([condition, details]) => (
                  <div key={condition} className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-3 capitalize">
                      {condition.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-purple-700 mb-2">Symptoms:</h5>
                      <ul className="text-xs text-purple-600 space-y-1">
                        {details.symptoms.map((symptom, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-purple-700 mb-1">Duration:</h5>
                      <p className="text-xs text-purple-600">{details.duration}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold text-purple-700 mb-2">Management:</h5>
                      <ul className="text-xs text-purple-600 space-y-1">
                        {details.management.map((strategy, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                            {strategy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI Insights & Personalized Content */}
          <div className="space-y-8">
            {/* Custom Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Your Custom Video</h3>
              </div>

              <div className="aspect-video bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl flex items-center justify-center mb-4 relative">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🎥</div>
                  <p className="font-semibold">{personalizedPlan.customVideo.title}</p>
                  <p className="text-sm opacity-80">{personalizedPlan.customVideo.duration}</p>
                </div>
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  AI Generated
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Topics Covered:</h4>
                {personalizedPlan.customVideo.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    {topic}
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-purple-600">
                Generated by {personalizedPlan.customVideo.model}
              </div>
            </motion.div>

            {/* Clothing Guidance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Sun className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Clothing & Comfort</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(personalizedPlan.clothingGuidance.immediate).map(([category, guidance]) => (
                  <div key={category} className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <h4 className="font-semibold text-orange-800 capitalize mb-2">{category}:</h4>
                    <p className="text-sm text-orange-700">{guidance}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Biological Impact:</h4>
                <p className="text-sm text-orange-700">{personalizedPlan.clothingGuidance.biological}</p>
              </div>
            </motion.div>

            {/* Biological Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Biological Insights</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-3">Hormonal Changes (Week {currentWeek}):</h4>
                  <div className="space-y-2">
                    {personalizedPlan.biologicalInsights.hormonal.changes.map((change, idx) => (
                      <div key={idx} className="flex items-start text-sm text-green-700">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 mt-1.5"></div>
                        {change}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Physical Recovery:</h4>
                  <div className="space-y-2">
                    {Object.entries(personalizedPlan.biologicalInsights.physical).map(([system, description]) => (
                      <div key={system} className="text-sm">
                        <span className="font-semibold text-blue-700 capitalize">{system}:</span>
                        <span className="text-blue-600 ml-1">{description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">AI Recommendations</h3>
              </div>

              <div className="space-y-3">
                {Object.entries(personalizedPlan.aiRecommendations).map(([category, recommendation]) => (
                  <div key={category} className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 capitalize mb-2">{category}:</h4>
                    <p className="text-sm text-purple-700">{recommendation}</p>
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

export default PostpartumCare;
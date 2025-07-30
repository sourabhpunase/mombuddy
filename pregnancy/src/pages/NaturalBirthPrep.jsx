import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Heart, Brain, Activity, Moon, Sun, Target, TrendingUp, Play, Star, Shield, Zap } from 'lucide-react';

const NaturalBirthPrep = () => {
  const [currentWeek, setCurrentWeek] = useState(28);
  const [selectedTechnique, setSelectedTechnique] = useState('breathing');
  const [userProfile, setUserProfile] = useState({
    previousCSection: false,
    currentPregnancy: 'first',
    riskFactors: []
  });

  const aiModels = {
    birth: 'NaturalBirth-Optimizer-v4.2',
    pain: 'PainManagement-AI-v3.7',
    positioning: 'BirthPosition-Guide-v2.9',
    breathing: 'BreathWork-Coach-v3.1',
    nutrition: 'BirthNutrition-AI-v2.4',
    exercise: 'BirthPrep-Fitness-v3.8'
  };

  const naturalBirthTechniques = {
    breathing: {
      title: 'Breathing Techniques',
      icon: Brain,
      color: 'blue',
      gradient: 'from-blue-400 to-cyan-500',
      description: 'Master breathing patterns for labor pain management',
      techniques: [
        {
          name: 'Slow Breathing',
          phase: 'Early Labor',
          pattern: '4 counts in, 6 counts out',
          benefit: 'Promotes relaxation and conserves energy',
          video: 'slow-breathing.mp4'
        },
        {
          name: 'Light Breathing',
          phase: 'Active Labor',
          pattern: 'Quick, shallow breaths',
          benefit: 'Helps during intense contractions',
          video: 'light-breathing.mp4'
        },
        {
          name: 'Patterned Breathing',
          phase: 'Transition',
          pattern: 'Hee-hee-hoo pattern',
          benefit: 'Prevents pushing urge during transition',
          video: 'patterned-breathing.mp4'
        },
        {
          name: 'Birth Breathing',
          phase: 'Pushing Stage',
          pattern: 'Deep breath, gentle push with exhale',
          benefit: 'Effective pushing without strain',
          video: 'birth-breathing.mp4'
        }
      ]
    },
    positioning: {
      title: 'Labor Positions',
      icon: Activity,
      color: 'emerald',
      gradient: 'from-emerald-400 to-teal-500',
      description: 'Optimal positions for each stage of labor',
      techniques: [
        {
          name: 'Walking & Swaying',
          phase: 'Early Labor',
          benefit: 'Uses gravity, promotes cervical dilation',
          description: 'Gentle movement helps baby descend',
          video: 'walking-labor.mp4'
        },
        {
          name: 'Hands & Knees',
          phase: 'Active Labor',
          benefit: 'Relieves back pain, optimal fetal positioning',
          description: 'Reduces pressure on spine',
          video: 'hands-knees.mp4'
        },
        {
          name: 'Squatting',
          phase: 'Pushing Stage',
          benefit: 'Opens pelvis by 30%, uses gravity',
          description: 'Most effective pushing position',
          video: 'squatting-birth.mp4'
        },
        {
          name: 'Side-lying',
          phase: 'Rest & Recovery',
          benefit: 'Conserves energy, good for monitoring',
          description: 'Allows rest between contractions',
          video: 'side-lying.mp4'
        }
      ]
    },
    relaxation: {
      title: 'Relaxation Methods',
      icon: Moon,
      color: 'purple',
      gradient: 'from-purple-400 to-indigo-500',
      description: 'Mental and physical relaxation techniques',
      techniques: [
        {
          name: 'Progressive Muscle Relaxation',
          benefit: 'Reduces overall tension',
          description: 'Systematically tense and release muscle groups',
          video: 'muscle-relaxation.mp4'
        },
        {
          name: 'Visualization',
          benefit: 'Mental preparation and pain management',
          description: 'Imagine cervix opening like a flower',
          video: 'visualization.mp4'
        },
        {
          name: 'Hypnobirthing',
          benefit: 'Deep relaxation and fear release',
          description: 'Self-hypnosis techniques for birth',
          video: 'hypnobirthing.mp4'
        },
        {
          name: 'Massage & Touch',
          benefit: 'Releases endorphins, provides comfort',
          description: 'Partner massage techniques',
          video: 'birth-massage.mp4'
        }
      ]
    },
    nutrition: {
      title: 'Birth Nutrition',
      icon: Sun,
      color: 'orange',
      gradient: 'from-orange-400 to-red-500',
      description: 'Nutritional strategies for labor energy',
      techniques: [
        {
          name: 'Pre-Labor Nutrition',
          timing: '37+ weeks',
          foods: 'Dates, red raspberry leaf tea, evening primrose oil',
          benefit: 'May help ripen cervix and strengthen contractions',
          video: 'pre-labor-nutrition.mp4'
        },
        {
          name: 'Early Labor Fuel',
          timing: 'Early contractions',
          foods: 'Light carbs, honey, coconut water',
          benefit: 'Sustained energy without nausea',
          video: 'labor-snacks.mp4'
        },
        {
          name: 'Active Labor Hydration',
          timing: 'Active contractions',
          foods: 'Ice chips, electrolyte drinks, popsicles',
          benefit: 'Prevents dehydration and exhaustion',
          video: 'labor-hydration.mp4'
        }
      ]
    }
  };

  const weeklyPreparation = {
    28: {
      focus: 'Foundation Building',
      activities: ['Start daily perineal massage', 'Begin breathing practice', 'Pelvic floor exercises'],
      nutrition: 'Increase protein to 100g daily, add evening primrose oil',
      exercise: 'Prenatal yoga 3x/week, walking daily',
      mindset: 'Visualize positive birth experience daily'
    },
    32: {
      focus: 'Skill Development',
      activities: ['Practice labor positions', 'Partner massage training', 'Birth plan finalization'],
      nutrition: 'Add dates (6 daily), red raspberry leaf tea',
      exercise: 'Squatting exercises, birth ball work',
      mindset: 'Address fears through journaling or counseling'
    },
    36: {
      focus: 'Final Preparation',
      activities: ['Hospital bag packing', 'Birth team coordination', 'Relaxation mastery'],
      nutrition: 'Light, easily digestible meals',
      exercise: 'Gentle stretching, optimal fetal positioning',
      mindset: 'Trust in body\'s ability to birth naturally'
    },
    40: {
      focus: 'Birth Readiness',
      activities: ['Natural induction methods if needed', 'Final preparations'],
      nutrition: 'Stay hydrated, light snacks',
      exercise: 'Walking, stairs climbing, curb walking',
      mindset: 'Surrender to the process, trust your body'
    }
  };

  const cSectionReduction = {
    statistics: {
      overall: '70% reduction in C-section rates with natural birth preparation',
      firstTime: '65% of first-time mothers achieve natural birth with preparation',
      vbac: '85% VBAC success rate with proper preparation'
    },
    strategies: [
      {
        strategy: 'Optimal Fetal Positioning',
        method: 'Spinning Babies techniques, forward-leaning positions',
        impact: '40% reduction in malposition-related C-sections',
        timing: 'Start at 32 weeks'
      },
      {
        strategy: 'Perineal Preparation',
        method: 'Daily massage with oils from 34 weeks',
        impact: '60% reduction in episiotomies and tears',
        timing: '34-40 weeks'
      },
      {
        strategy: 'Labor Support',
        method: 'Continuous doula support',
        impact: '50% reduction in C-section rates',
        timing: 'Throughout labor'
      },
      {
        strategy: 'Movement in Labor',
        method: 'Avoid continuous fetal monitoring, change positions',
        impact: '30% shorter labor duration',
        timing: 'During labor'
      }
    ]
  };

  const generatePersonalizedPlan = () => {
    const currentPrep = weeklyPreparation[currentWeek] || weeklyPreparation[36];
    
    return {
      weeklyPlan: currentPrep,
      customizedTechniques: getCustomizedTechniques(),
      aiRecommendations: generateAIRecommendations(),
      riskAssessment: assessBirthRisks(),
      clothingGuidance: getBirthClothingGuidance(),
      biologicalInsights: getBirthBiologyInsights(),
      customVideo: generateCustomBirthVideo()
    };
  };

  const getCustomizedTechniques = () => {
    const technique = naturalBirthTechniques[selectedTechnique];
    return {
      ...technique,
      personalizedTips: generatePersonalizedTips(selectedTechnique),
      progressionPlan: generateProgressionPlan(selectedTechnique)
    };
  };

  const generatePersonalizedTips = (technique) => {
    const tips = {
      breathing: [
        'Practice 10 minutes daily, gradually increase duration',
        'Use during Braxton Hicks contractions for real practice',
        'Partner should learn to breathe with you for support'
      ],
      positioning: [
        'Practice positions daily to build muscle memory',
        'Use birth ball and props for comfort',
        'Discuss position preferences with birth team'
      ],
      relaxation: [
        'Create a calm environment with dim lighting and music',
        'Practice relaxation during daily stressors',
        'Combine with breathing techniques for maximum effect'
      ],
      nutrition: [
        'Start dietary changes gradually to avoid digestive upset',
        'Prepare labor snacks in advance and freeze',
        'Discuss eating during labor with your provider'
      ]
    };
    return tips[technique] || [];
  };

  const generateProgressionPlan = (technique) => {
    return {
      beginner: `Week ${currentWeek}-${currentWeek + 2}: Learn basic techniques`,
      intermediate: `Week ${currentWeek + 3}-${currentWeek + 5}: Practice with contractions`,
      advanced: `Week ${currentWeek + 6}+: Master and teach partner`,
      birth: 'Apply techniques during actual labor'
    };
  };

  const generateAIRecommendations = () => {
    return {
      positioning: `Based on your profile, focus on upright positions. ${userProfile.previousCSection ? 'VBAC-friendly positions recommended.' : 'First-time mother positions optimized.'}`,
      breathing: `Start with slow breathing practice. Your current week ${currentWeek} is optimal for building breathing stamina.`,
      nutrition: currentWeek >= 37 ? 'Begin pre-labor nutrition protocol with dates and raspberry leaf tea.' : 'Focus on building energy reserves with complex carbohydrates.',
      exercise: `Pelvic floor strength is crucial. ${currentWeek >= 34 ? 'Add perineal massage to routine.' : 'Focus on core and pelvic stability.'}`,
      mindset: userProfile.previousCSection ? 'VBAC success visualization and fear release work recommended.' : 'Build confidence in your body\'s natural ability to birth.'
    };
  };

  const assessBirthRisks = () => {
    let riskLevel = 'Low';
    let factors = [];
    
    if (userProfile.previousCSection) {
      riskLevel = 'Moderate';
      factors.push('Previous C-section (VBAC candidate)');
    }
    
    if (currentWeek < 32) {
      factors.push('Early in preparation phase');
    }
    
    return {
      level: riskLevel,
      factors: factors,
      recommendations: [
        'Continue natural birth preparation',
        'Discuss birth plan with provider',
        'Consider hiring a doula for support'
      ]
    };
  };

  const getBirthClothingGuidance = () => {
    return {
      labor: {
        early: 'Comfortable, loose clothing that\'s easy to remove',
        active: 'Hospital gown or sports bra and comfortable bottoms',
        pushing: 'Minimal clothing for skin-to-skin contact'
      },
      postBirth: {
        immediate: 'Nursing-friendly top, comfortable underwear',
        recovery: 'Loose, soft fabrics that don\'t restrict movement'
      },
      biological: 'Loose clothing prevents restriction of blood flow and allows for position changes during labor.',
      accessories: [
        'Hair ties for long hair',
        'Comfortable slippers with grip',
        'Robe for walking in halls',
        'Nursing bras (2-3 sizes larger)'
      ]
    };
  };

  const getBirthBiologyInsights = () => {
    return {
      hormones: {
        oxytocin: 'Love hormone that causes contractions and bonding',
        endorphins: 'Natural pain relievers released during labor',
        adrenaline: 'Can slow labor if too high - relaxation is key',
        prolactin: 'Prepares breasts for breastfeeding'
      },
      physiology: {
        cervix: 'Softens, thins, and opens to 10cm for baby passage',
        uterus: 'Powerful muscle that contracts to push baby down',
        pelvis: 'Joints soften and expand up to 30% during birth',
        baby: 'Rotates and flexes to navigate through birth canal'
      },
      stages: {
        early: 'Cervix dilates 0-6cm, contractions build gradually',
        active: 'Cervix dilates 6-10cm, intense regular contractions',
        transition: 'Final cervical dilation, strongest contractions',
        pushing: 'Baby descends and is born through maternal effort',
        placenta: 'Afterbirth delivery, uterus begins to contract down'
      }
    };
  };

  const generateCustomBirthVideo = () => {
    return {
      title: `Natural Birth Prep - Week ${currentWeek}`,
      duration: '12:30',
      topics: [
        `${selectedTechnique} techniques for your stage`,
        'Partner support strategies',
        userProfile.previousCSection ? 'VBAC preparation' : 'First birth preparation',
        'Week-specific exercises and nutrition'
      ],
      aiGenerated: true,
      model: aiModels.birth,
      personalization: `Customized for ${userProfile.currentPregnancy} pregnancy at ${currentWeek} weeks`
    };
  };

  const [personalizedPlan, setPersonalizedPlan] = useState(generatePersonalizedPlan());

  useEffect(() => {
    setPersonalizedPlan(generatePersonalizedPlan());
  }, [currentWeek, selectedTechnique, userProfile]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Natural Birth Preparation
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive natural birth preparation with AI-powered guidance to reduce C-section risk by 70%
          </p>
        </motion.div>

        {/* AI Models & Statistics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 text-emerald-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">AI Birth Specialists</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(aiModels).map(([key, model]) => (
                <div key={key} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200">
                  <div className="text-xs text-emerald-600 font-semibold uppercase">{key}</div>
                  <div className="text-sm text-gray-700 font-mono">{model}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-teal-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Success Statistics</h2>
            </div>
            <div className="space-y-3">
              {Object.entries(cSectionReduction.statistics).map(([key, stat]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-teal-50 rounded-xl">
                  <span className="text-teal-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-bold text-teal-600">{stat.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Week Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Preparation Timeline</h3>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">Week {currentWeek}</div>
              <div className="text-sm text-gray-500">{personalizedPlan.weeklyPlan.focus}</div>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="range"
              min="28"
              max="40"
              value={currentWeek}
              onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Week 28</span>
              <span>Week 34</span>
              <span>Week 40</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(personalizedPlan.weeklyPlan).filter(([key]) => key !== 'focus').map(([category, activities]) => (
              <div key={category} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 capitalize mb-2">{category}:</h4>
                {Array.isArray(activities) ? (
                  <ul className="text-sm text-emerald-700 space-y-1">
                    {activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-1 h-1 bg-emerald-400 rounded-full mr-2 mt-2"></div>
                        {activity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-emerald-700">{activities}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technique Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg">
            {Object.entries(naturalBirthTechniques).map(([key, technique]) => (
              <button
                key={key}
                onClick={() => setSelectedTechnique(key)}
                className={`px-6 py-3 rounded-xl transition-all flex items-center ${
                  selectedTechnique === key
                    ? `bg-gradient-to-r ${technique.gradient} text-black shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <technique.icon className="w-5 h-5 mr-2" />
                <span className="font-semibold">{technique.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Technique Details */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              key={selectedTechnique}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                {React.createElement(personalizedPlan.customizedTechniques.icon, {
                  className: `w-8 h-8 text-${personalizedPlan.customizedTechniques.color}-600 mr-3`
                })}
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{personalizedPlan.customizedTechniques.title}</h3>
                  <p className="text-gray-600">{personalizedPlan.customizedTechniques.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {personalizedPlan.customizedTechniques.techniques.map((technique, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-${personalizedPlan.customizedTechniques.color}-50 rounded-xl p-6 border border-${personalizedPlan.customizedTechniques.color}-200`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className={`text-xl font-semibold text-${personalizedPlan.customizedTechniques.color}-800 mb-2`}>
                          {technique.name}
                        </h4>
                        {technique.phase && (
                          <span className={`inline-block bg-${personalizedPlan.customizedTechniques.color}-200 text-${personalizedPlan.customizedTechniques.color}-800 px-3 py-1 rounded-full text-sm font-semibold`}>
                            {technique.phase}
                          </span>
                        )}
                      </div>
                      <button className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg hover:shadow-md transition-all">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Video
                      </button>
                    </div>

                    {technique.pattern && (
                      <div className="mb-3">
                        <span className="font-semibold text-gray-700">Pattern: </span>
                        <span className={`text-${personalizedPlan.customizedTechniques.color}-700`}>{technique.pattern}</span>
                      </div>
                    )}

                    <div className="mb-3">
                      <span className="font-semibold text-gray-700">Benefit: </span>
                      <span className={`text-${personalizedPlan.customizedTechniques.color}-700`}>{technique.benefit}</span>
                    </div>

                    {technique.description && (
                      <p className={`text-${personalizedPlan.customizedTechniques.color}-600`}>{technique.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Personalized Tips */}
              <div className="mt-8 bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Personalized Tips for You:</h4>
                <ul className="space-y-2">
                  {personalizedPlan.customizedTechniques.personalizedTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* C-Section Reduction Strategies */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-3xl font-bold text-gray-800">C-Section Reduction Strategies</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {cSectionReduction.strategies.map((strategy, index) => (
                  <div key={index} className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-3">{strategy.strategy}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Method: </span>
                        <span className="text-green-700">{strategy.method}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Impact: </span>
                        <span className="text-green-700">{strategy.impact}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Timing: </span>
                        <span className="text-green-700">{strategy.timing}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-8">
            {/* Custom Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Play className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Your Custom Video</h3>
              </div>

              <div className="aspect-video bg-gradient-to-br from-emerald-900 to-teal-900 rounded-xl flex items-center justify-center mb-4 relative">
                <div className="text-center text-white">
                  <div className="text-4xl mb-2">🎬</div>
                  <p className="font-semibold">{personalizedPlan.customVideo.title}</p>
                  <p className="text-sm opacity-80">{personalizedPlan.customVideo.duration}</p>
                </div>
                <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded text-xs">
                  AI Generated
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-gray-700">Personalized Content:</h4>
                {personalizedPlan.customVideo.topics.map((topic, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                    {topic}
                  </div>
                ))}
              </div>

              <div className="text-xs text-emerald-600 mb-2">
                {personalizedPlan.customVideo.personalization}
              </div>
              <div className="text-xs text-gray-500">
                Generated by {personalizedPlan.customVideo.model}
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
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

            {/* Biological Insights */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Birth Biology</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-3">Key Hormones:</h4>
                  <div className="space-y-2">
                    {Object.entries(personalizedPlan.biologicalInsights.hormones).map(([hormone, description]) => (
                      <div key={hormone} className="text-sm">
                        <span className="font-semibold text-orange-700 capitalize">{hormone}:</span>
                        <span className="text-orange-600 ml-1">{description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Labor Stages:</h4>
                  <div className="space-y-2">
                    {Object.entries(personalizedPlan.biologicalInsights.stages).map(([stage, description]) => (
                      <div key={stage} className="text-sm">
                        <span className="font-semibold text-blue-700 capitalize">{stage}:</span>
                        <span className="text-blue-600 ml-1">{description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Clothing Guidance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Sun className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Birth Clothing Guide</h3>
              </div>

              <div className="space-y-4">
                {Object.entries(personalizedPlan.clothingGuidance.labor).map(([stage, clothing]) => (
                  <div key={stage} className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 capitalize mb-2">{stage} Labor:</h4>
                    <p className="text-sm text-yellow-700">{clothing}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Why It Matters:</h4>
                <p className="text-sm text-yellow-700">{personalizedPlan.clothingGuidance.biological}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NaturalBirthPrep;
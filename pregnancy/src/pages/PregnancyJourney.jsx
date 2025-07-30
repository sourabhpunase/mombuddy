import React, { useState } from 'react';
import { Calendar, Baby, Heart, Brain, Pill, Activity, AlertCircle, Sparkles } from 'lucide-react';

// Mock AI Activity Tracker Component
const AIActivityTracker = ({ userStage, currentWeek }) => {
  const [activities] = useState([
    { id: 1, type: 'nutrition', title: 'AI Nutrition Plan', status: 'active', progress: 85 },
    { id: 2, type: 'exercise', title: 'Prenatal Yoga', status: 'completed', progress: 100 },
    { id: 3, type: 'checkup', title: 'Weekly Check-in', status: 'pending', progress: 30 }
  ]);

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
      <div className="flex items-center mb-6">
        <div className="relative">
          <Activity className="w-8 h-8 text-indigo-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 ml-3">AI Activity Tracker</h3>
        <div className="ml-auto px-4 py-2 bg-indigo-50 rounded-full">
          <span className="text-indigo-700 text-sm font-medium">Week {currentWeek}</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-800 font-medium">{activity.title}</span>
              <div className={`w-3 h-3 rounded-full ${
                activity.status === 'completed' ? 'bg-emerald-500' : 
                activity.status === 'active' ? 'bg-amber-500 animate-pulse' : 'bg-gray-300'
              }`}></div>
            </div>
            <div className="bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${activity.progress}%` }}
              ></div>
            </div>
            <span className="text-gray-600 text-sm">{activity.progress}% Complete</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const PregnancyJourney = () => {
  const [currentWeek, setCurrentWeek] = useState(12);
  const [selectedTrimester, setSelectedTrimester] = useState(1);

  const trimesters = [
    {
      id: 1,
      name: 'First Trimester',
      weeks: '1-12',
      color: 'rose',
      focus: 'Foundation & Development',
      keySupplements: ['Folic Acid 800mcg', 'Prenatal Vitamins', 'Vitamin D'],
      criticalNutrients: ['Folate', 'Iron', 'Calcium', 'Protein'],
      aiModel: 'Neural Genesis AI',
      description: 'Critical organ development phase with AI-guided nutrition'
    },
    {
      id: 2,
      name: 'Second Trimester',
      weeks: '13-27',
      color: 'indigo',
      focus: 'Growth & Energy',
      keySupplements: ['Iron 27mg', 'Calcium 1000mg', 'DHA 200mg'],
      criticalNutrients: ['Iron', 'Calcium', 'DHA', 'Protein'],
      aiModel: 'Growth Optimizer AI',
      description: 'Golden period with AI-enhanced wellness tracking'
    },
    {
      id: 3,
      name: 'Third Trimester',
      weeks: '28-40',
      color: 'emerald',
      focus: 'Preparation & Birth',
      keySupplements: ['Vitamin K', 'Omega-3', 'Probiotics'],
      criticalNutrients: ['Protein', 'Healthy Fats', 'Fiber', 'Vitamin K'],
      aiModel: 'Birth Readiness AI',
      description: 'AI-powered birth preparation and monitoring'
    }
  ];

  const weeklyMilestones = {
    4: { baby: 'Heart begins beating', mom: 'Missed period, implantation', size: 'Poppy seed' },
    8: { baby: 'All major organs forming', mom: 'Morning sickness peaks', size: 'Raspberry' },
    12: { baby: 'Reflexes developing', mom: 'End of first trimester', size: 'Lime' },
    16: { baby: 'Can hear sounds', mom: 'Energy returns', size: 'Avocado' },
    20: { baby: 'Halfway point!', mom: 'Anatomy scan', size: 'Banana' },
    24: { baby: 'Viability milestone', mom: 'Glucose screening', size: 'Corn' },
    28: { baby: 'Eyes open', mom: 'Third trimester begins', size: 'Eggplant' },
    32: { baby: 'Rapid brain development', mom: 'Frequent checkups', size: 'Squash' },
    36: { baby: 'Lungs maturing', mom: 'Full-term approaching', size: 'Papaya' },
    40: { baby: 'Ready for birth!', mom: 'Due date', size: 'Watermelon' }
  };

  const getCurrentTrimester = (week) => {
    if (week <= 12) return 1;
    if (week <= 27) return 2;
    return 3;
  };

  const getAIGuidance = (trimester, week) => {
    const trimesterData = trimesters[trimester - 1];
    const milestone = weeklyMilestones[week] || weeklyMilestones[Math.floor(week/4)*4] || weeklyMilestones[12];
    
    return `**${trimesterData.aiModel} - Week ${week} Guidance:**

**Baby Development:**
${milestone.baby} - Your baby is now the size of a ${milestone.size}.

**Your Body:**
${milestone.mom}

**Critical Supplements for ${trimesterData.name}:**
${trimesterData.keySupplements.map(supp => `• ${supp}`).join('\n')}

**Essential Nutrients:**
${trimesterData.criticalNutrients.map(nutrient => `• ${nutrient}`).join('\n')}

**AI Recommendations:**
${trimester === 1 ? `
• Take folic acid religiously - prevents 70% of neural tube defects
• Eat small, frequent meals to combat nausea
• Stay hydrated - aim for 8-10 glasses daily
• Avoid raw foods, alcohol, and high-mercury fish
• Get adequate sleep (8-9 hours)
• Start gentle exercise if not already active` : ''}
${trimester === 2 ? `
• Increase iron intake - baby's blood volume expanding
• Add DHA for brain development
• Continue moderate exercise - walking, swimming, yoga
• Monitor weight gain (1-2 lbs per week)
• Start thinking about birth plan
• Consider prenatal classes` : ''}
${trimester === 3 ? `
• Focus on protein for rapid growth
• Practice breathing exercises for labor
• Prepare hospital bag by week 36
• Monitor baby movements daily
• Get adequate rest - sleep on your side
• Finalize birth plan and pediatrician choice` : ''}

**Warning Signs - Contact Doctor:**
• Severe abdominal pain
• Heavy bleeding
• Severe headaches
• Vision changes
• Decreased fetal movement (after 28 weeks)`;
  };

  const getColorClasses = (color, selected) => {
    const colorMap = {
      rose: {
        bg: selected ? 'bg-rose-50' : 'bg-gray-50',
        border: selected ? 'border-rose-300' : 'border-gray-200',
        badge: 'bg-rose-100 text-rose-800',
        hover: 'hover:border-rose-200'
      },
      indigo: {
        bg: selected ? 'bg-indigo-50' : 'bg-gray-50',
        border: selected ? 'border-indigo-300' : 'border-gray-200',
        badge: 'bg-indigo-100 text-indigo-800',
        hover: 'hover:border-indigo-200'
      },
      emerald: {
        bg: selected ? 'bg-emerald-50' : 'bg-gray-50',
        border: selected ? 'border-emerald-300' : 'border-gray-200',
        badge: 'bg-emerald-100 text-emerald-800',
        hover: 'hover:border-emerald-200'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-100">
            <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-indigo-700 font-medium text-sm">AI-Powered Pregnancy Journey</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            MomAI Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your complete 40-week pregnancy guide with AI-powered insights for each stage.
          </p>
        </div>

        {/* Week Selector */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Current Week</h2>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Week {currentWeek}
              </div>
              <div className="text-gray-600 font-medium">Trimester {getCurrentTrimester(currentWeek)}</div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Select Your Current Week</label>
            <input
              type="range"
              min="1"
              max="40"
              value={currentWeek}
              onChange={(e) => {
                const week = parseInt(e.target.value);
                setCurrentWeek(week);
                setSelectedTrimester(getCurrentTrimester(week));
              }}
              className="w-full h-3 bg-gradient-to-r from-rose-200 via-indigo-200 to-emerald-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Week 1</span>
              <span>Week 20</span>
              <span>Week 40</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-200 rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentWeek / 40) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-gray-600">
            {40 - currentWeek} weeks remaining • {Math.round((currentWeek / 40) * 100)}% complete
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trimester Overview */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <Baby className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Trimester Focus</h2>
            </div>

            <div className="space-y-4">
              {trimesters.map((trimester) => {
                const selected = selectedTrimester === trimester.id;
                const colors = getColorClasses(trimester.color, selected);
                
                return (
                  <div
                    key={trimester.id}
                    className={`p-6 rounded-2xl border-2 transition-all cursor-pointer hover:shadow-lg ${
                      colors.bg
                    } ${colors.border} ${colors.hover} ${selected ? 'shadow-lg transform scale-[1.02]' : ''}`}
                    onClick={() => setSelectedTrimester(trimester.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{trimester.name}</h3>
                        <p className="text-gray-600">Weeks {trimester.weeks}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                        {trimester.focus}
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{trimester.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-gray-800">Key Supplements:</h4>
                        <ul className="text-xs space-y-1">
                          {trimester.keySupplements.map((supp, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <Pill className="w-3 h-3 mr-2 text-indigo-500" />
                              {supp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-gray-800">Critical Nutrients:</h4>
                        <ul className="text-xs space-y-1">
                          {trimester.criticalNutrients.map((nutrient, idx) => (
                            <li key={idx} className="flex items-center text-gray-600">
                              <Heart className="w-3 h-3 mr-2 text-pink-500" />
                              {nutrient}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Guidance */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">AI Specialist Guidance</h2>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6 border border-indigo-100">
              <pre className="whitespace-pre-wrap text-gray-700 font-medium leading-relaxed text-sm">
                {getAIGuidance(selectedTrimester, currentWeek)}
              </pre>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-2xl p-4 text-center border border-indigo-100">
                <Baby className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-indigo-600">
                  {weeklyMilestones[currentWeek]?.size || 'Growing'}
                </div>
                <div className="text-xs text-indigo-700">Baby Size</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-100">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-600">
                  {selectedTrimester === 1 ? 'Foundation' : selectedTrimester === 2 ? 'Growth' : 'Preparation'}
                </div>
                <div className="text-xs text-purple-700">Phase Focus</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Activity Tracker */}
        <div className="mt-8">
          <AIActivityTracker 
            userStage={selectedTrimester === 1 ? 'first-trimester' : selectedTrimester === 2 ? 'second-trimester' : 'third-trimester'}
            currentWeek={currentWeek}
          />
        </div>

        {/* Emergency Warning */}
        <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
            <h3 className="text-xl font-bold text-red-800">Emergency Warning Signs</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/50 rounded-xl p-4">
              <h4 className="font-semibold text-red-700 mb-2">Call Doctor Immediately:</h4>
              <ul className="space-y-1 text-red-600">
                <li>• Severe abdominal pain</li>
                <li>• Heavy bleeding</li>
                <li>• Severe headaches</li>
              </ul>
            </div>
            <div className="bg-white/50 rounded-xl p-4">
              <h4 className="font-semibold text-red-700 mb-2">Vision/Neurological:</h4>
              <ul className="space-y-1 text-red-600">
                <li>• Blurred vision</li>
                <li>• Dizziness/fainting</li>
                <li>• Severe swelling</li>
              </ul>
            </div>
            <div className="bg-white/50 rounded-xl p-4">
              <h4 className="font-semibold text-red-700 mb-2">Baby-Related:</h4>
              <ul className="space-y-1 text-red-600">
                <li>• No fetal movement (after 28 weeks)</li>
                <li>• Fluid leakage</li>
                <li>• Regular contractions before 37 weeks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default PregnancyJourney;
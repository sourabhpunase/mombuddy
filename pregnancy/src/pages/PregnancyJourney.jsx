import React, { useState } from 'react';
import { Calendar, Baby, Heart, Brain, Pill, Activity, AlertCircle, Sparkles } from 'lucide-react';
import CareOverviewPanel from '../components/CareOverviewPanel.jsx';

// Mock AI Activity Tracker Component
const AIActivityTracker = ({ userStage, currentWeek }) => {
  const [activities] = useState([
    { id: 1, type: 'nutrition', title: 'AI Nutrition Plan', status: 'active', progress: 85 },
    { id: 2, type: 'exercise', title: 'Prenatal Yoga', status: 'completed', progress: 100 },
    { id: 3, type: 'checkup', title: 'Weekly Check-in', status: 'pending', progress: 30 }
  ]);

  return (
    <div className="surface-glass p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative">
          <Activity className="w-8 h-8 text-[#a96f86] dark:text-[#dfc4cf]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#b7cdbf] rounded-full animate-pulse" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--care-text)] dark:text-white">AI Activity Tracker</h3>
        <div className="ml-auto px-4 py-2 bg-[var(--care-surface-muted)] rounded-full border border-[var(--care-border)]">
          <span className="text-[#8e6074] dark:text-[#dfc4cf] text-sm font-medium">Week {currentWeek}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="surface-muted rounded-2xl p-4 hover:shadow-md dark:hover:shadow-black/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3 gap-2">
              <span className="text-gray-900 dark:text-slate-100 font-medium text-sm sm:text-base">{activity.title}</span>
              <div
                className={`w-3 h-3 rounded-full shrink-0 ${
                  activity.status === 'completed'
                    ? 'bg-emerald-500'
                    : activity.status === 'active'
                      ? 'bg-amber-500 animate-pulse'
                      : 'bg-gray-300 dark:bg-slate-600'
                }`}
              />
            </div>
            <div className="bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-[#d39ab0] to-[#8f7287] h-2 rounded-full transition-all duration-500"
                style={{ width: `${activity.progress}%` }}
              />
            </div>
            <span className="text-muted text-sm">{activity.progress}% Complete</span>
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
        bg: selected ? 'bg-[#fff7fa] dark:bg-[#26141c]' : 'bg-[var(--care-surface-muted)] dark:bg-white/5',
        border: selected ? 'border-[#d7a8bc] dark:border-[#9f5874]' : 'border-[var(--care-border)] dark:border-white/10',
        badge: 'bg-[#f7e7ee] text-[#9f5874] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]',
        hover: 'hover:border-[#cf97ad] dark:hover:border-[#b27d93]'
      },
      indigo: {
        bg: selected ? 'bg-[#fbf6fb] dark:bg-[#241824]' : 'bg-[var(--care-surface-muted)] dark:bg-white/5',
        border: selected ? 'border-[#ceb5d7] dark:border-[#8f7287]' : 'border-[var(--care-border)] dark:border-white/10',
        badge: 'bg-[#f4edf9] text-[#7d5e8c] dark:bg-[#2d2037] dark:text-[#d8c5e6]',
        hover: 'hover:border-[#bea0c9] dark:hover:border-[#a88fb0]'
      },
      emerald: {
        bg: selected ? 'bg-[#f5faf6] dark:bg-[#16241b]' : 'bg-[var(--care-surface-muted)] dark:bg-white/5',
        border: selected ? 'border-[#bad1c2] dark:border-[#4b7561]' : 'border-[var(--care-border)] dark:border-white/10',
        badge: 'bg-[#edf5ef] text-[#365a49] dark:bg-[#163226] dark:text-[#b8d8c8]',
        hover: 'hover:border-[#a8c4b2] dark:hover:border-[#60876f]'
      }
    };
    return colorMap[color];
  };

  return (
    <div className="page-shell max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4 px-4 py-2 surface-glass rounded-full shadow-lg">
            <Sparkles className="w-5 h-5 text-[#a96f86] dark:text-[#dfc4cf] mr-2 shrink-0" />
            <span className="text-[#8e6074] dark:text-[#dfc4cf] font-medium text-xs sm:text-sm">AI-Powered Pregnancy Journey</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#a96f86] via-[#8f7287] to-[#d39ab0] bg-clip-text text-transparent px-2">
            MomAI Journey
          </h1>
          <p className="text-base sm:text-xl text-body max-w-3xl mx-auto px-2">
            Your complete 40-week pregnancy guide with AI-powered insights for each stage.
          </p>
        </div>

        <CareOverviewPanel
          className="mb-8"
          title="Journey overview"
          week={`Week ${currentWeek}`}
          trimester={`Trimester ${getCurrentTrimester(currentWeek)}`}
          summary="The same weekly summary stays at the top of your journey view, so planning, symptoms, and guidance all read from one system."
        />

        {/* Week Selector */}
        <div className="surface-glass p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-[#a96f86] dark:text-[#dfc4cf] mr-3 shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--care-text)] dark:text-white">Current Week</h2>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#a96f86] to-[#8f7287] bg-clip-text text-transparent">
                Week {currentWeek}
              </div>
              <div className="text-muted font-medium">Trimester {getCurrentTrimester(currentWeek)}</div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-[var(--care-text)] dark:text-slate-200">Select Your Current Week</label>
            <input
              type="range"
              min="1"
              max="40"
              value={currentWeek}
              onChange={(e) => {
                const week = parseInt(e.target.value, 10);
                setCurrentWeek(week);
                setSelectedTrimester(getCurrentTrimester(week));
              }}
              className="w-full h-3 bg-gradient-to-r from-[#ead7df] via-[#d9cad5] to-[#d8e1db] dark:from-white/10 dark:via-white/5 dark:to-white/10 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>Week 1</span>
              <span>Week 20</span>
              <span>Week 40</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-gray-200 dark:bg-slate-700 rounded-full h-4 mb-4">
            <div
            className="bg-gradient-to-r from-[#d39ab0] to-[#8f7287] h-4 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentWeek / 40) * 100}%` }}
            />
          </div>
          <div className="text-center text-muted">
            {40 - currentWeek} weeks remaining • {Math.round((currentWeek / 40) * 100)}% complete
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Trimester Overview */}
          <div className="surface-glass p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Baby className="w-8 h-8 text-[#a96f86] dark:text-[#dfc4cf] mr-3 shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--care-text)] dark:text-white">Trimester Focus</h2>
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
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{trimester.name}</h3>
                        <p className="text-muted">Weeks {trimester.weeks}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                        {trimester.focus}
                      </div>
                    </div>
                    
                    <p className="text-body mb-4">{trimester.description}</p>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Key Supplements:</h4>
                        <ul className="text-xs space-y-1">
                          {trimester.keySupplements.map((supp, idx) => (
                            <li key={idx} className="flex items-center text-muted">
                              <Pill className="w-3 h-3 mr-2 text-[#9f5874] dark:text-[#dfc4cf]" />
                              {supp}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">Critical Nutrients:</h4>
                        <ul className="text-xs space-y-1">
                          {trimester.criticalNutrients.map((nutrient, idx) => (
                            <li key={idx} className="flex items-center text-muted">
                              <Heart className="w-3 h-3 mr-2 text-[#b27d93] dark:text-[#dfc4cf]" />
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
          <div className="surface-glass p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-[#a96f86] dark:text-[#dfc4cf] mr-3 shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--care-text)] dark:text-white">AI Specialist Guidance</h2>
            </div>

            <div className="rounded-2xl border border-[var(--care-border)] bg-[linear-gradient(135deg,#fff9fc,#f6eef8)] p-4 sm:p-6 mb-6 dark:border-white/10 dark:bg-[linear-gradient(135deg,#24141d,#1e1320)]">
              <pre className="whitespace-pre-wrap text-body font-medium leading-relaxed text-xs sm:text-sm font-sans">
                {getAIGuidance(selectedTrimester, currentWeek)}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl border border-[var(--care-border)] bg-[linear-gradient(135deg,#fff8fb,#f7e7ee)] p-4 text-center dark:border-white/10 dark:bg-[#24131b]">
                <Baby className="w-8 h-8 text-[#9f5874] dark:text-[#dfc4cf] mx-auto mb-2" />
                <div className="text-base sm:text-lg font-bold text-[#9f5874] dark:text-[#dfc4cf]">
                  {weeklyMilestones[currentWeek]?.size || 'Growing'}
                </div>
                <div className="text-xs text-[#8e6074] dark:text-[#dfc4cf]">Baby Size</div>
              </div>
              <div className="rounded-2xl border border-[var(--care-border)] bg-[linear-gradient(135deg,#f5faf6,#edf5ef)] p-4 text-center dark:border-white/10 dark:bg-[#16241b]">
                <Heart className="w-8 h-8 text-[#4b7561] dark:text-[#b8d8c8] mx-auto mb-2" />
                <div className="text-base sm:text-lg font-bold text-[#4b7561] dark:text-[#b8d8c8]">
                  {selectedTrimester === 1 ? 'Foundation' : selectedTrimester === 2 ? 'Growth' : 'Preparation'}
                </div>
                <div className="text-xs text-[#4b7561] dark:text-[#b8d8c8]">Phase Focus</div>
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
        <div className="mt-8 rounded-3xl border border-[#edc8ce] bg-[linear-gradient(180deg,#fff8f8,#fbeaed)] p-6 shadow-lg dark:border-[#4a242a] dark:bg-[linear-gradient(180deg,#2b1418,#221014)]">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-[#a45b64] dark:text-[#f0bcc4] mr-2 shrink-0" />
            <h3 className="text-lg sm:text-xl font-bold text-[#7b2f3a] dark:text-[#f0bcc4]">Emergency Warning Signs</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/70 dark:bg-white/5 rounded-xl p-4 border border-[#f0d7db] dark:border-white/10">
              <h4 className="font-semibold text-[#7b2f3a] dark:text-[#f0bcc4] mb-2">Call Doctor Immediately:</h4>
              <ul className="space-y-1 text-[#8c4750] dark:text-[#f0bcc4]">
                <li>• Severe abdominal pain</li>
                <li>• Heavy bleeding</li>
                <li>• Severe headaches</li>
              </ul>
            </div>
            <div className="bg-white/70 dark:bg-white/5 rounded-xl p-4 border border-[#f0d7db] dark:border-white/10">
              <h4 className="font-semibold text-[#7b2f3a] dark:text-[#f0bcc4] mb-2">Vision/Neurological:</h4>
              <ul className="space-y-1 text-[#8c4750] dark:text-[#f0bcc4]">
                <li>• Blurred vision</li>
                <li>• Dizziness/fainting</li>
                <li>• Severe swelling</li>
              </ul>
            </div>
            <div className="bg-white/70 dark:bg-white/5 rounded-xl p-4 border border-[#f0d7db] dark:border-white/10">
              <h4 className="font-semibold text-[#7b2f3a] dark:text-[#f0bcc4] mb-2">Baby-Related:</h4>
              <ul className="space-y-1 text-[#8c4750] dark:text-[#f0bcc4]">
                <li>• No fetal movement (after 28 weeks)</li>
                <li>• Fluid leakage</li>
                <li>• Regular contractions before 37 weeks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyJourney;

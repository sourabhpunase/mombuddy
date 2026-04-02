import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Baby, Heart } from 'lucide-react';
import CareOverviewPanel from '../components/CareOverviewPanel.jsx';

const colorStyles = {
  pink: {
    active: 'bg-[linear-gradient(135deg,#ff8d8f,#d85e7a_52%,#bb8add)] text-white',
    inactive: 'text-[var(--care-text)] dark:text-slate-300 hover:bg-[var(--care-surface-muted)] dark:hover:bg-white/5',
    icon: 'text-[#d85e7a] dark:text-[#ffd1d0]',
    dot: 'bg-[#d85e7a]',
    panel: 'bg-[var(--care-surface-muted)] border border-[var(--care-border)]'
  },
  purple: {
    active: 'bg-[linear-gradient(135deg,#ff8d8f,#d85e7a_52%,#bb8add)] text-white',
    inactive: 'text-[var(--care-text)] dark:text-slate-300 hover:bg-[var(--care-surface-muted)] dark:hover:bg-white/5',
    icon: 'text-[#bb8add] dark:text-[#e3cbf6]',
    dot: 'bg-[#bb8add]',
    panel: 'bg-[var(--care-surface-muted)] border border-[var(--care-border)]'
  },
  blue: {
    active: 'bg-[linear-gradient(135deg,#ff8d8f,#d85e7a_52%,#bb8add)] text-white',
    inactive: 'text-[var(--care-text)] dark:text-slate-300 hover:bg-[var(--care-surface-muted)] dark:hover:bg-white/5',
    icon: 'text-[#99c4e7] dark:text-[#cce4f8]',
    dot: 'bg-[#99c4e7]',
    panel: 'bg-[var(--care-surface-muted)] border border-[var(--care-border)]'
  }
};

const Trimesters = () => {
  const [selectedTrimester, setSelectedTrimester] = useState(1);

  const trimesters = [
    {
      id: 1,
      title: 'First Trimester',
      weeks: 'Weeks 1-12',
      icon: Calendar,
      color: 'pink',
      description: 'Foundation stage with rapid development',
      details: 'Major organs form, morning sickness common, frequent urination, fatigue.',
      tips: ['Take prenatal vitamins', 'Avoid alcohol and smoking', 'Get plenty of rest']
    },
    {
      id: 2,
      title: 'Second Trimester',
      weeks: 'Weeks 13-27',
      icon: Heart,
      color: 'purple',
      description: 'The golden period of pregnancy',
      details: 'Energy returns, baby movements felt, anatomy scan performed.',
      tips: ['Start prenatal classes', 'Plan nursery', 'Continue healthy diet']
    },
    {
      id: 3,
      title: 'Third Trimester',
      weeks: 'Weeks 28-40',
      icon: Baby,
      color: 'blue',
      description: 'Final preparation for birth',
      details: 'Rapid weight gain, frequent checkups, prepare for delivery.',
      tips: ['Pack hospital bag', 'Finalize birth plan', 'Practice breathing exercises']
    }
  ];

  return (
    <div className="page-shell max-w-6xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[var(--care-text)] dark:text-white"
      >
        Pregnancy Trimesters
      </motion.h1>

      <CareOverviewPanel
        className="mb-8 sm:mb-12"
        title="Trimester view"
        summary="A consistent weekly summary stays visible while you move between trimester education and planning."
      />

      <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-2">
        <div className="inline-flex flex-wrap justify-center gap-1 sm:gap-2 card-surface p-2 rounded-full">
          {trimesters.map((trimester) => {
            const cs = colorStyles[trimester.color];
            return (
              <button
                key={trimester.id}
                type="button"
                onClick={() => setSelectedTrimester(trimester.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-sm sm:text-base whitespace-nowrap ${
                  selectedTrimester === trimester.id ? cs.active : cs.inactive
                }`}
              >
                {trimester.title}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        key={selectedTrimester}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card-surface p-6 sm:p-8"
      >
        {trimesters.map((trimester) => {
          if (trimester.id !== selectedTrimester) return null;
          const cs = colorStyles[trimester.color];
          return (
            <div key={trimester.id} className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <trimester.icon className={`h-10 w-10 sm:h-12 sm:w-12 mr-4 shrink-0 ${cs.icon}`} />
                  <div className="min-w-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[var(--care-text)] dark:text-white">{trimester.title}</h2>
                    <p className="text-body">{trimester.weeks}</p>
                  </div>
                </div>
                <p className="text-base sm:text-lg mb-4 text-[var(--care-text)] dark:text-slate-200">{trimester.description}</p>
                <p className="text-body mb-6 text-sm sm:text-base">{trimester.details}</p>

                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-[var(--care-text)] dark:text-white">Key Tips:</h3>
                <ul className="space-y-2 text-[var(--care-text)] dark:text-slate-200">
                  {trimester.tips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${cs.dot}`} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-xl p-5 sm:p-6 ${cs.panel}`}>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[var(--care-text)] dark:text-white">Week by Week</h3>
                <div className="space-y-4">
                  {[
                    ['Baby Development', "Track your baby's growth milestones"],
                    ['Your Body Changes', "Understand what's happening to you"],
                    ['Appointments', 'Important checkups and tests']
                  ].map(([title, desc]) => (
                    <div key={title} className="bg-white dark:bg-white/5 p-4 rounded-lg border border-[var(--care-border)] dark:border-white/10">
                      <h4 className="font-semibold text-[var(--care-text)] dark:text-white">{title}</h4>
                      <p className="text-sm text-body">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Trimesters;

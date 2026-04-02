import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, User, Activity, Heart, Target, Calendar, ChevronRight, CheckCircle2
} from 'lucide-react';
import ProgressTracker from '../components/ProgressTracker';

const steps = [
  { id: 0, title: 'Personal', icon: User },
  { id: 1, title: 'Lifestyle', icon: Activity },
  { id: 2, title: 'Reproductive', icon: Heart },
  { id: 3, title: 'Partner', icon: Target },
  { id: 4, title: 'Goals', icon: Calendar },
];

const medicalConditions = ['Diabetes', 'Hypertension', 'Thyroid', 'PCOS', 'Endometriosis', 'Heart', 'Autoimmune', 'Mental health', 'None'];
const concerns = ['Age fertility', 'Pregnancy loss', 'Irregular cycles', 'Weight', 'Genetics', 'Lifestyle', 'Partner fertility'];
const priorities = ['Natural conception', 'Healthy pregnancy', 'Genetic screening', 'Lifestyle opt.', 'Quick conception', 'Risk minimization'];

const PreConception = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState({
    personalInfo: { age: '', height: '', weight: '', ethnicity: '', medicalHistory: [] },
    lifestyle: { exercise: '', diet: '', sleep: '', stress: '', smoking: false, alcohol: false },
    reproductive: { cycleLength: '', lastPeriod: '', previousPregnancies: '', contraception: '' },
    partner: { age: '', health: '', lifestyle: '' },
    goals: { timeline: '', concerns: [], priorities: [] },
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalizedPlan, setPersonalizedPlan] = useState(null);

  const handle = (cat, field, val) => {
    setUserInputs((prev) => ({ ...prev, [cat]: { ...prev[cat], [field]: val } }));
  };

  const handleArr = (cat, field, val, checked) => {
    setUserInputs((prev) => ({
      ...prev,
      [cat]: {
        ...prev[cat],
        [field]: checked ? [...prev[cat][field], val] : prev[cat][field].filter((item) => item !== val),
      },
    }));
  };

  const generatePlan = () => {
    setIsAnalyzing(true);
    window.setTimeout(() => {
      setPersonalizedPlan({ risk: { level: 'Low', bmi: 22.1 } });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="page-shell flex items-center justify-center px-4 py-10">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="theme-badge mx-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
            <Brain className="h-4 w-4" />
            Pre-conception
          </div>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-[var(--care-text)] dark:text-white md:text-7xl">
            Pre-Conception Plan
          </h1>
          <p className="mt-2 text-lg text-body">A gentle, AI-crafted roadmap with the same shared MomBuddy theme.</p>
        </motion.div>

        <div className="mb-6">
          <div className="mb-1 flex justify-between text-sm text-body">
            <span>Step {currentStep + 1} / {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--care-surface-muted)]">
            <motion.div
              className="theme-accent-gradient h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="nav-scrollbar mb-8 flex overflow-x-auto">
          {steps.map((step, index) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStep(index)}
              className={`mx-2 flex shrink-0 items-center rounded-xl px-4 py-2 transition-all ${
                currentStep === index ? 'theme-button-primary scale-105' : 'surface-glass text-body hover:bg-white/40 dark:hover:bg-white/10'
              }`}
            >
              <step.icon className={`mr-2 h-5 w-5 ${currentStep === index ? 'text-white' : 'theme-accent-text'}`} />
              {step.title}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="surface-glass rounded-3xl p-6 md:p-8 lg:col-span-2"
          >
            <div className="mb-6 flex items-center">
              {React.createElement(steps[currentStep].icon, { className: 'theme-accent-text mr-3 h-10 w-10' })}
              <div>
                <h2 className="text-3xl font-bold text-[var(--care-text)] dark:text-white">{steps[currentStep].title}</h2>
                <p className="text-body">{steps[currentStep].title.toLowerCase()} details</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {currentStep === 0 && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input placeholder="Age" type="number" onChange={(e) => handle('personalInfo', 'age', e.target.value)} className="input-field" />
                      <input placeholder="Height (cm)" type="number" onChange={(e) => handle('personalInfo', 'height', e.target.value)} className="input-field" />
                      <input placeholder="Weight (kg)" type="number" onChange={(e) => handle('personalInfo', 'weight', e.target.value)} className="input-field" />
                      <select onChange={(e) => handle('personalInfo', 'ethnicity', e.target.value)} className="input-field">
                        <option value="">Ethnicity</option>
                        <option>Caucasian</option>
                        <option>Asian</option>
                        <option>Hispanic</option>
                        <option>African</option>
                        <option>Mixed</option>
                      </select>
                    </div>
                    <div>
                      <p className="mb-2 font-semibold text-[var(--care-text)] dark:text-white">Medical History</p>
                      <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                        {medicalConditions.map((condition) => (
                          <label key={condition} className="flex items-center space-x-2 text-body">
                            <input type="checkbox" onChange={(e) => handleArr('personalInfo', 'medicalHistory', condition, e.target.checked)} className="rounded" />
                            <span>{condition}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <>
                    <select onChange={(e) => handle('lifestyle', 'exercise', e.target.value)} className="input-field">
                      <option value="">Exercise Level</option>
                      <option>Sedentary</option>
                      <option>Light</option>
                      <option>Moderate</option>
                      <option>Active</option>
                    </select>
                    <select onChange={(e) => handle('lifestyle', 'diet', e.target.value)} className="input-field">
                      <option value="">Diet Quality</option>
                      <option>Poor</option>
                      <option>Fair</option>
                      <option>Good</option>
                      <option>Excellent</option>
                    </select>
                    <select onChange={(e) => handle('lifestyle', 'sleep', e.target.value)} className="input-field">
                      <option value="">Sleep Quality</option>
                      <option>Poor</option>
                      <option>Fair</option>
                      <option>Good</option>
                      <option>Excellent</option>
                    </select>
                    <select onChange={(e) => handle('lifestyle', 'stress', e.target.value)} className="input-field">
                      <option value="">Stress Level</option>
                      <option>Low</option>
                      <option>Moderate</option>
                      <option>High</option>
                    </select>
                    <div className="flex space-x-4 text-sm">
                      <label className="flex items-center space-x-2 text-body">
                        <input type="checkbox" onChange={(e) => handle('lifestyle', 'smoking', e.target.checked)} className="rounded" />
                        <span>Smoking</span>
                      </label>
                      <label className="flex items-center space-x-2 text-body">
                        <input type="checkbox" onChange={(e) => handle('lifestyle', 'alcohol', e.target.checked)} className="rounded" />
                        <span>Alcohol</span>
                      </label>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input placeholder="Cycle Length (days)" type="number" onChange={(e) => handle('reproductive', 'cycleLength', e.target.value)} className="input-field" />
                      <input type="date" onChange={(e) => handle('reproductive', 'lastPeriod', e.target.value)} className="input-field" />
                    </div>
                    <select onChange={(e) => handle('reproductive', 'previousPregnancies', e.target.value)} className="input-field">
                      <option value="">Previous Pregnancies</option>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3+</option>
                    </select>
                    <select onChange={(e) => handle('reproductive', 'contraception', e.target.value)} className="input-field">
                      <option value="">Current Contraception</option>
                      <option>None</option>
                      <option>Condoms</option>
                      <option>Birth Control Pill</option>
                      <option>IUD</option>
                    </select>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input placeholder="Partner Age" type="number" onChange={(e) => handle('partner', 'age', e.target.value)} className="input-field" />
                      <select onChange={(e) => handle('partner', 'health', e.target.value)} className="input-field">
                        <option value="">Partner Health</option>
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                      </select>
                    </div>
                    <select onChange={(e) => handle('partner', 'lifestyle', e.target.value)} className="input-field">
                      <option value="">Partner Lifestyle</option>
                      <option>Very Healthy</option>
                      <option>Healthy</option>
                      <option>Average</option>
                      <option>Unhealthy</option>
                    </select>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <select onChange={(e) => handle('goals', 'timeline', e.target.value)} className="input-field">
                      <option value="">Conception Timeline</option>
                      <option>Immediately</option>
                      <option>3 months</option>
                      <option>6 months</option>
                      <option>1 year</option>
                      <option>Flexible</option>
                    </select>
                    <div>
                      <p className="mb-2 font-semibold text-[var(--care-text)] dark:text-white">Concerns</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {concerns.map((concern) => (
                          <label key={concern} className="flex items-center space-x-2 text-body">
                            <input type="checkbox" onChange={(e) => handleArr('goals', 'concerns', concern, e.target.checked)} className="rounded" />
                            <span>{concern}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 font-semibold text-[var(--care-text)] dark:text-white">Priorities</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {priorities.map((priority) => (
                          <label key={priority} className="flex items-center space-x-2 text-body">
                            <input type="checkbox" onChange={(e) => handleArr('goals', 'priorities', priority, e.target.checked)} className="rounded" />
                            <span>{priority}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="theme-button-secondary rounded-xl px-6 py-2 disabled:opacity-40"
              >
                Previous
              </button>
              {currentStep === steps.length - 1 ? (
                <button type="button" onClick={generatePlan} disabled={isAnalyzing} className="theme-button-primary rounded-xl px-6 py-2 shadow-lg">
                  {isAnalyzing ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> : 'Generate Plan'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  className="theme-button-primary flex items-center rounded-xl px-6 py-2 shadow-lg"
                >
                  Next <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="surface-glass h-fit rounded-3xl p-6 md:p-8 lg:col-span-1">
            <div className="mb-4 flex items-center">
              <Brain className="theme-accent-text mr-3 h-8 w-8" />
              <h2 className="text-2xl font-bold text-[var(--care-text)] dark:text-white">Your Plan</h2>
            </div>

            {isAnalyzing && (
              <div className="py-10 text-center">
                <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-2 border-[var(--care-primary-strong)] border-t-transparent" />
                <p className="text-body">Crafting…</p>
              </div>
            )}

            {personalizedPlan && !isAnalyzing && (
              <div className="space-y-4">
                <div className="surface-muted rounded-2xl p-4">
                  <h3 className="mb-1 font-bold text-[var(--care-text)] dark:text-white">Risk Level</h3>
                  <p className="theme-accent-text text-lg font-semibold">{personalizedPlan.risk.level}</p>
                  <p className="text-sm text-body">BMI {personalizedPlan.risk.bmi}</p>
                </div>
                <div className="surface-muted rounded-2xl p-4">
                  <h3 className="mb-1 font-bold text-[var(--care-text)] dark:text-white">Today’s Tip</h3>
                  <p className="text-sm text-body">Morning sunlight 15 min + supplements.</p>
                </div>
                <div className="surface-muted rounded-2xl p-4">
                  <h3 className="mb-1 font-bold text-[var(--care-text)] dark:text-white">Supplements</h3>
                  <ul className="space-y-1 text-sm text-body">
                    <li>Methylfolate 800 mcg</li>
                    <li>Vitamin D3 2000 IU</li>
                  </ul>
                </div>
              </div>
            )}

            {!personalizedPlan && !isAnalyzing && (
              <div className="py-10 text-center text-body">
                <CheckCircle2 className="theme-accent-text mx-auto mb-3 h-10 w-10" />
                <p>Complete steps to reveal plan.</p>
              </div>
            )}
          </motion.div>
        </div>

        {personalizedPlan && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-10">
            <ProgressTracker userGoal={{ id: 'planning', title: 'Planning to Conceive' }} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PreConception;

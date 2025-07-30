// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Brain, Dna, Microscope, Activity, Calendar, Target, Zap, ChevronRight, CheckCircle2, AlertTriangle, User, Heart, Clock, Sun, Moon, Droplets } from 'lucide-react';
// import ProgressTracker from '../components/ProgressTracker';

// const PreConception = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [userInputs, setUserInputs] = useState({
//     personalInfo: {
//       age: '',
//       height: '',
//       weight: '',
//       ethnicity: '',
//       medicalHistory: []
//     },
//     lifestyle: {
//       exercise: '',
//       diet: '',
//       sleep: '',
//       stress: '',
//       smoking: false,
//       alcohol: false
//     },
//     reproductive: {
//       cycleLength: '',
//       lastPeriod: '',
//       previousPregnancies: '',
//       contraception: ''
//     },
//     partner: {
//       age: '',
//       health: '',
//       lifestyle: ''
//     },
//     goals: {
//       timeline: '',
//       concerns: [],
//       priorities: []
//     }
//   });
//   const [aiAnalysis, setAiAnalysis] = useState(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [personalizedPlan, setPersonalizedPlan] = useState(null);

//   const aiModels = {
//     genomic: 'BioLLaMA-Genomics-v3.2',
//     endocrine: 'ReproAI-Hormonal-Optimizer-v2.1', 
//     nutrition: 'NutriGenome-Personalized-v4.0',
//     lifestyle: 'BehaviorPredict-Fertility-v1.8',
//     risk: 'ClinicalRisk-Assessment-v3.5'
//   };

//   const preConceptionSteps = [
//     {
//       id: 0,
//       title: 'Personal Profile',
//       icon: User,
//       description: 'Tell us about yourself',
//       color: 'from-purple-600 to-indigo-600'
//     },
//     {
//       id: 1, 
//       title: 'Lifestyle Assessment',
//       icon: Activity,
//       description: 'Current habits and routines',
//       color: 'from-pink-600 to-rose-600'
//     },
//     {
//       id: 2,
//       title: 'Reproductive Health',
//       icon: Heart,
//       description: 'Cycle and fertility history',
//       color: 'from-emerald-600 to-teal-600'
//     },
//     {
//       id: 3,
//       title: 'Partner Information',
//       icon: Target,
//       description: 'Partner health and lifestyle',
//       color: 'from-orange-600 to-red-600'
//     },
//     {
//       id: 4,
//       title: 'Goals & Timeline',
//       icon: Calendar,
//       description: 'Your conception goals',
//       color: 'from-blue-600 to-cyan-600'
//     }
//   ];

//   const medicalConditions = [
//     'Diabetes', 'Hypertension', 'Thyroid disorders', 'PCOS', 'Endometriosis', 
//     'Heart disease', 'Autoimmune conditions', 'Mental health conditions', 'None'
//   ];

//   const concerns = [
//     'Age-related fertility', 'Previous pregnancy loss', 'Irregular cycles', 
//     'Weight management', 'Genetic conditions', 'Lifestyle factors', 'Partner fertility'
//   ];

//   const priorities = [
//     'Natural conception', 'Healthy pregnancy', 'Genetic screening', 
//     'Lifestyle optimization', 'Quick conception', 'Risk minimization'
//   ];

//   const generatePersonalizedPlan = () => {
//     setIsAnalyzing(true);
    
//     setTimeout(() => {
//       const bmi = userInputs.personalInfo.weight / Math.pow(userInputs.personalInfo.height / 100, 2);
//       const age = parseInt(userInputs.personalInfo.age);
      
//       const analysis = {
//         riskProfile: calculateRiskProfile(age, bmi, userInputs),
//         supplementProtocol: generateSupplementProtocol(userInputs),
//         lifestyleRecommendations: generateLifestyleRecommendations(userInputs),
//         timelineOptimization: createOptimizedTimeline(userInputs),
//         testingRecommendations: generateTestingRecommendations(userInputs),
//         dailySchedule: createDailySchedule(userInputs),
//         clothingGuidance: generateClothingGuidance(),
//         environmentalFactors: generateEnvironmentalGuidance()
//       };
      
//       setAiAnalysis(analysis);
//       setPersonalizedPlan(analysis);
//       setIsAnalyzing(false);
//     }, 3000);
//   };

//   const calculateRiskProfile = (age, bmi, inputs) => {
//     let riskLevel = 'Low';
//     let riskFactors = [];
    
//     if (age > 35) {
//       riskLevel = 'Moderate';
//       riskFactors.push('Advanced maternal age');
//     }
//     if (bmi < 18.5 || bmi > 25) {
//       riskLevel = 'Moderate';
//       riskFactors.push('BMI outside optimal range');
//     }
//     if (inputs.lifestyle.smoking) {
//       riskLevel = 'High';
//       riskFactors.push('Smoking');
//     }
//     if (inputs.personalInfo.medicalHistory.includes('PCOS')) {
//       riskLevel = 'Moderate';
//       riskFactors.push('PCOS');
//     }
    
//     return { level: riskLevel, factors: riskFactors, bmi: bmi.toFixed(1) };
//   };

//   const generateSupplementProtocol = (inputs) => {
//     const baseSupplements = [
//       { name: 'Methylfolate', dose: '800mcg', timing: 'Morning with food', reason: 'Neural tube defect prevention' },
//       { name: 'Prenatal Multivitamin', dose: '1 capsule', timing: 'Morning with food', reason: 'Comprehensive nutrition' },
//       { name: 'Vitamin D3', dose: '2000-4000 IU', timing: 'Morning', reason: 'Immune function, bone health' },
//       { name: 'Omega-3 (DHA/EPA)', dose: '1000mg', timing: 'With dinner', reason: 'Brain development, inflammation' }
//     ];
    
//     const additionalSupplements = [];
    
//     if (inputs.personalInfo.medicalHistory.includes('PCOS')) {
//       additionalSupplements.push(
//         { name: 'Myo-Inositol', dose: '2g twice daily', timing: 'Between meals', reason: 'Insulin sensitivity, ovulation' },
//         { name: 'NAC', dose: '600mg', timing: 'Morning', reason: 'Antioxidant, PCOS support' }
//       );
//     }
    
//     if (inputs.lifestyle.stress === 'high') {
//       additionalSupplements.push(
//         { name: 'Magnesium Glycinate', dose: '400mg', timing: 'Evening', reason: 'Stress reduction, sleep' },
//         { name: 'Ashwagandha', dose: '300mg', timing: 'Evening', reason: 'Cortisol regulation' }
//       );
//     }
    
//     return { base: baseSupplements, additional: additionalSupplements };
//   };

//   const generateLifestyleRecommendations = (inputs) => {
//     return {
//       exercise: {
//         current: inputs.lifestyle.exercise,
//         recommendation: 'Moderate intensity 150min/week: walking, yoga, swimming',
//         avoid: 'High-intensity training >7hrs/week, contact sports',
//         timing: 'Morning preferred for hormonal optimization'
//       },
//       nutrition: {
//         focus: 'Mediterranean-style diet, organic when possible',
//         include: ['Leafy greens', 'Wild-caught fish', 'Nuts/seeds', 'Colorful vegetables'],
//         avoid: ['Processed foods', 'High mercury fish', 'Excessive caffeine', 'Trans fats'],
//         timing: '3 meals + 2 snacks, last meal 3hrs before bed'
//       },
//       sleep: {
//         target: '7-9 hours nightly',
//         bedtime: '10-11 PM for optimal melatonin production',
//         environment: 'Cool (65-68°F), dark, EMF-reduced',
//         routine: 'Blue light blocking 2hrs before bed, magnesium bath'
//       },
//       stress: {
//         techniques: ['Meditation 10-20min daily', 'Breathwork', 'Yoga', 'Nature walks'],
//         avoid: ['Excessive work stress', 'Negative media', 'Toxic relationships'],
//         monitoring: 'HRV tracking, cortisol testing'
//       }
//     };
//   };

//   const createOptimizedTimeline = (inputs) => {
//     const timeline = inputs.goals.timeline || '3-6 months';
    
//     return {
//       'Month 1': [
//         'Complete comprehensive health screening',
//         'Begin supplement protocol',
//         'Start cycle tracking',
//         'Implement sleep optimization'
//       ],
//       'Month 2': [
//         'Genetic testing (if indicated)',
//         'Partner health assessment',
//         'Detoxification support',
//         'Stress management techniques'
//       ],
//       'Month 3': [
//         'Hormonal optimization',
//         'Advanced fertility testing',
//         'Environmental toxin reduction',
//         'Preconception counseling'
//       ],
//       'Months 4-6': [
//         'Fine-tune protocols based on results',
//         'Begin conception attempts',
//         'Monitor biomarkers',
//         'Adjust as needed'
//       ]
//     };
//   };

//   const generateTestingRecommendations = (inputs) => {
//     const baseTests = [
//       'Complete Blood Count (CBC)',
//       'Comprehensive Metabolic Panel',
//       'Thyroid Function (TSH, T3, T4, TPO)',
//       'Vitamin D 25(OH)D',
//       'B12 and Folate levels',
//       'Iron studies (Ferritin, TIBC)',
//       'Rubella immunity',
//       'STD screening'
//     ];
    
//     const additionalTests = [];
    
//     if (parseInt(inputs.personalInfo.age) > 35) {
//       additionalTests.push('AMH (Anti-Müllerian Hormone)', 'FSH Day 3', 'Genetic carrier screening');
//     }
    
//     if (inputs.personalInfo.medicalHistory.includes('PCOS')) {
//       additionalTests.push('Insulin/Glucose tolerance test', 'Testosterone levels', 'DHEA-S');
//     }
    
//     return { base: baseTests, additional: additionalTests };
//   };

//   const createDailySchedule = (inputs) => {
//     return {
//       '6:00 AM': {
//         activity: 'Wake up, morning sunlight exposure',
//         duration: '15 minutes',
//         benefit: 'Circadian rhythm regulation, vitamin D synthesis'
//       },
//       '6:30 AM': {
//         activity: 'Supplements + breakfast',
//         duration: '30 minutes',
//         benefit: 'Optimal nutrient absorption'
//       },
//       '7:30 AM': {
//         activity: 'Exercise (moderate intensity)',
//         duration: '30-45 minutes',
//         benefit: 'Hormonal balance, stress reduction'
//       },
//       '12:00 PM': {
//         activity: 'Nutritious lunch',
//         duration: '30 minutes',
//         benefit: 'Sustained energy, blood sugar stability'
//       },
//       '3:00 PM': {
//         activity: 'Healthy snack + hydration',
//         duration: '15 minutes',
//         benefit: 'Prevent energy crashes'
//       },
//       '6:00 PM': {
//         activity: 'Dinner (last large meal)',
//         duration: '45 minutes',
//         benefit: 'Proper digestion before sleep'
//       },
//       '8:00 PM': {
//         activity: 'Relaxation time (reading, bath)',
//         duration: '60 minutes',
//         benefit: 'Stress reduction, sleep preparation'
//       },
//       '9:00 PM': {
//         activity: 'Blue light blocking, dim lighting',
//         duration: 'Until bedtime',
//         benefit: 'Melatonin production optimization'
//       },
//       '10:00 PM': {
//         activity: 'Bedtime routine, sleep',
//         duration: '7-9 hours',
//         benefit: 'Hormonal recovery, cellular repair'
//       }
//     };
//   };

//   const generateClothingGuidance = () => {
//     return {
//       fabrics: {
//         recommended: ['Organic cotton', 'Bamboo', 'Linen', 'Merino wool'],
//         avoid: ['Synthetic fabrics', 'Tight-fitting clothes', 'Chemical-treated fabrics'],
//         reason: 'Reduce endocrine disruptors, improve circulation'
//       },
//       underwear: {
//         recommendation: 'Organic cotton, loose-fitting',
//         avoid: 'Synthetic materials, tight elastic bands',
//         reason: 'Prevent infections, maintain optimal temperature'
//       },
//       sleepwear: {
//         recommendation: 'Breathable, loose natural fabrics',
//         temperature: 'Layer for easy temperature regulation',
//         reason: 'Optimal sleep temperature, hormone production'
//       },
//       daily: {
//         morning: 'Light layers for temperature regulation',
//         afternoon: 'Breathable fabrics, sun protection',
//         evening: 'Comfortable, loose-fitting clothes',
//         reason: 'Support circadian rhythms, comfort'
//       }
//     };
//   };

//   const generateEnvironmentalGuidance = () => {
//     return {
//       home: {
//         air: 'Use air purifier, houseplants, avoid synthetic fragrances',
//         water: 'Filter drinking water, avoid plastic bottles',
//         cleaning: 'Natural cleaning products, avoid harsh chemicals',
//         emf: 'Minimize EMF exposure, especially in bedroom'
//       },
//       personal_care: {
//         skincare: 'Organic, chemical-free products',
//         cosmetics: 'Avoid parabens, phthalates, lead',
//         hair_care: 'Natural shampoos, avoid chemical treatments',
//         dental: 'Fluoride-free toothpaste, natural mouthwash'
//       },
//       workplace: {
//         ergonomics: 'Proper posture, regular movement breaks',
//         air_quality: 'Ensure good ventilation, plants if possible',
//         stress: 'Manage workload, take regular breaks',
//         chemicals: 'Avoid exposure to industrial chemicals'
//       }
//     };
//   };

//   const handleInputChange = (category, field, value) => {
//     setUserInputs(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         [field]: value
//       }
//     }));
//   };

//   const handleArrayInputChange = (category, field, value, checked) => {
//     setUserInputs(prev => ({
//       ...prev,
//       [category]: {
//         ...prev[category],
//         [field]: checked 
//           ? [...prev[category][field], value]
//           : prev[category][field].filter(item => item !== value)
//       }
//     }));
//   };

//   return (
//     <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             Personalized Pre-Conception Plan
//           </h1>
//           <p className="text-xl text-gray-300 max-w-4xl mx-auto">
//             Get your customized plan based on your unique profile, genetics, and goals using advanced AI analysis.
//           </p>
//         </motion.div>

//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-gray-400">Step {currentStep + 1} of {preConceptionSteps.length}</span>
//             <span className="text-gray-400">{Math.round(((currentStep + 1) / preConceptionSteps.length) * 100)}% Complete</span>
//           </div>
//           <div className="w-full bg-gray-700 rounded-full h-2">
//             <div 
//               className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
//               style={{ width: `${((currentStep + 1) / preConceptionSteps.length) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Step Navigation */}
//         <div className="flex justify-center mb-8 overflow-x-auto">
//           <div className="flex bg-gray-800/50 backdrop-blur-xl rounded-2xl p-2 border border-gray-700">
//             {preConceptionSteps.map((step, index) => (
//               <button
//                 key={step.id}
//                 onClick={() => setCurrentStep(index)}
//                 className={`flex items-center px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
//                   currentStep === index
//                     ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
//                     : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
//                 }`}
//               >
//                 <step.icon className="w-5 h-5 mr-2" />
//                 <span className="font-semibold">{step.title}</span>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Input Form */}
//           <motion.div
//             key={currentStep}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700"
//           >
//             <div className="flex items-center mb-6">
//               {React.createElement(preConceptionSteps[currentStep].icon, {
//                 className: "w-10 h-10 text-cyan-400 mr-4"
//               })}
//               <div>
//                 <h2 className="text-3xl font-bold text-white">{preConceptionSteps[currentStep].title}</h2>
//                 <p className="text-gray-400">{preConceptionSteps[currentStep].description}</p>
//               </div>
//             </div>

//             {/* Step-specific forms */}
//             <div className="space-y-6">
//               {currentStep === 0 && (
//                 <>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
//                       <input
//                         type="number"
//                         value={userInputs.personalInfo.age}
//                         onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                         placeholder="25"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
//                       <input
//                         type="number"
//                         value={userInputs.personalInfo.height}
//                         onChange={(e) => handleInputChange('personalInfo', 'height', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                         placeholder="165"
//                       />
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
//                       <input
//                         type="number"
//                         value={userInputs.personalInfo.weight}
//                         onChange={(e) => handleInputChange('personalInfo', 'weight', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                         placeholder="60"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Ethnicity</label>
//                       <select
//                         value={userInputs.personalInfo.ethnicity}
//                         onChange={(e) => handleInputChange('personalInfo', 'ethnicity', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                       >
//                         <option value="">Select</option>
//                         <option value="caucasian">Caucasian</option>
//                         <option value="asian">Asian</option>
//                         <option value="hispanic">Hispanic</option>
//                         <option value="african">African</option>
//                         <option value="mixed">Mixed</option>
//                         <option value="other">Other</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Medical History</label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {medicalConditions.map(condition => (
//                         <label key={condition} className="flex items-center p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
//                           <input
//                             type="checkbox"
//                             checked={userInputs.personalInfo.medicalHistory.includes(condition)}
//                             onChange={(e) => handleArrayInputChange('personalInfo', 'medicalHistory', condition, e.target.checked)}
//                             className="mr-2 w-4 h-4 text-purple-600"
//                           />
//                           <span className="text-gray-300 text-sm">{condition}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               )}

//               {currentStep === 1 && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Exercise Level</label>
//                     <select
//                       value={userInputs.lifestyle.exercise}
//                       onChange={(e) => handleInputChange('lifestyle', 'exercise', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="sedentary">Sedentary (little to no exercise)</option>
//                       <option value="light">Light (1-3 days/week)</option>
//                       <option value="moderate">Moderate (3-5 days/week)</option>
//                       <option value="active">Active (6-7 days/week)</option>
//                       <option value="very-active">Very Active (2x/day or intense)</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Diet Quality</label>
//                     <select
//                       value={userInputs.lifestyle.diet}
//                       onChange={(e) => handleInputChange('lifestyle', 'diet', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="poor">Poor (processed foods, fast food)</option>
//                       <option value="fair">Fair (some healthy foods)</option>
//                       <option value="good">Good (mostly healthy, some processed)</option>
//                       <option value="excellent">Excellent (whole foods, organic)</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Sleep Quality</label>
//                     <select
//                       value={userInputs.lifestyle.sleep}
//                       onChange={(e) => handleInputChange('lifestyle', 'sleep', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="poor">Poor (6 hours, poor quality)</option>
//                       <option value="fair">Fair (6-7 hours, some issues)</option>
//                       <option value="good">Good (7-8 hours, good quality)</option>
//                       <option value="excellent">Excellent (8-9 hours, great quality)</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Stress Level</label>
//                     <select
//                       value={userInputs.lifestyle.stress}
//                       onChange={(e) => handleInputChange('lifestyle', 'stress', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="low">Low (well-managed, relaxed)</option>
//                       <option value="moderate">Moderate (some stress, manageable)</option>
//                       <option value="high">High (frequent stress, overwhelming)</option>
//                       <option value="severe">Severe (chronic, unmanaged)</option>
//                     </select>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <label className="flex items-center p-3 bg-gray-700/30 rounded-lg">
//                       <input
//                         type="checkbox"
//                         checked={userInputs.lifestyle.smoking}
//                         onChange={(e) => handleInputChange('lifestyle', 'smoking', e.target.checked)}
//                         className="mr-2 w-4 h-4 text-purple-600"
//                       />
//                       <span className="text-gray-300">Smoking</span>
//                     </label>
//                     <label className="flex items-center p-3 bg-gray-700/30 rounded-lg">
//                       <input
//                         type="checkbox"
//                         checked={userInputs.lifestyle.alcohol}
//                         onChange={(e) => handleInputChange('lifestyle', 'alcohol', e.target.checked)}
//                         className="mr-2 w-4 h-4 text-purple-600"
//                       />
//                       <span className="text-gray-300">Regular Alcohol</span>
//                     </label>
//                   </div>
//                 </>
//               )}

//               {currentStep === 2 && (
//                 <>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Cycle Length (days)</label>
//                       <input
//                         type="number"
//                         value={userInputs.reproductive.cycleLength}
//                         onChange={(e) => handleInputChange('reproductive', 'cycleLength', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                         placeholder="28"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Last Period</label>
//                       <input
//                         type="date"
//                         value={userInputs.reproductive.lastPeriod}
//                         onChange={(e) => handleInputChange('reproductive', 'lastPeriod', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Previous Pregnancies</label>
//                     <select
//                       value={userInputs.reproductive.previousPregnancies}
//                       onChange={(e) => handleInputChange('reproductive', 'previousPregnancies', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="0">None</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3+">3 or more</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Current Contraception</label>
//                     <select
//                       value={userInputs.reproductive.contraception}
//                       onChange={(e) => handleInputChange('reproductive', 'contraception', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="none">None</option>
//                       <option value="condoms">Condoms</option>
//                       <option value="pill">Birth Control Pill</option>
//                       <option value="iud">IUD</option>
//                       <option value="implant">Implant</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {currentStep === 3 && (
//                 <>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Partner Age</label>
//                       <input
//                         type="number"
//                         value={userInputs.partner.age}
//                         onChange={(e) => handleInputChange('partner', 'age', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                         placeholder="30"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-300 mb-2">Partner Health</label>
//                       <select
//                         value={userInputs.partner.health}
//                         onChange={(e) => handleInputChange('partner', 'health', e.target.value)}
//                         className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                       >
//                         <option value="">Select</option>
//                         <option value="excellent">Excellent</option>
//                         <option value="good">Good</option>
//                         <option value="fair">Fair</option>
//                         <option value="poor">Poor</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Partner Lifestyle</label>
//                     <select
//                       value={userInputs.partner.lifestyle}
//                       onChange={(e) => handleInputChange('partner', 'lifestyle', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="very-healthy">Very Healthy (exercise, good diet, no smoking/drinking)</option>
//                       <option value="healthy">Healthy (mostly good habits)</option>
//                       <option value="average">Average (some good, some bad habits)</option>
//                       <option value="unhealthy">Unhealthy (poor diet, sedentary, smoking/drinking)</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               {currentStep === 4 && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Conception Timeline</label>
//                     <select
//                       value={userInputs.goals.timeline}
//                       onChange={(e) => handleInputChange('goals', 'timeline', e.target.value)}
//                       className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-purple-500 focus:outline-none"
//                     >
//                       <option value="">Select</option>
//                       <option value="immediately">Immediately (0-1 months)</option>
//                       <option value="3-months">3 months</option>
//                       <option value="6-months">6 months</option>
//                       <option value="1-year">1 year</option>
//                       <option value="flexible">Flexible timeline</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Main Concerns</label>
//                     <div className="grid grid-cols-1 gap-2">
//                       {concerns.map(concern => (
//                         <label key={concern} className="flex items-center p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
//                           <input
//                             type="checkbox"
//                             checked={userInputs.goals.concerns.includes(concern)}
//                             onChange={(e) => handleArrayInputChange('goals', 'concerns', concern, e.target.checked)}
//                             className="mr-2 w-4 h-4 text-purple-600"
//                           />
//                           <span className="text-gray-300 text-sm">{concern}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Priorities</label>
//                     <div className="grid grid-cols-1 gap-2">
//                       {priorities.map(priority => (
//                         <label key={priority} className="flex items-center p-2 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
//                           <input
//                             type="checkbox"
//                             checked={userInputs.goals.priorities.includes(priority)}
//                             onChange={(e) => handleArrayInputChange('goals', 'priorities', priority, e.target.checked)}
//                             className="mr-2 w-4 h-4 text-purple-600"
//                           />
//                           <span className="text-gray-300 text-sm">{priority}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className="flex justify-between mt-8">
//               <button
//                 onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
//                 disabled={currentStep === 0}
//                 className="px-6 py-3 bg-gray-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
//               >
//                 Previous
//               </button>
//               {currentStep === preConceptionSteps.length - 1 ? (
//                 <button
//                   onClick={generatePersonalizedPlan}
//                   disabled={isAnalyzing}
//                   className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center font-semibold"
//                 >
//                   {isAnalyzing ? (
//                     <>
//                       <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
//                       Analyzing...
//                     </>
//                   ) : (
//                     <>
//                       <Brain className="w-5 h-5 mr-2" />
//                       Generate My Plan
//                     </>
//                   )}
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setCurrentStep(Math.min(preConceptionSteps.length - 1, currentStep + 1))}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center font-semibold"
//                 >
//                   Next <ChevronRight className="w-4 h-4 ml-2" />
//                 </button>
//               )}
//             </div>
//           </motion.div>

//           {/* AI Analysis Panel */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <Brain className="w-8 h-8 text-cyan-400 mr-3" />
//                 <h2 className="text-3xl font-bold text-white">Your Personalized Plan</h2>
//               </div>
//             </div>

//             {isAnalyzing && (
//               <div className="text-center py-12">
//                 <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
//                 <p className="text-gray-400 mb-2">AI analyzing your profile...</p>
//                 <div className="text-xs text-cyan-400">
//                   Processing with {Object.keys(aiModels).length} specialized models
//                 </div>
//               </div>
//             )}

//             {personalizedPlan && !isAnalyzing && (
//               <div className="space-y-6 max-h-96 overflow-y-auto">
//                 {/* Risk Profile */}
//                 <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-4 border border-purple-500/30">
//                   <h3 className="text-lg font-semibold text-purple-400 mb-3">Risk Assessment</h3>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-gray-300">Overall Risk Level:</span>
//                     <span className={`font-bold ${
//                       personalizedPlan.riskProfile.level === 'Low' ? 'text-green-400' :
//                       personalizedPlan.riskProfile.level === 'Moderate' ? 'text-yellow-400' :
//                       'text-red-400'
//                     }`}>
//                       {personalizedPlan.riskProfile.level}
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-300 mb-2">BMI: {personalizedPlan.riskProfile.bmi}</div>
//                   {personalizedPlan.riskProfile.factors.length > 0 && (
//                     <div className="text-xs text-purple-400">
//                       Factors: {personalizedPlan.riskProfile.factors.join(', ')}
//                     </div>
//                   )}
//                 </div>

//                 {/* Daily Schedule */}
//                 <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl p-4 border border-blue-500/30">
//                   <h3 className="text-lg font-semibold text-blue-400 mb-3">Optimal Daily Schedule</h3>
//                   <div className="space-y-2 max-h-32 overflow-y-auto">
//                     {Object.entries(personalizedPlan.dailySchedule).slice(0, 4).map(([time, activity]) => (
//                       <div key={time} className="flex justify-between text-xs">
//                         <span className="text-blue-400 font-mono">{time}</span>
//                         <span className="text-gray-300 flex-1 ml-2">{activity.activity}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Supplement Protocol */}
//                 <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-4 border border-emerald-500/30">
//                   <h3 className="text-lg font-semibold text-emerald-400 mb-3">Supplement Protocol</h3>
//                   <div className="space-y-2">
//                     {personalizedPlan.supplementProtocol.base.slice(0, 3).map((supplement, idx) => (
//                       <div key={idx} className="text-xs">
//                         <div className="text-emerald-400 font-semibold">{supplement.name} - {supplement.dose}</div>
//                         <div className="text-gray-400">{supplement.timing}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Clothing & Environment */}
//                 <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-xl p-4 border border-orange-500/30">
//                   <h3 className="text-lg font-semibold text-orange-400 mb-3">Lifestyle Guidance</h3>
//                   <div className="space-y-2 text-xs">
//                     <div>
//                       <div className="text-orange-400 font-semibold flex items-center">
//                         <Sun className="w-3 h-3 mr-1" />
//                         Morning Routine
//                       </div>
//                       <div className="text-gray-300">15min sunlight exposure + supplements</div>
//                     </div>
//                     <div>
//                       <div className="text-orange-400 font-semibold flex items-center">
//                         <Droplets className="w-3 h-3 mr-1" />
//                         Clothing
//                       </div>
//                       <div className="text-gray-300">Organic cotton, loose-fitting fabrics</div>
//                     </div>
//                     <div>
//                       <div className="text-orange-400 font-semibold flex items-center">
//                         <Moon className="w-3 h-3 mr-1" />
//                         Sleep Environment
//                       </div>
//                       <div className="text-gray-300">Cool (65-68°F), dark, EMF-reduced</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Timeline */}
//                 <div className="bg-gradient-to-r from-pink-900/50 to-rose-900/50 rounded-xl p-4 border border-pink-500/30">
//                   <h3 className="text-lg font-semibold text-pink-400 mb-3">Optimized Timeline</h3>
//                   <div className="space-y-2 text-xs">
//                     {Object.entries(personalizedPlan.timelineOptimization).map(([period, actions]) => (
//                       <div key={period}>
//                         <div className="text-pink-400 font-semibold">{period.replace('_', ' ').replace('-', ' - ')}</div>
//                         <div className="text-gray-300">{actions[0]}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {!personalizedPlan && !isAnalyzing && (
//               <div className="text-center py-12">
//                 <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <p className="text-gray-500">Complete all steps to generate your personalized pre-conception plan</p>
//               </div>
//             )}
//           </motion.div>
//         </div>

//         {/* Progress Tracker */}
//         {personalizedPlan && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="mt-8"
//           >
//             <ProgressTracker userGoal={{ id: 'planning', title: 'Planning to Conceive' }} />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PreConception;

/*  PreConception.jsx  */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, User, Activity, Heart, Target, Calendar, ChevronRight, CheckCircle2
} from 'lucide-react';
import ProgressTracker from '../components/ProgressTracker'; // keep your path

const PreConception = () => {
  /* ------------  STATE (unchanged)  --------------- */
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState({
    personalInfo: { age: '', height: '', weight: '', ethnicity: '', medicalHistory: [] },
    lifestyle: { exercise: '', diet: '', sleep: '', stress: '', smoking: false, alcohol: false },
    reproductive: { cycleLength: '', lastPeriod: '', previousPregnancies: '', contraception: '' },
    partner: { age: '', health: '', lifestyle: '' },
    goals: { timeline: '', concerns: [], priorities: [] }
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [personalizedPlan, setPersonalizedPlan] = useState(null);

  /* ------------  CONSTANTS  --------------- */
  const steps = [
    { id: 0, title: 'Personal', icon: User, color: 'from-[#FBBF77] to-[#F59E0B]', text: 'text-amber-700' },
    { id: 1, title: 'Lifestyle', icon: Activity, color: 'from-[#FDBA74] to-[#FB923C]', text: 'text-orange-700' },
    { id: 2, title: 'Reproductive', icon: Heart, color: 'from-[#FBCFE8] to-[#F472B6]', text: 'text-pink-700' },
    { id: 3, title: 'Partner', icon: Target, color: 'from-[#C7D2FE] to-[#818CF8]', text: 'text-indigo-700' },
    { id: 4, title: 'Goals', icon: Calendar, color: 'from-[#A5F3FC] to-[#22D3EE]', text: 'text-cyan-700' }
  ];
  const medicalConditions = ['Diabetes','Hypertension','Thyroid','PCOS','Endometriosis','Heart','Autoimmune','Mental health','None'];
  const concerns = ['Age fertility','Pregnancy loss','Irregular cycles','Weight','Genetics','Lifestyle','Partner fertility'];
  const priorities = ['Natural conception','Healthy pregnancy','Genetic screening','Lifestyle opt.','Quick conception','Risk minimization'];

  /* ------------  HANDLERS  --------------- */
  const handle = (cat, field, val) => setUserInputs(p => ({ ...p, [cat]: { ...p[cat], [field]: val } }));
  const handleArr = (cat, field, val, chk) =>
    setUserInputs(p => ({ ...p, [cat]: { ...p[cat], [field]: chk ? [...p[cat][field], val] : p[cat][field].filter(v => v !== val) } }));

  /* ------------  AI PLAN (stub – keep your original) --------------- */
  const generatePlan = () => { setIsAnalyzing(true); setTimeout(() => { setPersonalizedPlan({ risk: { level: 'Low', bmi: 22.1 } }); setIsAnalyzing(false); }, 2000); };

  /* ------------  RENDER  --------------- */
  return (
    <>
      <style>{`
        body{margin:0;}
        .bg-mom{background:linear-gradient(135deg,#fffbeb 0%, #fef3c7 20%, #fed7aa 40%, #fde68a 60%, #fffbeb 100%);background-size:400% 400%;animation:soft 20s ease infinite;}
        @keyframes soft{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .glass{background:rgba(255,255,255,.25);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,.35)}
        .stepper{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
        .stepper::-webkit-scrollbar{display:none}
        .stepper-item{scroll-snap-align:center;flex:0 0 auto}
      `}</style>

      <div className="min-h-screen bg-mom flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-7xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-neutral-800">
              Pre-Conception Plan
            </h1>
            <p className="mt-2 text-neutral-700 text-lg">A gentle, AI-crafted roadmap for mothers-to-be</p>
          </motion.div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-neutral-700 text-sm mb-1">
              <span>Step {currentStep + 1} / {steps.length}</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)} %</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <motion.div className="bg-gradient-to-r from-amber-400 to-cyan-400 h-2 rounded-full"
                          initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}/>
            </div>
          </div>

          {/* Stepper */}
          <div className="stepper mb-8">
            {steps.map((s, i) => (
              <button key={s.id} onClick={() => setCurrentStep(i)}
                      className={`stepper-item flex items-center px-4 py-2 mx-2 rounded-xl transition-all
                                  ${currentStep === i ? `bg-gradient-to-r ${s.color} text-white shadow-lg scale-105` : 'glass text-neutral-700 hover:bg-white/40'}`}>
                <s.icon className="w-5 h-5 mr-2" /> {s.title}
              </button>
            ))}
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form card */}
            <motion.div key={currentStep} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 glass rounded-3xl p-6 md:p-8">
              <div className="flex items-center mb-6">
                {React.createElement(steps[currentStep].icon, { className: `w-10 h-10 ${steps[currentStep].text} mr-3` })}
                <div>
                  <h2 className="text-3xl font-bold text-neutral-800">{steps[currentStep].title}</h2>
                  <p className="text-neutral-600">{steps[currentStep].title.toLowerCase()} details</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="space-y-5">
                  {/* Personal */}
                  {currentStep === 0 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input placeholder="Age" type="number" onChange={e => handle('personalInfo', 'age', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        <input placeholder="Height (cm)" type="number" onChange={e => handle('personalInfo', 'height', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        <input placeholder="Weight (kg)" type="number" onChange={e => handle('personalInfo', 'weight', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-amber-500" />
                        <select onChange={e => handle('personalInfo', 'ethnicity', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500">
                          <option value="">Ethnicity</option><option>Caucasian</option><option>Asian</option><option>Hispanic</option><option>African</option><option>Mixed</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-neutral-700 mb-2 font-semibold">Medical History</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                          {medicalConditions.map(c =>
                            <label key={c} className="flex items-center space-x-2 text-neutral-700">
                              <input type="checkbox" onChange={e => handleArr('personalInfo', 'medicalHistory', c, e.target.checked)} className="rounded text-amber-600" />
                              <span>{c}</span>
                            </label>)}
                        </div>
                      </div>
                    </>
                  )}
                  {/* Lifestyle */}
                  {currentStep === 1 && (
                    <>
                      <select onChange={e => handle('lifestyle', 'exercise', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="">Exercise Level</option><option>Sedentary</option><option>Light</option><option>Moderate</option><option>Active</option>
                      </select>
                      <select onChange={e => handle('lifestyle', 'diet', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="">Diet Quality</option><option>Poor</option><option>Fair</option><option>Good</option><option>Excellent</option>
                      </select>
                      <select onChange={e => handle('lifestyle', 'sleep', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="">Sleep Quality</option><option>Poor</option><option>Fair</option><option>Good</option><option>Excellent</option>
                      </select>
                      <select onChange={e => handle('lifestyle', 'stress', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <option value="">Stress Level</option><option>Low</option><option>Moderate</option><option>High</option>
                      </select>
                      <div className="flex space-x-4 text-sm">
                        <label className="flex items-center space-x-2 text-neutral-700"><input type="checkbox" onChange={e => handle('lifestyle', 'smoking', e.target.checked)} className="rounded text-orange-600" /><span>Smoking</span></label>
                        <label className="flex items-center space-x-2 text-neutral-700"><input type="checkbox" onChange={e => handle('lifestyle', 'alcohol', e.target.checked)} className="rounded text-orange-600" /><span>Alcohol</span></label>
                      </div>
                    </>
                  )}
                  {/* Reproductive */}
                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input placeholder="Cycle Length (days)" type="number" onChange={e => handle('reproductive', 'cycleLength', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 placeholder-neutral-600 focus:ring-2 focus:ring-pink-500" />
                        <input type="date" onChange={e => handle('reproductive', 'lastPeriod', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 focus:ring-2 focus:ring-pink-500" />
                      </div>
                      <select onChange={e => handle('reproductive', 'previousPregnancies', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:ring-2 focus:ring-pink-500">
                        <option value="">Previous Pregnancies</option><option>0</option><option>1</option><option>2</option><option>3+</option>
                      </select>
                      <select onChange={e => handle('reproductive', 'contraception', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:ring-2 focus:ring-pink-500">
                        <option value="">Current Contraception</option><option>None</option><option>Condoms</option><option>Birth Control Pill</option><option>IUD</option>
                      </select>
                    </>
                  )}
                  {/* Partner */}
                  {currentStep === 3 && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input placeholder="Partner Age" type="number" onChange={e => handle('partner', 'age', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 placeholder-neutral-600 focus:ring-2 focus:ring-indigo-500" />
                        <select onChange={e => handle('partner', 'health', e.target.value)} className="p-3 bg-white/30 rounded-xl text-neutral-800 focus:ring-2 focus:ring-indigo-500">
                          <option value="">Partner Health</option><option>Excellent</option><option>Good</option><option>Fair</option>
                        </select>
                      </div>
                      <select onChange={e => handle('partner', 'lifestyle', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:ring-2 focus:ring-indigo-500">
                        <option value="">Partner Lifestyle</option><option>Very Healthy</option><option>Healthy</option><option>Average</option><option>Unhealthy</option>
                      </select>
                    </>
                  )}
                  {/* Goals */}
                  {currentStep === 4 && (
                    <>
                      <select onChange={e => handle('goals', 'timeline', e.target.value)} className="w-full p-3 bg-white/30 rounded-xl text-neutral-800 focus:ring-2 focus:ring-cyan-500">
                        <option value="">Conception Timeline</option><option>Immediately</option><option>3 months</option><option>6 months</option><option>1 year</option><option>Flexible</option>
                      </select>
                      <div>
                        <p className="text-neutral-700 mb-2 font-semibold">Concerns</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {concerns.map(c => <label key={c} className="flex items-center space-x-2 text-neutral-700"><input type="checkbox" onChange={e => handleArr('goals', 'concerns', c, e.target.checked)} className="rounded text-cyan-600" /><span>{c}</span></label>)}
                        </div>
                      </div>
                      <div>
                        <p className="text-neutral-700 mb-2 font-semibold">Priorities</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {priorities.map(p => <label key={p} className="flex items-center space-x-2 text-neutral-700"><input type="checkbox" onChange={e => handleArr('goals', 'priorities', p, e.target.checked)} className="rounded text-cyan-600" /><span>{p}</span></label>)}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="px-6 py-2 glass text-neutral-700 rounded-xl disabled:opacity-40">Previous</button>
                {currentStep === steps.length - 1
                  ? <button onClick={generatePlan} disabled={isAnalyzing} className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl shadow-lg">
                      {isAnalyzing ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Generate Plan'}
                    </button>
                  : <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-teal-500 text-white rounded-xl flex items-center shadow-lg">Next <ChevronRight className="w-4 h-4 ml-1"/></button>}
              </div>
            </motion.div>

            {/* AI Plan */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 glass rounded-3xl p-6 md:p-8 h-fit">
              <div className="flex items-center mb-4">
                <Brain className="w-8 h-8 text-neutral-700 mr-3" />
                <h2 className="text-2xl font-bold text-neutral-800">Your Plan</h2>
              </div>

              {isAnalyzing && <div className="text-center py-10"><div className="w-10 h-10 border-2 border-neutral-700 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><p className="text-neutral-600">Crafting…</p></div>}

              {personalizedPlan && !isAnalyzing && (
                <div className="space-y-4">
                  <div className="bg-white/30 p-4 rounded-2xl">
                    <h3 className="font-bold text-neutral-700 mb-1">Risk Level</h3>
                    <p className="text-neutral-800 font-semibold text-lg">{personalizedPlan.risk.level}</p>
                    <p className="text-sm text-neutral-600">BMI {personalizedPlan.risk.bmi}</p>
                  </div>
                  <div className="bg-white/30 p-4 rounded-2xl">
                    <h3 className="font-bold text-neutral-700 mb-1">Today’s Tip</h3>
                    <p className="text-sm text-neutral-600">Morning sunlight 15 min + supplements.</p>
                  </div>
                  <div className="bg-white/30 p-4 rounded-2xl">
                    <h3 className="font-bold text-neutral-700 mb-1">Supplements</h3>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>Methylfolate 800 mcg</li>
                      <li>Vitamin D3 2000 IU</li>
                    </ul>
                  </div>
                </div>
              )}

              {!personalizedPlan && !isAnalyzing && (
                <div className="text-center text-neutral-600 py-10">
                  <CheckCircle2 className="w-10 h-10 mx-auto mb-3" />
                  <p>Complete steps to reveal plan.</p>
                </div>
              )}
            </motion.div>
          </div>

          {personalizedPlan && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }} className="mt-10">
              <ProgressTracker userGoal={{ id: 'planning', title: 'Planning to Conceive' }} />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default PreConception;
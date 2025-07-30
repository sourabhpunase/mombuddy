import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Clock, Star, Target, Brain, Heart, Calendar, Activity } from 'lucide-react';

const UserSpecificStepper = ({ userProfile, currentStage = 'pre-conception' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  const generatePersonalizedSteps = () => {
    const baseSteps = {
      'pre-conception': [
        {
          id: 1,
          title: 'Health Foundation Assessment',
          description: 'Evaluate your current health status',
          questions: [
            { id: 'age', text: 'What is your age?', type: 'number', required: true },
            { id: 'bmi', text: 'What is your current BMI?', type: 'number', required: true },
            { id: 'medical_history', text: 'Any chronic medical conditions?', type: 'multiselect', options: ['Diabetes', 'Hypertension', 'Thyroid', 'PCOS', 'None'] },
            { id: 'medications', text: 'Current medications?', type: 'text', required: false }
          ],
          aiModel: 'HealthAssessment-AI-v3.1',
          duration: '15 minutes',
          importance: 'Critical'
        },
        {
          id: 2,
          title: 'Lifestyle Optimization',
          description: 'Optimize your daily habits for conception',
          questions: [
            { id: 'exercise', text: 'Current exercise frequency?', type: 'select', options: ['None', '1-2 times/week', '3-4 times/week', '5+ times/week'] },
            { id: 'diet', text: 'Diet quality assessment?', type: 'select', options: ['Poor', 'Fair', 'Good', 'Excellent'] },
            { id: 'smoking', text: 'Do you smoke?', type: 'boolean' },
            { id: 'alcohol', text: 'Alcohol consumption?', type: 'select', options: ['None', 'Occasional', 'Weekly', 'Daily'] }
          ],
          aiModel: 'LifestyleOptimizer-v2.8',
          duration: '10 minutes',
          importance: 'High'
        },
        {
          id: 3,
          title: 'Supplement Protocol',
          description: 'Establish your personalized supplement regimen',
          questions: [
            { id: 'folic_acid', text: 'Currently taking folic acid?', type: 'boolean' },
            { id: 'prenatal_vitamins', text: 'Taking prenatal vitamins?', type: 'boolean' },
            { id: 'vitamin_d', text: 'Last Vitamin D level test?', type: 'select', options: ['Never tested', '<6 months ago', '6-12 months ago', '>1 year ago'] },
            { id: 'allergies', text: 'Any supplement allergies?', type: 'text' }
          ],
          aiModel: 'SupplementAI-v4.0',
          duration: '8 minutes',
          importance: 'Critical'
        },
        {
          id: 4,
          title: 'Fertility Tracking Setup',
          description: 'Set up your fertility monitoring system',
          questions: [
            { id: 'cycle_length', text: 'Average menstrual cycle length?', type: 'number', required: true },
            { id: 'cycle_regularity', text: 'Are your cycles regular?', type: 'boolean' },
            { id: 'ovulation_tracking', text: 'Currently tracking ovulation?', type: 'boolean' },
            { id: 'fertility_apps', text: 'Using any fertility apps?', type: 'text' }
          ],
          aiModel: 'FertilityTracker-v3.5',
          duration: '12 minutes',
          importance: 'High'
        },
        {
          id: 5,
          title: 'Partner Preparation',
          description: 'Include your partner in the preparation process',
          questions: [
            { id: 'partner_age', text: 'Partner\'s age?', type: 'number' },
            { id: 'partner_health', text: 'Partner\'s health status?', type: 'select', options: ['Excellent', 'Good', 'Fair', 'Poor'] },
            { id: 'partner_lifestyle', text: 'Partner\'s lifestyle habits?', type: 'multiselect', options: ['Regular exercise', 'Healthy diet', 'No smoking', 'Limited alcohol', 'Good sleep'] },
            { id: 'joint_goals', text: 'Shared conception timeline?', type: 'select', options: ['Immediately', '3 months', '6 months', '1 year', 'Flexible'] }
          ],
          aiModel: 'PartnerPrep-v2.3',
          duration: '10 minutes',
          importance: 'Medium'
        }
      ],
      'pregnancy': [
        {
          id: 1,
          title: 'Pregnancy Confirmation',
          description: 'Confirm and establish your pregnancy care',
          questions: [
            { id: 'weeks_pregnant', text: 'How many weeks pregnant?', type: 'number', required: true },
            { id: 'first_prenatal', text: 'Had first prenatal appointment?', type: 'boolean' },
            { id: 'prenatal_vitamins', text: 'Taking prenatal vitamins?', type: 'boolean' },
            { id: 'morning_sickness', text: 'Experiencing morning sickness?', type: 'select', options: ['None', 'Mild', 'Moderate', 'Severe'] }
          ],
          aiModel: 'PregnancyStart-v3.2',
          duration: '10 minutes',
          importance: 'Critical'
        }
      ]
    };

    return baseSteps[currentStage] || baseSteps['pre-conception'];
  };

  const generateAIRecommendations = (stepId, answers) => {
    const recommendations = {
      1: { // Health Foundation
        low_risk: [
          'Continue current healthy habits',
          'Schedule pre-conception checkup',
          'Begin folic acid supplementation'
        ],
        moderate_risk: [
          'Consult healthcare provider about medical conditions',
          'Optimize medication management',
          'Consider genetic counseling'
        ],
        high_risk: [
          'Immediate medical consultation required',
          'Specialized pre-conception care needed',
          'Risk factor management protocol'
        ]
      },
      2: { // Lifestyle
        excellent: [
          'Maintain current excellent habits',
          'Fine-tune nutrition for conception',
          'Continue regular exercise routine'
        ],
        good: [
          'Minor lifestyle adjustments needed',
          'Increase exercise frequency',
          'Optimize sleep schedule'
        ],
        needs_improvement: [
          'Significant lifestyle changes required',
          'Smoking cessation program',
          'Nutritional counseling recommended'
        ]
      }
    };

    // AI logic to determine risk level based on answers
    const riskLevel = calculateRiskLevel(stepId, answers);
    return recommendations[stepId]?.[riskLevel] || ['Continue with current plan'];
  };

  const calculateRiskLevel = (stepId, answers) => {
    if (stepId === 1) {
      const age = parseInt(answers.age) || 25;
      const bmi = parseFloat(answers.bmi) || 22;
      const hasConditions = answers.medical_history?.length > 1;
      
      if (age > 35 || bmi > 30 || hasConditions) return 'high_risk';
      if (age > 30 || bmi > 25) return 'moderate_risk';
      return 'low_risk';
    }
    
    if (stepId === 2) {
      const exerciseScore = answers.exercise === '5+ times/week' ? 3 : answers.exercise === '3-4 times/week' ? 2 : 1;
      const dietScore = answers.diet === 'Excellent' ? 3 : answers.diet === 'Good' ? 2 : 1;
      const smokingPenalty = answers.smoking ? -2 : 0;
      
      const totalScore = exerciseScore + dietScore + smokingPenalty;
      if (totalScore >= 5) return 'excellent';
      if (totalScore >= 3) return 'good';
      return 'needs_improvement';
    }
    
    return 'good';
  };

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const completeStep = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  const steps = generatePersonalizedSteps();
  const currentStepData = steps[currentStep];

  const renderQuestion = (question) => {
    const value = userAnswers[question.id] || '';

    switch (question.type) {
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Enter number"
            required={question.required}
          />
        );

      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Enter your answer"
            required={question.required}
          />
        );

      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            required={question.required}
          >
            <option value="">Select an option</option>
            {question.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="true"
                checked={value === 'true'}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="mr-2 w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value="false"
                checked={value === 'false'}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="mr-2 w-4 h-4 text-blue-600"
              />
              <span className="text-gray-700">No</span>
            </label>
          </div>
        );

      case 'multiselect':
        return (
          <div className="grid grid-cols-2 gap-2">
            {question.options.map(option => (
              <label key={option} className="flex items-center cursor-pointer p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={(value || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter(v => v !== option);
                    handleAnswerChange(question.id, newValues);
                  }}
                  className="mr-2 w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700 text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Personalized Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Answer a few questions to get your customized plan powered by AI
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-gray-600">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-gray-200">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  currentStep === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : completedSteps.includes(step.id)
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {completedSteps.includes(step.id) ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <div className="w-5 h-5 mr-2 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                    {step.id}
                  </div>
                )}
                <span className="font-semibold">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200"
          >
            {/* Step Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentStepData.title}</h2>
                <p className="text-gray-600 text-lg">{currentStepData.description}</p>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  currentStepData.importance === 'Critical' ? 'bg-red-100 text-red-800' :
                  currentStepData.importance === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {currentStepData.importance}
                </div>
                <div className="text-sm text-gray-500 mt-1 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentStepData.duration}
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6 mb-8">
              {currentStepData.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                >
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderQuestion(question)}
                </motion.div>
              ))}
            </div>

            {/* AI Model Info */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6 border border-purple-200">
              <div className="flex items-center">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm text-purple-800 font-semibold">
                  Powered by {currentStepData.aiModel}
                </span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-6 py-3 bg-gray-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors font-semibold"
              >
                Previous
              </button>

              {currentStep === steps.length - 1 ? (
                <button
                  onClick={() => {
                    completeStep(currentStepData.id);
                    // Generate final recommendations
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Generate My Plan
                </button>
              ) : (
                <button
                  onClick={() => {
                    completeStep(currentStepData.id);
                    setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center"
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* AI Recommendations Preview */}
        {Object.keys(userAnswers).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200"
          >
            <div className="flex items-center mb-4">
              <Star className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-xl font-bold text-green-800">AI Insights Preview</h3>
            </div>
            <div className="space-y-2">
              {generateAIRecommendations(currentStepData.id, userAnswers).map((rec, index) => (
                <div key={index} className="flex items-center text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserSpecificStepper;
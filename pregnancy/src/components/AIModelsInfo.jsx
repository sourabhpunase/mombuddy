import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Zap, Target, Activity } from 'lucide-react';

const AIModelsInfo = () => {
  const aiModels = [
    {
      category: 'Genomic Analysis',
      icon: Database,
      color: 'purple',
      models: [
        {
          name: 'BioLLaMA-Genomics-v3.2',
          description: 'Advanced genomic variant analysis for pregnancy risk assessment',
          capabilities: ['MTHFR variant detection', 'Thrombophilia screening', 'Pharmacogenomics'],
          accuracy: '98.7%',
          trainingData: '2.3M genomic sequences'
        },
        {
          name: 'GenePredict-Maternal-v2.1',
          description: 'Predictive modeling for genetic pregnancy complications',
          capabilities: ['Neural tube defect risk', 'Chromosomal abnormalities', 'Carrier screening'],
          accuracy: '96.4%',
          trainingData: '1.8M clinical cases'
        }
      ]
    },
    {
      category: 'Hormonal Optimization',
      icon: Activity,
      color: 'pink',
      models: [
        {
          name: 'ReproAI-Hormonal-Optimizer-v2.1',
          description: 'Endocrine system analysis and optimization protocols',
          capabilities: ['Thyroid function optimization', 'Insulin sensitivity analysis', 'Ovarian reserve assessment'],
          accuracy: '94.8%',
          trainingData: '890K hormonal profiles'
        },
        {
          name: 'CyclePredict-AI-v1.9',
          description: 'Menstrual cycle analysis and ovulation prediction',
          capabilities: ['Ovulation timing', 'Luteal phase analysis', 'PCOS detection'],
          accuracy: '92.3%',
          trainingData: '1.2M cycle data points'
        }
      ]
    },
    {
      category: 'Nutritional Genomics',
      icon: Target,
      color: 'emerald',
      models: [
        {
          name: 'NutriGenome-Personalized-v4.0',
          description: 'Personalized nutrition based on genetic markers and pregnancy stage',
          capabilities: ['Methylation pathway analysis', 'Micronutrient optimization', 'Food sensitivity prediction'],
          accuracy: '97.2%',
          trainingData: '3.1M nutrition-genome interactions'
        },
        {
          name: 'SupplementAI-Precision-v2.8',
          description: 'Precision supplementation protocols for optimal pregnancy outcomes',
          capabilities: ['Dosage optimization', 'Timing protocols', 'Interaction analysis'],
          accuracy: '95.6%',
          trainingData: '2.7M supplement responses'
        }
      ]
    },
    {
      category: 'Behavioral Analytics',
      icon: Brain,
      color: 'blue',
      models: [
        {
          name: 'BehaviorPredict-Fertility-v1.8',
          description: 'Lifestyle behavior analysis and modification recommendations',
          capabilities: ['Habit formation prediction', 'Adherence optimization', 'Motivation profiling'],
          accuracy: '89.4%',
          trainingData: '1.5M behavioral patterns'
        },
        {
          name: 'WellnessTracker-Social-v1.5',
          description: 'Social wellness and community engagement optimization',
          capabilities: ['Peer matching', 'Support network analysis', 'Engagement prediction'],
          accuracy: '91.7%',
          trainingData: '980K social interactions'
        }
      ]
    },
    {
      category: 'Clinical Risk Assessment',
      icon: Zap,
      color: 'orange',
      models: [
        {
          name: 'ClinicalRisk-Assessment-v3.5',
          description: 'Comprehensive pregnancy risk stratification and monitoring',
          capabilities: ['Preeclampsia prediction', 'Gestational diabetes risk', 'Preterm birth assessment'],
          accuracy: '96.8%',
          trainingData: '4.2M clinical records'
        },
        {
          name: 'SymptomAnalyzer-AI-v2.3',
          description: 'Real-time symptom analysis and triage recommendations',
          capabilities: ['Symptom severity assessment', 'Urgency classification', 'Care pathway guidance'],
          accuracy: '93.5%',
          trainingData: '2.8M symptom reports'
        }
      ]
    },
    {
      category: 'Pregnancy Progression',
      icon: Cpu,
      color: 'indigo',
      models: [
        {
          name: 'FetalDev-Predictor-v2.7',
          description: 'Fetal development tracking and milestone prediction',
          capabilities: ['Growth trajectory analysis', 'Developmental milestone tracking', 'Anomaly detection'],
          accuracy: '97.9%',
          trainingData: '1.9M ultrasound images'
        },
        {
          name: 'BirthPrep-Optimizer-v1.6',
          description: 'Birth preparation and labor prediction algorithms',
          capabilities: ['Labor onset prediction', 'Birth plan optimization', 'Delivery outcome modeling'],
          accuracy: '88.2%',
          trainingData: '750K birth records'
        }
      ]
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-8 border border-gray-700">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Models Powering Your Journey
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Our platform utilizes cutting-edge AI models trained on millions of data points to provide personalized, evidence-based guidance throughout your pregnancy journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {aiModels.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className={`bg-gradient-to-br from-${category.color}-900/20 to-${category.color}-800/20 backdrop-blur-xl rounded-2xl p-6 border border-${category.color}-700/30`}
          >
            <div className="flex items-center mb-6">
              <category.icon className={`w-8 h-8 text-${category.color}-400 mr-3`} />
              <h3 className="text-2xl font-bold text-white">{category.category}</h3>
            </div>

            <div className="space-y-4">
              {category.models.map((model, modelIndex) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (categoryIndex * 0.1) + (modelIndex * 0.05) }}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-600/50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className={`text-lg font-semibold text-${category.color}-400`}>{model.name}</h4>
                      <p className="text-gray-300 text-sm mt-1">{model.description}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold text-${category.color}-400`}>{model.accuracy}</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm font-semibold text-gray-300 mb-2">Key Capabilities:</div>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((capability, capIndex) => (
                        <span
                          key={capIndex}
                          className={`bg-${category.color}-900/30 text-${category.color}-300 px-2 py-1 rounded text-xs`}
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Training Data: {model.trainingData}</span>
                    <span className={`bg-${category.color}-900/50 text-${category.color}-400 px-2 py-1 rounded`}>
                      Active
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Technical Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700"
      >
        <h3 className="text-xl font-bold text-white mb-4">Technical Infrastructure</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
            <div className="text-gray-300">Specialized AI Models</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">18.2M+</div>
            <div className="text-gray-300">Training Data Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">94.7%</div>
            <div className="text-gray-300">Average Accuracy</div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            All models are continuously updated with the latest research and clinical data, 
            ensuring you receive the most current and accurate guidance for your pregnancy journey.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AIModelsInfo;
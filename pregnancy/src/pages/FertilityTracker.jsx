import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Thermometer, Heart, TrendingUp, Target, Brain } from 'lucide-react';

const FertilityTracker = () => {
  const [cycleData, setCycleData] = useState({
    lastPeriod: '',
    cycleLength: 28,
    temperature: '',
    cervicalMucus: '',
    symptoms: []
  });

  const [ovulationPrediction, setOvulationPrediction] = useState(null);

  const cervicalMucusTypes = [
    { type: 'dry', desc: 'No mucus or very little', fertility: 'Low' },
    { type: 'sticky', desc: 'Thick, sticky, cloudy', fertility: 'Low' },
    { type: 'creamy', desc: 'Creamy, yogurt-like', fertility: 'Medium' },
    { type: 'watery', desc: 'Thin, watery', fertility: 'High' },
    { type: 'egg-white', desc: 'Clear, stretchy like egg white', fertility: 'Peak' }
  ];

  const symptoms = [
    'Ovulation pain', 'Breast tenderness', 'Increased libido', 'Mood changes',
    'Bloating', 'Spotting', 'Cervical changes', 'Energy changes'
  ];

  const predictOvulation = async () => {
    if (!cycleData.lastPeriod) return;

    const lastPeriodDate = new Date(cycleData.lastPeriod);
    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(lastPeriodDate.getDate() + cycleData.cycleLength - 14);
    
    const fertileWindowStart = new Date(ovulationDate);
    fertileWindowStart.setDate(ovulationDate.getDate() - 5);
    
    const fertileWindowEnd = new Date(ovulationDate);
    fertileWindowEnd.setDate(ovulationDate.getDate() + 1);

    const today = new Date();
    const daysToOvulation = Math.ceil((ovulationDate - today) / (1000 * 60 * 60 * 24));

    // AI-powered fertility analysis
    const aiAnalysis = generateFertilityAnalysis(cycleData, daysToOvulation);

    setOvulationPrediction({
      ovulationDate: ovulationDate.toDateString(),
      fertileWindowStart: fertileWindowStart.toDateString(),
      fertileWindowEnd: fertileWindowEnd.toDateString(),
      daysToOvulation,
      aiAnalysis
    });
  };

  const generateFertilityAnalysis = (data, daysToOvulation) => {
    let analysis = `**AI Fertility Analysis:**\n\n`;
    
    if (daysToOvulation <= 0 && daysToOvulation >= -1) {
      analysis += `🎯 **Peak Fertility Window!**\nYou're in your most fertile period. This is the optimal time for conception.\n\n`;
    } else if (daysToOvulation > 0 && daysToOvulation <= 5) {
      analysis += `📅 **Approaching Fertile Window**\nYour fertile window starts in ${daysToOvulation} days. Prepare for optimal timing.\n\n`;
    } else {
      analysis += `📊 **Cycle Tracking**\nContinue monitoring your cycle. Next fertile window in ${daysToOvulation} days.\n\n`;
    }

    // Cervical mucus analysis
    if (data.cervicalMucus === 'egg-white') {
      analysis += `✨ **Optimal Cervical Mucus**\nYour cervical mucus indicates peak fertility - perfect for conception!\n\n`;
    } else if (data.cervicalMucus === 'watery') {
      analysis += `💧 **High Fertility Signs**\nWatery cervical mucus suggests approaching ovulation.\n\n`;
    }

    // Temperature analysis
    if (data.temperature) {
      const temp = parseFloat(data.temperature);
      if (temp > 98.0) {
        analysis += `🌡️ **Temperature Rise Detected**\nElevated BBT may indicate ovulation has occurred.\n\n`;
      }
    }

    analysis += `**Recommendations:**\n`;
    analysis += `• Have intercourse every other day during fertile window\n`;
    analysis += `• Continue tracking BBT and cervical mucus\n`;
    analysis += `• Maintain healthy lifestyle and reduce stress\n`;
    analysis += `• Consider ovulation predictor kits for confirmation\n`;

    return analysis;
  };

  const handleSymptomToggle = (symptom) => {
    setCycleData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Fertility Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your cycle, predict ovulation, and optimize your chances of conception with AI-powered insights.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Cycle Tracking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Cycle Data</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Last Period Start Date</label>
                <input
                  type="date"
                  value={cycleData.lastPeriod}
                  onChange={(e) => setCycleData({...cycleData, lastPeriod: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Average Cycle Length</label>
                <input
                  type="number"
                  value={cycleData.cycleLength}
                  onChange={(e) => setCycleData({...cycleData, cycleLength: parseInt(e.target.value)})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                  min="21" max="35"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Basal Body Temperature (°F)</label>
                <div className="relative">
                  <Thermometer className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={cycleData.temperature}
                    onChange={(e) => setCycleData({...cycleData, temperature: e.target.value})}
                    className="w-full pl-12 p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                    placeholder="97.0 - 99.0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Cervical Mucus</label>
                <div className="grid grid-cols-1 gap-2">
                  {cervicalMucusTypes.map(mucus => (
                    <button
                      key={mucus.type}
                      onClick={() => setCycleData({...cycleData, cervicalMucus: mucus.type})}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        cycleData.cervicalMucus === mucus.type
                          ? 'bg-emerald-100 border-emerald-500'
                          : 'bg-gray-50 border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="font-semibold capitalize">{mucus.type}</div>
                      <div className="text-sm text-gray-600">{mucus.desc}</div>
                      <div className={`text-xs font-semibold ${
                        mucus.fertility === 'Peak' ? 'text-red-600' :
                        mucus.fertility === 'High' ? 'text-orange-600' :
                        mucus.fertility === 'Medium' ? 'text-yellow-600' : 'text-gray-600'
                      }`}>
                        {mucus.fertility} Fertility
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Symptoms</label>
                <div className="grid grid-cols-2 gap-2">
                  {symptoms.map(symptom => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomToggle(symptom)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        cycleData.symptoms.includes(symptom)
                          ? 'bg-teal-100 text-teal-800 border-2 border-teal-300'
                          : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:border-teal-200'
                      }`}
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={predictOvulation}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                <Target className="w-5 h-5 inline mr-2" />
                Predict Ovulation & Get AI Analysis
              </button>
            </div>
          </motion.div>

          {/* Ovulation Prediction */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
          >
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-teal-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">AI Fertility Insights</h2>
            </div>

            {ovulationPrediction ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-emerald-800">Ovulation Prediction</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        {ovulationPrediction.daysToOvulation > 0 ? ovulationPrediction.daysToOvulation : 'Today!'}
                      </div>
                      <div className="text-sm text-emerald-700">Days to Ovulation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">6</div>
                      <div className="text-sm text-teal-700">Fertile Days</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div><strong>Fertile Window:</strong> {ovulationPrediction.fertileWindowStart} - {ovulationPrediction.fertileWindowEnd}</div>
                    <div><strong>Predicted Ovulation:</strong> {ovulationPrediction.ovulationDate}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
                  <pre className="whitespace-pre-wrap text-gray-700 font-medium leading-relaxed text-sm">
                    {ovulationPrediction.aiAnalysis}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter your cycle data and click "Predict Ovulation" to get AI-powered fertility insights.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Educational Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Optimize Your Fertility</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl">
              <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Perfect Timing</h3>
              <p className="text-gray-600">Have intercourse every other day during your 6-day fertile window</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl">
              <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Track Patterns</h3>
              <p className="text-gray-600">Monitor BBT, cervical mucus, and symptoms for accurate predictions</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
              <Brain className="w-12 h-12 text-cyan-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">AI Insights</h3>
              <p className="text-gray-600">Get personalized recommendations based on your unique cycle data</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FertilityTracker;
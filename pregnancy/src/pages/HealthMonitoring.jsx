import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, TrendingUp, AlertTriangle, Shield, Brain, Zap, Target, Bell, Calendar, Thermometer, Droplets } from 'lucide-react';

const HealthMonitoring = () => {
  const [currentWeek, setCurrentWeek] = useState(20);
  const [vitalSigns, setVitalSigns] = useState({
    bloodPressure: { systolic: 118, diastolic: 76, timestamp: new Date() },
    heartRate: { bpm: 78, timestamp: new Date() },
    weight: { kg: 65, timestamp: new Date() },
    temperature: { celsius: 36.8, timestamp: new Date() }
  });
  const [symptoms, setSymptoms] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const aiModels = {
    vitals: 'VitalSign-Monitor-AI-v4.3',
    risk: 'PregnancyRisk-Predictor-v3.9',
    symptom: 'SymptomAnalyzer-Maternal-v4.1',
    trend: 'HealthTrend-AI-v2.8',
    alert: 'SmartAlert-System-v3.2',
    prediction: 'ComplicationPredictor-v4.6'
  };

  const healthMetrics = {
    bloodPressure: {
      name: 'Blood Pressure',
      icon: Heart,
      color: 'red',
      gradient: 'from-red-400 to-pink-500',
      normal: { systolic: [90, 140], diastolic: [60, 90] },
      unit: 'mmHg',
      frequency: 'Daily',
      importance: 'Critical for detecting preeclampsia'
    },
    heartRate: {
      name: 'Heart Rate',
      icon: Activity,
      color: 'blue',
      gradient: 'from-blue-400 to-cyan-500',
      normal: [60, 100],
      unit: 'bpm',
      frequency: 'Daily',
      importance: 'Monitors cardiovascular adaptation'
    },
    weight: {
      name: 'Weight Gain',
      icon: TrendingUp,
      color: 'green',
      gradient: 'from-green-400 to-emerald-500',
      normal: { weekly: [0.2, 0.5] },
      unit: 'kg',
      frequency: 'Weekly',
      importance: 'Tracks healthy pregnancy progression'
    },
    temperature: {
      name: 'Body Temperature',
      icon: Thermometer,
      color: 'orange',
      gradient: 'from-orange-400 to-red-500',
      normal: [36.1, 37.2],
      unit: '°C',
      frequency: 'As needed',
      importance: 'Detects infections and fever'
    }
  };

  const riskFactors = {
    preeclampsia: {
      name: 'Preeclampsia Risk',
      indicators: ['High BP', 'Protein in urine', 'Severe headaches', 'Vision changes'],
      severity: 'High',
      monitoring: 'Daily BP, weekly urine tests',
      aiModel: aiModels.risk
    },
    gestationalDiabetes: {
      name: 'Gestational Diabetes',
      indicators: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
      severity: 'Moderate',
      monitoring: 'Blood glucose testing',
      aiModel: aiModels.prediction
    },
    pretermLabor: {
      name: 'Preterm Labor Risk',
      indicators: ['Regular contractions', 'Pelvic pressure', 'Back pain', 'Fluid leakage'],
      severity: 'High',
      monitoring: 'Contraction tracking, cervical checks',
      aiModel: aiModels.symptom
    },
    anemia: {
      name: 'Iron Deficiency Anemia',
      indicators: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath'],
      severity: 'Moderate',
      monitoring: 'Regular blood tests',
      aiModel: aiModels.vitals
    }
  };

  const weeklyTargets = {
    20: {
      bloodPressure: { systolic: [100, 130], diastolic: [60, 85] },
      heartRate: [70, 90],
      weightGain: { total: [4.5, 6.8], weekly: [0.3, 0.5] },
      symptoms: ['Round ligament pain', 'Heartburn', 'Increased appetite'],
      tests: ['Anatomy scan', 'Blood work if needed']
    },
    24: {
      bloodPressure: { systolic: [100, 135], diastolic: [60, 85] },
      heartRate: [75, 95],
      weightGain: { total: [5.9, 9.1], weekly: [0.3, 0.5] },
      symptoms: ['Glucose screening', 'Possible gestational diabetes test'],
      tests: ['Glucose tolerance test', 'Blood count']
    },
    28: {
      bloodPressure: { systolic: [100, 135], diastolic: [60, 85] },
      heartRate: [75, 100],
      weightGain: { total: [7.7, 11.3], weekly: [0.3, 0.5] },
      symptoms: ['Third trimester begins', 'Shortness of breath'],
      tests: ['RhoGAM if Rh negative', 'Blood work']
    },
    32: {
      bloodPressure: { systolic: [100, 140], diastolic: [60, 90] },
      heartRate: [80, 100],
      weightGain: { total: [9.5, 13.6], weekly: [0.3, 0.5] },
      symptoms: ['Braxton Hicks contractions', 'Swelling'],
      tests: ['Growth scan if needed', 'Blood pressure monitoring']
    },
    36: {
      bloodPressure: { systolic: [100, 140], diastolic: [60, 90] },
      heartRate: [80, 105],
      weightGain: { total: [11.3, 15.9], weekly: [0.2, 0.5] },
      symptoms: ['Pelvic pressure', 'Frequent urination'],
      tests: ['GBS screening', 'Weekly appointments begin']
    }
  };

  const generateHealthInsights = () => {
    const currentTargets = weeklyTargets[currentWeek] || weeklyTargets[20];
    const insights = {
      overall: assessOverallHealth(),
      riskAssessment: assessRisks(),
      trends: analyzeTrends(),
      recommendations: generateRecommendations(),
      alerts: generateAlerts(),
      predictions: generatePredictions()
    };
    return insights;
  };

  const assessOverallHealth = () => {
    let score = 100;
    let factors = [];

    // Blood pressure assessment
    const bp = vitalSigns.bloodPressure;
    if (bp.systolic > 140 || bp.diastolic > 90) {
      score -= 30;
      factors.push('Elevated blood pressure');
    } else if (bp.systolic > 130 || bp.diastolic > 85) {
      score -= 15;
      factors.push('Borderline high blood pressure');
    }

    // Heart rate assessment
    const hr = vitalSigns.heartRate.bpm;
    if (hr > 100 || hr < 60) {
      score -= 10;
      factors.push('Heart rate outside normal range');
    }

    // Temperature assessment
    const temp = vitalSigns.temperature.celsius;
    if (temp > 37.5) {
      score -= 20;
      factors.push('Elevated temperature');
    }

    return {
      score: Math.max(score, 0),
      status: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Attention',
      factors: factors
    };
  };

  const assessRisks = () => {
    const risks = [];
    const bp = vitalSigns.bloodPressure;

    if (bp.systolic >= 140 || bp.diastolic >= 90) {
      risks.push({
        condition: 'Preeclampsia',
        risk: 'High',
        recommendation: 'Immediate medical consultation required'
      });
    }

    if (vitalSigns.temperature.celsius > 37.5) {
      risks.push({
        condition: 'Infection',
        risk: 'Moderate',
        recommendation: 'Monitor temperature, consult if persists'
      });
    }

    return risks;
  };

  const analyzeTrends = () => {
    // Simulated trend analysis
    return {
      bloodPressure: {
        trend: 'stable',
        change: '+2 mmHg over last week',
        prediction: 'Likely to remain stable'
      },
      weight: {
        trend: 'increasing',
        change: '+0.4 kg this week',
        prediction: 'On track for healthy weight gain'
      },
      heartRate: {
        trend: 'stable',
        change: 'No significant change',
        prediction: 'Normal adaptation to pregnancy'
      }
    };
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const bp = vitalSigns.bloodPressure;

    if (bp.systolic > 130) {
      recommendations.push({
        category: 'Blood Pressure',
        action: 'Reduce sodium intake, increase rest periods',
        priority: 'High'
      });
    }

    recommendations.push({
      category: 'General',
      action: 'Continue daily monitoring and prenatal vitamins',
      priority: 'Medium'
    });

    return recommendations;
  };

  const generateAlerts = () => {
    const newAlerts = [];
    const bp = vitalSigns.bloodPressure;

    if (bp.systolic >= 140 || bp.diastolic >= 90) {
      newAlerts.push({
        id: Date.now(),
        type: 'critical',
        message: 'Blood pressure elevated - contact healthcare provider',
        timestamp: new Date(),
        action: 'Call doctor immediately'
      });
    }

    if (vitalSigns.temperature.celsius > 37.5) {
      newAlerts.push({
        id: Date.now() + 1,
        type: 'warning',
        message: 'Elevated temperature detected',
        timestamp: new Date(),
        action: 'Monitor and rest, call if persists'
      });
    }

    return newAlerts;
  };

  const generatePredictions = () => {
    return {
      nextWeek: {
        bloodPressure: 'Likely to remain stable with current management',
        weight: 'Expected gain of 0.3-0.5 kg',
        complications: 'Low risk based on current trends'
      },
      delivery: {
        riskLevel: 'Low',
        predictedComplications: 'None identified',
        recommendations: 'Continue current monitoring protocol'
      }
    };
  };

  const [healthInsights, setHealthInsights] = useState(generateHealthInsights());

  useEffect(() => {
    setHealthInsights(generateHealthInsights());
    const newAlerts = generateAlerts();
    setAlerts(prev => [...prev, ...newAlerts]);
  }, [vitalSigns, currentWeek]);

  const updateVitalSign = (type, value) => {
    setVitalSigns(prev => ({
      ...prev,
      [type]: { ...value, timestamp: new Date() }
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-50';
      case 'Good': return 'text-blue-600 bg-blue-50';
      case 'Fair': return 'text-yellow-600 bg-yellow-50';
      case 'Needs Attention': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Health Monitoring Center
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive pregnancy health monitoring with AI-powered insights and real-time alerts
          </p>
        </motion.div>

        {/* AI Models Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-xl"
        >
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">AI Health Monitoring Models</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(aiModels).map(([key, model]) => (
              <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-200">
                <div className="text-xs text-blue-600 font-semibold uppercase">{key}</div>
                <div className="text-sm text-gray-700 font-mono">{model}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active Alerts */}
        <AnimatePresence>
          {alerts.filter(alert => alert.type === 'critical').map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-6 bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2 animate-pulse" />
                  <div>
                    <div className="font-semibold">{alert.message}</div>
                    <div className="text-sm opacity-90">{alert.action}</div>
                  </div>
                </div>
                <button
                  onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                  className="text-white/80 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Overall Health Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Overall Health Status</h2>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-600">{healthInsights.overall.score}</div>
              <div className="text-sm text-gray-500">Health Score</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl ${getStatusColor(healthInsights.overall.status)}`}>
              <h3 className="text-xl font-semibold mb-2">Current Status</h3>
              <p className="text-2xl font-bold">{healthInsights.overall.status}</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Week {currentWeek}</h3>
              <p className="text-blue-700">Pregnancy monitoring active</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-purple-800 mb-2">AI Analysis</h3>
              <p className="text-purple-700">Real-time monitoring active</p>
            </div>
          </div>

          {healthInsights.overall.factors.length > 0 && (
            <div className="mt-6 bg-yellow-50 rounded-xl p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Areas for Attention:</h4>
              <ul className="space-y-1">
                {healthInsights.overall.factors.map((factor, idx) => (
                  <li key={idx} className="flex items-center text-yellow-700">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Vital Signs Monitoring */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <Activity className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-3xl font-bold text-gray-800">Vital Signs</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(healthMetrics).map(([key, metric]) => (
                  <div key={key} className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-xl p-6 border border-${metric.color}-200`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <metric.icon className={`w-6 h-6 text-${metric.color}-600 mr-2`} />
                        <h4 className={`font-semibold text-${metric.color}-800`}>{metric.name}</h4>
                      </div>
                      <span className={`text-xs bg-${metric.color}-200 text-${metric.color}-800 px-2 py-1 rounded`}>
                        {metric.frequency}
                      </span>
                    </div>

                    <div className="mb-4">
                      {key === 'bloodPressure' ? (
                        <div className="text-3xl font-bold text-gray-800">
                          {vitalSigns.bloodPressure.systolic}/{vitalSigns.bloodPressure.diastolic}
                        </div>
                      ) : key === 'heartRate' ? (
                        <div className="text-3xl font-bold text-gray-800">
                          {vitalSigns.heartRate.bpm}
                        </div>
                      ) : key === 'weight' ? (
                        <div className="text-3xl font-bold text-gray-800">
                          {vitalSigns.weight.kg}
                        </div>
                      ) : (
                        <div className="text-3xl font-bold text-gray-800">
                          {vitalSigns.temperature.celsius}
                        </div>
                      )}
                      <div className="text-sm text-gray-600">{metric.unit}</div>
                    </div>

                    <div className="text-xs text-gray-500 mb-3">
                      Last updated: {vitalSigns[key].timestamp.toLocaleTimeString()}
                    </div>

                    <div className={`text-xs text-${metric.color}-700 bg-${metric.color}-200 rounded p-2`}>
                      {metric.importance}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Risk Assessment */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-red-600 mr-3" />
                <h3 className="text-3xl font-bold text-gray-800">Risk Assessment</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(riskFactors).map(([key, risk]) => (
                  <div key={key} className={`rounded-xl p-6 border ${
                    risk.severity === 'High' ? 'bg-red-50 border-red-200' :
                    risk.severity === 'Moderate' ? 'bg-orange-50 border-orange-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className={`font-semibold ${
                        risk.severity === 'High' ? 'text-red-800' :
                        risk.severity === 'Moderate' ? 'text-orange-800' :
                        'text-green-800'
                      }`}>
                        {risk.name}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${
                        risk.severity === 'High' ? 'bg-red-200 text-red-800' :
                        risk.severity === 'Moderate' ? 'bg-orange-200 text-orange-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Indicators:</h5>
                      <ul className="text-xs space-y-1">
                        {risk.indicators.map((indicator, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-xs text-gray-600 mb-2">
                      <strong>Monitoring:</strong> {risk.monitoring}
                    </div>
                    <div className="text-xs text-blue-600">
                      AI Model: {risk.aiModel}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Health Trends */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
                <h3 className="text-3xl font-bold text-gray-800">Health Trends</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(healthInsights.trends).map(([metric, trend]) => (
                  <div key={metric} className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h4 className="font-semibold text-green-800 capitalize mb-3">{metric.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Trend: </span>
                        <span className="text-green-700 capitalize">{trend.trend}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Change: </span>
                        <span className="text-green-700">{trend.change}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Prediction: </span>
                        <span className="text-green-700">{trend.prediction}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - AI Insights & Recommendations */}
          <div className="space-y-8">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Brain className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">AI Recommendations</h3>
              </div>

              <div className="space-y-3">
                {healthInsights.recommendations.map((rec, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${
                    rec.priority === 'High' ? 'bg-red-50 border-red-200' :
                    rec.priority === 'Medium' ? 'bg-orange-50 border-orange-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-semibold ${
                        rec.priority === 'High' ? 'text-red-800' :
                        rec.priority === 'Medium' ? 'text-orange-800' :
                        'text-green-800'
                      }`}>
                        {rec.category}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${
                        rec.priority === 'High' ? 'bg-red-200 text-red-800' :
                        rec.priority === 'Medium' ? 'bg-orange-200 text-orange-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      rec.priority === 'High' ? 'text-red-700' :
                      rec.priority === 'Medium' ? 'text-orange-700' :
                      'text-green-700'
                    }`}>
                      {rec.action}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Predictions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">AI Predictions</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-3">Next Week Forecast:</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(healthInsights.predictions.nextWeek).map(([key, prediction]) => (
                      <div key={key}>
                        <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                        <span className="text-yellow-700">{prediction}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Delivery Outlook:</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(healthInsights.predictions.delivery).map(([key, prediction]) => (
                      <div key={key}>
                        <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                        <span className="text-blue-700">{prediction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <Bell className="w-6 h-6 text-indigo-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Quick Actions</h3>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-black py-3 rounded-xl hover:shadow-lg transition-all">
                  Log New Vitals
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-black py-3 rounded-xl hover:shadow-lg transition-all">
                  Export Health Report
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-black py-3 rounded-xl hover:shadow-lg transition-all">
                  Schedule Check-up
                </button>
                <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition-all">
                  Contact Healthcare Provider
                </button>
              </div>
            </motion.div>

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 rounded-3xl p-6 border border-red-200"
            >
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                <h3 className="text-xl font-bold text-red-800">Emergency Contacts</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">Healthcare Provider:</span>
                  <span className="font-semibold text-red-800">(555) 123-4567</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Hospital L&D:</span>
                  <span className="font-semibold text-red-800">(555) 987-6543</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-700">Emergency:</span>
                  <span className="font-semibold text-red-800">911</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Call Immediately If:</h4>
                <ul className="text-xs text-red-700 space-y-1">
                  <li>• Severe headaches with vision changes</li>
                  <li>• Blood pressure 140/90</li>
                  <li>• Severe abdominal pain</li>
                  <li>• Heavy bleeding or fluid leakage</li>
                  <li>• Decreased fetal movement</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoring;
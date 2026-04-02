import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, TrendingUp, AlertTriangle, Shield, Brain, Zap, Target, Bell, Calendar, Thermometer } from 'lucide-react';
import CareOverviewPanel from '../components/CareOverviewPanel.jsx';

const HealthMonitoring = () => {
  const [currentWeek] = useState(20);
  const [vitalSigns] = useState({
    bloodPressure: { systolic: 118, diastolic: 76, timestamp: new Date() },
    heartRate: { bpm: 78, timestamp: new Date() },
    weight: { kg: 65, timestamp: new Date() },
    temperature: { celsius: 36.8, timestamp: new Date() },
  });
  const [alerts, setAlerts] = useState([]);

  const aiModels = {
    vitals: 'VitalSign-Monitor-AI-v4.3',
    risk: 'PregnancyRisk-Predictor-v3.9',
    symptom: 'SymptomAnalyzer-Maternal-v4.1',
    trend: 'HealthTrend-AI-v2.8',
    alert: 'SmartAlert-System-v3.2',
    prediction: 'ComplicationPredictor-v4.6',
  };

  const healthMetrics = [
    {
      key: 'bloodPressure',
      name: 'Blood Pressure',
      icon: Heart,
      value: `${vitalSigns.bloodPressure.systolic}/${vitalSigns.bloodPressure.diastolic}`,
      unit: 'mmHg',
      frequency: 'Daily',
      importance: 'Critical for watching preeclampsia risk and sudden blood pressure changes.',
      tone: 'rose',
    },
    {
      key: 'heartRate',
      name: 'Heart Rate',
      icon: Activity,
      value: vitalSigns.heartRate.bpm,
      unit: 'bpm',
      frequency: 'Daily',
      importance: 'Tracks cardiovascular adaptation as pregnancy progresses.',
      tone: 'mauve',
    },
    {
      key: 'weight',
      name: 'Weight Gain',
      icon: TrendingUp,
      value: vitalSigns.weight.kg,
      unit: 'kg',
      frequency: 'Weekly',
      importance: 'Helps confirm steady pregnancy progression without overloading the screen.',
      tone: 'sage',
    },
    {
      key: 'temperature',
      name: 'Body Temperature',
      icon: Thermometer,
      value: vitalSigns.temperature.celsius,
      unit: '°C',
      frequency: 'As needed',
      importance: 'Useful for spotting infection or fever patterns early.',
      tone: 'warm',
    },
  ];

  const riskFactors = [
    {
      name: 'Preeclampsia Risk',
      indicators: ['High BP', 'Protein in urine', 'Severe headaches', 'Vision changes'],
      severity: 'High',
      monitoring: 'Daily blood pressure, weekly urine checks',
      aiModel: aiModels.risk,
    },
    {
      name: 'Gestational Diabetes',
      indicators: ['Excessive thirst', 'Frequent urination', 'Fatigue', 'Blurred vision'],
      severity: 'Moderate',
      monitoring: 'Glucose screening and meal pattern review',
      aiModel: aiModels.prediction,
    },
    {
      name: 'Preterm Labor Risk',
      indicators: ['Regular contractions', 'Pelvic pressure', 'Back pain', 'Fluid leakage'],
      severity: 'High',
      monitoring: 'Symptom logging, contraction timing, clinician follow-up',
      aiModel: aiModels.symptom,
    },
    {
      name: 'Iron Deficiency Anemia',
      indicators: ['Fatigue', 'Weakness', 'Pale skin', 'Shortness of breath'],
      severity: 'Moderate',
      monitoring: 'Routine labs and iron support review',
      aiModel: aiModels.vitals,
    },
  ];

  const assessOverallHealth = () => {
    let score = 100;
    const factors = [];
    const bp = vitalSigns.bloodPressure;
    const hr = vitalSigns.heartRate.bpm;
    const temp = vitalSigns.temperature.celsius;

    if (bp.systolic > 140 || bp.diastolic > 90) {
      score -= 30;
      factors.push('Elevated blood pressure');
    } else if (bp.systolic > 130 || bp.diastolic > 85) {
      score -= 15;
      factors.push('Borderline high blood pressure');
    }

    if (hr > 100 || hr < 60) {
      score -= 10;
      factors.push('Heart rate outside normal range');
    }

    if (temp > 37.5) {
      score -= 20;
      factors.push('Elevated temperature');
    }

    return {
      score: Math.max(score, 0),
      status: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Attention',
      factors,
    };
  };

  const assessRisks = () => {
    const risks = [];
    const bp = vitalSigns.bloodPressure;

    if (bp.systolic >= 140 || bp.diastolic >= 90) {
      risks.push({
        condition: 'Preeclampsia',
        risk: 'High',
        recommendation: 'Immediate medical consultation required',
      });
    }

    if (vitalSigns.temperature.celsius > 37.5) {
      risks.push({
        condition: 'Infection',
        risk: 'Moderate',
        recommendation: 'Monitor temperature, hydrate, and contact your clinician if it persists',
      });
    }

    return risks;
  };

  const analyzeTrends = () => ({
    bloodPressure: {
      trend: 'stable',
      change: '+2 mmHg over last week',
      prediction: 'Likely to remain steady with current routine',
    },
    weight: {
      trend: 'increasing',
      change: '+0.4 kg this week',
      prediction: 'On track for healthy pregnancy gain',
    },
    heartRate: {
      trend: 'stable',
      change: 'No significant change',
      prediction: 'Normal pregnancy adaptation',
    },
  });

  const generateRecommendations = () => {
    const recommendations = [];

    if (vitalSigns.bloodPressure.systolic > 130) {
      recommendations.push({
        category: 'Blood pressure',
        action: 'Reduce sodium, add rest windows, and bring recent readings to your next visit.',
        priority: 'High',
      });
    }

    recommendations.push({
      category: 'Daily rhythm',
      action: 'Keep logging vitals, hydration, and symptoms in one consistent daily check-in.',
      priority: 'Medium',
    });

    return recommendations;
  };

  const generateAlerts = () => {
    const nextAlerts = [];

    if (vitalSigns.bloodPressure.systolic >= 140 || vitalSigns.bloodPressure.diastolic >= 90) {
      nextAlerts.push({
        id: Date.now(),
        type: 'critical',
        message: 'Blood pressure is elevated.',
        action: 'Contact your healthcare provider now.',
      });
    }

    if (vitalSigns.temperature.celsius > 37.5) {
      nextAlerts.push({
        id: Date.now() + 1,
        type: 'warning',
        message: 'Temperature is above your usual range.',
        action: 'Rest, monitor again, and call if it continues.',
      });
    }

    return nextAlerts;
  };

  const generatePredictions = () => ({
    nextWeek: {
      bloodPressure: 'Likely to remain stable with current monitoring.',
      weight: 'Expected gain of 0.3 to 0.5 kg.',
      complications: 'Low risk based on current patterns.',
    },
    delivery: {
      riskLevel: 'Low',
      predictedComplications: 'No clear complication signal identified.',
      recommendations: 'Continue current monitoring rhythm and follow-up appointments.',
    },
  });

  const generateHealthInsights = () => ({
    overall: assessOverallHealth(),
    riskAssessment: assessRisks(),
    trends: analyzeTrends(),
    recommendations: generateRecommendations(),
    alerts: generateAlerts(),
    predictions: generatePredictions(),
  });

  const [healthInsights, setHealthInsights] = useState(generateHealthInsights());

  useEffect(() => {
    const nextInsights = generateHealthInsights();
    setHealthInsights(nextInsights);
    setAlerts(nextInsights.alerts);
  }, []);

  const getStatusTone = (status) => {
    if (status === 'Excellent') return 'bg-[#edf5ef] text-[#365a49] dark:bg-[#163226] dark:text-[#b8d8c8]';
    if (status === 'Good') return 'bg-[#f7e7ee] text-[#8e6074] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]';
    if (status === 'Fair') return 'bg-[#f9efe7] text-[#9f6e3b] dark:bg-[#3c2918] dark:text-[#f2d2a6]';
    return 'bg-[#f8e8e8] text-[#a45b64] dark:bg-[#3a1b1f] dark:text-[#f0bcc4]';
  };

  const getPriorityTone = (priority) => {
    if (priority === 'High') return 'bg-[#f8e8e8] text-[#a45b64] dark:bg-[#3a1b1f] dark:text-[#f0bcc4]';
    if (priority === 'Medium') return 'bg-[#f9efe7] text-[#9f6e3b] dark:bg-[#3c2918] dark:text-[#f2d2a6]';
    return 'bg-[#edf5ef] text-[#365a49] dark:bg-[#163226] dark:text-[#b8d8c8]';
  };

  const getMetricTone = (tone) => {
    if (tone === 'rose') return 'from-[#fff8fb] to-[#fbeaf1] border-[#eed4df] dark:from-[#24131b] dark:to-[#1c1016] dark:border-white/10';
    if (tone === 'mauve') return 'from-[#fff8fc] to-[#f5edf9] border-[#eadde8] dark:from-[#221621] dark:to-[#1a121d] dark:border-white/10';
    if (tone === 'sage') return 'from-[#f7fbf7] to-[#edf5ef] border-[#dceadf] dark:from-[#15201a] dark:to-[#101814] dark:border-white/10';
    return 'from-[#fff9f2] to-[#f9efe7] border-[#eddcc8] dark:from-[#231a14] dark:to-[#1b140f] dark:border-white/10';
  };

  return (
    <div className="page-shell max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--care-border)] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#9f5874] shadow-sm dark:bg-white/5 dark:text-[#dfc4cf]">
            <Shield className="h-4 w-4" />
            Health monitor
          </div>
          <h1 className="mt-5 bg-gradient-to-r from-[#a96f86] via-[#8f7287] to-[#d39ab0] bg-clip-text text-4xl font-semibold tracking-[-0.05em] text-transparent sm:text-5xl lg:text-6xl">
            Professional monitoring with a calmer maternal interface
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-body sm:text-lg">
            Vitals, risks, recommendations, and alerts are organized into the same care-focused system used across the rest of MomBuddy.
          </p>
        </motion.div>

        <CareOverviewPanel
          className="mt-8"
          title="Monitoring overview"
          week={`Week ${currentWeek}`}
          summary="The same weekly snapshot stays visible while you review vitals, risks, and recommendations."
        />

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-10 surface-glass p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--care-text)] dark:text-white">AI health models</h2>
              <p className="mt-2 text-sm text-muted">The same monitoring layer behind vitals, trend analysis, and guidance.</p>
            </div>
            <div className="rounded-full bg-[#f7e7ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9f5874] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]">
              Week {currentWeek} active
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {Object.entries(aiModels).map(([key, model]) => (
              <div key={key} className="surface-muted rounded-2xl p-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9f5874] dark:text-[#dfc4cf]">{key}</div>
                <div className="mt-1 text-sm text-body">{model}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {alerts.filter((alert) => alert.type === 'critical').map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 rounded-[1.75rem] border border-[#edc8ce] bg-[linear-gradient(135deg,#fff6f6,#fbeaec)] p-5 shadow-[0_20px_45px_-28px_rgba(164,91,100,0.35)] dark:border-[#4a242a] dark:bg-[linear-gradient(135deg,#2b1418,#241015)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a45b64] text-white shadow-sm">
                    <AlertTriangle className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#7b2f3a] dark:text-[#f0bcc4]">{alert.message}</div>
                    <div className="mt-1 text-sm text-[#9c5a63] dark:text-[#e6aeb8]">{alert.action}</div>
                  </div>
                </div>
                <button type="button" onClick={() => setAlerts((prev) => prev.filter((item) => item.id !== alert.id))} className="rounded-xl p-2 text-[#9c5a63] transition hover:bg-white/70 dark:hover:bg-white/5">
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-8 card-surface p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#d9b2c1,#b27d93)] text-white shadow-sm">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-[var(--care-text)] dark:text-white">Overall health status</h2>
                <p className="mt-2 text-sm text-muted">A simpler summary card that surfaces the next thing to care about first.</p>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-[#f7e7ee] px-5 py-4 text-center dark:bg-[#3a1e2c]">
              <div className="text-3xl font-semibold text-[#8e6074] dark:text-[#dfc4cf]">{healthInsights.overall.score}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted">Health score</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className={`rounded-[1.5rem] p-5 ${getStatusTone(healthInsights.overall.status)}`}>
              <div className="text-sm uppercase tracking-[0.18em]">Current status</div>
              <div className="mt-2 text-2xl font-semibold">{healthInsights.overall.status}</div>
            </div>
            <div className="surface-muted rounded-[1.5rem] p-5">
              <div className="text-sm uppercase tracking-[0.18em] text-muted">Pregnancy week</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--care-text)] dark:text-white">Week {currentWeek}</div>
              <div className="mt-1 text-sm text-muted">Monitoring and reminder rhythm active</div>
            </div>
            <div className="surface-muted rounded-[1.5rem] p-5">
              <div className="text-sm uppercase tracking-[0.18em] text-muted">Analysis mode</div>
              <div className="mt-2 text-2xl font-semibold text-[var(--care-text)] dark:text-white">Real-time review</div>
              <div className="mt-1 text-sm text-muted">Clinician-friendly summaries enabled</div>
            </div>
          </div>

          {healthInsights.overall.factors.length > 0 && (
            <div className="mt-6 rounded-[1.5rem] bg-[#f9efe7] p-5 dark:bg-[#3c2918]">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9f6e3b] dark:text-[#f2d2a6]">Areas for attention</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#8a6540] dark:text-[#f2d2a6]">
                {healthInsights.overall.factors.map((factor, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.55fr_0.75fr]">
          <div className="space-y-8">
            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d9b2c1,#b27d93)] text-white">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--care-text)] dark:text-white">Vital signs</h3>
                  <p className="text-sm text-muted">Readable cards that prioritize what matters first.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {healthMetrics.map((metric) => (
                  <div key={metric.key} className={`rounded-[1.75rem] border bg-gradient-to-br p-6 ${getMetricTone(metric.tone)}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-[#9f5874] shadow-sm dark:bg-white/10 dark:text-[#dfc4cf]">
                          <metric.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--care-text)] dark:text-white">{metric.name}</h4>
                          <div className="text-sm text-muted">{metric.frequency}</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#8e6074] shadow-sm dark:bg-white/10 dark:text-[#dfc4cf]">
                        {metric.unit}
                      </span>
                    </div>
                    <div className="mt-5 text-4xl font-semibold text-[var(--care-text)] dark:text-white">{metric.value}</div>
                    <div className="mt-2 text-xs text-muted">Updated {vitalSigns[metric.key].timestamp.toLocaleTimeString()}</div>
                    <p className="mt-4 text-sm leading-7 text-body">{metric.importance}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="card-surface p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f0c6d6,#c692a7)] text-white">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--care-text)] dark:text-white">Risk assessment</h3>
                  <p className="text-sm text-muted">Clinical context stays visible without becoming visually aggressive.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {riskFactors.map((risk) => (
                  <div key={risk.name} className="surface-muted rounded-[1.75rem] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">{risk.name}</h4>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${getPriorityTone(risk.severity)}`}>
                        {risk.severity}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium text-[var(--care-text)] dark:text-white">Key indicators</div>
                      <ul className="mt-3 space-y-2 text-sm text-body">
                        {risk.indicators.map((indicator) => (
                          <li key={indicator} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#b27d93]" />
                            {indicator}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 text-sm text-body">
                      <span className="font-semibold text-[var(--care-text)] dark:text-white">Monitoring:</span> {risk.monitoring}
                    </div>
                    <div className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-[#8e6074] dark:text-[#dfc4cf]">Model: {risk.aiModel}</div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }} className="card-surface p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#a7c9b8,#4b7561)] text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--care-text)] dark:text-white">Health trends</h3>
                  <p className="text-sm text-muted">Simple trajectory cards for recurring metrics.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {Object.entries(healthInsights.trends).map(([metric, trend]) => (
                  <div key={metric} className="rounded-[1.75rem] bg-[#edf5ef] p-6 dark:bg-[#163226]">
                    <h4 className="text-lg font-semibold capitalize text-[#365a49] dark:text-[#b8d8c8]">{metric.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <span className="font-semibold text-[var(--care-text)] dark:text-white">Trend:</span>{' '}
                        <span className="text-[#365a49] capitalize dark:text-[#b8d8c8]">{trend.trend}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--care-text)] dark:text-white">Change:</span>{' '}
                        <span className="text-[#365a49] dark:text-[#b8d8c8]">{trend.change}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--care-text)] dark:text-white">Prediction:</span>{' '}
                        <span className="text-[#365a49] dark:text-[#b8d8c8]">{trend.prediction}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="space-y-8">
            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d9b2c1,#b27d93)] text-white">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">AI recommendations</h3>
                  <p className="text-sm text-muted">Actionable next steps with softer clinical emphasis.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {healthInsights.recommendations.map((rec, index) => (
                  <div key={index} className="surface-muted rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-semibold text-[var(--care-text)] dark:text-white">{rec.category}</h4>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${getPriorityTone(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-body">{rec.action}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="card-surface p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5d7b2,#d0a06d)] text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">Predictions</h3>
                  <p className="text-sm text-muted">Short, readable forecast blocks for the next week and delivery outlook.</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-[1.5rem] bg-[#f9efe7] p-4 dark:bg-[#3c2918]">
                  <h4 className="font-semibold text-[#9f6e3b] dark:text-[#f2d2a6]">Next week forecast</h4>
                  <div className="mt-3 space-y-2 text-sm text-[#8a6540] dark:text-[#f2d2a6]">
                    {Object.entries(healthInsights.predictions.nextWeek).map(([key, prediction]) => (
                      <div key={key}>
                        <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {prediction}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-[#f7e7ee] p-4 dark:bg-[#3a1e2c]">
                  <h4 className="font-semibold text-[#8e6074] dark:text-[#dfc4cf]">Delivery outlook</h4>
                  <div className="mt-3 space-y-2 text-sm text-[#8e6074] dark:text-[#dfc4cf]">
                    {Object.entries(healthInsights.predictions.delivery).map(([key, prediction]) => (
                      <div key={key}>
                        <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span> {prediction}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.16 }} className="card-surface p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#c28aa0,#9f5874)] text-white">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">Quick actions</h3>
                  <p className="text-sm text-muted">Production-style shortcuts using the same visual language.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl bg-[linear-gradient(135deg,#c28aa0,#9f5874)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(159,88,116,0.5)] transition hover:-translate-y-0.5">
                  Log new vitals
                </button>
                <button className="w-full rounded-2xl bg-[linear-gradient(135deg,#a7c9b8,#4b7561)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(75,117,97,0.5)] transition hover:-translate-y-0.5">
                  Export health report
                </button>
                <button className="w-full rounded-2xl bg-[linear-gradient(135deg,#d0a06d,#9f6e3b)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(159,110,59,0.5)] transition hover:-translate-y-0.5">
                  Schedule check-up
                </button>
                <button className="w-full rounded-2xl border border-[var(--care-border)] bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--care-text)] transition hover:bg-[var(--care-surface-muted)] dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
                  Contact healthcare provider
                </button>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.24 }} className="rounded-[2rem] border border-[#edc8ce] bg-[linear-gradient(180deg,#fff8f8,#fbeaed)] p-6 shadow-[0_18px_40px_-28px_rgba(164,91,100,0.28)] dark:border-[#4a242a] dark:bg-[linear-gradient(180deg,#2b1418,#221014)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#a45b64] text-white">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#7b2f3a] dark:text-[#f0bcc4]">Emergency contacts</h3>
                  <p className="text-sm text-[#9c5a63] dark:text-[#e6aeb8]">Keep urgent care details visible when you need them fast.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between text-[#8c4750] dark:text-[#f0bcc4]">
                  <span>Healthcare provider</span>
                  <span className="font-semibold">(555) 123-4567</span>
                </div>
                <div className="flex items-center justify-between text-[#8c4750] dark:text-[#f0bcc4]">
                  <span>Hospital L&amp;D</span>
                  <span className="font-semibold">(555) 987-6543</span>
                </div>
                <div className="flex items-center justify-between text-[#8c4750] dark:text-[#f0bcc4]">
                  <span>Emergency</span>
                  <span className="font-semibold">911</span>
                </div>
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-white/75 p-4 dark:bg-white/5">
                <h4 className="font-semibold text-[#7b2f3a] dark:text-[#f0bcc4]">Call immediately if</h4>
                <ul className="mt-3 space-y-2 text-sm text-[#8c4750] dark:text-[#f0bcc4]">
                  <li>Severe headaches with vision changes</li>
                  <li>Blood pressure reaches 140/90 or higher</li>
                  <li>Heavy bleeding, severe pain, or fluid leakage</li>
                  <li>Decreased fetal movement</li>
                </ul>
              </div>
            </motion.section>
          </div>
        </div>

        {healthInsights.riskAssessment.length > 0 && (
          <div className="mt-8 rounded-[1.75rem] border border-[#edc8ce] bg-[linear-gradient(180deg,#fff8f8,#fbeaed)] p-5 dark:border-[#4a242a] dark:bg-[linear-gradient(180deg,#2b1418,#221014)]">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#a45b64] dark:text-[#f0bcc4]" />
              <h3 className="text-lg font-semibold text-[#7b2f3a] dark:text-[#f0bcc4]">Immediate risk notes</h3>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {healthInsights.riskAssessment.map((risk) => (
                <div key={risk.condition} className="rounded-[1.25rem] bg-white/75 p-4 dark:bg-white/5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-[#7b2f3a] dark:text-[#f0bcc4]">{risk.condition}</div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${getPriorityTone(risk.risk)}`}>{risk.risk}</span>
                  </div>
                  <p className="mt-2 text-sm text-[#8c4750] dark:text-[#f0bcc4]">{risk.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthMonitoring;

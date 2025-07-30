import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Baby, Calendar, MessageCircle, Users, BookOpen, Brain, Dna, Play, Star, Sparkles, Sun, Moon, Leaf, Shield, Target, ArrowRight, CheckCircle, TrendingUp, Award, Zap } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "Your AI Pregnancy Partner",
      subtitle: "From Dream to Reality",
      description: "Personalized guidance every step of your journey to motherhood",
      gradient: "from-rose-500 via-pink-500 to-purple-600",
      bgGradient: "from-rose-100 to-purple-200",
      icon: Sparkles,
      stats: { success: "98%", mothers: "50K+", models: "15+" }
    },
    {
      title: "Natural Birth Success",
      subtitle: "70% C-Section Reduction",
      description: "Evidence-based protocols for your natural delivery dream",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      bgGradient: "from-emerald-100 to-cyan-200",
      icon: Leaf,
      stats: { natural: "85%", vbac: "90%", satisfaction: "96%" }
    },
    {
      title: "Smart Health Insights",
      subtitle: "AI-Powered Precision Care",
      description: "Advanced monitoring with 15+ specialized AI models",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      bgGradient: "from-blue-100 to-purple-200",
      icon: Brain,
      stats: { accuracy: "99%", predictions: "94%", alerts: "24/7" }
    }
  ];

  const pregnancyGoals = [
    {
      id: 'planning',
      title: 'Planning to Conceive',
      description: 'Optimize your health for conception',
      icon: Target,
      color: 'rose',
      gradient: 'from-rose-500 to-pink-600',
      bgGradient: 'from-rose-100 to-pink-200',
      features: ['Pre-conception optimization', 'Fertility tracking', 'Partner preparation'],
      nextStep: '/pre-conception',
      duration: '3-6 months',
      successRate: '95%'
    },
    {
      id: 'trying',
      title: 'Trying to Conceive',
      description: 'Maximize your conception chances',
      icon: Heart,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-100 to-teal-200',
      features: ['Ovulation tracking', 'Timing optimization', 'Lifestyle adjustments'],
      nextStep: '/fertility',
      duration: '1-12 months',
      successRate: '87%'
    },
    {
      id: 'pregnant',
      title: 'Currently Pregnant',
      description: 'Navigate your pregnancy journey',
      icon: Baby,
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-100 to-indigo-200',
      features: ['Week-by-week guidance', 'Symptom tracking', 'Birth preparation'],
      nextStep: '/pregnancy-journey',
      duration: '40 weeks',
      successRate: '98%'
    },
    {
      id: 'postpartum',
      title: 'New Mom Support',
      description: 'Postpartum care and recovery',
      icon: Sun,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-600',
      bgGradient: 'from-amber-100 to-orange-200',
      features: ['Recovery tracking', 'Breastfeeding support', 'Mental health'],
      nextStep: '/postpartum',
      duration: '6-12 months',
      successRate: '92%'
    }
  ];

  const features = [
    { 
      icon: Brain, 
      title: 'AI Health Analysis', 
      desc: 'Upload reports for personalized insights', 
      link: '/ai-analysis',
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      stats: '99% accuracy',
      highlight: 'Most Advanced'
    },
    { 
      icon: Calendar, 
      title: 'Daily Tracking', 
      desc: 'Water, supplements, symptoms & more', 
      link: '/daily-tracker',
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      stats: 'Smart reminders',
      highlight: 'Popular'
    },
    { 
      icon: Leaf, 
      title: 'Natural Birth Prep', 
      desc: 'Reduce intervention risks naturally', 
      link: '/natural-birth',
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-600',
      stats: '70% success rate',
      highlight: 'Proven Results'
    },
    { 
      icon: Users, 
      title: 'Smart Community', 
      desc: 'AI-matched support groups', 
      link: '/community',
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
      stats: '50K+ mothers',
      highlight: 'Growing Fast'
    },
    { 
      icon: MessageCircle, 
      title: '24/7 AI Support', 
      desc: 'Instant expert guidance', 
      link: '/ai-chat',
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600',
      stats: '15+ specialists',
      highlight: 'Always Available'
    },
    { 
      icon: Shield, 
      title: 'Health Monitoring', 
      desc: 'Continuous wellness tracking', 
      link: '/health-monitor',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      stats: 'Real-time alerts',
      highlight: 'Peace of Mind'
    },
    { 
      icon: Baby, 
      title: 'Fetal Health Tracker', 
      desc: 'Monitor baby\'s development & movements', 
      link: '/fetal-health',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      stats: 'AI-powered insights',
      highlight: 'New Feature'
    },
    { 
      icon: Target, 
      title: '30-Day Custom Plan', 
      desc: 'Personalized daily activities with avatar guide', 
      link: '/30-day-plan',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      stats: 'Character-guided',
      highlight: 'Interactive'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "First-time Mom",
      image: "👩‍🦰",
      story: "MomBuddy's AI guidance helped me conceive naturally after 8 months of trying. The personalized plan was exactly what I needed!",
      outcome: "Healthy baby boy, natural delivery",
      rating: 5,
      stage: "Conceived naturally"
    },
    {
      name: "Emma Rodriguez",
      role: "Second pregnancy",
      image: "👩‍🦱",
      story: "The natural birth preparation reduced my anxiety and helped me achieve the VBAC I dreamed of. Amazing support throughout!",
      outcome: "Successful VBAC delivery",
      rating: 5,
      stage: "Natural birth success"
    },
    {
      name: "Lisa Chen",
      role: "High-risk pregnancy",
      image: "👩‍🦳",
      story: "The health monitoring caught early signs of preeclampsia. The AI alerts literally saved my pregnancy. Forever grateful!",
      outcome: "Healthy delivery at 38 weeks",
      rating: 5,
      stage: "Complication prevented"
    }
  ];

  const aiModels = [
    { name: 'BioLLaMA-Genomics-v3.2', specialty: 'Genetic Analysis', accuracy: '98.7%' },
    { name: 'ReproAI-Hormonal-v2.1', specialty: 'Fertility Optimization', accuracy: '94.8%' },
    { name: 'NutriGenome-v4.0', specialty: 'Personalized Nutrition', accuracy: '97.2%' },
    { name: 'BehaviorPredict-v1.8', specialty: 'Lifestyle Coaching', accuracy: '89.4%' },
    { name: 'ClinicalRisk-v3.5', specialty: 'Risk Assessment', accuracy: '96.8%' }
  ];

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
    localStorage.setItem('userGoal', JSON.stringify(goal));
    setTimeout(() => {
      navigate(goal.nextStep);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-rose-50">
      {/* Enhanced Hero Section */}
      <section className={`hero-section slide-${currentSlide} relative px-6 overflow-hidden`}>
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient}`}
            />
          </AnimatePresence>
          
          {/* Enhanced Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="floating-element absolute w-4 h-4 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-30, 30, -30],
                  x: [-20, 20, -20],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        </div>

        <div className="hero-content max-w-7xl mx-auto text-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <motion.div 
                className="flex justify-center mb-8"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                {React.createElement(heroSlides[currentSlide].icon, {
                  className: "w-28 h-28 text-white drop-shadow-2xl"
                })}
              </motion.div>
              
              <h1 className="hero-title">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="hero-subtitle">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <p className="hero-description">
                {heroSlides[currentSlide].description}
              </p>

              {/* Dynamic Stats */}
              <div className="hero-stats-grid">
                {Object.entries(heroSlides[currentSlide].stats).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="text-center"
                  >
                    <div className="hero-stats">{value}</div>
                    <div className="hero-stats-label">{key.replace(/([A-Z])/g, ' $1')}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Slide Indicators */}
          <div className="flex justify-center space-x-4 mb-12">
            {heroSlides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`slide-indicator relative w-16 h-4 ${
                  currentSlide === index ? 'active' : ''
                }`}
              >
                {currentSlide === index && (
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </button>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="hero-buttons"
          >
            <motion.button
              onClick={() => setShowGoalModal(true)}
              className="revolutionary-btn group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center">
                🚀 Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              className="demo-button group"
              whileHover={{ scale: 1.02 }}
            >
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="features-section">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Complete Pregnancy Ecosystem
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Everything you need for a healthy, informed pregnancy journey powered by AI
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <Link 
                  to={feature.link} 
                  className="feature-card block"
                >
                  {/* Highlight Badge */}
                  <div className="absolute -top-4 -right-4 z-10">
                    <div className="feature-badge animate-pulse">
                      ✨ {feature.highlight}
                    </div>
                  </div>
                  
                  <div className="feature-icon">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.desc}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">AI-Powered</span>
                    <span className="font-semibold text-gray-700">{feature.stats}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Showcase */}
      <section className="py-24 px-6 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-800">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              15+ specialized AI models trained on millions of pregnancy data points
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {aiModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="ai-model-card"
              >
                <div className="text-center">
                  <Brain className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">{model.specialty}</h3>
                  <p className="text-xs text-gray-600 mb-3 font-mono">{model.name}</p>
                  <div className="text-2xl font-bold text-indigo-600">{model.accuracy}</div>
                  <div className="text-xs text-gray-500">Accuracy</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-800">
              Real Stories, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of mothers who achieved their pregnancy goals with MomBuddy
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="testimonial-card"
              >
                <div className="max-w-4xl mx-auto text-center">
                  <div className="text-6xl mb-6">{testimonials[activeTestimonial].image}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <blockquote className="testimonial-text mb-6">
                    "{testimonials[activeTestimonial].story}"
                  </blockquote>
                  <div className="mb-4">
                    <div className="testimonial-author">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                    ✓ {testimonials[activeTestimonial].outcome}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    activeTestimonial === index 
                      ? 'bg-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goal Selection Modal */}
      <AnimatePresence>
        {showGoalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="goal-modal fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowGoalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Choose Your Journey
                </h2>
                <p className="text-xl text-gray-600">
                  Select your current stage to get personalized AI guidance
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {pregnancyGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative cursor-pointer group ${
                      selectedGoal?.id === goal.id ? 'ring-4 ring-purple-300' : ''
                    }`}
                    onClick={() => handleGoalSelection(goal)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="goal-card">
                      {/* Success Rate Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 bg-gradient-to-r ${goal.gradient} text- rounded-full text-sm font-bold`}>
                          {goal.successRate} Success
                        </div>
                      </div>

                      <div className="flex items-start justify-between mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${goal.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <goal.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{goal.duration}</div>
                          {selectedGoal?.id === goal.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-2"
                            >
                              <CheckCircle className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-800 mb-3">{goal.title}</h3>
                      <p className="text-gray-600 mb-6 text-lg">{goal.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        {goal.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-700">
                            <div className={`w-3 h-3 bg-gradient-to-r ${goal.gradient} rounded-full mr-3`}></div>
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {selectedGoal?.id === goal.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white/50 rounded-2xl p-4"
                        >
                          <div className="flex items-center text-green-700">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span className="font-bold">Selected! Redirecting to your personalized plan...</span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="px-8 py-3 text-gray-600 hover:text-gray-800 transition-colors text-lg"
                >
                  I'll choose later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join 50,000+ mothers who trust MomBuddy for their pregnancy journey
            </p>
            <motion.button
              onClick={() => setShowGoalModal(true)}
              className="btn-secondary px-16 py-5 text-white rounded-full text-2xl font-black hover:shadow-3xl transition-all transform hover:scale-110 border-4 border-white shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              🚀 GET STARTED FREE
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
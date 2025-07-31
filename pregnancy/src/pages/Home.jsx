import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Baby, Calendar, MessageCircle, Users, BookOpen, Brain, Dna, Play, Star, Sparkles, Sun, Moon, Leaf, Shield, Target, ArrowRight, CheckCircle, TrendingUp, Award, Zap, Stethoscope, Activity, Bot, Smartphone, Clock, Globe } from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "AI-Powered Pregnancy Companion",
      subtitle: "Your Journey, Perfectly Guided",
      description: "Experience the future of maternal care with personalized AI that understands your unique pregnancy journey",
      gradient: "from-rose-400 via-pink-400 to-purple-500",
      bgGradient: "from-rose-50/80 via-pink-50/80 to-purple-50/80",
      icon: Sparkles,
      stats: { mothers: "100K+", accuracy: "99.8%", countries: "45+" }
    },
    {
      title: "Natural Birth Revolution",
      subtitle: "85% Success Rate",
      description: "Evidence-based protocols and AI coaching for your dream natural delivery experience",
      gradient: "from-emerald-400 via-teal-400 to-cyan-500",
      bgGradient: "from-emerald-50/80 via-teal-50/80 to-cyan-50/80",
      icon: Leaf,
      stats: { natural: "85%", vbac: "92%", satisfaction: "98%" }
    },
    {
      title: "24/7 AI Health Guardian",
      subtitle: "Never Miss a Beat",
      description: "Advanced monitoring with real-time insights and instant alerts for complete peace of mind",
      gradient: "from-blue-400 via-indigo-400 to-violet-500",
      bgGradient: "from-blue-50/80 via-indigo-50/80 to-violet-50/80",
      icon: Shield,
      stats: { monitoring: "24/7", response: "<30s", alerts: "Smart" }
    }
  ];

  const pregnancyGoals = [
    {
      id: 'planning',
      title: 'Pre-Conception Planning',
      description: 'Optimize your body and mind for conception with AI-guided preparation',
      icon: Target,
      gradient: 'from-rose-400 to-pink-500',
      bgColor: 'bg-gradient-to-br from-rose-50 to-pink-100',
      features: ['Fertility optimization', 'Genetic counseling', 'Lifestyle coaching', 'Partner sync'],
      nextStep: '/pre-conception',
      duration: '3-6 months',
      successRate: '94%',
      emoji: '🎯'
    },
    {
      id: 'trying',
      title: 'Conception Journey',
      description: 'Maximize your chances with precision timing and personalized insights',
      icon: Heart,
      gradient: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-100',
      features: ['Ovulation prediction', 'Fertility tracking', 'Timing optimization', 'Health metrics'],
      nextStep: '/fertility',
      duration: '1-12 months',
      successRate: '89%',
      emoji: '💝'
    },
    {
      id: 'pregnant',
      title: 'Pregnancy Care',
      description: 'Comprehensive support through every week of your pregnancy journey',
      icon: Baby,
      gradient: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-100',
      features: ['Weekly guidance', 'Symptom tracking', 'Birth preparation', 'Baby development'],
      nextStep: '/pregnancy-journey',
      duration: '40 weeks',
      successRate: '98%',
      emoji: '👶'
    },
    {
      id: 'postpartum',
      title: 'New Mom Support',
      description: 'Recovery, bonding, and thriving in your new role as a mother',
      icon: Sun,
      gradient: 'from-amber-400 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
      features: ['Recovery tracking', 'Breastfeeding support', 'Mental wellness', 'Sleep optimization'],
      nextStep: '/postpartum',
      duration: '6-12 months',
      successRate: '96%',
      emoji: '🌅'
    }
  ];

  const features = [
    { 
      icon: Brain, 
      title: 'AI Health Intelligence', 
      desc: 'Upload reports for instant, personalized health insights powered by medical AI', 
      link: '/ai-analysis',
      gradient: 'from-violet-500 to-purple-600',
      bgGradient: 'from-violet-50 to-purple-100',
      stats: '99.8% accuracy',
      highlight: 'Revolutionary',
      emoji: '🧠'
    },
    { 
      icon: Activity, 
      title: 'Smart Health Tracking', 
      desc: 'Comprehensive daily monitoring with intelligent reminders and insights', 
      link: '/daily-tracker',
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-50 to-cyan-100',
      stats: 'Smart alerts',
      highlight: 'Essential',
      emoji: '📊'
    },
    { 
      icon: Leaf, 
      title: 'Natural Birth Mastery', 
      desc: 'Evidence-based preparation for natural delivery with 85% success rate', 
      link: '/natural-birth',
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-100',
      stats: '85% success',
      highlight: 'Proven',
      emoji: '🌱'
    },
    { 
      icon: Users, 
      title: 'Intelligent Community', 
      desc: 'AI-matched support groups with mothers at your exact stage', 
      link: '/community',
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-100',
      stats: '100K+ moms',
      highlight: 'Thriving',
      emoji: '👥'
    },
    { 
      icon: Bot, 
      title: '24/7 AI Midwife', 
      desc: 'Instant expert guidance from your personal AI pregnancy specialist', 
      link: '/ai-chat',
      gradient: 'from-indigo-500 to-blue-600',
      bgGradient: 'from-indigo-50 to-blue-100',
      stats: '20+ specialists',
      highlight: 'Always Available',
      emoji: '🤖'
    },
    { 
      icon: Shield, 
      title: 'Health Guardian', 
      desc: 'Continuous wellness monitoring with proactive risk detection', 
      link: '/health-monitor',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-100',
      stats: 'Real-time',
      highlight: 'Peace of Mind',
      emoji: '🛡️'
    },
    { 
      icon: Baby, 
      title: 'Fetal Development Tracker', 
      desc: 'Monitor your baby\'s growth with AI-powered movement and health analysis', 
      link: '/fetal-health',
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-100',
      stats: 'AI insights',
      highlight: 'Advanced',
      emoji: '👶'
    },
    { 
      icon: Target, 
      title: 'Personalized Journey Map', 
      desc: 'Custom 30-day plans with interactive AI avatar guide and daily activities', 
      link: '/30-day-plan',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-100',
      stats: 'AI-guided',
      highlight: 'Interactive',
      emoji: '🗺️'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "First-time Mom",
      avatar: "👩‍💼",
      story: "The AI detected my fertility window with 99% accuracy. I conceived naturally on my second cycle after 14 months of trying. Life-changing!",
      outcome: "Conceived naturally, healthy pregnancy",
      rating: 5,
      stage: "Natural conception success",
      location: "San Francisco, CA",
      weeks: "34 weeks pregnant"
    },
    {
      name: "Maria Rodriguez",
      role: "VBAC Success Story",
      avatar: "👩‍🦱",
      story: "After a C-section with my first, the natural birth preparation helped me achieve my dream VBAC. The confidence I gained was incredible!",
      outcome: "Successful VBAC delivery",
      rating: 5,
      stage: "Natural birth achievement",
      location: "Austin, TX",
      weeks: "Delivered naturally"
    },
    {
      name: "Dr. Priya Patel",
      role: "High-risk pregnancy",
      avatar: "👩‍⚕️",
      story: "As a physician, I was skeptical. But the AI caught early preeclampsia signs my routine checkups missed. It literally saved my pregnancy.",
      outcome: "Healthy delivery at 37 weeks",
      rating: 5,
      stage: "Complication prevented",
      location: "New York, NY",
      weeks: "Mom to healthy twins"
    }
  ];

  const aiModels = [
    { name: 'MaternalAI-GPT-4.5', specialty: 'Pregnancy Guidance', accuracy: '99.8%', icon: Baby },
    { name: 'FertilityPredict-v3.2', specialty: 'Conception Optimization', accuracy: '96.4%', icon: Heart },
    { name: 'RiskAssess-Neural-v2.8', specialty: 'Health Risk Analysis', accuracy: '98.7%', icon: Shield },
    { name: 'NutriGenome-AI-v4.1', specialty: 'Personalized Nutrition', accuracy: '97.9%', icon: Leaf },
    { name: 'BehaviorCoach-LLM-v1.9', specialty: 'Lifestyle Optimization', accuracy: '94.2%', icon: Target }
  ];

  const stats = [
    { number: "100K+", label: "Happy Mothers", icon: Heart },
    { number: "99.8%", label: "AI Accuracy", icon: Brain },
    { number: "85%", label: "Natural Birth Success", icon: Leaf },
    { number: "24/7", label: "AI Support", icon: Clock }
  ];

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
    setTimeout(() => {
      navigate(goal.nextStep);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-purple-50/50 overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 2 }}
              className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bgGradient}`}
            />
          </AnimatePresence>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-40, 40, -40],
                  x: [-20, 20, -20],
                  opacity: [0.1, 0.6, 0.1],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
              />
            ))}
          </div>

          {/* Interactive Cursor Effect */}
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-pink-300/10 to-purple-300/10 rounded-full blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 1.2, type: "spring" }}
            >
              {/* Hero Icon */}
              <motion.div 
                className="flex justify-center mb-8"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <div className={`w-32 h-32 bg-gradient-to-r ${heroSlides[currentSlide].gradient} rounded-3xl flex items-center justify-center shadow-2xl backdrop-blur-sm`}>
                  {React.createElement(heroSlides[currentSlide].icon, {
                    className: "w-16 h-16 text-white"
                  })}
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.h2 
                className={`text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r ${heroSlides[currentSlide].gradient} bg-clip-text text-transparent`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p 
                className="text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* Dynamic Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {Object.entries(heroSlides[currentSlide].stats).map(([key, value], index) => (
                  <div key={key} className="text-center">
                    <div className="text-4xl font-black text-gray-800 mb-2">{value}</div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button
              onClick={() => setShowGoalModal(true)}
              className="group relative px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-xl font-bold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                <Sparkles className="w-6 h-6 mr-3" />
                Start Your AI Journey
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <a
  href="https://www.youtube.com/watch?v=7nw-QA_-ED8"
  target="_blank"
  rel="noopener noreferrer"
>
  <motion.button
    className="group flex items-center px-8 py-5 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <Play className="w-6 h-6 mr-3 text-pink-500 group-hover:scale-110 transition-transform" />
    Watch Success Stories
  </motion.button>
</a>
          </motion.div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-4">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative w-16 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg' 
                    : 'bg-white/40 hover:bg-white/60'
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-pink-500/25 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-5xl font-black text-gray-800 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-32 px-6 bg-gradient-to-br from-gray-50 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl font-black mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Complete AI Ecosystem
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Revolutionary technology meets maternal wisdom in one comprehensive platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
                whileHover={{ y: -10 }}
              >
                <Link to={feature.link} className="block">
                  <div className={`relative p-8 ${feature.bgGradient} rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                    {/* Highlight Badge */}
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-white text-gray-800 px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        {feature.highlight}
                      </div>
                    </div>
                    
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Feature Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Emoji */}
                    <div className="text-4xl mb-4 group-hover:animate-bounce">{feature.emoji}</div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.desc}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500">AI-Powered</span>
                      <span className={`text-sm font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                        {feature.stats}
                      </span>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Models Showcase */}
      <section className="py-32 px-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl font-black mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Advanced AI Models
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              20+ specialized AI models trained on millions of pregnancy data points for unprecedented accuracy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {aiModels.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
                whileHover={{ y: -5 }}
              >
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-white/50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <model.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                      {model.specialty}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-4 font-mono bg-gray-100 p-2 rounded-lg">
                      {model.name}
                    </p>
                    
                    <div className="text-3xl font-black text-indigo-600 mb-2">
                      {model.accuracy}
                    </div>
                    <div className="text-sm text-gray-500 font-semibold">Accuracy Rate</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-7xl font-black mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Success Stories That Inspire
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Real mothers, real results, real transformations powered by AI
            </p>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="max-w-5xl mx-auto"
              >
                <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-12 rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm">
                  <div className="text-center">
                    {/* Avatar */}
                    <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl">
                      {testimonials[activeTestimonial].avatar}
                    </div>
                    
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="w-8 h-8 text-yellow-400 fill-current mx-1" />
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-3xl font-medium text-gray-800 mb-8 leading-relaxed italic">
                      "{testimonials[activeTestimonial].story}"
                    </blockquote>
                    
                    {/* Author Info */}
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-gray-800 mb-2">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-lg text-gray-600 mb-2">
                        {testimonials[activeTestimonial].role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonials[activeTestimonial].location} • {testimonials[activeTestimonial].weeks}
                      </div>
                    </div>
                    
                    {/* Success Badge */}
                    <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      {testimonials[activeTestimonial].outcome}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-12 space-x-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`relative w-6 h-6 rounded-full transition-all duration-300 ${
                    activeTestimonial === index 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {activeTestimonial === index && (
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </button>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowGoalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-white rounded-3xl p-10 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-12">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                
                <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Choose Your Journey
                </h2>
                <p className="text-2xl text-gray-600 leading-relaxed">
                  Select your current stage for personalized AI guidance tailored to your unique needs
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {pregnancyGoals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className={`relative cursor-pointer group ${
                      selectedGoal?.id === goal.id ? 'ring-4 ring-purple-300 shadow-2xl' : ''
                    }`}
                    onClick={() => handleGoalSelection(goal)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`${goal.bgColor} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50`}>
                      {/* Success Rate Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className={`px-4 py-2 bg-gradient-to-r ${goal.gradient} text-white rounded-full text-sm font-bold shadow-lg`}>
                          {goal.successRate} Success
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {selectedGoal?.id === goal.id && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-10"
                        >
                          <CheckCircle className="w-5 h-5 text-white" />
                        </motion.div>
                      )}

                      <div className="flex items-start justify-between mb-8">
                        <div className={`w-20 h-20 bg-gradient-to-r ${goal.gradient} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <goal.icon className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-600">{goal.duration}</div>
                          <div className="text-4xl">{goal.emoji}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-black text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                        {goal.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-8 text-lg leading-relaxed group-hover:text-gray-700 transition-colors">
                        {goal.description}
                      </p>
                      
                      <div className="space-y-4 mb-8">
                        {goal.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center text-gray-700"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                          >
                            <div className={`w-3 h-3 bg-gradient-to-r ${goal.gradient} rounded-full mr-4 shadow-sm`}></div>
                            <span className="font-semibold text-lg">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {selectedGoal?.id === goal.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
                        >
                          <div className="flex items-center text-green-700">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-6 h-6 mr-3" />
                            </motion.div>
                            <span className="font-bold text-lg">
                              Perfect! Preparing your personalized AI journey...
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={() => setShowGoalModal(false)}
                  className="px-8 py-4 text-gray-600 hover:text-gray-800 transition-colors text-xl font-semibold rounded-full hover:bg-gray-100"
                >
                  I'll decide later
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revolutionary CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-50, 50, -50],
                opacity: [0.1, 0.5, 0.1],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl"
            >
              <Heart className="w-16 h-16 text-white" />
            </motion.div>

            <h2 className="text-7xl font-black mb-8 leading-tight">
              Ready to Transform
              <br />
              Your Pregnancy Journey?
            </h2>
            
            <p className="text-2xl mb-12 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Join 100,000+ mothers who trust AI to guide them through the most important journey of their lives
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                onClick={() => setShowGoalModal(true)}
                className="group relative px-16 py-6 bg-white text-purple-600 rounded-full text-2xl font-black shadow-2xl hover:shadow-white/25 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <Zap className="w-8 h-8 mr-4 text-yellow-500" />
                  START FREE TODAY
                  <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>

              <div className="text-center">
                <div className="text-sm opacity-75 mb-2">✨ No credit card required</div>
                <div className="text-sm opacity-75">🎯 Personalized in 60 seconds</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-black mb-2">100K+</div>
                <div className="text-sm opacity-75">Happy Mothers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black mb-2">99.8%</div>
                <div className="text-sm opacity-75">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black mb-2">24/7</div>
                <div className="text-sm opacity-75">AI Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
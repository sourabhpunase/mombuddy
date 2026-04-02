import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Baby,
  BellRing,
  Bot,
  Brain,
  CheckCircle,
  ChevronRight,
  Compass,
  Flower2,
  Heart,
  Leaf,
  Play,
  Shield,
  Sparkles,
  Star,
  Target,
  Quote,
  Users,
  Zap
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
};

const Home = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const navigate = useNavigate();

  const pregnancyGoals = [
    {
      id: 'planning',
      title: 'Pre-conception',
      description: 'Prepare with gentle planning, nutrition support, and clear first steps.',
      icon: Target,
      nextStep: '/pre-conception',
      duration: '3-6 months',
      emoji: '🌷',
      accent: 'from-[#f39a8a] via-[#d96b7d] to-[#b89ad9]',
      surface: 'from-[#fff6f1] via-white to-[#fff1f5] dark:from-[#2f1b23] dark:via-[#24141a] dark:to-[#221521]',
      ring: 'border-[#efc8bf] hover:border-[#e4a9b6] dark:hover:border-[#ffd1d0]/35'
    },
    {
      id: 'trying',
      title: 'Trying to conceive',
      description: 'Track timing, cycles, and key patterns without overwhelming charts.',
      icon: Heart,
      nextStep: '/fertility',
      duration: 'Cycle-based',
      emoji: '💞',
      accent: 'from-[#d96b7d] via-[#f39a8a] to-[#e5c07b]',
      surface: 'from-[#fff5f0] via-white to-[#fff8ee] dark:from-[#311f20] dark:via-[#251617] dark:to-[#24191a]',
      ring: 'border-[#efd6c6] hover:border-[#e6b9aa] dark:hover:border-[#ffd1d0]/35'
    },
    {
      id: 'pregnant',
      title: 'Pregnant',
      description: 'Follow your pregnancy week by week with practical, reassuring guidance.',
      icon: Baby,
      nextStep: '/pregnancy-journey',
      duration: '40 weeks',
      emoji: '🤍',
      accent: 'from-[#b980d0] via-[#d96b7d] to-[#f0b27f]',
      surface: 'from-[#fff4f8] via-white to-[#fff3ec] dark:from-[#2f1824] dark:via-[#22131a] dark:to-[#231715]',
      ring: 'border-[#ead4de] hover:border-[#d9b8ca] dark:hover:border-[#ffd1d0]/35'
    },
    {
      id: 'postpartum',
      title: 'Postpartum',
      description: 'Support recovery, feeding, sleep, and emotional wellbeing after birth.',
      icon: Sparkles,
      nextStep: '/postpartum',
      duration: '6-12 months',
      emoji: '🌸',
      accent: 'from-[#9dcdb8] via-[#d9b77c] to-[#d96b7d]',
      surface: 'from-[#f5fbf7] via-white to-[#fff4ec] dark:from-[#1a2420] dark:via-[#171716] dark:to-[#241819]',
      ring: 'border-[#d7e7df] hover:border-[#bad5c8] dark:hover:border-[#ffd1d0]/35'
    }
  ];

  const featureCards = [
    {
      icon: Brain,
      emoji: '🧠',
      title: 'AI Health Intelligence',
      desc: 'Upload reports for instant, personalized health insights powered by medical AI.',
      link: '/ai-analysis',
      badge: 'AI-Powered',
      stat: '99.8% accuracy',
      mood: 'Essential',
      accent: 'from-[#d96b7d] via-[#b980d0] to-[#efb17f]',
      soft: 'from-[#fff1f4] via-white to-[#fff4ed] dark:from-[#2f1824] dark:via-[#22131a] dark:to-[#231715]'
    },
    {
      icon: Activity,
      emoji: '📊',
      title: 'Smart Health Tracking',
      desc: 'Comprehensive daily monitoring with intelligent reminders and clear progress insights.',
      link: '/daily-tracker',
      badge: 'AI-Powered',
      stat: 'Smart alerts',
      mood: 'Proven',
      accent: 'from-[#f39a8a] via-[#d96b7d] to-[#f0c48a]',
      soft: 'from-[#fff4ef] via-white to-[#fff8ef] dark:from-[#311f20] dark:via-[#251617] dark:to-[#24191a]'
    },
    {
      icon: Leaf,
      emoji: '🌱',
      title: 'Natural Birth Mastery',
      desc: 'Evidence-based preparation for natural delivery with grounded guidance and confidence tools.',
      link: '/natural-birth',
      badge: 'AI-Powered',
      stat: '85% success',
      mood: 'Thriving',
      accent: 'from-[#9dcdb8] via-[#d9b77c] to-[#d96b7d]',
      soft: 'from-[#f4fbf7] via-white to-[#fff4ee] dark:from-[#1a2420] dark:via-[#171716] dark:to-[#241819]'
    },
    {
      icon: Users,
      emoji: '👥',
      title: 'Intelligent Community',
      desc: 'Find AI-matched support groups with mothers at your exact stage and shared concerns.',
      link: '/community',
      badge: 'AI-Powered',
      stat: '100K+ moms',
      mood: 'Always Available',
      accent: 'from-[#b980d0] via-[#d96b7d] to-[#efb17f]',
      soft: 'from-[#fbf4ff] via-white to-[#fff2f4] dark:from-[#2a1730] dark:via-[#20131f] dark:to-[#241719]'
    },
    {
      icon: Bot,
      emoji: '🤖',
      title: '24/7 AI Midwife',
      desc: 'Get instant guidance from an always-on pregnancy assistant trained for calm, useful support.',
      link: '/ai-chat',
      badge: 'AI-Powered',
      stat: '20+ specialists',
      mood: 'Peace of Mind',
      accent: 'from-[#d96b7d] via-[#ef9c91] to-[#f1c684]',
      soft: 'from-[#fff1f4] via-white to-[#fff8ef] dark:from-[#30191f] dark:via-[#201317] dark:to-[#241918]'
    },
    {
      icon: Shield,
      emoji: '🛡️',
      title: 'Health Guardian',
      desc: 'Continuous wellness monitoring with proactive risk detection and clearer red-flag awareness.',
      link: '/health-monitor',
      badge: 'AI-Powered',
      stat: 'Real-time',
      mood: 'Advanced',
      accent: 'from-[#e5c07b] via-[#d96b7d] to-[#9dcdb8]',
      soft: 'from-[#fff9ef] via-white to-[#f3fbf7] dark:from-[#2c2216] dark:via-[#21161a] dark:to-[#18211d]'
    },
    {
      icon: Baby,
      emoji: '👶',
      title: 'Fetal Development Tracker',
      desc: 'Monitor baby growth, movement, and milestones with thoughtful AI-assisted insights.',
      link: '/fetal-health',
      badge: 'AI-Powered',
      stat: 'AI insights',
      mood: 'Interactive',
      accent: 'from-[#ef9c91] via-[#d96b7d] to-[#b980d0]',
      soft: 'from-[#fff3f0] via-white to-[#faf3ff] dark:from-[#301d1c] dark:via-[#23151b] dark:to-[#211628]'
    },
    {
      icon: Compass,
      emoji: '🗺️',
      title: 'Personalized Journey Map',
      desc: 'Follow custom 30-day plans with daily actions, focused milestones, and guided momentum.',
      link: '/30-day-plan',
      badge: 'AI-guided',
      stat: '30-day path',
      mood: 'Future-ready',
      accent: 'from-[#9dcdb8] via-[#b9a0e4] to-[#d96b7d]',
      soft: 'from-[#f5fbf8] via-white to-[#fbf3ff] dark:from-[#1b2521] dark:via-[#18151f] dark:to-[#24171d]'
    }
  ];

  const highlights = [
    { value: '100K+', label: 'Families supported' },
    { value: '24/7', label: 'AI companion access' },
    { value: '40', label: 'Weeks mapped clearly' }
  ];

  const heroSlides = [
    {
      eyebrow: 'Mother-first support',
      title: 'A calmer way to navigate pregnancy and postpartum.',
      description:
        'MomBuddy brings guidance, tracking, and AI assistance into one clear experience that feels supportive instead of overwhelming.',
      primaryLabel: 'Start your journey',
      secondaryLabel: 'Explore pregnancy'
    },
    {
      eyebrow: 'Daily clarity',
      title: 'See what matters now, without the noise.',
      description:
        'Check today’s focus, stay on top of symptoms and routines, and move through each week with more confidence.',
      primaryLabel: 'Build my plan',
      secondaryLabel: 'See weekly guide'
    },
    {
      eyebrow: 'Modern care companion',
      title: 'Thoughtful design with AI where it is actually useful.',
      description:
        'From smart summaries to guided check-ins, every feature is designed to feel professional, warm, and easy to trust.',
      primaryLabel: 'Open MomBuddy',
      secondaryLabel: 'Try AI chat'
    }
  ];

  const heroSignals = [
    'Pregnancy timeline synced',
    'Daily check-in simplified',
    'Clinician-friendly summaries'
  ];

  const quickBenefits = [
    'Clear week-by-week guidance',
    'Designed first for mobile clarity',
    'Professional, consistent visual system'
  ];

  const trustNotes = [
    'Clinician-friendly language',
    'Calm interfaces for tired moments',
    'Single visual system across features'
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'First-time mom',
      emoji: '🌷',
      story:
        'MomBuddy gave me structure without feeling clinical or cold. The weekly flow and tracking screens are much easier to use than other apps I tried.',
      location: 'San Francisco, CA'
    },
    {
      name: 'Maria Rodriguez',
      role: 'Second pregnancy',
      emoji: '💕',
      story:
        'The app feels more mature now. I can open it quickly, find what I need, and move on without sorting through visual noise.',
      location: 'Austin, TX'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Physician and parent',
      emoji: '✨',
      story:
        'This works best as a companion layer between visits. The interface is calm, the copy is measured, and the experience feels more professional.',
      location: 'New York, NY'
    }
  ];

  const reviewHighlights = [
    { value: '4.9/5', label: 'Average rating', icon: Star },
    { value: '92%', label: 'Say it feels calmer', icon: Flower2 },
    { value: '10k+', label: 'Weekly check-ins', icon: Heart }
  ];

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
    setTimeout(() => navigate(goal.nextStep), 450);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((previous) => (previous + 1) % testimonials.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((previous) => (previous + 1) % heroSlides.length);
    }, 5200);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-[#fff8f4] text-stone-900 dark:bg-[#181116] dark:text-stone-50">
      <section className="relative overflow-hidden border-b border-[#f1d3df] dark:border-white/10 lg:min-h-[92vh]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,173,164,0.34),_transparent_34%),radial-gradient(circle_at_82%_18%,_rgba(193,151,233,0.18),_transparent_20%),radial-gradient(circle_at_65%_75%,_rgba(227,191,135,0.14),_transparent_22%),linear-gradient(180deg,_rgba(255,252,247,0.95),_rgba(255,244,237,0.74))] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,140,143,0.2),_transparent_28%),radial-gradient(circle_at_82%_18%,_rgba(184,138,218,0.14),_transparent_20%),radial-gradient(circle_at_65%_75%,_rgba(227,191,135,0.1),_transparent_22%),linear-gradient(180deg,_rgba(24,17,22,0.94),_rgba(24,17,22,0.84))]" />
          <motion.div
            animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-pulse-glow absolute -left-16 top-24 h-52 w-52 rounded-full bg-[#ffb5a8]/45 blur-3xl dark:bg-[#8f4157]/28"
          />
          <motion.div
            animate={{ y: [0, 16, 0], x: [0, -12, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="hero-drift absolute right-0 top-12 h-72 w-72 rounded-full bg-[#d9c0fb]/24 blur-3xl dark:bg-[#7b5aa1]/22"
          />
        </div>

        <div className="relative mx-auto grid max-w-[88rem] gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="theme-badge inline-flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              MomBuddy
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroSlide}
                  initial={{ opacity: 0, x: 36 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -36 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <p className="theme-accent-text text-sm font-semibold uppercase tracking-[0.24em]">
                    {heroSlides[activeHeroSlide].eyebrow}
                  </p>
                  <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[#241816] dark:text-[#fff7f2] sm:text-[3.35rem] lg:text-[4.15rem]">
                    <span className="hero-aurora-text">{heroSlides[activeHeroSlide].title}</span>
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-stone-600 dark:text-stone-300 sm:text-lg">
                    {heroSlides[activeHeroSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {heroSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-2xl border border-[#edd7d1] bg-white/68 px-4 py-3 text-sm font-medium text-stone-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
                >
                  {signal}
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.eyebrow}
                  type="button"
                  onClick={() => setActiveHeroSlide(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeHeroSlide === index
                      ? 'w-10 bg-[#d85e7a] dark:bg-[#ffd1d0]'
                      : 'w-2.5 bg-[#e9b5c4] hover:bg-[#d89cb2] dark:bg-white/20 dark:hover:bg-white/35'
                  }`}
                  aria-label={`Show hero slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setShowGoalModal(true)}
                className="theme-button-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition duration-300 hover:-translate-y-0.5"
              >
                {heroSlides[activeHeroSlide].primaryLabel}
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                to={activeHeroSlide === 2 ? '/ai-chat' : '/pregnancy-journey'}
                className="theme-button-secondary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition duration-300 hover:-translate-y-0.5 hover:bg-white dark:hover:bg-white/10"
              >
                {heroSlides[activeHeroSlide].secondaryLabel}
                <ChevronRight className="h-5 w-5 opacity-70" />
              </Link>
              <a
                href="https://www.youtube.com/watch?v=7nw-QA_-ED8"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-accent-text inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold transition hover:opacity-80"
              >
                <Play className="h-4 w-4 fill-current" />
                Watch overview
              </a>
            </div>

            <div className="mt-10 grid gap-3 border-t border-[#edd7d1] pt-6 sm:grid-cols-3 dark:border-white/10">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#f0ddd7] bg-white/58 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <div className="text-2xl font-semibold text-[#b74e6a] dark:text-white">{item.value}</div>
                  <div className="mt-1 text-sm text-stone-500 dark:text-stone-400">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[48rem]"
          >
            <div className="hero-float-soft absolute -right-8 top-20 hidden h-32 w-32 rounded-full bg-[#e0cafc]/50 blur-3xl lg:block dark:bg-[#6f4d98]/20" />
            <div className="hero-pulse-glow absolute -left-8 bottom-10 hidden h-28 w-28 rounded-full bg-[#ffb9aa]/45 blur-3xl lg:block dark:bg-[#a14e61]/20" />

            <div className="hero-mesh hero-scan relative overflow-hidden rounded-[2.8rem] border border-white/75 bg-[linear-gradient(180deg,rgba(255,252,249,0.96),rgba(255,242,236,0.92))] p-5 shadow-[0_34px_90px_-35px_rgba(198,84,115,0.34)] backdrop-blur dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(42,21,30,0.95),rgba(23,12,17,0.96))] sm:p-6">
              <div className="absolute inset-x-10 top-0 h-28 rounded-b-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.66),transparent_72%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_72%)]" />
              <div className="relative rounded-[2.2rem] border border-[#f0ddd7] bg-white/84 p-5 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-[30rem] min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c65473] dark:text-[#ffd1d0]">
                      Today in MomBuddy
                    </p>
                    <h2 className="mt-3 text-[2rem] font-semibold leading-[1.05] text-[#5a2732] dark:text-white sm:text-[2.35rem]">
                      A more polished weekly view that still feels warm and personal.
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                      Everything important is visible at a glance, with calmer structure, richer detail, and less crowding.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 self-start sm:justify-end">
                    <div className="theme-accent-gradient flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg">
                      <Baby className="h-7 w-7" />
                    </div>
                    <div className="rounded-2xl border border-[#f0ddd7] bg-white/80 px-4 py-3 text-right shadow-sm dark:border-white/10 dark:bg-white/5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
                        Live rhythm
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[#6b3240] dark:text-white">Week 24 • Trimester 2</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="overflow-hidden rounded-[2rem] border border-[#ead6d0] bg-[linear-gradient(145deg,rgba(255,245,241,0.96),rgba(255,255,255,0.95),rgba(255,241,245,0.96))] p-5 shadow-[0_22px_60px_-36px_rgba(198,84,115,0.3)] dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03),rgba(255,255,255,0.05))]">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
                          This week
                        </div>
                        <div className="mt-2 flex items-end gap-3">
                          <div className="text-4xl font-semibold tracking-[-0.05em] text-[#4e2430] dark:text-white">24</div>
                          <div className="pb-1 text-sm text-stone-500 dark:text-stone-400">
                            <div>Week 24</div>
                            <div>Trimester 2</div>
                          </div>
                        </div>
                      </div>
                      <div className="w-fit rounded-full border border-[#f1ddd8] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#c65473] shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-[#ffd1d0]">
                        Check-in complete
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        { label: 'Energy', value: 'Balanced', tone: 'from-[#ffe5db] to-[#ffd6e0]' },
                        { label: 'Sleep', value: 'Improving', tone: 'from-[#f2e5ff] to-[#ffe8ef]' },
                        { label: 'Hydration', value: 'On track', tone: 'from-[#e4f6f0] to-[#fff0e7]' }
                      ].map((metric) => (
                        <div
                          key={metric.label}
                          className={`rounded-2xl border border-white/70 bg-gradient-to-br ${metric.tone} px-3 py-3 shadow-sm dark:border-white/10 dark:bg-white/5`}
                        >
                          <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-stone-500 dark:text-stone-400">
                            {metric.label}
                          </div>
                          <div className="mt-1 text-sm font-semibold text-[#5a2732] dark:text-white">{metric.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 rounded-[1.75rem] border border-[#f1ddd8] bg-white/82 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
                            Plan progress
                          </div>
                          <div className="mt-1 text-2xl font-semibold text-[#4e2430] dark:text-white">78%</div>
                        </div>
                        <div className="text-sm text-stone-500 dark:text-stone-400 sm:text-right">
                          <div className="font-medium text-stone-700 dark:text-stone-200">Next reminder</div>
                          <div>Glucose screen this week</div>
                        </div>
                      </div>
                      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#f5e5e0] dark:bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '78%' }}
                          transition={{ duration: 1.1, delay: 0.3 }}
                          className="theme-accent-gradient h-full rounded-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[2rem] border border-[#ead6d0] bg-[linear-gradient(135deg,rgba(255,240,235,0.95),rgba(255,255,255,0.95),rgba(249,237,255,0.92))] p-5 shadow-[0_20px_55px_-38px_rgba(198,84,115,0.34)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03),rgba(255,255,255,0.06))]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                            AI care signal
                          </div>
                          <div className="mt-2 max-w-[24rem] text-base font-semibold leading-7 text-[#4e2430] dark:text-white sm:text-lg">
                            {activeHeroSlide === 0
                              ? 'Motherhood journey synced across planning, pregnancy, and recovery.'
                              : activeHeroSlide === 1
                                ? 'Your next action is surfaced first, with fewer taps and less noise.'
                                : 'AI support and tracking stay aligned inside one connected interface.'}
                          </div>
                        </div>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d96b7d,#b980d0)] text-white shadow-sm">
                          <Bot className="h-5 w-5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                      {[
                        { label: 'Baby growth', value: 'Strong movement', icon: Baby, tone: 'from-[#fff2ef] to-[#ffe7ef]' },
                        { label: 'Body rhythm', value: 'Hydration, rest', icon: Heart, tone: 'from-[#f8f1ff] to-[#fff0f2]' },
                        { label: 'Next visit', value: 'Glucose screen', icon: BellRing, tone: 'from-[#fdf6e7] to-[#fff1e8]' }
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`rounded-[1.7rem] border border-[#eddad4] bg-gradient-to-br ${item.tone} p-4 shadow-sm dark:border-white/10 dark:bg-white/5`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/85 text-[#c65473] shadow-sm dark:bg-white/10 dark:text-[#ffd1d0]">
                              <item.icon className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                                {item.label}
                              </div>
                              <div className="mt-1 text-sm font-semibold text-[#5a2732] dark:text-white">{item.value}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-1 2xl:grid-cols-[1.1fr_0.9fr_0.9fr]">
                  <Link
                    to="/weekly-guide"
                    className="theme-button-primary inline-flex items-center justify-center gap-2 rounded-[1.75rem] px-6 py-4 text-sm font-semibold transition hover:-translate-y-0.5"
                  >
                    Open weekly guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {quickBenefits.slice(0, 2).map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.24 + index * 0.08 }}
                      className="rounded-[1.65rem] border border-[#f0ddd7] bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="theme-accent-gradient mt-0.5 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-sm">
                          <CheckCircle className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-sm font-medium leading-6 text-stone-700 dark:text-stone-200">{benefit}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#f1d3df] py-14 dark:border-white/10 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c65473] dark:text-[#ffd1d0]">
              Choose your stage
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#241816] dark:text-white sm:text-4xl">
              Pick the support that matches where you are now.
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-600 dark:text-stone-300">
              Each path is clear, warm, and focused so the app never feels crowded.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pregnancyGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Link
                  to={goal.nextStep}
                  className={`group flex h-full flex-col rounded-[1.9rem] border bg-gradient-to-br ${goal.surface} p-6 shadow-[0_18px_50px_-32px_rgba(198,84,115,0.24)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_-34px_rgba(198,84,115,0.32)] dark:border-white/10 ${goal.ring}`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${goal.accent} text-white shadow-sm`}>
                      <goal.icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl">{goal.emoji}</span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#241816] dark:text-white">{goal.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {goal.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-[#f6dce8] pt-4 text-sm dark:border-white/10">
                    <span className="font-medium text-stone-500 dark:text-stone-400">{goal.duration}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#c65473] dark:text-[#ffd1d0]">
                      Open
                      <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c65473] dark:text-[#ffd1d0]">
              Everything in one place
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#241816] dark:text-white sm:text-4xl">
              Eight focused features, styled to feel elegant and easy to scan.
            </h2>
            <p className="mt-4 text-base leading-8 text-stone-600 dark:text-stone-300">
              Every card has a clearer hierarchy, softer premium styling, and richer detail without feeling crowded.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
              >
                <Link
                  to={item.link}
                  className={`group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[2rem] border border-[#e9d8e1] bg-gradient-to-br ${item.soft} p-5 shadow-[0_20px_55px_-34px_rgba(126,85,106,0.22)] backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-[#d7b7c6] hover:shadow-[0_30px_70px_-34px_rgba(126,85,106,0.3)] dark:border-white/10 dark:hover:border-[#dfc4cf]/40`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(211,154,176,0.26),transparent_72%)] opacity-80 dark:bg-[radial-gradient(circle_at_top,rgba(223,196,207,0.14),transparent_72%)]" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-white shadow-sm ring-4 ring-white/70 dark:ring-white/10`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="rounded-full border border-[#eee1e7] bg-white/80 px-3 py-1 text-lg shadow-sm dark:border-white/10 dark:bg-white/5">
                      {item.emoji}
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#fff0ea] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c65473] dark:bg-white/10 dark:text-[#ffd1d0]">
                      {item.badge}
                    </span>
                    <ArrowRight className="h-5 w-5 text-stone-300 transition group-hover:translate-x-1 group-hover:text-[#c65473] dark:text-stone-600 dark:group-hover:text-[#ffd1d0]" />
                  </div>

                  <h3 className="relative mt-5 text-xl font-semibold leading-tight text-[#241816] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    {item.desc}
                  </p>

                  <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-[#eee1e7] pt-4 dark:border-white/10">
                    <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-sm dark:bg-white/5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
                        Insight
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[#8e6074] dark:text-white">{item.stat}</div>
                    </div>
                    <div className="rounded-2xl bg-white/75 px-3 py-3 shadow-sm dark:bg-white/5">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
                        Mode
                      </div>
                      <div className="mt-1 text-sm font-semibold text-[#8e6074] dark:text-white">{item.mood}</div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#f1d3df] bg-[linear-gradient(180deg,rgba(255,249,252,0.8),rgba(255,241,248,0.74))] py-14 dark:border-white/10 dark:bg-white/5 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="flex flex-col gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#c65473] dark:text-[#ffd1d0]">
              Reviews and trust
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#241816] dark:text-white sm:text-4xl">
              Loved for being calm, clear, and easy to come back to.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-stone-600 dark:text-stone-300">
              Real mothers and clinicians use MomBuddy when they want guidance that feels warm without losing professionalism.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviewHighlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-[1.6rem] border border-[#f0ddd7] bg-white/78 p-5 shadow-[0_16px_45px_-30px_rgba(198,84,115,0.22)] dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f9a8d4,#f472b6)] text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-semibold text-[#7d1d53] dark:text-white">{item.value}</div>
                </div>
                <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                onMouseEnter={() => setActiveTestimonial(index)}
                className={`rounded-[1.8rem] border p-6 transition duration-300 ${
                  activeTestimonial === index
                    ? 'border-[#e0b2c0] bg-[linear-gradient(180deg,#fffaf8,#fff0eb)] shadow-[0_18px_45px_-28px_rgba(198,84,115,0.26)] dark:border-[#ffd1d0]/30 dark:bg-[#2a1323]'
                    : 'border-[#f1d3df] bg-white/75 dark:border-white/10 dark:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f9a8d4,#f472b6)] text-lg text-white shadow-sm">
                      {testimonial.emoji}
                    </div>
                    <div>
                    <h3 className="text-lg font-semibold text-[#241816] dark:text-white">{testimonial.name}</h3>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                      {testimonial.role} · {testimonial.location}
                    </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-[#d7a23b]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <Quote className="mt-1 h-4 w-4 shrink-0 text-[#d85e7a] dark:text-[#ffd1d0]" />
                  <p className="text-sm leading-8 text-stone-700 dark:text-stone-300">
                  &ldquo;{testimonial.story}&rdquo;
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#ff8d8f,#d85e7a_42%,#bb8add_76%,#e5bb82)] dark:bg-[linear-gradient(135deg,#7b4d95,#a54f68,#d48392)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.28),transparent_34%)]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
          <Heart className="mx-auto h-12 w-12 text-white/90" />
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            A more modern landing experience for MomBuddy.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/88 sm:text-lg">
            Clear sections, stronger responsiveness, calmer animation, and a consistent optimistic theme across the homepage.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setShowGoalModal(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-[#c0267f] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#fff7fb] sm:w-auto"
            >
              <Zap className="h-5 w-5" />
              Get started free
            </button>
            <Link
              to="/ai-chat"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/45 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
            >
              Try AI chat
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showGoalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4"
            onClick={() => setShowGoalModal(false)}
          >
            <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: 'spring', damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-[#f1d3df] bg-[#fff7fb] p-6 shadow-2xl dark:border-white/10 dark:bg-[#1a0c16] sm:max-w-2xl sm:rounded-[2rem] sm:p-8"
            >
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ff8d8f,#d85e7a_52%,#bb8add)] text-white shadow-lg">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-semibold text-[#241816] dark:text-white">Choose your stage</h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
                  We&apos;ll take you to the right part of the app.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {pregnancyGoals.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => handleGoalSelection(goal)}
                    className={`flex flex-col rounded-[1.4rem] border p-4 text-left transition hover:border-[#e0b2c0] hover:shadow-md dark:hover:border-[#ffd1d0]/30 ${
                      selectedGoal?.id === goal.id
                        ? 'border-[#d85e7a] ring-2 ring-[#d85e7a]/20'
                        : 'border-[#f1d3df] dark:border-white/10'
                    }`}
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#f9a8d4,#f472b6)] text-white">
                      <goal.icon className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-[#241816] dark:text-white">{goal.title}</span>
                    <span className="mt-1 text-xs text-stone-500 dark:text-stone-400">{goal.duration}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="mt-6 w-full py-3 text-sm font-medium text-stone-600 transition hover:text-stone-900 dark:text-stone-300 dark:hover:text-white"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Menu,
  X,
  Sparkles,
  Home,
  Baby,
  MessageCircle,
  Users,
  Shield,
  Sun,
  Moon,
  User,
  BookOpen
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Pre-Conception', path: '/pre-conception', icon: Heart },
    { name: 'Journey', path: '/pregnancy-journey', icon: Baby },
    { name: 'Trimesters', path: '/trimesters', icon: BookOpen },
    { name: 'AI Chat', path: '/ai-chat', icon: MessageCircle },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Health', path: '/health-monitor', icon: Shield }
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  return (
    <>
      <nav className="theme-navbar fixed left-0 top-0 z-[60] w-full border-b shadow-sm backdrop-blur-xl transition-colors">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="https://png.pngtree.com/png-vector/20250512/ourlarge/pngtree-mom-and-baby-clipart-logo-png-image_16213228.png"
              alt=""
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-[#f2d5cb] dark:ring-[#7a5867]/60"
            />
            <div className="leading-tight min-w-0">
              <h1 className="text-base sm:text-lg font-bold tracking-wide text-white truncate">
                MomBuddy
              </h1>
              <p className="text-[10px] sm:text-xs text-white/80 truncate">AI-Powered Care</p>
            </div>
          </Link>

          {/* Desktop: scrollable link row */}
          <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center px-2">
            <div className="flex items-center gap-1 overflow-x-auto nav-scrollbar max-w-full py-1 px-1 rounded-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={item.name}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                      isActive(item.path)
                        ? 'bg-white/16 text-white shadow-md'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 opacity-90" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-xl border border-white/12 bg-white/8 p-2 text-white transition-colors hover:bg-white/14"
              aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              to="/profile"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive('/profile')
                  ? 'bg-white/16 text-white'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Profile</span>
            </Link>

            <Link
              to="/user-stepper"
              className="theme-button-primary hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition hover:brightness-110 sm:px-4 sm:text-sm"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Start</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              className="lg:hidden rounded-xl border border-transparent p-2 text-white hover:border-white/12 hover:bg-white/10"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[58] bg-black/50 backdrop-blur-sm lg:hidden"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 right-0 top-14 z-[59] flex w-[min(100%,20rem)] flex-col border-l border-white/12 bg-[linear-gradient(180deg,#5b2d42,#402232)] shadow-2xl sm:top-16 lg:hidden"
            >
              <div className="p-4 flex flex-col gap-1 overflow-y-auto flex-1">
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Navigate
                </p>
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                      isActive(item.path)
                          ? 'bg-white/16 text-white'
                          : 'text-white/85 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {item.name}
                    </Link>
                  );
                })}
                <div className="my-3 h-px bg-white/12" />
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium ${
                    isActive('/profile')
                      ? 'bg-white/16 text-white'
                      : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </Link>
                <Link
                  to="/user-stepper"
                  onClick={() => setIsOpen(false)}
                  className="theme-button-primary mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition hover:brightness-110"
                >
                  <Sparkles className="w-5 h-5" />
                  Get started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

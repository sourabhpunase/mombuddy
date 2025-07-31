import React, { useState } from 'react';
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
  Shield
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Pre-Conception', path: '/pre-conception', icon: Heart },
    { name: 'Pregnancy Journey', path: '/pregnancy-journey', icon: Baby },
    { name: 'AI Chat', path: '/ai-chat', icon: MessageCircle },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Health Monitor', path: '/health-monitor', icon: Shield }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-lg shadow-md border-b border-gray-200 dark:border-gray-700 transition-all">
      <div className="max-w-9xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://png.pngtree.com/png-vector/20250512/ourlarge/pngtree-mom-and-baby-clipart-logo-png-image_16213228.png"
            alt="MomBuddy"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="leading-tight text-gray-800 dark:text-white">
            <h1 className="text-xl font-bold tracking-wide">MomBuddy</h1>
            <p className="text-xs text-pink-600 dark:text-pink-400">AI-Powered Care</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-6 items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                      : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex">
          <Link
            to="/user-stepper"
            className="flex items-center gap-2 bg-pink-500 hover:bg-rose-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition-transform hover:scale-105"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Get Started Free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 dark:text-white"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-7 h-7" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Menu className="w-7 h-7" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden px-6 pb-6 space-y-4 bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-gray-700"
          >
            <div className="pt-4 flex flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${
                        isActive(item.path)
                          ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow'
                          : 'text-gray-800 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}

              <Link
                to="/user-stepper"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-lg font-bold shadow-md"
              >
                <Sparkles className="w-5 h-5" />
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

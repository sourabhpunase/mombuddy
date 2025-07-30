import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sparkles, Home, Baby, MessageCircle, Users, Shield } from 'lucide-react';

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
    <nav className="navbar">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link to="/" className="navbar-brand">
            <img 
              src="https://png.pngtree.com/png-vector/20250512/ourlarge/pngtree-mom-and-baby-clipart-logo-png-image_16213228.png" 
              alt="MomBuddy Logo" 
            />
            <div className="brand-text">
              <div className="brand-name">MomBuddy</div>
              <div className="brand-tagline">AI-Powered Care</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex navbar-nav">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`navbar-link flex items-center ${
                    isActive(item.path) ? 'active' : ''
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Enhanced CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/user-stepper"
              className="btn-primary px-8 py-3 text-sm font-bold flex items-center group"
            >
              <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
              Get Started Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors border-2 border-gray-200"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-4 pb-6 border-t-2 border-gray-200"
            >
              <div className="flex flex-col space-y-3 pt-6">
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`navbar-link flex items-center w-full ${
                          isActive(item.path) ? 'active' : ''
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <IconComponent className="w-5 h-5 mr-3" />
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    to="/user-stepper"
                    className="btn-primary px-8 py-4 text-base font-bold text-center w-full flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Started Free
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
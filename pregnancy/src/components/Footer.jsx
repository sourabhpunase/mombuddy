import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const brandLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdn0a46AYCWk_nck9efpCxELF3GSAkX7HR-w&s';

const Footer = () => {
  return (
    <footer className="border-t border-[#ecd3ce] bg-[linear-gradient(180deg,#fffaf6,#fff1eb)] px-4 py-12 text-stone-800 dark:border-white/10 dark:bg-[linear-gradient(180deg,#181116,#120d11)] dark:text-white sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={brandLogo}
                alt="MomBuddy logo"
                className="h-10 w-10 rounded-full object-cover bg-white/80 p-0.5 ring-2 ring-[#ecd3ce] dark:bg-white/10 dark:ring-white/10"
              />
              <span className="text-2xl font-bold">MomBuddy</span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-300">
              Calm, modern support for every stage of motherhood.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#ecd3ce] bg-white/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#c65473] dark:border-white/10 dark:bg-white/5 dark:text-[#ffd1d0]">
              <Sparkles className="h-3.5 w-3.5" />
              Built for mothers
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/trimesters" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                Trimesters
              </Link>
              <Link to="/symptoms" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                Symptom Tracker
              </Link>
              <Link to="/nutrition" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                Nutrition Guide
              </Link>
              <Link to="/ai-chat" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                AI Assistant
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link to="/community" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                Community
              </Link>
              <Link to="/help" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                Help Center
              </Link>
              <Link to="/privacy" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-stone-600 transition-colors hover:text-[#c65473] dark:text-stone-300 dark:hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-stone-600 dark:text-stone-300">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">support@mombuddy.com</span>
              </div>
              <div className="flex items-center text-stone-600 dark:text-stone-300">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">1-800-MOM-BUDDY</span>
              </div>
              <div className="flex items-center text-stone-600 dark:text-stone-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#ecd3ce] pt-8 text-center dark:border-white/10">
          <p className="text-sm text-stone-500 dark:text-stone-400">
            © {new Date().getFullYear()} MomBuddy. All rights reserved. Made with care for expecting mothers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

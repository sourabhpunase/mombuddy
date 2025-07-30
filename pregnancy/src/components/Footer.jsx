import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
              <span className="text-2xl font-bold">MomBuddy</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted companion throughout your pregnancy journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/trimesters" className="block text-gray-400 hover:text-white transition-colors">
                Trimesters
              </Link>
              <Link to="/symptoms" className="block text-gray-400 hover:text-white transition-colors">
                Symptom Tracker
              </Link>
              <Link to="/nutrition" className="block text-gray-400 hover:text-white transition-colors">
                Nutrition Guide
              </Link>
              <Link to="/ai-chat" className="block text-gray-400 hover:text-white transition-colors">
                AI Assistant
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link to="/community" className="block text-gray-400 hover:text-white transition-colors">
                Community
              </Link>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">support@mombuddy.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">1-800-MOM-BUDDY</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Available 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 MomBuddy. All rights reserved. Made with ❤️ for expecting mothers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
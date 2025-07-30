import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Baby, Settings } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    dueDate: '2024-08-15',
    currentWeek: 24,
    trimester: 2,
    babyName: 'Emma',
    notifications: true,
    privacy: 'friends'
  });

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          My Profile
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-pink-600 mr-2" />
              <h2 className="text-2xl font-semibold">Profile Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={profile.dueDate}
                  onChange={(e) => setProfile({...profile, dueDate: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Baby's Name (Optional)</label>
                <input
                  type="text"
                  value={profile.babyName}
                  onChange={(e) => setProfile({...profile, babyName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Privacy Settings</label>
                <select
                  value={profile.privacy}
                  onChange={(e) => setProfile({...profile, privacy: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={profile.notifications}
                  onChange={(e) => setProfile({...profile, notifications: e.target.checked})}
                  className="mr-2 w-4 h-4 text-pink-600"
                />
                <label className="text-sm">Enable push notifications</label>
              </div>

              <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all">
                Save Changes
              </button>
            </div>
          </div>

          {/* Pregnancy Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-purple-600 mr-2" />
                <h3 className="text-xl font-semibold">Pregnancy Progress</h3>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">Week {profile.currentWeek}</div>
                <div className="text-gray-600 mb-4">Trimester {profile.trimester}</div>
                
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-pink-600 to-purple-600 h-3 rounded-full transition-all"
                    style={{ width: `${(profile.currentWeek / 40) * 100}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600">
                  {40 - profile.currentWeek} weeks to go
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-4">
                <Baby className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Baby Info</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{profile.babyName || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold">Corn cob</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-semibold">~1.3 lbs</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-gray-600 mr-2" />
                <h3 className="text-xl font-semibold">Quick Actions</h3>
              </div>
              
              <div className="space-y-2">
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  Export Data
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  Share Profile
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Baby, Settings, Loader2 } from 'lucide-react';
import { saveProfile, exportUserData, requestProfileShare, requestAccountDeletion } from '../services/mombuddyApi.js';
import { useToast } from '../context/ToastContext.jsx';

const Profile = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    dueDate: '2024-08-15',
    currentWeek: 24,
    trimester: 2,
    babyName: 'Emma',
    notifications: true,
    privacy: 'friends'
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveProfile(profile);
      toast('Profile saved. (Connect your API to persist on the server.)', 'success');
    } catch (e) {
      toast('Could not save profile. Try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const runAction = async (key, fn, successMsg) => {
    setActionLoading(key);
    try {
      const res = await fn();
      if (key === 'share' && res?.copied) toast('Share link copied to clipboard.', 'success');
      else if (key === 'share') toast(successMsg, 'success');
      else toast(successMsg, 'success');
    } catch (e) {
      toast('Something went wrong.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="page-shell max-w-4xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white"
      >
        My Profile
      </motion.h1>

      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 card-surface p-5 sm:p-6">
          <div className="flex items-center mb-6">
            <User className="w-6 h-6 text-pink-600 dark:text-pink-400 mr-2 shrink-0" />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Due Date</label>
              <input
                type="date"
                value={profile.dueDate}
                onChange={(e) => setProfile({ ...profile, dueDate: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Baby&apos;s Name (Optional)</label>
              <input
                type="text"
                value={profile.babyName}
                onChange={(e) => setProfile({ ...profile, babyName: e.target.value })}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-slate-300">Privacy Settings</label>
              <select
                value={profile.privacy}
                onChange={(e) => setProfile({ ...profile, privacy: e.target.value })}
                className="input-field"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="notif"
                checked={profile.notifications}
                onChange={(e) => setProfile({ ...profile, notifications: e.target.checked })}
                className="mr-2 w-4 h-4 text-pink-600 rounded border-gray-300"
              />
              <label htmlFor="notif" className="text-sm text-gray-700 dark:text-slate-300">
                Enable push notifications
              </label>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {saving && <Loader2 className="w-5 h-5 animate-spin" />}
              Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2 shrink-0" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Pregnancy Progress</h3>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">Week {profile.currentWeek}</div>
              <div className="text-gray-600 dark:text-slate-400 mb-4">Trimester {profile.trimester}</div>

              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-pink-600 to-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${(profile.currentWeek / 40) * 100}%` }}
                />
              </div>

              <p className="text-sm text-gray-600 dark:text-slate-400">{40 - profile.currentWeek} weeks to go</p>
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center mb-4">
              <Baby className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2 shrink-0" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Baby Info</h3>
            </div>

            <div className="space-y-3 text-sm sm:text-base">
              <div className="flex justify-between gap-2">
                <span className="text-gray-600 dark:text-slate-400">Name:</span>
                <span className="font-semibold text-gray-900 dark:text-white text-right">{profile.babyName || 'Not set'}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-600 dark:text-slate-400">Size:</span>
                <span className="font-semibold text-gray-900 dark:text-white">Corn cob</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-600 dark:text-slate-400">Weight:</span>
                <span className="font-semibold text-gray-900 dark:text-white">~1.3 lbs</span>
              </div>
            </div>
          </div>

          <div className="card-surface p-5 sm:p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-gray-600 dark:text-slate-400 mr-2 shrink-0" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => runAction('export', exportUserData, 'Export started — check your downloads.')}
                disabled={actionLoading}
                className="w-full text-left p-3 rounded-lg transition-colors text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 disabled:opacity-50"
              >
                {actionLoading === 'export' && <Loader2 className="w-4 h-4 animate-spin" />}
                Export Data
              </button>
              <button
                type="button"
                onClick={() => runAction('share', requestProfileShare, 'Share link ready.')}
                disabled={actionLoading}
                className="w-full text-left p-3 rounded-lg transition-colors text-gray-800 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2 disabled:opacity-50"
              >
                {actionLoading === 'share' && <Loader2 className="w-4 h-4 animate-spin" />}
                Share Profile
              </button>
              <button
                type="button"
                onClick={() =>
                  runAction(
                    'delete',
                    requestAccountDeletion,
                    'Demo only — no account was removed. Connect DELETE /api/user to go live.'
                  )
                }
                disabled={actionLoading}
                className="w-full text-left p-3 rounded-lg transition-colors text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 disabled:opacity-50"
              >
                {actionLoading === 'delete' && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

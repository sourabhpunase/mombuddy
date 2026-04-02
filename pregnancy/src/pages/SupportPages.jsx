import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Shield, FileText } from 'lucide-react';

function Shell({ title, icon: Icon, children }) {
  return (
    <div className="page-shell max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-pink-600 dark:text-pink-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <div className="card-surface p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-6">
            {Icon && <Icon className="w-10 h-10 text-pink-600 dark:text-pink-400" />}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <div className="max-w-none text-gray-700 dark:text-slate-300 space-y-4 text-base leading-relaxed">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function HelpCenter() {
  return (
    <Shell title="Help Center" icon={HelpCircle}>
      <p>
        MomBuddy is a companion app for education and planning. It does not replace medical care. For urgent
        concerns, contact your clinician or emergency services.
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>AI Chat</strong> — Use <Link className="text-pink-600 dark:text-pink-400" to="/ai-chat">AI Chat</Link> for general questions; answers are informational only.
        </li>
        <li>
          <strong>Trackers</strong> — Symptom and health tools store data in your browser until a backend is connected.
        </li>
        <li>
          <strong>Community</strong> — Features use demo content; real forums will sync when the API is live.
        </li>
      </ul>
      <p>
        Email <a className="text-pink-600 dark:text-pink-400" href="mailto:support@mombuddy.com">support@mombuddy.com</a> for product support (demo).
      </p>
    </Shell>
  );
}

export function PrivacyPolicy() {
  return (
    <Shell title="Privacy Policy" icon={Shield}>
      <p><em>Summary for the current demo build.</em></p>
      <p>
        Data you enter may be stored locally in your browser (e.g. profile fields). When you connect a backend via{' '}
        <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 rounded">VITE_API_URL</code>, that server’s
        privacy policy will apply.
      </p>
      <p>We do not sell personal health data in this demo. Export and delete actions are mocked until APIs exist.</p>
    </Shell>
  );
}

export function TermsOfService() {
  return (
    <Shell title="Terms of Service" icon={FileText}>
      <p><em>Demo terms — not legal advice.</em></p>
      <p>
        By using MomBuddy you agree the app is for informational purposes only. Always follow advice from your
        qualified healthcare providers.
      </p>
      <p>The service is provided &quot;as is&quot; without warranties. Limitation of liability applies to the maximum extent permitted by law.</p>
    </Shell>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PreConception from './pages/PreConception';
import FertilityTracker from './pages/FertilityTracker';
import PregnancyJourney from './pages/PregnancyJourney';
import WeeklyGuide from './pages/WeeklyGuide';
import SymptomTracker from './pages/SymptomTracker';
import NutritionGuide from './pages/NutritionGuide';
import BirthPlan from './pages/BirthPlan';
import Community from './pages/Community';
import AIChat from './pages/AIChat';
import Profile from './pages/Profile';
import DailyTracker from './components/DailyTracker';
import ReportAnalyzer from './components/ReportAnalyzer';
import PostpartumCare from './pages/PostpartumCare';
import NaturalBirthPrep from './pages/NaturalBirthPrep';
import HealthMonitoring from './pages/HealthMonitoring';
import PregnancyPlan30Days from './components/PregnancyPlan30Days';
import FetalHealthTracker from './components/FetalHealthTracker';
import UserSpecificStepper from './components/UserSpecificStepper';
import Trimesters from './pages/Trimesters';
import { HelpCenter, PrivacyPolicy, TermsOfService } from './pages/SupportPages';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell antialiased">
        <Navbar />
        <main id="main-content" className="pt-16 sm:pt-[4.5rem] scroll-mt-16 sm:scroll-mt-[4.5rem]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pre-conception" element={<PreConception />} />
            <Route path="/fertility" element={<FertilityTracker />} />
            <Route path="/pregnancy-journey" element={<PregnancyJourney />} />
            <Route path="/weekly-guide" element={<WeeklyGuide />} />
            <Route path="/symptoms" element={<SymptomTracker />} />
            <Route path="/nutrition" element={<NutritionGuide />} />
            <Route path="/birth-plan" element={<BirthPlan />} />
            <Route path="/community" element={<Community />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/daily-tracker" element={<DailyTracker />} />
            <Route path="/ai-analysis" element={<ReportAnalyzer />} />
            <Route path="/postpartum" element={<PostpartumCare />} />
            <Route path="/natural-birth" element={<NaturalBirthPrep />} />
            <Route path="/health-monitor" element={<HealthMonitoring />} />
            <Route path="/30-day-plan" element={<PregnancyPlan30Days />} />
            <Route path="/fetal-health" element={<FetalHealthTracker />} />
            <Route path="/user-stepper" element={<UserSpecificStepper />} />
            <Route path="/trimesters" element={<Trimesters />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

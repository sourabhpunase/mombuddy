import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './App.css';
import './styles/futuristic-ai.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-rose-50">
        <Navbar />
        <main className="pt-16">
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// import RealtimeApp from 'sourabhrealtime';

// function App() {
//   return <RealtimeApp apiUrl="http://localhost:3002" />;
// }

// export default App;

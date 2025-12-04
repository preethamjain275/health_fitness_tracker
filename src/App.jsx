import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HealthProvider } from './context/HealthContext';
import Layout from './layouts/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import BMICalculator from './pages/BMICalculator';
import CalorieTracker from './pages/CalorieTracker';
import WaterTracker from './pages/WaterTracker';
import SleepMonitor from './pages/SleepMonitor';
import ExerciseLog from './pages/ExerciseLog';
import SymptomChecker from './pages/SymptomChecker';
import HeartRateTracker from './pages/HeartRateTracker';
import Profile from './pages/Profile';
import WeeklyActivity from './pages/WeeklyActivity';
import HealthAssistant from './pages/HealthAssistant';

function App() {
  return (
    <HealthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bmi" element={<BMICalculator />} />
            <Route path="/calories" element={<CalorieTracker />} />
            <Route path="/water" element={<WaterTracker />} />
            <Route path="/sleep" element={<SleepMonitor />} />
            <Route path="/exercise" element={<ExerciseLog />} />
            <Route path="/symptoms" element={<SymptomChecker />} />
            <Route path="/heart" element={<HeartRateTracker />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/activity" element={<WeeklyActivity />} />
            <Route path="/assistant" element={<HealthAssistant />} />
          </Routes>
        </Layout>
      </Router>
    </HealthProvider>
  );
}

export default App;

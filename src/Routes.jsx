import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TeamFeedbackDashboard from './pages/team-feedback-dashboard';
import LeadershipDashboard from './pages/leadership-dashboard';
import AIAnalysisResults from './pages/ai-analysis-results';
import LeadershipHistory from './pages/leadership-history';
import LearningResources from './pages/learning-resources';
import DailyReflection from './pages/daily-reflection';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LeadershipDashboard />} />
        <Route path="/team-feedback-dashboard" element={<TeamFeedbackDashboard />} />
        <Route path="/leadership-dashboard" element={<LeadershipDashboard />} />
        <Route path="/ai-analysis-results" element={<AIAnalysisResults />} />
        <Route path="/leadership-history" element={<LeadershipHistory />} />
        <Route path="/learning-resources" element={<LearningResources />} />
        <Route path="/daily-reflection" element={<DailyReflection />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import WelcomeHeader from './components/WelcomeHeader';
import DailyReflectionCard from './components/DailyReflectionCard';
import AIInsightsCard from './components/AIInsightsCard';
import LeadershipTrendsChart from './components/LeadershipTrendsChart';
import TeamFeedbackCard from './components/TeamFeedbackCard';
import LearningRecommendationsCard from './components/LearningRecommendationsCard';
import QuickNavigationCards from './components/QuickNavigationCards';
import LoadingShimmer from '../../components/ui/LoadingShimmer';

const LeadershipDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    role: "Senior Engineering Manager",
    currentStreak: 12,
    completionRate: 87,
    teamSize: 15
  };

  // Mock daily reflection data
  const reflectionData = {
    completed: true,
    audioCompleted: true,
    streak: 12,
    lastEntry: "Focused on team collaboration and clear communication during sprint planning."
  };

  // Mock AI insights data
  const insightsData = {
    leadershipStyle: "Collaborative Leader with Empowering Tendencies",
    confidence: 85,
    recentInsights: [
    "Your communication clarity has improved by 23% this week",
    "Team engagement scores show positive correlation with your feedback style",
    "Consider focusing on delegation skills for continued growth"]

  };

  // Mock trends data for chart
  const trendsData = [
  { date: "Oct 1", confidence: 75, stress: 45, teamInvolvement: 80 },
  { date: "Oct 5", confidence: 78, stress: 40, teamInvolvement: 82 },
  { date: "Oct 10", confidence: 82, stress: 35, teamInvolvement: 85 },
  { date: "Oct 15", confidence: 85, stress: 30, teamInvolvement: 88 },
  { date: "Oct 20", confidence: 87, stress: 25, teamInvolvement: 90 },
  { date: "Oct 24", confidence: 85, stress: 28, teamInvolvement: 92 }];


  // Mock team feedback data
  const feedbackData = {
    newCount: 3,
    recentFeedback: [
    {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1687256457585-3608dfa736c5",
      avatarAlt: "Professional headshot of Asian man with short black hair in navy blazer",
      message: "Sarah\'s leadership during the product launch was exceptional. Her clear communication and support helped our team exceed expectations.",
      time: "2 hours ago",
      sentiment: "positive"
    },
    {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1628013663808-25ef6a3b28b4",
      avatarAlt: "Professional headshot of Hispanic woman with long brown hair in white blouse",
      message: "I appreciate how Sarah always makes time for one-on-ones and provides constructive feedback that helps me grow professionally.",
      time: "5 hours ago",
      sentiment: "positive"
    },
    {
      name: "David Thompson",
      avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
      avatarAlt: "Professional headshot of Caucasian man with brown hair and beard in gray suit",
      message: "Would love to see more frequent team meetings to align on priorities and discuss blockers.",
      time: "1 day ago",
      sentiment: "neutral"
    }]

  };

  // Mock learning recommendations data
  const learningData = {
    focusArea: "Delegation and Team Empowerment",
    videos: [
    {
      title: "The Art of Delegation: Empowering Your Team",
      description: "Learn effective delegation strategies that build trust and develop your team\'s capabilities.",
      thumbnail: "https://images.unsplash.com/photo-1622674777904-386b3ef30c4a",
      thumbnailAlt: "Business meeting with diverse team members collaborating around conference table",
      duration: "12:34",
      views: "45K",
      url: "https://youtube.com/watch?v=delegation-example"
    },
    {
      title: "Building High-Performance Teams",
      description: "Discover the key principles for creating and maintaining high-performing teams in any organization.",
      thumbnail: "https://images.unsplash.com/photo-1531537264351-c1952d1db1f5",
      thumbnailAlt: "Team of professionals working together on laptops in modern office space",
      duration: "18:45",
      views: "67K",
      url: "https://youtube.com/watch?v=team-building-example"
    }]

  };

  // Mock navigation data
  const navigationData = [
  {
    id: 1,
    title: "Books & Reading",
    description: "Explore curated leadership books with Amazon purchase links and track your reading progress.",
    icon: "BookOpen",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    path: "/learning-resources",
    hasProgress: true,
    progress: 65,
    stats: [
    { value: "12", label: "Books Read" },
    { value: "3", label: "In Progress" }]

  },
  {
    id: 2,
    title: "Leadership Courses",
    description: "Access premium courses from Coursera and edX tailored to your leadership development needs.",
    icon: "GraduationCap",
    iconColor: "text-success",
    bgColor: "bg-success/10",
    path: "/learning-resources",
    hasProgress: true,
    progress: 40,
    stats: [
    { value: "5", label: "Completed" },
    { value: "2", label: "Active" }]

  },
  {
    id: 3,
    title: "Profile & Settings",
    description: "Manage your leadership profile, update role information, and customize your experience.",
    icon: "User",
    iconColor: "text-warning",
    bgColor: "bg-warning/10",
    path: "/leadership-history",
    hasNotification: true,
    notificationText: "Profile 85% complete"
  },
  {
    id: 4,
    title: "Leadership History",
    description: "Review your leadership journey with detailed analytics, feedback timeline, and growth insights.",
    icon: "History",
    iconColor: "text-secondary",
    bgColor: "bg-secondary/10",
    path: "/leadership-history",
    stats: [
    { value: "89", label: "Days Active" },
    { value: "156", label: "Reflections" }]

  },
  {
    id: 5,
    title: "Team Analytics",
    description: "Deep dive into team performance metrics and feedback patterns with advanced analytics.",
    icon: "BarChart3",
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    path: "/team-feedback-dashboard",
    hasNotification: true,
    notificationText: "New insights available"
  },
  {
    id: 6,
    title: "AI Coach",
    description: "Get personalized coaching recommendations and insights powered by advanced AI analysis.",
    icon: "Bot",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
    path: "/ai-analysis-results",
    hasNotification: true,
    notificationText: "Weekly report ready"
  }];


  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LoadingShimmer variant="card" className="mb-8" lines={2} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <LoadingShimmer variant="card" lines={4} />
              <LoadingShimmer variant="card" lines={4} />
              <LoadingShimmer variant="card" lines={4} />
            </div>
            <LoadingShimmer variant="chart" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 })?.map((_, index) =>
              <LoadingShimmer key={index} variant="card" lines={3} />
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          <WelcomeHeader userData={userData} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}>

              <DailyReflectionCard reflectionData={reflectionData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}>

              <AIInsightsCard insightsData={insightsData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}>

              <TeamFeedbackCard feedbackData={feedbackData} />
            </motion.div>
          </div>

          {/* Trends Chart */}
          <div className="mb-8">
            <LeadershipTrendsChart trendsData={trendsData} />
          </div>

          {/* Learning Recommendations */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}>

              <LearningRecommendationsCard learningData={learningData} />
            </motion.div>
          </div>

          {/* Quick Navigation Cards */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}>

              <h2 className="text-2xl font-bold text-foreground mb-6">Quick Access</h2>
              <QuickNavigationCards navigationData={navigationData} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>);

};

export default LeadershipDashboard;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LeadershipStyleCard from './components/LeadershipStyleCard';
import InsightsPanel from './components/InsightsPanel';
import RecommendationsSection from './components/RecommendationsSection';
import TrendChart from './components/TrendChart';
import ActionStepsCard from './components/ActionStepsCard';
import LoadingAnalysis from './components/LoadingAnalysis';

const AIAnalysisResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  // Mock analysis data
  const mockAnalysisData = {
    leadershipStyle: "Collaborative",
    confidence: 78,
    analysisDate: "October 24, 2024",
    insights: [
    {
      id: 1,
      type: "strength",
      title: "Strong Team Communication",
      description: "Your reflections consistently show excellent communication with team members. You actively listen and provide clear direction.",
      actionable: "Continue leveraging this strength by mentoring others in communication skills."
    },
    {
      id: 2,
      type: "improvement",
      title: "Decision-Making Speed",
      description: "Analysis indicates hesitation in making quick decisions during high-pressure situations.",
      actionable: "Practice the 10-10-10 rule: How will you feel about this decision in 10 minutes, 10 months, and 10 years?"
    },
    {
      id: 3,
      type: "pattern",
      title: "Weekly Stress Peaks",
      description: "Your stress levels consistently peak on Wednesdays, often related to project deadlines and team meetings.",
      actionable: "Consider redistributing workload or scheduling buffer time on Tuesdays."
    },
    {
      id: 4,
      type: "recommendation",
      title: "Delegation Opportunities",
      description: "You tend to take on tasks that could be effectively delegated to develop team members\' skills.",
      actionable: "Identify 2-3 tasks this week that you can delegate with proper guidance and support."
    }],

    recommendations: {
      videos: [
      {
        id: 1,
        title: "The Art of Collaborative Leadership",
        description: "Learn how to build stronger team relationships and foster collaborative decision-making in your organization.",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "12:45",
        channel: "Leadership Excellence"
      },
      {
        id: 2,
        title: "Effective Communication Strategies for Leaders",
        description: "Master the communication techniques that top leaders use to inspire and motivate their teams.",
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "18:30",
        channel: "Harvard Business Review"
      }],

      books: [
      {
        id: 1,
        title: "The Collaborative Leader",
        author: "David Archer",
        description: "A comprehensive guide to building collaborative teams and fostering innovation through shared leadership.",
        cover: "https://images.unsplash.com/photo-1637917391093-a55812c55849",
        coverAlt: "Book cover showing collaborative leadership concept with interconnected circles on blue background",
        amazonUrl: "https://amazon.com/collaborative-leader"
      },
      {
        id: 2,
        title: "Crucial Conversations",
        author: "Kerry Patterson",
        description: "Tools for talking when stakes are high and emotions run strong in leadership situations.",
        cover: "https://images.unsplash.com/photo-1521301914133-1b4763d20f3c",
        coverAlt: "Book cover with conversation bubbles and professional business imagery on white background",
        amazonUrl: "https://amazon.com/crucial-conversations"
      }],

      courses: [
      {
        id: 1,
        title: "Collaborative Leadership and Team Management",
        description: "Develop skills in collaborative leadership, team building, and conflict resolution through practical exercises and case studies.",
        duration: "6 weeks",
        provider: "Coursera",
        url: "https://coursera.org/collaborative-leadership"
      },
      {
        id: 2,
        title: "Strategic Leadership and Management",
        description: "Learn to lead strategic initiatives, manage organizational change, and build high-performing teams.",
        duration: "8 weeks",
        provider: "edX",
        url: "https://edx.org/strategic-leadership"
      }]

    },
    trendData: [
    { date: "Oct 17", confidence: 72, teamInvolvement: 68, communication: 75, satisfaction: 70 },
    { date: "Oct 18", confidence: 75, teamInvolvement: 72, communication: 78, satisfaction: 73 },
    { date: "Oct 19", confidence: 70, teamInvolvement: 65, communication: 72, satisfaction: 68 },
    { date: "Oct 20", confidence: 78, teamInvolvement: 75, communication: 80, satisfaction: 76 },
    { date: "Oct 21", confidence: 76, teamInvolvement: 73, communication: 77, satisfaction: 74 },
    { date: "Oct 22", confidence: 80, teamInvolvement: 78, communication: 82, satisfaction: 79 },
    { date: "Oct 23", confidence: 78, teamInvolvement: 76, communication: 79, satisfaction: 77 }],

    actionSteps: [
    {
      id: 1,
      title: "Schedule Weekly One-on-Ones",
      description: "Implement regular individual meetings with each team member to strengthen relationships and provide personalized guidance.",
      priority: "high",
      timeframe: "This week",
      category: "Team Building",
      resourceUrl: "https://example.com/one-on-one-guide"
    },
    {
      id: 2,
      title: "Practice Active Listening Techniques",
      description: "Focus on improving listening skills during team meetings by summarizing what others say before responding.",
      priority: "medium",
      timeframe: "Next 2 weeks",
      category: "Communication",
      resourceUrl: "https://example.com/active-listening"
    },
    {
      id: 3,
      title: "Delegate Project Management Tasks",
      description: "Identify opportunities to delegate project coordination tasks to develop team members' leadership skills.",
      priority: "medium",
      timeframe: "Next month",
      category: "Development",
      resourceUrl: "https://example.com/delegation-guide"
    },
    {
      id: 4,
      title: "Create Team Decision Framework",
      description: "Develop a structured approach for collaborative decision-making that includes all team members\' input.",
      priority: "low",
      timeframe: "Next 6 weeks",
      category: "Process Improvement"
    }]

  };

  useEffect(() => {
    // Simulate AI analysis loading
    const timer = setTimeout(() => {
      setAnalysisData(mockAnalysisData);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleNewReflection = () => {
    navigate('/daily-reflection');
  };

  const handleViewHistory = () => {
    navigate('/leadership-history');
  };

  if (isLoading) {
    return <LoadingAnalysis />;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail />
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  AI Analysis Results
                </h1>
                <p className="text-muted-foreground">
                  Comprehensive insights from your leadership reflection on {analysisData?.analysisDate}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  iconName="History"
                  iconPosition="left"
                  onClick={handleViewHistory}>

                  View History
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleNewReflection}>

                  New Reflection
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Analysis Content */}
          <div className="space-y-8">
            {/* Leadership Style and Key Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LeadershipStyleCard
                leadershipStyle={analysisData?.leadershipStyle}
                confidence={analysisData?.confidence} />

              <InsightsPanel insights={analysisData?.insights} />
            </div>

            {/* Trend Chart */}
            <TrendChart trendData={analysisData?.trendData} />

            {/* Recommendations and Action Steps Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecommendationsSection recommendations={analysisData?.recommendations} />
              <ActionStepsCard actionSteps={analysisData?.actionSteps} />
            </div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-card rounded-lg border border-border p-6 shadow-lg">

              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Sparkles" size={24} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">Growth Summary</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="TrendingUp" size={20} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Strengths Identified</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong collaborative approach and excellent team communication skills
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Target" size={20} className="text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Focus Areas</h3>
                  <p className="text-sm text-muted-foreground">
                    Decision-making speed and strategic delegation opportunities
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="BookOpen" size={20} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">Next Steps</h3>
                  <p className="text-sm text-muted-foreground">
                    4 actionable steps identified with personalized learning resources
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>);

};

export default AIAnalysisResults;
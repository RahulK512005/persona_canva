import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import FeedbackCard from './components/FeedbackCard';
import FeedbackFilters from './components/FeedbackFilters';
import GoogleFormsIntegration from './components/GoogleFormsIntegration';
import AIInsightsPanel from './components/AIInsightsPanel';

const TeamFeedbackDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    sortBy: 'newest',
    category: 'all',
    status: 'all',
    rating: 'all'
  });

  // Mock feedback data
  const mockFeedbackData = [
    {
      id: 1,
      content: "I really appreciate how you've been handling the recent project challenges. Your communication during the crisis was clear and helped keep the team focused. However, I think there could be more opportunities for team input during decision-making processes. Sometimes decisions feel like they come from the top without considering our on-ground perspective.",
      rating: 4,
      category: 'communication',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)?.toISOString(),
      isRead: false,
      hasResponse: false,
      response: null
    },
    {
      id: 2,
      content: "Your leadership style has really evolved over the past few months. I feel more supported and valued as a team member. The weekly check-ins have been particularly helpful. One area for improvement might be providing more specific feedback during performance reviews.",
      rating: 5,
      category: 'leadership-style',
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)?.toISOString(),
      isRead: true,
      hasResponse: true,
      response: {
        type: 'acknowledge',
        content: "Thank you for this positive feedback! I'm glad the weekly check-ins are working well. I'll definitely work on providing more specific and actionable feedback during our next performance review cycle.",
        respondedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)?.toISOString()
      }
    },
    {
      id: 3,
      content: "I've noticed that meeting times often run over, which affects my other commitments. While I appreciate thorough discussions, it would be helpful if we could stick to the scheduled timeframes or at least give advance notice when meetings might run long.",
      rating: 3,
      category: 'team-support',
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)?.toISOString(),
      isRead: true,
      hasResponse: false,
      response: null
    },
    {
      id: 4,
      content: "The new project assignment process has been much clearer than before. I appreciate how you\'ve been matching tasks to our strengths and interests. This has definitely improved my job satisfaction and productivity.",
      rating: 5,
      category: 'decision-making',
      submittedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)?.toISOString(),
      isRead: true,
      hasResponse: true,
      response: {
        type: 'acknowledge',
        content: "I'm so pleased to hear this! Matching tasks to individual strengths has been a priority for me, and it's great to see it's having a positive impact on both satisfaction and productivity.",
        respondedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000)?.toISOString()
      }
    },
    {
      id: 5,
      content: "I feel like there's been a lack of transparency around some recent organizational changes. While I understand not everything can be shared immediately, more context about how these changes affect our team would be appreciated.",
      rating: 2,
      category: 'communication',
      submittedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)?.toISOString(),
      isRead: false,
      hasResponse: false,
      response: null
    },
    {
      id: 6,
      content: "Your open-door policy has been really valuable. I feel comfortable approaching you with concerns and ideas. The feedback culture you've created has made our team more collaborative and innovative.",
      rating: 5,
      category: 'feedback-culture',
      submittedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)?.toISOString(),
      isRead: true,
      hasResponse: true,
      response: {
        type: 'acknowledge',
        content: "Thank you! Creating a safe space for feedback and ideas has been one of my key goals. I\'m thrilled to hear it\'s contributing to our team\'s collaboration and innovation.",
        respondedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)?.toISOString()
      }
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setFeedbackData(mockFeedbackData);
      setFilteredFeedback(mockFeedbackData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...feedbackData];

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter(feedback =>
        feedback?.content?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(feedback => feedback?.category === filters?.category);
    }

    // Status filter
    if (filters?.status !== 'all') {
      if (filters?.status === 'unread') {
        filtered = filtered?.filter(feedback => !feedback?.isRead);
      } else if (filters?.status === 'responded') {
        filtered = filtered?.filter(feedback => feedback?.hasResponse);
      } else if (filters?.status === 'pending') {
        filtered = filtered?.filter(feedback => feedback?.isRead && !feedback?.hasResponse);
      }
    }

    // Rating filter
    if (filters?.rating !== 'all') {
      filtered = filtered?.filter(feedback => feedback?.rating === parseInt(filters?.rating));
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'newest':
          return new Date(b.submittedAt) - new Date(a.submittedAt);
        case 'oldest':
          return new Date(a.submittedAt) - new Date(b.submittedAt);
        case 'rating-high':
          return b?.rating - a?.rating;
        case 'rating-low':
          return a?.rating - b?.rating;
        case 'unread':
          return (b?.isRead ? 0 : 1) - (a?.isRead ? 0 : 1);
        default:
          return 0;
      }
    });

    setFilteredFeedback(filtered);
  }, [feedbackData, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRespond = (feedbackId, responseType, responseContent) => {
    setFeedbackData(prev => prev?.map(feedback => {
      if (feedback?.id === feedbackId) {
        return {
          ...feedback,
          hasResponse: true,
          isRead: true,
          response: {
            type: responseType,
            content: responseContent,
            respondedAt: new Date()?.toISOString()
          }
        };
      }
      return feedback;
    }));
  };

  const handleCreateForm = (formConfig) => {
    // Mock Google Forms creation
    console.log('Creating Google Form with config:', formConfig);
    
    // In a real implementation, this would integrate with Google Forms API
    alert(`Google Form "${formConfig?.title}" created successfully! The form link has been copied to your clipboard.`);
  };

  const feedbackStats = {
    total: feedbackData?.length,
    unread: feedbackData?.filter(f => !f?.isRead)?.length,
    responded: feedbackData?.filter(f => f?.hasResponse)?.length,
    avgRating: feedbackData?.length > 0 
      ? (feedbackData?.reduce((sum, f) => sum + f?.rating, 0) / feedbackData?.length)?.toFixed(1)
      : '0.0'
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="space-y-4">
                {[1, 2, 3]?.map(i => (
                  <div key={i} className="h-48 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Team Feedback Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Review team feedback, respond to comments, and track feedback trends
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="RefreshCw"
                  iconPosition="left"
                  onClick={() => {
                    setIsAnalyzing(true);
                    setTimeout(() => setIsAnalyzing(false), 3000);
                  }}
                  loading={isAnalyzing}
                >
                  Refresh Analysis
                </Button>
                
                <Button
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Google Forms Integration */}
              <GoogleFormsIntegration onCreateForm={handleCreateForm} />
              
              {/* Filters */}
              <FeedbackFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                feedbackStats={feedbackStats}
              />
              
              {/* Feedback List */}
              <div className="space-y-4">
                {filteredFeedback?.length > 0 ? (
                  filteredFeedback?.map((feedback) => (
                    <FeedbackCard
                      key={feedback?.id}
                      feedback={feedback}
                      onRespond={handleRespond}
                    />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 bg-card border border-border rounded-lg"
                  >
                    <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No feedback found</h3>
                    <p className="text-muted-foreground mb-4">
                      {filters?.search || filters?.category !== 'all' || filters?.status !== 'all' || filters?.rating !== 'all' ?'Try adjusting your filters to see more results.' :'Create a feedback form to start collecting team input.'
                      }
                    </p>
                    {(!filters?.search && filters?.category === 'all' && filters?.status === 'all' && filters?.rating === 'all') && (
                      <Button
                        iconName="Plus"
                        iconPosition="left"
                        onClick={() => {
                          // Scroll to Google Forms section
                          document.querySelector('.google-forms-integration')?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                        }}
                      >
                        Create Feedback Form
                      </Button>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Insights */}
              <AIInsightsPanel 
                feedbackData={feedbackData}
                isAnalyzing={isAnalyzing}
              />
              
              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Users"
                    iconPosition="left"
                  >
                    View Team Directory
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Schedule 1:1 Meetings
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="BookOpen"
                    iconPosition="left"
                  >
                    Leadership Resources
                  </Button>
                  
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="TrendingUp"
                    iconPosition="left"
                  >
                    View Progress Reports
                  </Button>
                </div>
              </motion.div>
              
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">New feedback received</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Response sent to team member</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Feedback form created</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamFeedbackDashboard;
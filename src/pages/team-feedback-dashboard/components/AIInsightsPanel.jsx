import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import LoadingShimmer from '../../../components/ui/LoadingShimmer';

const AIInsightsPanel = ({ feedbackData, isAnalyzing }) => {
  const [insights, setInsights] = useState(null);
  const [activeTab, setActiveTab] = useState('sentiment');

  // Mock AI analysis results
  const mockInsights = {
    sentiment: {
      overall: 'positive',
      score: 4.2,
      distribution: {
        positive: 65,
        neutral: 25,
        negative: 10
      },
      trend: 'improving'
    },
    themes: [
      {
        theme: 'Communication Clarity',
        frequency: 18,
        sentiment: 'positive',
        examples: [
          "Clear instructions during meetings",
          "Good at explaining complex decisions",
          "Always available for questions"
        ]
      },
      {
        theme: 'Decision Making Speed',
        frequency: 12,
        sentiment: 'mixed',
        examples: [
          "Sometimes takes too long to decide",
          "Thorough analysis before decisions",
          "Could be more decisive in urgent situations"
        ]
      },
      {
        theme: 'Team Support',
        frequency: 15,
        sentiment: 'positive',
        examples: [
          "Always supports team members",
          "Provides necessary resources",
          "Advocates for the team with upper management"
        ]
      }
    ],
    suggestions: [
      {
        priority: 'high',
        category: 'Decision Making',
        suggestion: 'Consider setting decision deadlines for non-critical issues to improve perceived responsiveness',
        impact: 'Could improve team confidence and project velocity'
      },
      {
        priority: 'medium',
        category: 'Communication',
        suggestion: 'Continue current communication practices while exploring more frequent check-ins',
        impact: 'Maintain current positive sentiment and catch issues earlier'
      },
      {
        priority: 'low',
        category: 'Team Development',
        suggestion: 'Consider implementing peer feedback sessions to complement leadership feedback',
        impact: 'Could provide more comprehensive team development insights'
      }
    ],
    patterns: {
      timeOfDay: {
        morning: 35,
        afternoon: 45,
        evening: 20
      },
      responseTime: '2.3 days average',
      engagementRate: '78%'
    }
  };

  useEffect(() => {
    if (feedbackData && feedbackData?.length > 0) {
      // Simulate AI analysis delay
      const timer = setTimeout(() => {
        setInsights(mockInsights);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [feedbackData]);

  const tabs = [
    { id: 'sentiment', label: 'Sentiment Analysis', icon: 'TrendingUp' },
    { id: 'themes', label: 'Key Themes', icon: 'Tag' },
    { id: 'suggestions', label: 'AI Suggestions', icon: 'Lightbulb' },
    { id: 'patterns', label: 'Patterns', icon: 'BarChart3' }
  ];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      case 'mixed': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getSentimentBg = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-success/10';
      case 'negative': return 'bg-error/10';
      case 'mixed': return 'bg-warning/10';
      default: return 'bg-muted/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  if (isAnalyzing || !insights) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-lg p-6"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">
              Analyzing feedback patterns and sentiment...
            </p>
          </div>
        </div>
        <LoadingShimmer variant="chart" className="h-64" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">
              Powered by Gemini AI • Last updated: {new Date()?.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'sentiment' && (
          <div className="space-y-6">
            {/* Overall Sentiment */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{insights?.sentiment?.score}/5</div>
              <div className="text-lg font-medium text-foreground mb-1">Overall Sentiment</div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentBg(insights?.sentiment?.overall)} ${getSentimentColor(insights?.sentiment?.overall)}`}>
                <Icon name="TrendingUp" size={16} className="mr-1" />
                {insights?.sentiment?.overall} ({insights?.sentiment?.trend})
              </div>
            </div>

            {/* Sentiment Distribution */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Sentiment Distribution</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-success">Positive</span>
                  <span className="text-sm font-medium">{insights?.sentiment?.distribution?.positive}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-500"
                    style={{ width: `${insights?.sentiment?.distribution?.positive}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Neutral</span>
                  <span className="text-sm font-medium">{insights?.sentiment?.distribution?.neutral}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-muted-foreground h-2 rounded-full transition-all duration-500"
                    style={{ width: `${insights?.sentiment?.distribution?.neutral}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-error">Negative</span>
                  <span className="text-sm font-medium">{insights?.sentiment?.distribution?.negative}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-error h-2 rounded-full transition-all duration-500"
                    style={{ width: `${insights?.sentiment?.distribution?.negative}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="space-y-4">
            {insights?.themes?.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{theme?.theme}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{theme?.frequency} mentions</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentBg(theme?.sentiment)} ${getSentimentColor(theme?.sentiment)}`}>
                      {theme?.sentiment}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Common feedback:</p>
                  <ul className="space-y-1">
                    {theme?.examples?.map((example, idx) => (
                      <li key={idx} className="text-sm text-foreground flex items-start">
                        <span className="text-muted-foreground mr-2">•</span>
                        "{example}"
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            {insights?.suggestions?.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-border rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Lightbulb" size={16} className="text-warning" />
                    <span className="font-medium text-foreground">{suggestion?.category}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(suggestion?.priority)}`}>
                    {suggestion?.priority} priority
                  </span>
                </div>
                
                <p className="text-sm text-foreground mb-2">{suggestion?.suggestion}</p>
                <p className="text-xs text-muted-foreground">
                  <Icon name="Target" size={12} className="inline mr-1" />
                  {suggestion?.impact}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-6">
            {/* Response Patterns */}
            <div>
              <h4 className="font-medium text-foreground mb-3">Feedback Timing Patterns</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{insights?.patterns?.timeOfDay?.morning}%</div>
                  <div className="text-sm text-muted-foreground">Morning</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{insights?.patterns?.timeOfDay?.afternoon}%</div>
                  <div className="text-sm text-muted-foreground">Afternoon</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-lg font-semibold text-foreground">{insights?.patterns?.timeOfDay?.evening}%</div>
                  <div className="text-sm text-muted-foreground">Evening</div>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="font-medium text-foreground">Response Time</span>
                </div>
                <div className="text-2xl font-bold text-primary">{insights?.patterns?.responseTime}</div>
                <div className="text-sm text-muted-foreground">Average time to respond</div>
              </div>

              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-success" />
                  <span className="font-medium text-foreground">Engagement Rate</span>
                </div>
                <div className="text-2xl font-bold text-success">{insights?.patterns?.engagementRate}</div>
                <div className="text-sm text-muted-foreground">Team participation rate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIInsightsPanel;

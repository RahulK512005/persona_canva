import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsCard = ({ insightsData }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card rounded-xl p-6 border border-border shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
            <p className="text-sm text-muted-foreground">Latest Analysis</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-success font-medium">Active</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Leadership Style</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {insightsData?.leadershipStyle}
          </p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${insightsData?.confidence}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground">{insightsData?.confidence}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Recent Insights</h4>
          {insightsData?.recentInsights?.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="Lightbulb" size={14} className="text-warning mt-0.5" />
              <span className="text-xs text-muted-foreground">{insight}</span>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <Link to="/ai-analysis-results">
            <Button variant="outline" fullWidth iconName="ArrowRight" iconPosition="right">
              View Full Analysis
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AIInsightsCard;
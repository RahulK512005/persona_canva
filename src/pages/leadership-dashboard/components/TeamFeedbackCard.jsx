import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const TeamFeedbackCard = ({ feedbackData }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card rounded-xl p-6 border border-border shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={24} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Team Feedback</h3>
            <p className="text-sm text-muted-foreground">Recent responses</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-success">{feedbackData?.newCount}</span>
          </div>
          <span className="text-sm text-muted-foreground">New</span>
        </div>
      </div>
      <div className="space-y-4">
        {feedbackData?.recentFeedback?.map((feedback, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 bg-muted/30 rounded-lg border border-border/50"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={feedback?.avatar} 
                  alt={feedback?.avatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {feedback?.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {feedback?.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {feedback?.message}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    feedback?.sentiment === 'positive' ?'bg-success/20 text-success' 
                      : feedback?.sentiment === 'neutral' ?'bg-warning/20 text-warning' :'bg-error/20 text-error'
                  }`}>
                    {feedback?.sentiment}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <Icon name="Heart" size={14} className="text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-colors">
                      <Icon name="Flag" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="flex space-x-2 pt-2">
          <Link to="/team-feedback-dashboard" className="flex-1">
            <Button variant="outline" fullWidth iconName="Eye" iconPosition="left">
              View All
            </Button>
          </Link>
          <Button 
            variant="default" 
            iconName="Plus" 
            iconPosition="left"
            onClick={() => window.open('https://forms.google.com/leadership-feedback', '_blank')}
          >
            Collect
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamFeedbackCard;
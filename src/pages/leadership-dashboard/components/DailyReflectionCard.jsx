import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DailyReflectionCard = ({ reflectionData }) => {
  const today = new Date()?.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card rounded-xl p-6 border border-border shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Daily Reflection</h3>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {reflectionData?.completed && (
            <div className="w-3 h-3 bg-success rounded-full"></div>
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {reflectionData?.streak} day streak
          </span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {reflectionData?.completed ? 'Reflection Complete' : 'Start Today\'s Reflection'}
            </span>
          </div>
          {reflectionData?.completed && (
            <Icon name="CheckCircle" size={20} className="text-success" />
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Mic" size={20} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {reflectionData?.audioCompleted ? 'Audio Recording Complete' : 'Record Audio Reflection'}
            </span>
          </div>
          {reflectionData?.audioCompleted && (
            <Icon name="CheckCircle" size={20} className="text-success" />
          )}
        </div>

        <div className="pt-2">
          <Link to="/daily-reflection">
            <Button 
              variant={reflectionData?.completed ? "outline" : "default"} 
              fullWidth
              iconName={reflectionData?.completed ? "Eye" : "Plus"}
              iconPosition="left"
            >
              {reflectionData?.completed ? 'View Reflection' : 'Start Reflection'}
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyReflectionCard;
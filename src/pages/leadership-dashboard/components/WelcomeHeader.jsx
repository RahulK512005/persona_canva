import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userData }) => {
  const currentTime = new Date();
  const hour = currentTime?.getHours();
  
  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getGreetingIcon = () => {
    if (hour < 12) return 'Sun';
    if (hour < 17) return 'Sun';
    return 'Moon';
  };

  const today = new Date()?.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 rounded-xl p-6 mb-8 border border-border/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center"
          >
            <Icon name={getGreetingIcon()} size={32} className="text-primary" />
          </motion.div>
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-foreground"
            >
              {getGreeting()}, {userData?.name}!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-muted-foreground mt-1"
            >
              {today} • Ready to lead with purpose today?
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="hidden md:flex items-center space-x-6"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{userData?.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{userData?.completionRate}%</div>
            <div className="text-xs text-muted-foreground">Completion Rate</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{userData?.teamSize}</div>
            <div className="text-xs text-muted-foreground">Team Members</div>
          </div>
        </motion.div>
      </div>
      {/* Mobile stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="md:hidden mt-6 grid grid-cols-3 gap-4"
      >
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <div className="text-xl font-bold text-primary">{userData?.currentStreak}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <div className="text-xl font-bold text-success">{userData?.completionRate}%</div>
          <div className="text-xs text-muted-foreground">Completion</div>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <div className="text-xl font-bold text-warning">{userData?.teamSize}</div>
          <div className="text-xs text-muted-foreground">Team Size</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeHeader;
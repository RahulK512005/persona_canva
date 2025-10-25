import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LeadershipStyleCard = ({ leadershipStyle, confidence }) => {
  const styleConfig = {
    'Collaborative': {
      icon: 'Users',
      color: 'bg-blue-500',
      description: 'You excel at bringing people together and fostering teamwork. Your strength lies in creating inclusive environments where everyone feels heard.',
      traits: ['Team-oriented', 'Inclusive', 'Consensus-building', 'Empathetic']
    },
    'Visionary': {
      icon: 'Eye',
      color: 'bg-purple-500',
      description: 'You inspire others with your forward-thinking approach and ability to see the bigger picture. You motivate teams toward ambitious goals.',
      traits: ['Strategic thinking', 'Inspirational', 'Future-focused', 'Innovative']
    },
    'Decisive': {
      icon: 'Zap',
      color: 'bg-orange-500',
      description: 'You make quick, confident decisions and adapt well to changing circumstances. Your team relies on your clear direction.',
      traits: ['Quick decision-making', 'Adaptable', 'Results-driven', 'Confident']
    },
    'Empowering': {
      icon: 'TrendingUp',
      color: 'bg-green-500',
      description: 'You focus on developing others and delegating effectively. You create opportunities for your team to grow and succeed.',
      traits: ['Mentoring', 'Delegating', 'Growth-focused', 'Supportive']
    },
    'Self-Doubt': {
      icon: 'AlertCircle',
      color: 'bg-red-500',
      description: 'You may be experiencing uncertainty in your leadership approach. This is a growth opportunity to build confidence.',
      traits: ['Reflective', 'Cautious', 'Learning-oriented', 'Humble']
    }
  };

  const config = styleConfig?.[leadershipStyle] || styleConfig?.['Collaborative'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-lg border border-border p-6 shadow-lg"
    >
      <div className="flex items-center space-x-4 mb-6">
        <div className={`${config?.color} p-3 rounded-full`}>
          <Icon name={config?.icon} size={24} color="white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{leadershipStyle} Leader</h2>
          <p className="text-muted-foreground">Confidence Level: {confidence}%</p>
        </div>
      </div>
      <p className="text-foreground mb-6 leading-relaxed">
        {config?.description}
      </p>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Key Traits</h3>
        <div className="grid grid-cols-2 gap-3">
          {config?.traits?.map((trait, index) => (
            <motion.div
              key={trait}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-2 bg-muted p-3 rounded-lg"
            >
              <Icon name="Check" size={16} className="text-green-500" />
              <span className="text-sm font-medium text-foreground">{trait}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LeadershipStyleCard;
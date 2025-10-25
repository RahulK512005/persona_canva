import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const InsightsPanel = ({ insights }) => {
  const insightIcons = {
    'strength': 'Award',
    'improvement': 'Target',
    'pattern': 'TrendingUp',
    'recommendation': 'Lightbulb'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-lg border border-border p-6 shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Brain" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Key Insights</h2>
      </div>
      <div className="space-y-4">
        {insights?.map((insight, index) => (
          <motion.div
            key={insight?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                insight?.type === 'strength' ? 'bg-green-100 text-green-600' :
                insight?.type === 'improvement' ? 'bg-orange-100 text-orange-600' :
                insight?.type === 'pattern'? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
              }`}>
                <Icon name={insightIcons?.[insight?.type]} size={16} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{insight?.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {insight?.description}
                </p>
                {insight?.actionable && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-foreground">
                      <Icon name="ArrowRight" size={14} className="inline mr-2" />
                      {insight?.actionable}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InsightsPanel;
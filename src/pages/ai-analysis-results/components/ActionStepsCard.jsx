import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionStepsCard = ({ actionSteps }) => {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const toggleStepCompletion = (stepId) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted?.has(stepId)) {
      newCompleted?.delete(stepId);
    } else {
      newCompleted?.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  const priorityColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50'
  };

  const priorityIcons = {
    high: 'AlertTriangle',
    medium: 'Clock',
    low: 'CheckCircle'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-card rounded-lg border border-border p-6 shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Target" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Action Steps</h2>
      </div>
      <div className="space-y-4">
        {actionSteps?.map((step, index) => (
          <motion.div
            key={step?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              completedSteps?.has(step?.id) 
                ? 'bg-green-50 border-green-200' 
                : priorityColors?.[step?.priority]
            }`}
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => toggleStepCompletion(step?.id)}
                className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                  completedSteps?.has(step?.id)
                    ? 'bg-green-500 border-green-500' :'border-muted-foreground hover:border-primary'
                }`}
              >
                {completedSteps?.has(step?.id) && (
                  <Icon name="Check" size={12} color="white" />
                )}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon 
                    name={priorityIcons?.[step?.priority]} 
                    size={16} 
                    className={`${
                      step?.priority === 'high' ? 'text-red-500' :
                      step?.priority === 'medium'? 'text-yellow-500' : 'text-green-500'
                    }`}
                  />
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    step?.priority === 'high' ? 'bg-red-100 text-red-700' :
                    step?.priority === 'medium'? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {step?.priority?.toUpperCase()} PRIORITY
                  </span>
                </div>
                
                <h3 className={`font-semibold mb-2 ${
                  completedSteps?.has(step?.id) ? 'line-through text-muted-foreground' : 'text-foreground'
                }`}>
                  {step?.title}
                </h3>
                
                <p className={`text-sm mb-3 ${
                  completedSteps?.has(step?.id) ? 'text-muted-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{step?.timeframe}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Target" size={12} />
                      <span>{step?.category}</span>
                    </span>
                  </div>
                  
                  {step?.resourceUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                      onClick={() => window.open(step?.resourceUrl, '_blank')}
                      className="text-xs"
                    >
                      Learn More
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="font-medium text-foreground">Progress Tracking</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete {completedSteps?.size} of {actionSteps?.length} action steps. 
          Focus on high-priority items first for maximum impact on your leadership development.
        </p>
      </div>
    </motion.div>
  );
};

export default ActionStepsCard;
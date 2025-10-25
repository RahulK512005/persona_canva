import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import LoadingShimmer from '../../../components/ui/LoadingShimmer';

const LoadingAnalysis = () => {
  const loadingSteps = [
    { text: "Processing reflection data...", icon: "FileText" },
    { text: "Analyzing leadership patterns...", icon: "Brain" },
    { text: "Generating personalized insights...", icon: "Lightbulb" },
    { text: "Preparing recommendations...", icon: "Target" }
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon name="Brain" size={32} color="white" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Analysis in Progress
          </h1>
          <p className="text-muted-foreground">
            Our AI is analyzing your leadership reflection to provide personalized insights
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6 mb-12">
          {loadingSteps?.map((step, index) => (
            <motion.div
              key={step?.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={step?.icon} size={16} className="text-primary" />
              </div>
              <span className="text-foreground font-medium">{step?.text}</span>
              <div className="flex-1 flex justify-end">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingShimmer variant="card" lines={4} showAvatar className="h-64" />
          <LoadingShimmer variant="card" lines={3} className="h-64" />
          <LoadingShimmer variant="chart" className="lg:col-span-2 h-80" />
          <LoadingShimmer variant="card" lines={5} className="h-72" />
          <LoadingShimmer variant="card" lines={4} className="h-72" />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnalysis;
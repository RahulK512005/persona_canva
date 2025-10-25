import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LeadershipAssessment = ({ responses, onChange }) => {
  const assessmentQuestions = [
    {
      id: 'confidence',
      question: 'How confident did you feel in your leadership decisions today?',
      icon: 'Target',
      options: [
        { value: 1, label: 'Very Low', color: 'text-red-500' },
        { value: 2, label: 'Low', color: 'text-orange-500' },
        { value: 3, label: 'Moderate', color: 'text-yellow-500' },
        { value: 4, label: 'High', color: 'text-blue-500' },
        { value: 5, label: 'Very High', color: 'text-green-500' }
      ]
    },
    {
      id: 'stress',
      question: 'What was your stress level while managing team responsibilities?',
      icon: 'Activity',
      options: [
        { value: 1, label: 'Very Low', color: 'text-green-500' },
        { value: 2, label: 'Low', color: 'text-blue-500' },
        { value: 3, label: 'Moderate', color: 'text-yellow-500' },
        { value: 4, label: 'High', color: 'text-orange-500' },
        { value: 5, label: 'Very High', color: 'text-red-500' }
      ]
    },
    {
      id: 'teamInvolvement',
      question: 'How effectively did you involve your team in decision-making?',
      icon: 'Users',
      options: [
        { value: 1, label: 'Not at all', color: 'text-red-500' },
        { value: 2, label: 'Slightly', color: 'text-orange-500' },
        { value: 3, label: 'Moderately', color: 'text-yellow-500' },
        { value: 4, label: 'Very well', color: 'text-blue-500' },
        { value: 5, label: 'Exceptionally', color: 'text-green-500' }
      ]
    },
    {
      id: 'communication',
      question: 'How clear and effective was your communication today?',
      icon: 'MessageSquare',
      options: [
        { value: 1, label: 'Poor', color: 'text-red-500' },
        { value: 2, label: 'Fair', color: 'text-orange-500' },
        { value: 3, label: 'Good', color: 'text-yellow-500' },
        { value: 4, label: 'Very Good', color: 'text-blue-500' },
        { value: 5, label: 'Excellent', color: 'text-green-500' }
      ]
    },
    {
      id: 'satisfaction',
      question: 'How satisfied are you with your leadership performance today?',
      icon: 'Heart',
      options: [
        { value: 1, label: 'Very Dissatisfied', color: 'text-red-500' },
        { value: 2, label: 'Dissatisfied', color: 'text-orange-500' },
        { value: 3, label: 'Neutral', color: 'text-yellow-500' },
        { value: 4, label: 'Satisfied', color: 'text-blue-500' },
        { value: 5, label: 'Very Satisfied', color: 'text-green-500' }
      ]
    }
  ];

  const handleResponseChange = (questionId, value) => {
    onChange({
      ...responses,
      [questionId]: value
    });
  };

  const getCompletionPercentage = () => {
    const answered = Object.keys(responses)?.length;
    return Math.round((answered / assessmentQuestions?.length) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="CheckSquare" size={20} className="mr-2 text-primary" />
          Leadership Assessment
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${getCompletionPercentage()}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {getCompletionPercentage()}%
          </span>
        </div>
      </div>
      <div className="space-y-6">
        {assessmentQuestions?.map((question, index) => (
          <motion.div
            key={question?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border border-border rounded-lg p-4"
          >
            <div className="flex items-start space-x-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={question?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground mb-3">
                  {question?.question}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {question?.options?.map((option) => (
                    <label
                      key={option?.value}
                      className={`relative flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                        responses?.[question?.id] === option?.value
                          ? 'border-primary bg-primary/5' :'border-border bg-background'
                      }`}
                    >
                      <input
                        type="radio"
                        name={question?.id}
                        value={option?.value}
                        checked={responses?.[question?.id] === option?.value}
                        onChange={(e) => handleResponseChange(question?.id, parseInt(e?.target?.value))}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className={`text-lg font-semibold ${option?.color}`}>
                          {option?.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {option?.label}
                        </div>
                      </div>
                      {responses?.[question?.id] === option?.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-1 right-1"
                        >
                          <Icon name="Check" size={16} className="text-primary" />
                        </motion.div>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {getCompletionPercentage() === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg"
        >
          <div className="flex items-center text-success">
            <Icon name="CheckCircle" size={20} className="mr-2" />
            <span className="font-medium">Assessment Complete!</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LeadershipAssessment;
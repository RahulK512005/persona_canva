import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmissionProgress = ({ 
  textEntry, 
  assessmentResponses, 
  audioRecording, 
  onSubmit, 
  isSubmitting 
}) => {
  const requirements = [
    {
      id: 'text',
      label: 'Leadership Journal Entry',
      description: 'Minimum 50 words',
      completed: textEntry && textEntry?.trim()?.split(/\s+/)?.length >= 50,
      icon: 'BookOpen'
    },
    {
      id: 'assessment',
      label: 'Leadership Assessment',
      description: 'All 5 questions answered',
      completed: Object.keys(assessmentResponses)?.length === 5,
      icon: 'CheckSquare'
    },
    {
      id: 'audio',
      label: 'Audio Reflection',
      description: 'Voice recording submitted',
      completed: !!audioRecording,
      icon: 'Mic'
    }
  ];

  const completedCount = requirements?.filter(req => req?.completed)?.length;
  const totalCount = requirements?.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);
  const isComplete = completedCount === totalCount;

  const getProgressColor = () => {
    if (completionPercentage === 100) return 'bg-success';
    if (completionPercentage >= 66) return 'bg-primary';
    if (completionPercentage >= 33) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Target" size={20} className="mr-2 text-primary" />
          Submission Progress
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">
            {completedCount}/{totalCount}
          </div>
          <div className="text-sm text-muted-foreground">
            {completionPercentage}% Complete
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${getProgressColor()} transition-all duration-500`}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
      {/* Requirements Checklist */}
      <div className="space-y-4 mb-6">
        {requirements?.map((requirement, index) => (
          <motion.div
            key={requirement?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
              requirement?.completed
                ? 'border-success/20 bg-success/5' :'border-border bg-background'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              requirement?.completed
                ? 'bg-success text-success-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {requirement?.completed ? (
                <Icon name="Check" size={16} />
              ) : (
                <Icon name={requirement?.icon} size={16} />
              )}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${
                requirement?.completed ? 'text-success' : 'text-foreground'
              }`}>
                {requirement?.label}
              </div>
              <div className="text-sm text-muted-foreground">
                {requirement?.description}
              </div>
            </div>
            {requirement?.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-success"
              >
                <Icon name="CheckCircle" size={20} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      {/* Submission Button */}
      <div className="space-y-4">
        <Button
          onClick={onSubmit}
          disabled={!isComplete || isSubmitting}
          loading={isSubmitting}
          variant={isComplete ? "default" : "secondary"}
          fullWidth
          iconName={isComplete ? "Send" : "Lock"}
          iconPosition="right"
        >
          {isSubmitting 
            ? 'Processing Reflection...' 
            : isComplete 
              ? 'Submit Daily Reflection' :'Complete All Requirements'
          }
        </Button>

        {!isComplete && (
          <div className="text-center text-sm text-muted-foreground">
            <Icon name="Info" size={16} className="inline mr-1" />
            Complete all requirements above to submit your reflection
          </div>
        )}

        {isComplete && !isSubmitting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-success/10 border border-success/20 rounded-lg"
          >
            <div className="flex items-start space-x-2 text-success">
              <Icon name="CheckCircle" size={20} className="mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">Ready to Submit!</div>
                <div className="text-sm text-success/80 mt-1">
                  Your reflection will be processed by AI for personalized insights and recommendations.
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {/* Submission Info */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            Estimated processing time: 2-3 minutes
          </div>
          <div className="flex items-center">
            <Icon name="Shield" size={12} className="mr-1" />
            Your reflection data is encrypted and secure
          </div>
          <div className="flex items-center">
            <Icon name="Brain" size={12} className="mr-1" />
            AI analysis will identify leadership patterns and growth opportunities
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SubmissionProgress;
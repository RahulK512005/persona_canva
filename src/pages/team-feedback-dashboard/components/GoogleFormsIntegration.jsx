import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const GoogleFormsIntegration = ({ onCreateForm }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questions: [],
    isAnonymous: true,
    allowMultipleResponses: false
  });

  const defaultQuestions = [
    {
      id: 1,
      text: "How would you rate my overall leadership effectiveness?",
      type: "rating",
      required: true,
      enabled: true
    },
    {
      id: 2,
      text: "What is one thing I do well as a leader?",
      type: "text",
      required: true,
      enabled: true
    },
    {
      id: 3,
      text: "What is one area where I could improve?",
      type: "text",
      required: true,
      enabled: true
    },
    {
      id: 4,
      text: "How clear is my communication during team meetings?",
      type: "rating",
      required: false,
      enabled: false
    },
    {
      id: 5,
      text: "Do you feel comfortable approaching me with concerns?",
      type: "choice",
      options: ["Very comfortable", "Somewhat comfortable", "Neutral", "Somewhat uncomfortable", "Very uncomfortable"],
      required: false,
      enabled: false
    },
    {
      id: 6,
      text: "Additional comments or suggestions:",
      type: "paragraph",
      required: false,
      enabled: false
    }
  ];

  const [questions, setQuestions] = useState(defaultQuestions);

  const handleQuestionToggle = (questionId) => {
    setQuestions(prev => prev?.map(q => 
      q?.id === questionId ? { ...q, enabled: !q?.enabled } : q
    ));
  };

  const handleCreateForm = () => {
    const enabledQuestions = questions?.filter(q => q?.enabled);
    const formConfig = {
      ...formData,
      questions: enabledQuestions,
      createdAt: new Date()?.toISOString()
    };
    
    onCreateForm(formConfig);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      questions: [],
      isAnonymous: true,
      allowMultipleResponses: false
    });
    setQuestions(defaultQuestions);
    setIsExpanded(false);
  };

  const enabledCount = questions?.filter(q => q?.enabled)?.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Create Feedback Form</h3>
              <p className="text-sm text-muted-foreground">
                Generate a Google Form to collect team feedback
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-6 space-y-6"
        >
          {/* Form Configuration */}
          <div className="space-y-4">
            <Input
              label="Form Title"
              placeholder="Leadership Feedback Survey - October 2024"
              value={formData?.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e?.target?.value }))}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Form Description
              </label>
              <textarea
                placeholder="Please provide honest feedback about my leadership to help me grow and better support our team."
                value={formData?.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e?.target?.value }))}
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows={3}
              />
            </div>
          </div>

          {/* Form Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Form Settings</h4>
            
            <Checkbox
              label="Anonymous responses"
              description="Respondents won't need to provide their name"
              checked={formData?.isAnonymous}
              onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e?.target?.checked }))}
            />
            
            <Checkbox
              label="Allow multiple responses"
              description="Team members can submit feedback multiple times"
              checked={formData?.allowMultipleResponses}
              onChange={(e) => setFormData(prev => ({ ...prev, allowMultipleResponses: e?.target?.checked }))}
            />
          </div>

          {/* Question Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Select Questions</h4>
              <span className="text-sm text-muted-foreground">
                {enabledCount} question{enabledCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="space-y-3">
              {questions?.map((question) => (
                <div
                  key={question?.id}
                  className={`p-4 border rounded-lg transition-all duration-200 ${
                    question?.enabled 
                      ? 'border-primary bg-primary/5' :'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={question?.enabled}
                      onChange={() => handleQuestionToggle(question?.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1">
                      <p className={`font-medium ${
                        question?.enabled ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {question?.text}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-md ${
                          question?.type === 'rating' ? 'bg-primary/20 text-primary' :
                          question?.type === 'choice' ? 'bg-accent/20 text-accent' :
                          question?.type === 'paragraph'? 'bg-warning/20 text-warning' : 'bg-muted text-muted-foreground'
                        }`}>
                          {question?.type === 'rating' ? 'Rating Scale' :
                           question?.type === 'choice' ? 'Multiple Choice' :
                           question?.type === 'paragraph'? 'Long Answer' : 'Short Answer'}
                        </span>
                        
                        {question?.required && (
                          <span className="text-xs text-error">Required</span>
                        )}
                      </div>
                      
                      {question?.options && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Options: {question?.options?.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleCreateForm}
              disabled={!formData?.title || enabledCount === 0}
              iconName="ExternalLink"
              iconPosition="right"
            >
              Create Google Form
            </Button>
          </div>
        </motion.div>
      )}
      {/* Quick Actions (when collapsed) */}
      {!isExpanded && (
        <div className="p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Quick feedback collection</span>
              <span>•</span>
              <span>Anonymous responses</span>
              <span>•</span>
              <span>Customizable questions</span>
            </div>
            
            <Button
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setIsExpanded(true)}
            >
              New Form
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GoogleFormsIntegration;
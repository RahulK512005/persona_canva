import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeedbackCard = ({ feedback, onRespond }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyType, setReplyType] = useState('');

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-error';
  };

  const getRatingBg = (rating) => {
    if (rating >= 4) return 'bg-success/10';
    if (rating >= 3) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const handleReplyAction = (type) => {
    setReplyType(type);
    setShowReplyForm(true);
  };

  const handleSubmitReply = (replyText) => {
    onRespond(feedback?.id, replyType, replyText);
    setShowReplyForm(false);
    setReplyType('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-card border border-border rounded-lg p-6 transition-all duration-300 ${
        !feedback?.isRead ? 'ring-2 ring-primary/20' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Icon name="User" size={20} className="text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">Anonymous Team Member</p>
            <p className="text-sm text-muted-foreground">
              {new Date(feedback.submittedAt)?.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Rating */}
          <div className={`px-3 py-1 rounded-full ${getRatingBg(feedback?.rating)}`}>
            <span className={`text-sm font-medium ${getRatingColor(feedback?.rating)}`}>
              {feedback?.rating}/5
            </span>
          </div>
          
          {/* Category Badge */}
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            {feedback?.category}
          </span>
          
          {/* Unread Indicator */}
          {!feedback?.isRead && (
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          )}
        </div>
      </div>
      {/* Feedback Content */}
      <div className="mb-4">
        <p className="text-foreground leading-relaxed">
          {isExpanded ? feedback?.content : `${feedback?.content?.substring(0, 200)}${feedback?.content?.length > 200 ? '...' : ''}`}
        </p>
        
        {feedback?.content?.length > 200 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 text-sm mt-2 font-medium"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ThumbsUp"
            iconPosition="left"
            onClick={() => handleReplyAction('acknowledge')}
            className="text-success hover:bg-success/10"
          >
            Acknowledge
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={() => handleReplyAction('justify')}
            className="text-primary hover:bg-primary/10"
          >
            Justify
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Heart"
            iconPosition="left"
            onClick={() => handleReplyAction('apologize')}
            className="text-warning hover:bg-warning/10"
          >
            Apologize
          </Button>
        </div>

        {feedback?.hasResponse && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="MessageCircle" size={16} className="mr-1" />
            Responded
          </div>
        )}
      </div>
      {/* Reply Form */}
      {showReplyForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <ReplyForm
            type={replyType}
            onSubmit={handleSubmitReply}
            onCancel={() => setShowReplyForm(false)}
          />
        </motion.div>
      )}
      {/* Existing Response */}
      {feedback?.response && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="User" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Your Response</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                feedback?.response?.type === 'acknowledge' ? 'bg-success/20 text-success' :
                feedback?.response?.type === 'justify'? 'bg-primary/20 text-primary' : 'bg-warning/20 text-warning'
              }`}>
                {feedback?.response?.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{feedback?.response?.content}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const ReplyForm = ({ type, onSubmit, onCancel }) => {
  const [replyText, setReplyText] = useState('');

  const getTypeConfig = () => {
    switch (type) {
      case 'acknowledge':
        return {
          title: 'Acknowledge Feedback',
          placeholder: 'Thank you for this feedback. I appreciate your perspective and will...',
          icon: 'ThumbsUp',
          color: 'text-success'
        };
      case 'justify':
        return {
          title: 'Provide Context',
          placeholder: 'I understand your concern. Let me provide some context about...',
          icon: 'MessageSquare',
          color: 'text-primary'
        };
      case 'apologize':
        return {
          title: 'Apologize & Commit',
          placeholder: 'I sincerely apologize for this situation. Moving forward, I will...',
          icon: 'Heart',
          color: 'text-warning'
        };
      default:
        return {
          title: 'Respond',
          placeholder: 'Your response...',
          icon: 'MessageCircle',
          color: 'text-foreground'
        };
    }
  };

  const config = getTypeConfig();

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (replyText?.trim()) {
      onSubmit(replyText?.trim());
      setReplyText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name={config?.icon} size={20} className={config?.color} />
        <h4 className="font-medium text-foreground">{config?.title}</h4>
      </div>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e?.target?.value)}
        placeholder={config?.placeholder}
        className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
        rows={4}
        required
      />
      <div className="flex items-center justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={!replyText?.trim()}
        >
          Send Response
        </Button>
      </div>
    </form>
  );
};

export default FeedbackCard;
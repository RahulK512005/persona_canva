import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ReflectionTextEditor = ({ value, onChange, onSave }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const reflectionPrompts = [
    "What leadership challenges did I face today?",
    "How did I support my team members?",
    "What decisions did I make and why?",
    "How did I communicate with stakeholders?",
    "What would I do differently next time?"
  ];

  useEffect(() => {
    const words = value?.trim() ? value?.trim()?.split(/\s+/)?.length : 0;
    const chars = value?.length;
    setWordCount(words);
    setCharCount(chars);
  }, [value]);

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (value?.trim() && !isSaving) {
        handleAutoSave();
      }
    }, 3000);

    return () => clearTimeout(autoSaveTimer);
  }, [value]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    try {
      await onSave(value);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const insertPrompt = (prompt) => {
    const newValue = value + (value ? '\n\n' : '') + prompt + '\n';
    onChange({ target: { value: newValue } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-primary" />
          Leadership Journal Entry
        </h3>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          {isSaving && (
            <div className="flex items-center">
              <Icon name="Loader2" size={16} className="animate-spin mr-1" />
              Saving...
            </div>
          )}
          {lastSaved && !isSaving && (
            <div className="flex items-center">
              <Icon name="Check" size={16} className="mr-1 text-success" />
              Saved {lastSaved?.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-sm text-muted-foreground">Reflection prompts:</span>
          {reflectionPrompts?.map((prompt, index) => (
            <button
              key={index}
              onClick={() => insertPrompt(prompt)}
              className="text-xs bg-muted hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded-md transition-colors duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Reflect on your leadership journey today. What challenges did you face? How did you grow? What insights did you gain?"
          className="w-full h-64 p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          style={{ minHeight: '256px' }}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center space-x-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <Icon name="Info" size={16} className="inline mr-1" />
          Auto-saves every 3 seconds
        </div>
        <div className="text-sm">
          {wordCount < 50 && (
            <span className="text-warning">Minimum 50 words recommended</span>
          )}
          {wordCount >= 50 && wordCount < 200 && (
            <span className="text-primary">Good progress</span>
          )}
          {wordCount >= 200 && (
            <span className="text-success">Excellent reflection!</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ReflectionTextEditor;
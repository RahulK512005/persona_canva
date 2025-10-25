import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ReflectionTextEditor from './components/ReflectionTextEditor';
import LeadershipAssessment from './components/LeadershipAssessment';
import AudioRecorder from './components/AudioRecorder';
import SubmissionProgress from './components/SubmissionProgress';
import Icon from '../../components/AppIcon';

const DailyReflection = () => {
  const navigate = useNavigate();
  const [textEntry, setTextEntry] = useState('');
  const [assessmentResponses, setAssessmentResponses] = useState({});
  const [audioRecording, setAudioRecording] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('dailyReflectionDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setTextEntry(parsed?.textEntry || '');
        setAssessmentResponses(parsed?.assessmentResponses || {});
        setLastSaved(new Date(parsed.lastSaved));
      } catch (error) {
        console.error('Error loading saved reflection:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (textEntry || Object.keys(assessmentResponses)?.length > 0) {
        const draftData = {
          textEntry,
          assessmentResponses,
          lastSaved: new Date()?.toISOString()
        };
        localStorage.setItem('dailyReflectionDraft', JSON.stringify(draftData));
        setLastSaved(new Date());
      }
    }, 2000);

    return () => clearTimeout(saveTimer);
  }, [textEntry, assessmentResponses]);

  const handleTextChange = (e) => {
    setTextEntry(e?.target?.value);
  };

  const handleAssessmentChange = (responses) => {
    setAssessmentResponses(responses);
  };

  const handleAudioRecording = (recording) => {
    setAudioRecording(recording);
  };

  const handleSave = async (content) => {
    // Simulate save operation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Content saved:', content);
        resolve();
      }, 500);
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear draft data after successful submission
      localStorage.removeItem('dailyReflectionDraft');
      
      // Mock submission data for AI processing
      const submissionData = {
        id: `reflection_${Date.now()}`,
        date: new Date()?.toISOString(),
        textEntry,
        assessmentResponses,
        audioRecording: audioRecording ? 'audio_blob_data' : null,
        submittedAt: new Date()?.toISOString(),
        status: 'processing'
      };

      console.log('Reflection submitted:', submissionData);
      
      // Navigate to AI analysis results
      navigate('/ai-analysis-results', { 
        state: { 
          submissionId: submissionData?.id,
          justSubmitted: true 
        } 
      });
      
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit reflection. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    return new Date()?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Daily Leadership Reflection
                </h1>
                <p className="text-muted-foreground flex items-center">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  {getTodayDate()}
                </p>
              </div>
              
              {lastSaved && (
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">
                    Last saved
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {lastSaved?.toLocaleTimeString()}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    Today's Leadership Focus
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Take a moment to reflect on your leadership journey today. Consider your decisions, 
                    team interactions, and growth opportunities. Your honest reflection will help generate 
                    personalized insights for continuous improvement.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Text Editor and Assessment */}
            <div className="lg:col-span-2 space-y-8">
              <ReflectionTextEditor
                value={textEntry}
                onChange={handleTextChange}
                onSave={handleSave}
              />
              
              <LeadershipAssessment
                responses={assessmentResponses}
                onChange={handleAssessmentChange}
              />
            </div>

            {/* Right Column - Audio Recorder and Progress */}
            <div className="lg:col-span-1 space-y-8">
              <AudioRecorder
                onRecordingComplete={handleAudioRecording}
                existingRecording={audioRecording}
              />
              
              <SubmissionProgress
                textEntry={textEntry}
                assessmentResponses={assessmentResponses}
                audioRecording={audioRecording}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* Mobile-Optimized Layout for Small Screens */}
          <div className="lg:hidden mt-8">
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Smartphone" size={16} className="mr-2" />
                <span>
                  For the best experience, consider using a desktop or tablet for detailed reflections.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DailyReflection;
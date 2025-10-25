import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

import Image from '../../../components/AppImage';

const ProgressTracker = ({ booksRead, coursesCompleted, milestones }) => {
  const [activeTab, setActiveTab] = useState('books');

  const tabs = [
    { id: 'books', label: 'Books Read', icon: 'BookOpen', count: booksRead?.length },
    { id: 'courses', label: 'Courses', icon: 'GraduationCap', count: coursesCompleted?.length },
    { id: 'milestones', label: 'Milestones', icon: 'Award', count: milestones?.length }
  ];

  const renderBooks = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {booksRead?.map((book, index) => (
        <motion.div
          key={book?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300"
        >
          <div className="flex space-x-3">
            <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
              <Image
                src={book?.coverImage}
                alt={`Book cover of ${book?.title} by ${book?.author}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm line-clamp-2 mb-1">
                {book?.title}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                by {book?.author}
              </p>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < book?.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {book?.rating}/5
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Completed: {new Date(book.completedDate)?.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          {book?.notes && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs text-muted-foreground line-clamp-2">
                "{book?.notes}"
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderCourses = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {coursesCompleted?.map((course, index) => (
        <motion.div
          key={course?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="GraduationCap" size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground mb-1 line-clamp-2">
                {course?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {course?.provider} • {course?.duration}
              </p>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {course?.hoursSpent}h
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Award" size={14} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {course?.certificateEarned ? 'Certified' : 'Completed'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Completed: {new Date(course.completedDate)?.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          {course?.skills && course?.skills?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex flex-wrap gap-1">
                {course?.skills?.slice(0, 3)?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded"
                  >
                    {skill}
                  </span>
                ))}
                {course?.skills?.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded">
                    +{course?.skills?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  const renderMilestones = () => (
    <div className="space-y-4">
      {milestones?.map((milestone, index) => (
        <motion.div
          key={milestone?.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              milestone?.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
              milestone?.type === 'improvement' ? 'bg-green-100 text-green-600' :
              milestone?.type === 'recognition'? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
            }`}>
              <Icon 
                name={
                  milestone?.type === 'achievement' ? 'Trophy' :
                  milestone?.type === 'improvement' ? 'TrendingUp' :
                  milestone?.type === 'recognition'? 'Star' : 'Target'
                } 
                size={20} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-foreground mb-1">
                    {milestone?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {milestone?.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(milestone.achievedDate)?.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    +{milestone?.impactScore}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Impact Score
                  </div>
                </div>
              </div>
              {milestone?.relatedGoals && milestone?.relatedGoals?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1">
                    {milestone?.relatedGoals?.map((goal, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg shadow-sm"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Target" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Progress Tracker</h3>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-xs ${
                activeTab === tab?.id ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'
              }`}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'books' && renderBooks()}
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'milestones' && renderMilestones()}
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
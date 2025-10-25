import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsSection = ({ recommendations }) => {
  const [activeTab, setActiveTab] = useState('videos');

  const tabs = [
    { id: 'videos', label: 'Videos', icon: 'Play' },
    { id: 'books', label: 'Books', icon: 'Book' },
    { id: 'courses', label: 'Courses', icon: 'GraduationCap' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-card rounded-lg border border-border p-6 shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Compass" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Personalized Recommendations</h2>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab?.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Videos Tab */}
      {activeTab === 'videos' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {recommendations?.videos?.map((video, index) => (
            <div key={video?.id} className="border border-border rounded-lg p-4">
              <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
                <div className="lg:w-1/3">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video?.embedUrl}
                      title={video?.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <h3 className="font-semibold text-foreground mb-2">{video?.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{video?.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{video?.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="User" size={14} />
                      <span>{video?.channel}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
      {/* Books Tab */}
      {activeTab === 'books' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {recommendations?.books?.map((book, index) => (
            <div key={book?.id} className="border border-border rounded-lg p-4">
              <div className="flex space-x-4">
                <div className="w-16 h-20 bg-muted rounded overflow-hidden flex-shrink-0">
                  <img
                    src={book?.cover}
                    alt={book?.coverAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{book?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">by {book?.author}</p>
                  <p className="text-xs text-muted-foreground mb-3">{book?.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => window.open(book?.amazonUrl, '_blank')}
                  >
                    View on Amazon
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {recommendations?.courses?.map((course, index) => (
            <div key={course?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="GraduationCap" size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">{course?.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{course?.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{course?.duration}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Award" size={14} />
                        <span>{course?.provider}</span>
                      </span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                      onClick={() => window.open(course?.url, '_blank')}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default RecommendationsSection;
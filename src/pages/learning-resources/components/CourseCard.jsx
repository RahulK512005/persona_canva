import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CourseCard = ({ course }) => {
  const [isBookmarked, setIsBookmarked] = useState(course?.isBookmarked || false);
  const [isEnrolled, setIsEnrolled] = useState(course?.isEnrolled || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    window.open(course?.enrollUrl, '_blank');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={`${
          index < Math.floor(rating)
            ? 'text-yellow-500 fill-current' :'text-gray-300'
        }`}
      />
    ));
  };

  const getPlatformIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'coursera':
        return 'GraduationCap';
      case 'edx':
        return 'BookOpen';
      default:
        return 'Monitor';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'coursera':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'edx':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative">
        <div className="aspect-video bg-muted overflow-hidden">
          <Image
            src={course?.thumbnail}
            alt={course?.thumbnailAlt}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleBookmark}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-200"
          >
            <Icon
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              size={16}
              color="white"
            />
          </button>
          {course?.hasCertificate && (
            <div className="px-2 py-1 bg-green-600 rounded text-white text-xs font-medium flex items-center space-x-1">
              <Icon name="Award" size={12} />
              <span>Certificate</span>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getPlatformColor(course?.platform)}`}>
            <Icon name={getPlatformIcon(course?.platform)} size={12} />
            <span>{course?.platform}</span>
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
            {course?.title}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">
          by {course?.instructor}
        </p>
        
        <div className="flex items-center space-x-1 mb-2">
          {renderStars(course?.rating)}
          <span className="text-sm text-muted-foreground ml-1">
            ({course?.students?.toLocaleString()} students)
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {course?.description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-3 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>{course?.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BarChart" size={12} />
            <span>{course?.difficulty}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{course?.level}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={12} />
            <span>{course?.language}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-bold text-foreground">
            {course?.price === 0 ? 'Free' : `$${course?.price}`}
          </div>
          {course?.originalPrice && course?.originalPrice > course?.price && (
            <div className="text-sm text-muted-foreground line-through">
              ${course?.originalPrice}
            </div>
          )}
        </div>
        
        <Button
          variant={isEnrolled ? "outline" : "default"}
          size="sm"
          onClick={handleEnroll}
          disabled={isEnrolled}
          iconName={isEnrolled ? "Check" : "ExternalLink"}
          iconPosition="right"
          iconSize={14}
          fullWidth
        >
          {isEnrolled ? 'Enrolled' : 'Enroll Now'}
        </Button>
        
        {course?.aiInsight && (
          <div className="mt-3 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-start space-x-2">
              <Icon name="Brain" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <p className="text-xs text-accent-foreground">
                <span className="font-medium">AI Recommendation:</span> {course?.aiInsight}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CourseCard;
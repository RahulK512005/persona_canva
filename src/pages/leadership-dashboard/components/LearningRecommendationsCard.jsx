import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LearningRecommendationsCard = ({ learningData }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-card rounded-xl p-6 border border-border shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={24} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Learning Recommendations</h3>
            <p className="text-sm text-muted-foreground">Personalized for you</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Sparkles" size={16} className="text-warning" />
          <span className="text-xs text-warning font-medium">AI Curated</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-warning/5 to-accent/5 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Focus Area</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {learningData?.focusArea}
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recommended Videos</h4>
          {learningData?.videos?.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => window.open(video?.url, '_blank')}
            >
              <div className="w-16 h-12 rounded overflow-hidden flex-shrink-0">
                <Image 
                  src={video?.thumbnail} 
                  alt={video?.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-medium text-foreground line-clamp-1">
                  {video?.title}
                </h5>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {video?.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{video?.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{video?.views}</span>
                  </div>
                </div>
              </div>
              <Icon name="Play" size={16} className="text-primary" />
            </motion.div>
          ))}
        </div>

        <div className="pt-2">
          <Link to="/learning-resources">
            <Button variant="outline" fullWidth iconName="BookOpen" iconPosition="left">
              Explore All Resources
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningRecommendationsCard;
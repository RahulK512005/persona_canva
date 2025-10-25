import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoCard = ({ video, onPlay, isPlaying }) => {
  const [isBookmarked, setIsBookmarked] = useState(video?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ 
        duration: 0.4,
        ease: "easeOut"
      }}
      className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
    >
      <div className="relative">
        <motion.div 
          className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {isPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src={video?.embedUrl}
              title={video?.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0"
            />
          ) : (
            <>
              <motion.img
                src={video?.thumbnail}
                alt={video?.thumbnailAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
              />
              <motion.div 
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50"
                initial={{ opacity: 1 }}
                whileHover={{ 
                  background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)"
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => onPlay(video?.id)}
                    className="bg-white/95 text-black hover:bg-white hover:shadow-lg transition-all duration-300"
                    iconName="Play"
                    iconSize={24}
                  >
                    Play Video
                  </Button>
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.div>
        
        {/* Duration badge */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <motion.button
            onClick={handleBookmark}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
          >
            <Icon
              name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
              size={16}
              color="white"
            />
          </motion.button>
          <motion.div 
            className="px-2 py-1 bg-black/70 rounded text-white text-xs font-medium backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            {formatDuration(video?.duration)}
          </motion.div>
        </div>
      </div>
      <motion.div 
        className="p-4"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2 flex-1 group-hover:text-accent transition-colors duration-300">
            {video?.title}
          </h3>
        </div>
        
        {video?.author && (
          <p className="text-sm font-medium text-accent mb-1">
            {video?.author}
          </p>
        )}
        
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {video?.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{video?.channel}</span>
          <span>{video?.views} views</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <motion.span 
            className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 dark:from-purple-900 dark:to-blue-900 dark:text-purple-200 border border-purple-200 dark:border-purple-700"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {video?.category}
          </motion.span>
          
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{video?.rating}</span>
          </div>
        </div>

        {/* Watch Here Link */}
        <motion.a
          href={video?.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-sm text-accent hover:text-accent/80 transition-colors duration-300 mb-3"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="ExternalLink" size={14} />
          <span>▶️ Watch here</span>
        </motion.a>
        
        {video?.aiInsight && (
          <motion.div 
            className="p-3 bg-gradient-to-r from-accent/5 to-accent/10 rounded-lg border border-accent/20 hover:border-accent/30 transition-all duration-300"
            whileHover={{ 
              boxShadow: "0 0 20px rgba(var(--accent), 0.1)",
              scale: 1.02 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-2">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Icon name="Brain" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              </motion.div>
              <p className="text-xs text-accent-foreground">
                <span className="font-medium">AI Insight:</span> {video?.aiInsight}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
        whileHover={{
          opacity: 1,
          boxShadow: "0 0 30px rgba(var(--accent), 0.3)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default VideoCard;
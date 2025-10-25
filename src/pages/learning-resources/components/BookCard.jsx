import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const BookCard = ({ book }) => {
  const [isBookmarked, setIsBookmarked] = useState(book?.isBookmarked || false);
  const [readingProgress, setReadingProgress] = useState(book?.progress || 0);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleProgressUpdate = () => {
    const newProgress = Math.min(readingProgress + 10, 100);
    setReadingProgress(newProgress);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="p-4">
        <div className="flex space-x-4">
          <div className="flex-shrink-0">
            <div className="w-24 h-32 bg-muted rounded-lg overflow-hidden">
              <Image
                src={book?.cover}
                alt={book?.coverAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground line-clamp-2 flex-1">
                {book?.title}
              </h3>
              <button
                onClick={handleBookmark}
                className="ml-2 p-1 hover:bg-muted rounded transition-colors duration-200"
              >
                <Icon
                  name={isBookmarked ? "Bookmark" : "BookmarkPlus"}
                  size={16}
                  className={isBookmarked ? "text-accent" : "text-muted-foreground"}
                />
              </button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2">
              by {book?.author}
            </p>
            
            <div className="flex items-center space-x-1 mb-2">
              {renderStars(book?.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                ({book?.reviews} reviews)
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {book?.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
              <span>{book?.pages} pages</span>
              <span className={`px-2 py-1 rounded-full font-medium ${
                book?.difficulty === 'Beginner' ?'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : book?.difficulty === 'Intermediate' ?'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {book?.difficulty}
              </span>
            </div>
            
            {readingProgress > 0 && (
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Reading Progress</span>
                  <span>{readingProgress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => window.open(book?.amazonUrl, '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
                iconSize={14}
                className="flex-1"
              >
                Buy on Amazon
              </Button>
              {readingProgress < 100 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleProgressUpdate}
                  iconName="Plus"
                  iconSize={14}
                >
                  +10%
                </Button>
              )}
            </div>
          </div>
        </div>
        
        {book?.aiInsight && (
          <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="flex items-start space-x-2">
              <Icon name="Brain" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <p className="text-xs text-accent-foreground">
                <span className="font-medium">AI Recommendation:</span> {book?.aiInsight}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
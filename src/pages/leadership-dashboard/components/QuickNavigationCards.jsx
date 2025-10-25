import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const QuickNavigationCards = ({ navigationData }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {navigationData?.map((item, index) => (
        <motion.div
          key={item?.id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to={item?.path}
            className="block bg-card rounded-xl p-6 border border-border shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item?.bgColor}`}>
                <Icon name={item?.icon} size={24} className={item?.iconColor} />
              </div>
              <div className="flex items-center space-x-2">
                {item?.hasProgress && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success font-medium">{item?.progress}%</span>
                  </div>
                )}
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {item?.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item?.description}
              </p>
            </div>

            {item?.stats && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-4">
                  {item?.stats?.map((stat, statIndex) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-lg font-bold text-foreground">{stat?.value}</div>
                      <div className="text-xs text-muted-foreground">{stat?.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {item?.hasNotification && (
              <div className="flex items-center space-x-2 mt-4 p-2 bg-accent/10 rounded-lg">
                <Icon name="Bell" size={14} className="text-accent" />
                <span className="text-xs text-accent font-medium">{item?.notificationText}</span>
              </div>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickNavigationCards;
import React from 'react';

const LoadingShimmer = ({ 
  className = '', 
  variant = 'default',
  lines = 3,
  showAvatar = false 
}) => {
  const baseClasses = "animate-pulse";
  
  const variants = {
    default: "bg-muted rounded-md",
    card: "bg-muted rounded-lg",
    text: "bg-muted rounded",
    avatar: "bg-muted rounded-full",
    chart: "bg-muted rounded-lg"
  };

  const shimmerOverlay = (
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );

  if (variant === 'card') {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="relative overflow-hidden bg-muted rounded-lg p-6 space-y-4">
          {shimmerOverlay}
          {showAvatar && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted-foreground/20 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted-foreground/20 rounded w-1/3" />
                <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
              </div>
            </div>
          )}
          <div className="space-y-3">
            {Array.from({ length: lines })?.map((_, index) => (
              <div
                key={index}
                className={`h-4 bg-muted-foreground/20 rounded ${
                  index === lines - 1 ? 'w-2/3' : 'w-full'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="relative overflow-hidden bg-muted rounded-lg p-6">
          {shimmerOverlay}
          <div className="space-y-4">
            <div className="h-6 bg-muted-foreground/20 rounded w-1/3" />
            <div className="h-64 bg-muted-foreground/20 rounded" />
            <div className="flex justify-between">
              <div className="h-4 bg-muted-foreground/20 rounded w-16" />
              <div className="h-4 bg-muted-foreground/20 rounded w-16" />
              <div className="h-4 bg-muted-foreground/20 rounded w-16" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`${baseClasses} space-y-2 ${className}`}>
        {Array.from({ length: lines })?.map((_, index) => (
          <div
            key={index}
            className={`relative overflow-hidden h-4 bg-muted rounded ${
              index === lines - 1 ? 'w-2/3' : 'w-full'
            }`}
          >
            {shimmerOverlay}
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={`${baseClasses} ${className}`}>
        <div className="relative overflow-hidden w-10 h-10 bg-muted rounded-full">
          {shimmerOverlay}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${baseClasses} ${className}`}>
      <div className={`relative overflow-hidden ${variants?.default} h-20`}>
        {shimmerOverlay}
      </div>
    </div>
  );
};

export default LoadingShimmer;
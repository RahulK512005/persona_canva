import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ progressData }) => {
  const achievements = [
    {
      id: 1,
      title: 'Video Enthusiast',
      description: 'Watched 10 videos',
      icon: 'Play',
      progress: progressData?.videosWatched,
      target: 10,
      unlocked: progressData?.videosWatched >= 10,
      color: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Bookworm',
      description: 'Read 3 books',
      icon: 'BookOpen',
      progress: progressData?.booksRead,
      target: 3,
      unlocked: progressData?.booksRead >= 3,
      color: 'text-green-600'
    },
    {
      id: 3,
      title: 'Course Completer',
      description: 'Completed 2 courses',
      icon: 'GraduationCap',
      progress: progressData?.coursesCompleted,
      target: 2,
      unlocked: progressData?.coursesCompleted >= 2,
      color: 'text-purple-600'
    },
    {
      id: 4,
      title: 'Learning Streak',
      description: '7 days of continuous learning',
      icon: 'Flame',
      progress: progressData?.learningStreak,
      target: 7,
      unlocked: progressData?.learningStreak >= 7,
      color: 'text-orange-600'
    }
  ];

  const totalProgress = Math.round(
    ((progressData?.videosWatched + progressData?.booksRead + progressData?.coursesCompleted) / 15) * 100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={24} className="text-accent" />
          <h2 className="text-xl font-semibold text-foreground">Learning Progress</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-accent">{totalProgress}%</div>
          <div className="text-sm text-muted-foreground">Overall Progress</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{progressData?.videosWatched}</div>
          <div className="text-sm text-muted-foreground">Videos Watched</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{progressData?.booksRead}</div>
          <div className="text-sm text-muted-foreground">Books Read</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{progressData?.coursesCompleted}</div>
          <div className="text-sm text-muted-foreground">Courses Completed</div>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-foreground">{progressData?.learningStreak}</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <motion.div
              key={achievement?.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                achievement?.unlocked
                  ? 'bg-accent/10 border-accent/30 shadow-sm'
                  : 'bg-muted/30 border-border'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  achievement?.unlocked ? 'bg-accent/20' : 'bg-muted'
                }`}>
                  <Icon
                    name={achievement?.icon}
                    size={20}
                    className={achievement?.unlocked ? achievement?.color : 'text-muted-foreground'}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-medium ${
                      achievement?.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement?.title}
                    </h4>
                    {achievement?.unlocked && (
                      <Icon name="Check" size={16} className="text-green-600" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {achievement?.description}
                  </p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        achievement?.unlocked ? 'bg-accent' : 'bg-muted-foreground/30'
                      }`}
                      style={{
                        width: `${Math.min((achievement?.progress / achievement?.target) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {achievement?.progress}/{achievement?.target}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
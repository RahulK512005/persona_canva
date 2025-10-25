import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineEntry = ({ entry, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLeadershipStyleColor = (style) => {
    const colors = {
      'Collaborative': 'text-blue-600 bg-blue-50 border-blue-200',
      'Visionary': 'text-purple-600 bg-purple-50 border-purple-200',
      'Decisive': 'text-green-600 bg-green-50 border-green-200',
      'Empowering': 'text-orange-600 bg-orange-50 border-orange-200',
      'Self-Doubt': 'text-red-600 bg-red-50 border-red-200'
    };
    return colors?.[style] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border"></div>
      {/* Timeline dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-sm"></div>
      <div className="ml-12 pb-8">
        <motion.div
          className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.01 }}
        >
          {/* Entry Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {formatDate(entry?.date)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatTime(entry?.date)} • {entry?.type}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {entry?.leadershipStyle && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLeadershipStyleColor(entry?.leadershipStyle)}`}>
                  {entry?.leadershipStyle}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </Button>
            </div>
          </div>

          {/* Entry Preview */}
          <div className="mb-4">
            <p className="text-foreground line-clamp-2">
              {entry?.reflection}
            </p>
          </div>

          {/* Metrics Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{entry?.confidence}</div>
              <div className="text-xs text-muted-foreground">Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">{entry?.stress}</div>
              <div className="text-xs text-muted-foreground">Stress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">{entry?.teamInvolvement}</div>
              <div className="text-xs text-muted-foreground">Team</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{entry?.satisfaction}</div>
              <div className="text-xs text-muted-foreground">Satisfaction</div>
            </div>
          </div>

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {isExpanded && (
              <div className="border-t border-border pt-4 space-y-4">
                {/* Full Reflection */}
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center">
                    <Icon name="BookOpen" size={16} className="mr-2" />
                    Daily Reflection
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {entry?.reflection}
                  </p>
                </div>

                {/* Audio Recording */}
                {entry?.audioUrl && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Icon name="Mic" size={16} className="mr-2" />
                      Audio Recording
                    </h4>
                    <div className="bg-muted rounded-lg p-3 flex items-center space-x-3">
                      <Button variant="outline" size="sm" iconName="Play">
                        Play Recording
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Duration: {entry?.audioDuration}
                      </span>
                    </div>
                  </div>
                )}

                {/* AI Analysis */}
                {entry?.aiAnalysis && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Icon name="Brain" size={16} className="mr-2" />
                      AI Analysis Summary
                    </h4>
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                      <p className="text-sm text-foreground leading-relaxed">
                        {entry?.aiAnalysis}
                      </p>
                    </div>
                  </div>
                )}

                {/* Key Insights */}
                {entry?.keyInsights && entry?.keyInsights?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Icon name="Lightbulb" size={16} className="mr-2" />
                      Key Insights
                    </h4>
                    <ul className="space-y-2">
                      {entry?.keyInsights?.map((insight, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={14} className="mt-0.5 text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Items */}
                {entry?.actionItems && entry?.actionItems?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center">
                      <Icon name="CheckSquare" size={16} className="mr-2" />
                      Action Items
                    </h4>
                    <div className="space-y-2">
                      {entry?.actionItems?.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${item?.completed ? 'bg-green-500' : 'bg-muted-foreground'}`}></div>
                          <span className={`text-sm ${item?.completed ? 'text-green-600 line-through' : 'text-foreground'}`}>
                            {item?.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineEntry;
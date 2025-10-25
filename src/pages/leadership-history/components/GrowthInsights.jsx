import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GrowthInsights = ({ insights }) => {
  const [activeInsight, setActiveInsight] = useState('patterns');

  const insightTabs = [
    { id: 'patterns', label: 'Patterns', icon: 'TrendingUp' },
    { id: 'improvements', label: 'Improvements', icon: 'ArrowUp' },
    { id: 'challenges', label: 'Challenges', icon: 'AlertTriangle' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' }
  ];

  const leadershipStyleData = [
    { name: 'Collaborative', value: 35, color: '#3B82F6' },
    { name: 'Visionary', value: 25, color: '#8B5CF6' },
    { name: 'Decisive', value: 20, color: '#10B981' },
    { name: 'Empowering', value: 15, color: '#F59E0B' },
    { name: 'Self-Doubt', value: 5, color: '#EF4444' }
  ];

  const improvementAreasData = [
    { area: 'Communication', before: 6.2, after: 8.1, improvement: 1.9 },
    { area: 'Decision Making', before: 7.1, after: 8.5, improvement: 1.4 },
    { area: 'Team Building', before: 5.8, after: 7.9, improvement: 2.1 },
    { area: 'Stress Management', before: 4.9, after: 7.2, improvement: 2.3 },
    { area: 'Delegation', before: 6.5, after: 8.0, improvement: 1.5 }
  ];

  const renderPatterns = () => (
    <div className="space-y-6">
      {/* Leadership Style Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="PieChart" size={16} className="mr-2" />
            Leadership Style Distribution
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadershipStyleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {leadershipStyleData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Frequency']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {leadershipStyleData?.map((item) => (
              <div key={item?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">
                  {item?.name} ({item?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-foreground mb-4 flex items-center">
            <Icon name="Calendar" size={16} className="mr-2" />
            Weekly Patterns
          </h4>
          <div className="space-y-3">
            {[
              { day: 'Monday', confidence: 7.2, stress: 6.8, color: 'bg-blue-500' },
              { day: 'Tuesday', confidence: 7.8, stress: 5.9, color: 'bg-green-500' },
              { day: 'Wednesday', confidence: 8.1, stress: 5.2, color: 'bg-green-600' },
              { day: 'Thursday', confidence: 7.9, stress: 6.1, color: 'bg-green-500' },
              { day: 'Friday', confidence: 8.3, stress: 4.8, color: 'bg-green-700' }
            ]?.map((item) => (
              <div key={item?.day} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item?.color}`}></div>
                  <span className="font-medium text-foreground">{item?.day}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="text-foreground font-medium">{item?.confidence}</div>
                    <div className="text-muted-foreground text-xs">Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground font-medium">{item?.stress}</div>
                    <div className="text-muted-foreground text-xs">Stress</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Patterns */}
      <div>
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Search" size={16} className="mr-2" />
          Identified Patterns
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Peak Performance Days",
              description: "You consistently perform best on Wednesdays and Fridays, showing 15% higher confidence levels.",
              icon: "TrendingUp",
              color: "text-green-600 bg-green-50 border-green-200"
            },
            {
              title: "Stress Correlation",
              description: "High stress levels (>7) correlate with 23% decrease in team involvement scores.",
              icon: "AlertCircle",
              color: "text-orange-600 bg-orange-50 border-orange-200"
            },
            {
              title: "Communication Improvement",
              description: "Your communication clarity has improved by 31% over the last 3 months.",
              icon: "MessageSquare",
              color: "text-blue-600 bg-blue-50 border-blue-200"
            },
            {
              title: "Leadership Style Evolution",
              description: "Gradual shift from Decisive to Collaborative leadership style over 6 months.",
              icon: "Users",
              color: "text-purple-600 bg-purple-50 border-purple-200"
            }
          ]?.map((pattern, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border rounded-lg ${pattern?.color}`}
            >
              <div className="flex items-start space-x-3">
                <Icon name={pattern?.icon} size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-medium mb-1">{pattern?.title}</h5>
                  <p className="text-sm opacity-80">{pattern?.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderImprovements = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={16} className="mr-2" />
          Improvement Areas Progress
        </h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={improvementAreasData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="area" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                domain={[0, 10]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="before" fill="#94A3B8" name="Before" />
              <Bar dataKey="after" fill="#3B82F6" name="After" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {improvementAreasData?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-lg p-4"
          >
            <div className="text-center">
              <h5 className="font-medium text-foreground mb-2">{item?.area}</h5>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-primary">+{item?.improvement}</span>
                <Icon name="ArrowUp" size={16} className="text-green-500" />
              </div>
              <div className="text-sm text-muted-foreground">
                {item?.before} → {item?.after}
              </div>
              <div className="mt-2 bg-muted rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(item?.after / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Recurring Stress Triggers",
            items: [
              "Monday morning team meetings (avg stress: 7.8/10)",
              "End-of-quarter deadlines (avg stress: 8.2/10)",
              "Difficult client conversations (avg stress: 7.5/10)",
              "Budget planning sessions (avg stress: 7.1/10)"
            ],
            icon: "AlertTriangle",
            color: "border-red-200 bg-red-50"
          },
          {
            title: "Areas Needing Attention",
            items: [
              "Delegation skills (improvement plateau at 7.2/10)",
              "Work-life balance (declining trend)",
              "Conflict resolution (inconsistent performance)",
              "Public speaking confidence (varies widely)"
            ],
            icon: "Target",
            color: "border-orange-200 bg-orange-50"
          }
        ]?.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`border rounded-lg p-6 ${section?.color}`}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Icon name={section?.icon} size={20} className="text-orange-600" />
              <h4 className="font-medium text-foreground">{section?.title}</h4>
            </div>
            <ul className="space-y-2">
              {section?.items?.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <Icon name="Minus" size={14} className="mt-1 text-orange-600 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Challenge Timeline
        </h4>
        <div className="space-y-3">
          {[
            { date: '2024-10-15', challenge: 'Team conflict resolution', status: 'resolved', impact: 'medium' },
            { date: '2024-10-08', challenge: 'Missed deadline communication', status: 'learning', impact: 'high' },
            { date: '2024-09-28', challenge: 'Delegation hesitation', status: 'ongoing', impact: 'medium' },
            { date: '2024-09-20', challenge: 'Stress management during crisis', status: 'improved', impact: 'high' }
          ]?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  item?.status === 'resolved' ? 'bg-green-500' :
                  item?.status === 'improved' ? 'bg-blue-500' :
                  item?.status === 'learning'? 'bg-yellow-500' : 'bg-orange-500'
                }`}></div>
                <div>
                  <div className="font-medium text-foreground text-sm">{item?.challenge}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.date)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item?.status === 'resolved' ? 'bg-green-100 text-green-700' :
                  item?.status === 'improved' ? 'bg-blue-100 text-blue-700' :
                  item?.status === 'learning'? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {item?.status}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  item?.impact === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {item?.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "Immediate Actions",
            priority: "high",
            items: [
              "Schedule 1-on-1s with team members showing low engagement",
              "Implement stress management techniques before Monday meetings",
              "Practice delegation with low-risk tasks this week",
              "Set up feedback collection system for communication clarity"
            ]
          },
          {
            title: "Short-term Goals (1-3 months)",
            priority: "medium",
            items: [
              "Complete conflict resolution training course",
              "Establish weekly reflection routine for consistency",
              "Develop personal leadership philosophy statement",
              "Create team feedback loop for continuous improvement"
            ]
          },
          {
            title: "Long-term Development (3-12 months)",
            priority: "low",
            items: [
              "Pursue advanced leadership certification",
              "Mentor junior leaders to strengthen empowering style",
              "Build cross-functional collaboration skills",
              "Develop strategic thinking capabilities"
            ]
          }
        ]?.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`border rounded-lg p-6 ${
              section?.priority === 'high' ? 'border-red-200 bg-red-50' :
              section?.priority === 'medium'? 'border-yellow-200 bg-yellow-50' : 'border-green-200 bg-green-50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground">{section?.title}</h4>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                section?.priority === 'high' ? 'bg-red-100 text-red-700' :
                section?.priority === 'medium'? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                {section?.priority} priority
              </span>
            </div>
            <ul className="space-y-2">
              {section?.items?.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <Icon name="CheckCircle2" size={14} className={`mt-1 flex-shrink-0 ${
                    section?.priority === 'high' ? 'text-red-600' :
                    section?.priority === 'medium'? 'text-yellow-600' : 'text-green-600'
                  }`} />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div>
        <h4 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="BookOpen" size={16} className="mr-2" />
          Recommended Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              type: "Book",
              title: "Crucial Conversations",
              author: "Kerry Patterson",
              reason: "Improve communication during conflicts",
              icon: "BookOpen"
            },
            {
              type: "Course",
              title: "Stress Management for Leaders",
              author: "Coursera",
              reason: "Address recurring stress patterns",
              icon: "GraduationCap"
            },
            {
              type: "Video",
              title: "Delegation Mastery",
              author: "Leadership Channel",
              reason: "Overcome delegation hesitation",
              icon: "Play"
            }
          ]?.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={resource?.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">{resource?.type}</div>
                  <h5 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                    {resource?.title}
                  </h5>
                  <p className="text-xs text-muted-foreground mb-2">{resource?.author}</p>
                  <p className="text-xs text-muted-foreground italic">
                    {resource?.reason}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
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
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Growth Insights</h3>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {insightTabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeInsight === tab?.id ? 'default' : 'outline'}
              size="sm"
              iconName={tab?.icon}
              onClick={() => setActiveInsight(tab?.id)}
            >
              {tab?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeInsight === 'patterns' && renderPatterns()}
        {activeInsight === 'improvements' && renderImprovements()}
        {activeInsight === 'challenges' && renderChallenges()}
        {activeInsight === 'recommendations' && renderRecommendations()}
      </div>
    </motion.div>
  );
};

export default GrowthInsights;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LoadingShimmer from '../../components/ui/LoadingShimmer';

// Import components
import TimelineEntry from './components/TimelineEntry';
import TrendChart from './components/TrendChart';
import ProgressTracker from './components/ProgressTracker';
import GrowthInsights from './components/GrowthInsights';
import FilterControls from './components/FilterControls';

const LeadershipHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('timeline');
  const [filteredEntries, setFilteredEntries] = useState([]);

  // Mock historical data
  const historicalEntries = [
  {
    id: 1,
    date: "2024-10-24T09:00:00Z",
    type: "Daily Reflection",
    reflection: `Today's leadership challenge involved mediating a conflict between two senior team members over project priorities. I found myself initially wanting to make a quick decision to resolve the tension, but instead took time to listen to both perspectives. This collaborative approach led to a creative solution that incorporated both viewpoints. I'm noticing that when I slow down and truly listen, better outcomes emerge. The team seemed more engaged and committed to the final decision because they felt heard. My confidence in handling difficult conversations is growing, though I still feel some stress when conflicts first arise.`,
    confidence: 8,
    stress: 4,
    teamInvolvement: 9,
    satisfaction: 8,
    communicationClarity: 7,
    leadershipStyle: "Collaborative",
    audioUrl: "/audio/reflection-2024-10-24.mp3",
    audioDuration: "3:45",
    aiAnalysis: `Your reflection demonstrates significant growth in collaborative leadership. The decision to pause and listen rather than rush to judgment shows emotional intelligence and strategic thinking. This approach not only resolved the immediate conflict but also strengthened team trust and engagement. Consider this pattern of 'pause, listen, synthesize' as a core leadership tool for future challenges.`,
    keyInsights: [
    "Collaborative approach increased team engagement by 40%",
    "Listening before deciding improved solution quality",
    "Stress levels decreased when using structured conflict resolution"],

    actionItems: [
    { text: "Schedule follow-up with team members", completed: true },
    { text: "Document conflict resolution process", completed: false },
    { text: "Share learnings with other team leads", completed: false }]

  },
  {
    id: 2,
    date: "2024-10-23T09:15:00Z",
    type: "Daily Reflection",
    reflection: `Presented the quarterly results to the executive team today. I prepared extensively and felt confident going in, but noticed my stress levels spike when unexpected questions came up about budget variances. I managed to stay composed and provided thoughtful responses, though I could feel my heart racing. The presentation was well-received, and I got positive feedback about my clear communication style. I'm proud of how I handled the pressure, but I want to work on staying calmer during unexpected challenges. The team seemed impressed with our results, which boosted my satisfaction significantly.`,
    confidence: 7,
    stress: 6,
    teamInvolvement: 6,
    satisfaction: 9,
    communicationClarity: 8,
    leadershipStyle: "Decisive",
    audioUrl: "/audio/reflection-2024-10-23.mp3",
    audioDuration: "4:12",
    aiAnalysis: `Your presentation skills and preparation are clearly strengths. The ability to maintain composure under pressure while delivering clear communication shows strong leadership presence. The stress response to unexpected questions is normal and can be improved through scenario planning and mindfulness techniques. Your high satisfaction score indicates alignment between your values and actions.`,
    keyInsights: [
    "Preparation significantly boosted confidence levels",
    "Clear communication style received positive executive feedback",
    "Unexpected challenges still trigger stress responses"],

    actionItems: [
    { text: "Practice Q&A scenarios for future presentations", completed: false },
    { text: "Research mindfulness techniques for stress management", completed: true },
    { text: "Celebrate team achievements publicly", completed: true }]

  },
  {
    id: 3,
    date: "2024-10-22T08:30:00Z",
    type: "Daily Reflection",
    reflection: `Had a challenging day with delegation. I assigned a critical project component to Sarah, but found myself constantly checking in and wanting to take over when I saw her approach differed from mine. This created tension and probably undermined her confidence. By afternoon, I realized I was micromanaging and had a honest conversation with her about my concerns and her approach. She appreciated the transparency and we agreed on check-in points that would give me peace of mind while allowing her autonomy. I'm learning that my need for control sometimes conflicts with empowering my team. It's a balance I'm still working on.`,
    confidence: 6,
    stress: 7,
    teamInvolvement: 5,
    satisfaction: 6,
    communicationClarity: 7,
    leadershipStyle: "Self-Doubt",
    audioUrl: "/audio/reflection-2024-10-22.mp3",
    audioDuration: "5:02",
    aiAnalysis: `This reflection shows excellent self-awareness about the tension between control and empowerment. Your ability to recognize the micromanaging behavior and course-correct through honest conversation demonstrates growth mindset and emotional intelligence. The structured check-in approach you developed is a practical solution that balances oversight with autonomy. This experience is building your delegation skills.`,
    keyInsights: [
    "Self-awareness prevented prolonged micromanaging",
    "Honest communication rebuilt team trust",
    "Structured check-ins balance control and autonomy"],

    actionItems: [
    { text: "Define clear delegation framework", completed: false },
    { text: "Schedule regular delegation practice sessions", completed: false },
    { text: "Follow up on agreed check-in schedule", completed: true }]

  },
  {
    id: 4,
    date: "2024-10-21T09:45:00Z",
    type: "Daily Reflection",
    reflection: `Team brainstorming session for the new product launch went exceptionally well today. I focused on creating an environment where everyone felt safe to share ideas, even the unconventional ones. Used the 'yes, and...' approach instead of immediately evaluating ideas. The energy in the room was fantastic, and we generated more creative solutions than I expected. Three junior team members who usually stay quiet were actively participating and contributing valuable insights. I felt truly energized by the collaborative process and could see the team's excitement building. This is the kind of leadership that feels most natural and effective for me.`,
    confidence: 9,
    stress: 3,
    teamInvolvement: 10,
    satisfaction: 9,
    communicationClarity: 9,
    leadershipStyle: "Empowering",
    audioUrl: "/audio/reflection-2024-10-21.mp3",
    audioDuration: "3:28",
    aiAnalysis: `This reflection captures you at your leadership best - creating psychological safety, encouraging participation, and energizing your team through collaborative processes. The 'yes, and' technique and focus on inclusion demonstrate advanced facilitation skills. The high engagement from typically quiet team members indicates your approach is effectively drawing out diverse perspectives and building team confidence.`,
    keyInsights: [
    "Psychological safety increased team participation by 60%",
    "Collaborative approach generated higher quality solutions",
    "Empowering leadership style aligns with natural strengths"],

    actionItems: [
    { text: "Document successful brainstorming techniques", completed: true },
    { text: "Schedule follow-up sessions to maintain momentum", completed: true },
    { text: "Recognize junior team members\' contributions publicly", completed: false }]

  },
  {
    id: 5,
    date: "2024-10-20T10:00:00Z",
    type: "Daily Reflection",
    reflection: `Difficult conversation with Mark about his performance issues. I've been avoiding this for weeks, which wasn't fair to him or the team. Finally sat down and had an honest, direct conversation about specific behaviors and their impact. He was initially defensive, but I stayed calm and focused on facts rather than emotions. By the end, he acknowledged the issues and we created a development plan together. I felt relieved to finally address this, though it was emotionally draining. The team dynamics should improve now that we're addressing the elephant in the room. I need to get better at having these conversations sooner rather than later.`,
    confidence: 7,
    stress: 8,
    teamInvolvement: 7,
    satisfaction: 7,
    communicationClarity: 8,
    leadershipStyle: "Decisive",
    audioUrl: "/audio/reflection-2024-10-20.mp3",
    audioDuration: "4:35",
    aiAnalysis: `Your courage to finally address this performance issue demonstrates leadership growth, even though it was delayed. The structured approach - focusing on facts, staying calm, and collaborating on solutions - shows strong conflict resolution skills. The emotional drain you experienced is normal for difficult conversations. Consider developing a framework for earlier intervention to prevent issues from escalating.`,
    keyInsights: [
    "Direct communication resolved long-standing team tension",
    "Fact-based approach reduced defensiveness",
    "Collaborative problem-solving improved buy-in"],

    actionItems: [
    { text: "Create early intervention framework for performance issues", completed: false },
    { text: "Schedule regular check-ins with Mark on development plan", completed: true },
    { text: "Debrief with HR on conversation approach", completed: true }]

  }];


  // Mock trend data
  const trendData = [
  { date: "2024-10-15", confidence: 6.5, stress: 7.2, teamInvolvement: 6.8, satisfaction: 7.1, communicationClarity: 6.9 },
  { date: "2024-10-16", confidence: 7.1, stress: 6.8, teamInvolvement: 7.2, satisfaction: 7.5, communicationClarity: 7.3 },
  { date: "2024-10-17", confidence: 7.8, stress: 5.9, teamInvolvement: 8.1, satisfaction: 8.2, communicationClarity: 7.8 },
  { date: "2024-10-18", confidence: 8.2, stress: 5.2, teamInvolvement: 8.5, satisfaction: 8.7, communicationClarity: 8.1 },
  { date: "2024-10-19", confidence: 7.9, stress: 6.1, teamInvolvement: 7.8, satisfaction: 8.0, communicationClarity: 7.9 },
  { date: "2024-10-20", confidence: 7.0, stress: 8.0, teamInvolvement: 7.0, satisfaction: 7.0, communicationClarity: 8.0 },
  { date: "2024-10-21", confidence: 9.0, stress: 3.0, teamInvolvement: 10.0, satisfaction: 9.0, communicationClarity: 9.0 },
  { date: "2024-10-22", confidence: 6.0, stress: 7.0, teamInvolvement: 5.0, satisfaction: 6.0, communicationClarity: 7.0 },
  { date: "2024-10-23", confidence: 7.0, stress: 6.0, teamInvolvement: 6.0, satisfaction: 9.0, communicationClarity: 8.0 },
  { date: "2024-10-24", confidence: 8.0, stress: 4.0, teamInvolvement: 9.0, satisfaction: 8.0, communicationClarity: 7.0 }];


  // Mock books read data
  const booksRead = [
  {
    id: 1,
    title: "The Culture Code",
    author: "Daniel Coyle",
    coverImage: "https://images.unsplash.com/photo-1696862350948-5dda397179f8",
    rating: 5,
    completedDate: "2024-10-15T00:00:00Z",
    notes: "Excellent insights on building psychological safety and team culture. The three key skills framework is immediately applicable."
  },
  {
    id: 2,
    title: "Crucial Conversations",
    author: "Kerry Patterson",
    coverImage: "https://images.unsplash.com/photo-1551911560-6fc5cc46e990",
    rating: 4,
    completedDate: "2024-09-28T00:00:00Z",
    notes: "Great framework for difficult conversations. The STATE method has been particularly helpful in performance discussions."
  },
  {
    id: 3,
    title: "Multipliers",
    author: "Liz Wiseman",
    coverImage: "https://images.unsplash.com/photo-1696862350948-5dda397179f8",
    rating: 5,
    completedDate: "2024-09-10T00:00:00Z",
    notes: "Transformed my approach to delegation and team empowerment. The Multiplier vs Diminisher concepts are eye-opening."
  }];


  // Mock courses completed data
  const coursesCompleted = [
  {
    id: 1,
    title: "Advanced Leadership Communication",
    provider: "Coursera",
    duration: "6 weeks",
    hoursSpent: 24,
    completedDate: "2024-10-10T00:00:00Z",
    certificateEarned: true,
    skills: ["Public Speaking", "Difficult Conversations", "Presentation Skills", "Active Listening"]
  },
  {
    id: 2,
    title: "Emotional Intelligence for Leaders",
    provider: "edX",
    duration: "4 weeks",
    hoursSpent: 16,
    completedDate: "2024-09-15T00:00:00Z",
    certificateEarned: true,
    skills: ["Self-Awareness", "Empathy", "Stress Management", "Social Skills"]
  }];


  // Mock milestones data
  const milestones = [
  {
    id: 1,
    title: "Team Engagement Score Improvement",
    description: "Increased team engagement scores from 6.2 to 8.7 over 3 months through collaborative leadership approach",
    type: "improvement",
    achievedDate: "2024-10-20T00:00:00Z",
    impactScore: 85,
    relatedGoals: ["Team Building", "Communication", "Empowerment"]
  },
  {
    id: 2,
    title: "Successful Conflict Resolution",
    description: "Successfully mediated and resolved long-standing conflict between senior team members",
    type: "achievement",
    achievedDate: "2024-10-18T00:00:00Z",
    impactScore: 72,
    relatedGoals: ["Conflict Resolution", "Team Harmony"]
  },
  {
    id: 3,
    title: "Leadership Style Recognition",
    description: "Received peer recognition for collaborative leadership approach during quarterly review",
    type: "recognition",
    achievedDate: "2024-10-05T00:00:00Z",
    impactScore: 68,
    relatedGoals: ["Peer Recognition", "Leadership Development"]
  }];


  const viewTabs = [
  { id: 'timeline', label: 'Timeline', icon: 'Clock' },
  { id: 'trends', label: 'Trends', icon: 'TrendingUp' },
  { id: 'progress', label: 'Progress', icon: 'Target' },
  { id: 'insights', label: 'Insights', icon: 'Brain' }];


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredEntries(historicalEntries);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...historicalEntries];

    // Apply date range filter
    if (filters?.dateRange !== 'all') {
      const days = parseInt(filters?.dateRange);
      const cutoffDate = new Date();
      cutoffDate?.setDate(cutoffDate?.getDate() - days);
      filtered = filtered?.filter((entry) => new Date(entry.date) >= cutoffDate);
    }

    // Apply leadership style filter
    if (filters?.leadershipStyle !== 'all') {
      filtered = filtered?.filter((entry) => entry?.leadershipStyle === filters?.leadershipStyle);
    }

    // Apply confidence level filter
    if (filters?.confidenceLevel !== 'all') {
      filtered = filtered?.filter((entry) => {
        if (filters?.confidenceLevel === 'high') return entry?.confidence >= 8;
        if (filters?.confidenceLevel === 'medium') return entry?.confidence >= 5 && entry?.confidence < 8;
        if (filters?.confidenceLevel === 'low') return entry?.confidence < 5;
        return true;
      });
    }

    // Apply search filter
    if (filters?.searchTerm) {
      const searchTerm = filters?.searchTerm?.toLowerCase();
      filtered = filtered?.filter((entry) =>
      entry?.reflection?.toLowerCase()?.includes(searchTerm) ||
      entry?.leadershipStyle?.toLowerCase()?.includes(searchTerm) ||
      entry?.aiAnalysis && entry?.aiAnalysis?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue = a?.[filters?.sortBy];
      let bValue = b?.[filters?.sortBy];

      if (filters?.sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (filters?.sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

    setFilteredEntries(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationBar />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
              <LoadingShimmer variant="text" lines={2} className="w-1/3" />
              <LoadingShimmer variant="card" className="h-32" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <LoadingShimmer variant="chart" className="lg:col-span-2" />
                <LoadingShimmer variant="card" />
              </div>
              <LoadingShimmer variant="card" className="h-96" />
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbTrail />
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8">

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="History" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Leadership History</h1>
                <p className="text-muted-foreground">
                  Track your leadership development journey and growth patterns
                </p>
              </div>
            </div>

            {/* View Tabs */}
            <div className="flex flex-wrap gap-2">
              {viewTabs?.map((tab) =>
              <Button
                key={tab?.id}
                variant={activeView === tab?.id ? 'default' : 'outline'}
                iconName={tab?.icon}
                onClick={() => setActiveView(tab?.id)}>

                  {tab?.label}
                </Button>
              )}
            </div>
          </motion.div>

          {/* Filter Controls */}
          {activeView === 'timeline' &&
          <FilterControls
            onFiltersChange={handleFiltersChange}
            totalEntries={filteredEntries?.length} />

          }

          {/* Content */}
          <div className="space-y-8">
            {activeView === 'timeline' &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>

                {filteredEntries?.length > 0 ?
              <div className="space-y-6">
                    {filteredEntries?.map((entry, index) =>
                <TimelineEntry
                  key={entry?.id}
                  entry={entry}
                  index={index} />

                )}
                  </div> :

              <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No entries found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
              }
              </motion.div>
            }

            {activeView === 'trends' &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6">

                <TrendChart
                data={trendData}
                title="Leadership Metrics Trends"
                type="line" />

                <TrendChart
                data={trendData?.slice(-7)}
                title="Weekly Performance Overview"
                type="bar" />

              </motion.div>
            }

            {activeView === 'progress' &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>

                <ProgressTracker
                booksRead={booksRead}
                coursesCompleted={coursesCompleted}
                milestones={milestones} />

              </motion.div>
            }

            {activeView === 'insights' &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>

                <GrowthInsights insights={{}} />
              </motion.div>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default LeadershipHistory;
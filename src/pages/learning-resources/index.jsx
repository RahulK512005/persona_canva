import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import Icon from '../../components/AppIcon';
import VideoCard from './components/VideoCard';
import BookCard from './components/BookCard';
import CourseCard from './components/CourseCard';
import SearchFilters from './components/SearchFilters';
import ProgressTracker from './components/ProgressTracker';

const LearningResources = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event?.resultIndex; i < event?.results?.length; i++) {
          transcript += event?.results?.[i]?.[0]?.transcript;
        }
        setVoiceText(transcript);
        setSearchQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event?.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, []);

  // Mock data for videos - Updated with Leadership & Decision-Making Talks
  const videosData = [
  {
    id: 1,
    title: "Start With Why",
    author: "Simon Sinek",
    description: "A seminal talk on leadership, emphasizing the importance of starting with 'why' to inspire action.",
    thumbnail: "https://images.unsplash.com/photo-1734104233721-bc8fd975d206",
    thumbnailAlt: "Simon Sinek speaking on stage with confident posture and engaging audience with transformational leadership concepts",
    embedUrl: "https://www.youtube.com/embed/u4ZoJKF_VuA",
    watchUrl: "https://www.youtube.com/watch?v=u4ZoJKF_VuA",
    duration: 1098,
    channel: "TED",
    views: "62M",
    rating: 4.9,
    category: "Leadership & Decision-Making",
    isBookmarked: false,
    aiInsight: "This foundational talk aligns with your purpose-driven leadership style and will help you inspire your team more effectively."
  },
  {
    id: 2,
    title: "Empowering Leaders: Simon Sinek\'s Guide",
    author: "Simon Sinek",
    description: "A guide to empowering leadership, focusing on trust and collaboration.",
    thumbnail: "https://images.unsplash.com/photo-1681949101473-9aea8b928a55",
    thumbnailAlt: "Simon Sinek in professional setting discussing empowering leadership with emphasis on trust and team collaboration",
    embedUrl: "https://www.youtube.com/embed/g25bGA-qlRo",
    watchUrl: "https://www.youtube.com/watch?v=g25bGA-qlRo",
    duration: 2143,
    channel: "Simon Sinek",
    views: "1.2M",
    rating: 4.8,
    category: "Leadership & Decision-Making",
    isBookmarked: true,
    aiInsight: "Your collaborative leadership approach will be enhanced by these trust-building strategies."
  },
  {
    id: 3,
    title: "How to Make Hard Choices",
    author: "Ruth Chang",
    description: "Explores the psychology behind difficult decisions and how to approach them.",
    thumbnail: "https://images.unsplash.com/photo-1608986791723-752299d72c87",
    thumbnailAlt: "Ruth Chang presenting on decision-making psychology with visual aids showing complex choice frameworks and analytical thinking",
    embedUrl: "https://www.youtube.com/embed/8GQZuzIdeQQ",
    watchUrl: "https://www.youtube.com/watch?v=8GQZuzIdeQQ",
    duration: 864,
    channel: "TED",
    views: "3.8M",
    rating: 4.7,
    category: "Leadership & Decision-Making",
    isBookmarked: false,
    aiInsight: "Your decision-making challenges will benefit from these psychological frameworks for handling complex choices."
  },
  {
    id: 4,
    title: "How to Claim Your Leadership Power",
    author: "Michael Timms",
    description: "Discusses taking accountability and the three habits of personal leadership.",
    thumbnail: "https://images.unsplash.com/photo-1734728372271-1fbeda8711c2",
    thumbnailAlt: "Michael Timms on TEDx stage demonstrating personal leadership power with confident body language and engaging presentation style",
    embedUrl: "https://www.youtube.com/embed/dIYmzf21d1g",
    watchUrl: "https://www.youtube.com/watch?v=dIYmzf21d1g",
    duration: 1187,
    channel: "TEDx Talks",
    views: "456K",
    rating: 4.6,
    category: "Leadership & Decision-Making",
    isBookmarked: false,
    aiInsight: "These accountability practices will strengthen your leadership presence and personal authority."
  },
  {
    id: 5,
    title: "5 Practices of Resilient Leadership",
    author: "Dr. Taryn Marie Stejskal",
    description: "Shares practices for building resilience in leadership roles.",
    thumbnail: "https://images.unsplash.com/photo-1592382258436-7751788238e8",
    thumbnailAlt: "Dr. Taryn Marie Stejskal presenting resilient leadership practices with professional demeanor and supportive audience engagement",
    embedUrl: "https://www.youtube.com/embed/G8XX_SZzvJM",
    watchUrl: "https://www.youtube.com/watch?v=G8XX_SZzvJM",
    duration: 1432,
    channel: "Leadership Insights",
    views: "278K",
    rating: 4.8,
    category: "Leadership & Decision-Making",
    isBookmarked: true,
    aiInsight: "Your stress management patterns indicate these resilience practices will significantly improve your leadership sustainability."
  }];


  // Mock data for books
  const booksData = [
  {
    id: 1,
    title: "The Leadership Challenge",
    author: "James M. Kouzes & Barry Z. Posner",
    description: "A comprehensive guide to the five practices of exemplary leadership, backed by decades of research and real-world examples from successful leaders.",
    cover: "https://images.unsplash.com/photo-1521301914133-1b4763d20f3c",
    coverAlt: "Professional business book cover with modern typography and leadership imagery on clean white background",
    rating: 4.7,
    reviews: 2847,
    pages: 416,
    difficulty: "Intermediate",
    amazonUrl: "https://amazon.com/leadership-challenge",
    progress: 35,
    isBookmarked: true,
    aiInsight: "This book aligns perfectly with your collaborative leadership style and will help address team involvement challenges."
  },
  {
    id: 2,
    title: "Crucial Conversations",
    author: "Kerry Patterson, Joseph Grenny",
    description: "Learn how to handle high-stakes conversations with confidence and skill, turning difficult discussions into positive outcomes.",
    cover: "https://images.unsplash.com/photo-1731488101258-6ef10ac4f2a3",
    coverAlt: "Business communication book with professional design featuring conversation bubbles and corporate imagery",
    rating: 4.5,
    reviews: 1923,
    pages: 288,
    difficulty: "Beginner",
    amazonUrl: "https://amazon.com/crucial-conversations",
    progress: 0,
    isBookmarked: false,
    aiInsight: "Your communication clarity scores suggest this book will provide practical tools for improvement."
  },
  {
    id: 3,
    title: "Emotional Intelligence 2.0",
    author: "Travis Bradberry & Jean Greaves",
    description: "Discover how to increase your emotional intelligence and use it to improve your leadership effectiveness and team relationships.",
    cover: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666",
    coverAlt: "Psychology and leadership book cover with brain imagery and emotional intelligence concepts in professional design",
    rating: 4.3,
    reviews: 3156,
    pages: 224,
    difficulty: "Beginner",
    amazonUrl: "https://amazon.com/emotional-intelligence",
    progress: 78,
    isBookmarked: true,
    aiInsight: "Based on your self-reflection patterns, developing emotional intelligence will enhance your leadership impact."
  }];


  // Mock data for courses
  const coursesData = [
  {
    id: 1,
    title: "Strategic Leadership and Management",
    instructor: "University of Virginia",
    description: "Develop strategic thinking skills and learn how to lead organizational transformation in complex business environments.",
    thumbnail: "https://images.unsplash.com/photo-1614674398447-b22b368c3b1e",
    thumbnailAlt: "University lecture hall with professor teaching business strategy to engaged students with laptops and notebooks",
    platform: "Coursera",
    rating: 4.6,
    students: 45230,
    duration: "6 weeks",
    difficulty: "Intermediate",
    level: "Professional",
    language: "English",
    price: 49,
    originalPrice: 79,
    hasCertificate: true,
    enrollUrl: "https://coursera.org/strategic-leadership",
    isEnrolled: false,
    isBookmarked: false,
    aiInsight: "This course addresses strategic thinking gaps identified in your leadership analysis."
  },
  {
    id: 2,
    title: "Leading People and Teams",
    instructor: "MIT Sloan",
    description: "Master the fundamentals of team leadership, motivation, and performance management in modern organizations.",
    thumbnail: "https://images.unsplash.com/photo-1719978184147-c5bf6b82c6e1",
    thumbnailAlt: "Diverse business team collaborating around conference table with laptops and documents in bright modern office",
    platform: "edX",
    rating: 4.8,
    students: 28945,
    duration: "8 weeks",
    difficulty: "Advanced",
    level: "Executive",
    language: "English",
    price: 0,
    originalPrice: null,
    hasCertificate: true,
    enrollUrl: "https://edx.org/leading-teams",
    isEnrolled: true,
    isBookmarked: true,
    aiInsight: "Your team involvement scores indicate this course will provide valuable team leadership techniques."
  },
  {
    id: 3,
    title: "Communication for Leaders",
    instructor: "Stanford University",
    description: "Enhance your communication skills with advanced techniques for presentations, negotiations, and team interactions.",
    thumbnail: "https://images.unsplash.com/photo-1724827192883-95d0b50c81ce",
    thumbnailAlt: "Professional speaker giving presentation to business audience in modern auditorium with large screen display",
    platform: "Coursera",
    rating: 4.7,
    students: 67821,
    duration: "4 weeks",
    difficulty: "Beginner",
    level: "All Levels",
    language: "English",
    price: 39,
    originalPrice: 59,
    hasCertificate: true,
    enrollUrl: "https://coursera.org/communication-leaders",
    isEnrolled: false,
    isBookmarked: false,
    aiInsight: "Perfect for addressing the communication clarity improvements identified in your recent assessments."
  }];


  // Mock progress data
  const progressData = {
    videosWatched: 12,
    booksRead: 2,
    coursesCompleted: 1,
    learningStreak: 5,
    totalHours: 47
  };

  const tabs = [
  { id: 'videos', label: 'Leadership & Decision-Making Talks', icon: 'Play', count: videosData?.length },
  { id: 'books', label: 'Books', icon: 'BookOpen', count: booksData?.length },
  { id: 'courses', label: 'Courses', icon: 'GraduationCap', count: coursesData?.length }];


  const handlePlayVideo = (videoId) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSortBy('relevance');
    setVoiceText('');
  };

  const handleStartRecording = () => {
    if (recognition && !isRecording) {
      recognition?.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (recognition && isRecording) {
      recognition?.stop();
      setIsRecording(false);
    }
  };

  const handleVoiceTextChange = (text) => {
    setVoiceText(text);
    setSearchQuery(text);
  };

  const filterAndSortContent = (data, type) => {
    let filtered = [...data];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter((item) =>
      item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.author?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      type === 'books' && item?.author?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      type === 'courses' && item?.instructor?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter((item) => {
        if (type === 'videos') return item?.category?.toLowerCase()?.replace(' ', '-') === selectedCategory;
        return true; // Books and courses don't have detailed category filtering in this mock
      });
    }

    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered?.filter((item) =>
      item?.difficulty && item?.difficulty?.toLowerCase() === selectedDifficulty
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'duration':
          if (type === 'videos') return a?.duration - b?.duration;
          if (type === 'courses') return a?.duration?.localeCompare(b?.duration);
          return 0;
        case 'views':
          if (type === 'videos') return parseInt(b?.views) - parseInt(a?.views);
          return 0;
        case 'pages':
          if (type === 'books') return a?.pages - b?.pages;
          return 0;
        case 'price':
          if (type === 'courses') return a?.price - b?.price;
          return 0;
        case 'students':
          if (type === 'courses') return b?.students - a?.students;
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'videos':
        return filterAndSortContent(videosData, 'videos');
      case 'books':
        return filterAndSortContent(booksData, 'books');
      case 'courses':
        return filterAndSortContent(coursesData, 'courses');
      default:
        return [];
    }
  };

  const renderContent = () => {
    const data = getCurrentData();

    if (data?.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12">

          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <button
            onClick={handleClearFilters}
            className="text-accent hover:underline">

            Clear all filters
          </button>
        </motion.div>);

    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item, index) =>
        <motion.div
          key={item?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}>

            {activeTab === 'videos' &&
          <VideoCard
            video={item}
            onPlay={handlePlayVideo}
            isPlaying={playingVideo === item?.id} />

          }
            {activeTab === 'books' && <BookCard book={item} />}
            {activeTab === 'courses' && <CourseCard course={item} />}
          </motion.div>
        )}
      </div>);

  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbTrail />
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8">

            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Icon name="BookOpen" size={24} className="text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Learning Resources</h1>
                <p className="text-muted-foreground">
                  Personalized content to accelerate your leadership development
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress Tracker */}
          <ProgressTracker progressData={progressData} />

          {/* Voice Input + Text Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 bg-card rounded-lg border border-border p-4 shadow-sm">

            <div className="flex items-center space-x-3">
              <motion.button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full transition-all duration-300 ${
                isRecording ?
                'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/25' :
                'bg-accent hover:bg-accent/80 shadow-lg shadow-accent/25'}`
                }>

                {isRecording ?
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}>

                    <Icon name="MicOff" size={20} className="text-white" />
                  </motion.div> :

                <Icon name="Mic" size={20} className="text-white" />
                }
              </motion.button>
              
              <div className="flex-1">
                <textarea
                  value={voiceText}
                  onChange={(e) => handleVoiceTextChange(e?.target?.value)}
                  placeholder="Search for videos by voice or type here..."
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none transition-all duration-300"
                  rows={2} />

              </div>
              
              {voiceText &&
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => handleVoiceTextChange('')}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200">

                  <Icon name="X" size={16} />
                </motion.button>
              }
            </div>
            
            {isRecording &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 flex items-center space-x-2 text-sm text-muted-foreground">

                <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-2 bg-red-500 rounded-full" />

                <span>Listening... Speak now</span>
              </motion.div>
            }
          </motion.div>

          {/* Search and Filters */}
          <SearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onClearFilters={handleClearFilters}
            activeTab={activeTab} />


          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-6">

            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab?.id ?
                  'border-accent text-accent' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}`
                  }>

                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab?.id ?
                  'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'}`
                  }>
                      {tab?.count}
                    </span>
                  </button>
                )}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>

              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>);

};

export default LearningResources;
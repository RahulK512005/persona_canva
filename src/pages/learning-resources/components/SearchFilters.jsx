import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
  sortBy,
  setSortBy,
  onClearFilters,
  activeTab 
}) => {
  const categoryOptions = {
    videos: [
      { value: 'all', label: 'All Categories' },
      { value: 'leadership-style', label: 'Leadership Style' },
      { value: 'communication', label: 'Communication' },
      { value: 'decision-making', label: 'Decision Making' },
      { value: 'team-building', label: 'Team Building' },
      { value: 'conflict-resolution', label: 'Conflict Resolution' }
    ],
    books: [
      { value: 'all', label: 'All Categories' },
      { value: 'leadership', label: 'Leadership' },
      { value: 'management', label: 'Management' },
      { value: 'communication', label: 'Communication' },
      { value: 'strategy', label: 'Strategy' },
      { value: 'personal-development', label: 'Personal Development' }
    ],
    courses: [
      { value: 'all', label: 'All Categories' },
      { value: 'leadership', label: 'Leadership' },
      { value: 'management', label: 'Management' },
      { value: 'business-strategy', label: 'Business Strategy' },
      { value: 'communication', label: 'Communication' },
      { value: 'project-management', label: 'Project Management' }
    ]
  };

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const sortOptions = {
    videos: [
      { value: 'relevance', label: 'Most Relevant' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'duration', label: 'Duration' },
      { value: 'views', label: 'Most Viewed' }
    ],
    books: [
      { value: 'relevance', label: 'Most Relevant' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'pages', label: 'Page Count' },
      { value: 'publication', label: 'Publication Date' }
    ],
    courses: [
      { value: 'relevance', label: 'Most Relevant' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'price', label: 'Price' },
      { value: 'duration', label: 'Duration' },
      { value: 'students', label: 'Most Popular' }
    ]
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' || sortBy !== 'relevance';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border p-4 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Search" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Search & Filter</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconSize={14}
          >
            Clear Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          type="search"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />

        <Select
          options={categoryOptions?.[activeTab] || categoryOptions?.videos}
          value={selectedCategory}
          onChange={setSelectedCategory}
          placeholder="Select category"
        />

        <Select
          options={difficultyOptions}
          value={selectedDifficulty}
          onChange={setSelectedDifficulty}
          placeholder="Select difficulty"
        />

        <Select
          options={sortOptions?.[activeTab] || sortOptions?.videos}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
        />
      </div>
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-sm">
                <Icon name="Search" size={12} />
                <span>"{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {selectedCategory !== 'all' && (
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-sm">
                <Icon name="Tag" size={12} />
                <span>{categoryOptions?.[activeTab]?.find(opt => opt?.value === selectedCategory)?.label}</span>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {selectedDifficulty !== 'all' && (
              <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-sm">
                <Icon name="BarChart" size={12} />
                <span>{difficultyOptions?.find(opt => opt?.value === selectedDifficulty)?.label}</span>
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchFilters;
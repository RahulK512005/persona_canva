import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FeedbackFilters = ({ filters, onFilterChange, feedbackStats }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' },
    { value: 'unread', label: 'Unread First' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'communication', label: 'Communication' },
    { value: 'decision-making', label: 'Decision Making' },
    { value: 'team-support', label: 'Team Support' },
    { value: 'leadership-style', label: 'Leadership Style' },
    { value: 'feedback-culture', label: 'Feedback Culture' },
    { value: 'general', label: 'General' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'unread', label: 'Unread' },
    { value: 'responded', label: 'Responded' },
    { value: 'pending', label: 'Pending Response' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 mb-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{feedbackStats?.total}</div>
          <div className="text-sm text-muted-foreground">Total Feedback</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">{feedbackStats?.unread}</div>
          <div className="text-sm text-muted-foreground">Unread</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">{feedbackStats?.responded}</div>
          <div className="text-sm text-muted-foreground">Responded</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{feedbackStats?.avgRating}</div>
          <div className="text-sm text-muted-foreground">Avg Rating</div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search feedback content..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Sort By"
          options={sortOptions}
          value={filters?.sortBy}
          onChange={(value) => onFilterChange('sortBy', value)}
        />

        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />

        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          label="Rating"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => onFilterChange('rating', value)}
        />
      </div>
      {/* Active Filters */}
      {(filters?.search || filters?.category !== 'all' || filters?.status !== 'all' || filters?.rating !== 'all') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              
              {filters?.search && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                  Search: "{filters?.search}"
                  <button
                    onClick={() => onFilterChange('search', '')}
                    className="ml-1 hover:text-primary/80"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              
              {filters?.category !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-sm rounded-md">
                  {categoryOptions?.find(opt => opt?.value === filters?.category)?.label}
                  <button
                    onClick={() => onFilterChange('category', 'all')}
                    className="ml-1 hover:text-accent/80"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              
              {filters?.status !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-warning/10 text-warning text-sm rounded-md">
                  {statusOptions?.find(opt => opt?.value === filters?.status)?.label}
                  <button
                    onClick={() => onFilterChange('status', 'all')}
                    className="ml-1 hover:text-warning/80"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
              
              {filters?.rating !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-sm rounded-md">
                  {filters?.rating} Stars
                  <button
                    onClick={() => onFilterChange('rating', 'all')}
                    className="ml-1 hover:text-success/80"
                  >
                    <Icon name="X" size={14} />
                  </button>
                </span>
              )}
            </div>
            
            <button
              onClick={() => {
                onFilterChange('search', '');
                onFilterChange('category', 'all');
                onFilterChange('status', 'all');
                onFilterChange('rating', 'all');
              }}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FeedbackFilters;
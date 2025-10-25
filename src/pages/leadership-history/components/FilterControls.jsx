import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterControls = ({ onFiltersChange, totalEntries }) => {
  const [filters, setFilters] = useState({
    dateRange: '30',
    leadershipStyle: 'all',
    confidenceLevel: 'all',
    searchTerm: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '180', label: 'Last 6 months' },
    { value: '365', label: 'Last year' },
    { value: 'all', label: 'All time' }
  ];

  const leadershipStyleOptions = [
    { value: 'all', label: 'All Styles' },
    { value: 'Collaborative', label: 'Collaborative' },
    { value: 'Visionary', label: 'Visionary' },
    { value: 'Decisive', label: 'Decisive/Adaptive' },
    { value: 'Empowering', label: 'Empowering' },
    { value: 'Self-Doubt', label: 'Self-Doubt' }
  ];

  const confidenceLevelOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'high', label: 'High (8-10)' },
    { value: 'medium', label: 'Medium (5-7)' },
    { value: 'low', label: 'Low (1-4)' }
  ];

  const sortByOptions = [
    { value: 'date', label: 'Date' },
    { value: 'confidence', label: 'Confidence Level' },
    { value: 'stress', label: 'Stress Level' },
    { value: 'teamInvolvement', label: 'Team Involvement' },
    { value: 'satisfaction', label: 'Satisfaction' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      dateRange: '30',
      leadershipStyle: 'all',
      confidenceLevel: 'all',
      searchTerm: '',
      sortBy: 'date',
      sortOrder: 'desc'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = () => {
    return filters?.leadershipStyle !== 'all' || 
           filters?.confidenceLevel !== 'all' || 
           filters?.searchTerm !== '' ||
           filters?.dateRange !== '30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-4 mb-6 shadow-sm"
    >
      {/* Quick Filters Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filters</span>
            {hasActiveFilters() && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                Active
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Select
              options={dateRangeOptions}
              value={filters?.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              className="w-32"
            />
            
            <Button
              variant="outline"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              More
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={14} />
          <span>{totalEntries} entries found</span>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          type="search"
          placeholder="Search reflections, insights, or keywords..."
          value={filters?.searchTerm}
          onChange={(e) => handleFilterChange('searchTerm', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Expanded Filters */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border">
            {/* Advanced Filters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Leadership Style"
                options={leadershipStyleOptions}
                value={filters?.leadershipStyle}
                onChange={(value) => handleFilterChange('leadershipStyle', value)}
              />
              
              <Select
                label="Confidence Level"
                options={confidenceLevelOptions}
                value={filters?.confidenceLevel}
                onChange={(value) => handleFilterChange('confidenceLevel', value)}
              />
              
              <Select
                label="Sort By"
                options={sortByOptions}
                value={filters?.sortBy}
                onChange={(value) => handleFilterChange('sortBy', value)}
              />
            </div>

            {/* Sort Order and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort Order:</span>
                <Button
                  variant={filters?.sortOrder === 'desc' ? 'default' : 'outline'}
                  size="sm"
                  iconName="ArrowDown"
                  onClick={() => handleFilterChange('sortOrder', 'desc')}
                >
                  Newest First
                </Button>
                <Button
                  variant={filters?.sortOrder === 'asc' ? 'default' : 'outline'}
                  size="sm"
                  iconName="ArrowUp"
                  onClick={() => handleFilterChange('sortOrder', 'asc')}
                >
                  Oldest First
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                {hasActiveFilters() && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="X"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={() => {}}
                >
                  Export Data
                </Button>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Quick filters:</span>
              {[
                { label: 'High Confidence', filter: { confidenceLevel: 'high' } },
                { label: 'Collaborative Style', filter: { leadershipStyle: 'Collaborative' } },
                { label: 'Recent Entries', filter: { dateRange: '7' } },
                { label: 'Low Stress', filter: { searchTerm: 'low stress' } }
              ]?.map((quickFilter, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    Object.entries(quickFilter?.filter)?.forEach(([key, value]) => {
                      handleFilterChange(key, value);
                    });
                  }}
                  className="text-xs"
                >
                  {quickFilter?.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FilterControls;
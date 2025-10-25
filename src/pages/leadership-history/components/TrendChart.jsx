import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TrendChart = ({ data, title, type = 'line' }) => {
  const [dateRange, setDateRange] = useState('30');
  const [selectedMetrics, setSelectedMetrics] = useState(['confidence', 'stress', 'teamInvolvement', 'satisfaction']);

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' },
    { value: 'all', label: 'All time' }
  ];

  const metricOptions = [
    { value: 'confidence', label: 'Confidence Level' },
    { value: 'stress', label: 'Stress Level' },
    { value: 'teamInvolvement', label: 'Team Involvement' },
    { value: 'satisfaction', label: 'Satisfaction' },
    { value: 'communicationClarity', label: 'Communication Clarity' }
  ];

  const metricColors = {
    confidence: '#3B82F6',
    stress: '#F59E0B',
    teamInvolvement: '#10B981',
    satisfaction: '#8B5CF6',
    communicationClarity: '#F97316'
  };

  const filterDataByRange = (data, range) => {
    if (range === 'all') return data;
    
    const days = parseInt(range);
    const cutoffDate = new Date();
    cutoffDate?.setDate(cutoffDate?.getDate() - days);
    
    return data?.filter(item => new Date(item.date) >= cutoffDate);
  };

  const filteredData = filterDataByRange(data, dateRange);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">
            {new Date(label)?.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}/10
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const ChartComponent = type === 'bar' ? BarChart : LineChart;
    const DataComponent = type === 'bar' ? Bar : Line;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            tickFormatter={(value) => new Date(value)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis 
            stroke="var(--color-muted-foreground)"
            fontSize={12}
            domain={[0, 10]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          
          {selectedMetrics?.map((metric) => (
            <DataComponent
              key={metric}
              type="monotone"
              dataKey={metric}
              stroke={metricColors?.[metric]}
              fill={metricColors?.[metric]}
              strokeWidth={type === 'line' ? 2 : 0}
              dot={type === 'line' ? { fill: metricColors?.[metric], strokeWidth: 2, r: 4 } : undefined}
              name={metricOptions?.find(opt => opt?.value === metric)?.label}
            />
          ))}
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-lg p-6 shadow-sm"
    >
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            className="w-full sm:w-40"
          />
          
          <Select
            options={metricOptions}
            value={selectedMetrics}
            onChange={setSelectedMetrics}
            multiple
            placeholder="Select metrics"
            className="w-full sm:w-48"
          />
        </div>
      </div>
      {/* Chart Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={type === 'line' ? 'default' : 'outline'}
            size="sm"
            iconName="TrendingUp"
            onClick={() => {}}
          >
            Line
          </Button>
          <Button
            variant={type === 'bar' ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            onClick={() => {}}
          >
            Bar
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {filteredData?.length} data points
        </div>
      </div>
      {/* Chart */}
      <div className="w-full h-80">
        {filteredData?.length > 0 ? (
          renderChart()
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No data available for selected range</p>
            </div>
          </div>
        )}
      </div>
      {/* Chart Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {selectedMetrics?.slice(0, 4)?.map((metric) => {
          const values = filteredData?.map(d => d?.[metric])?.filter(v => v !== undefined);
          const avg = values?.length > 0 ? (values?.reduce((a, b) => a + b, 0) / values?.length)?.toFixed(1) : 0;
          const trend = values?.length > 1 ? (values?.[values?.length - 1] - values?.[0] > 0 ? 'up' : 'down') : 'neutral';
          
          return (
            <div key={metric} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <span className="text-lg font-bold" style={{ color: metricColors?.[metric] }}>
                  {avg}
                </span>
                <Icon 
                  name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  size={14} 
                  className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'} 
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {metricOptions?.find(opt => opt?.value === metric)?.label}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TrendChart;
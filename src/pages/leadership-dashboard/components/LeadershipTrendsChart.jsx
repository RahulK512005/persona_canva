import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const LeadershipTrendsChart = ({ trendsData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-muted-foreground">
                {entry?.name}: {entry?.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-xl p-6 border border-border shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={24} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Leadership Trends</h3>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground">Confidence</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">Stress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Team Involvement</span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full" aria-label="Leadership Trends Line Chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="confidence" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="stress" 
              stroke="var(--color-warning)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-warning)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-warning)', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="teamInvolvement" 
              stroke="var(--color-success)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-success)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {trendsData?.[trendsData?.length - 1]?.confidence || 0}%
          </div>
          <div className="text-xs text-muted-foreground">Current Confidence</div>
        </div>
        <div className="text-center p-3 bg-warning/5 rounded-lg">
          <div className="text-2xl font-bold text-warning">
            {trendsData?.[trendsData?.length - 1]?.stress || 0}%
          </div>
          <div className="text-xs text-muted-foreground">Current Stress</div>
        </div>
        <div className="text-center p-3 bg-success/5 rounded-lg">
          <div className="text-2xl font-bold text-success">
            {trendsData?.[trendsData?.length - 1]?.teamInvolvement || 0}%
          </div>
          <div className="text-xs text-muted-foreground">Team Involvement</div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadershipTrendsChart;
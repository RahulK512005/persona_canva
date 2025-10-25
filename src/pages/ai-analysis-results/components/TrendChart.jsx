import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const TrendChart = ({ trendData }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}%`}
            </p>
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
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-card rounded-lg border border-border p-6 shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="TrendingUp" size={24} className="text-primary" />
        <h2 className="text-xl font-bold text-foreground">Leadership Trends</h2>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              name="Confidence"
            />
            <Line
              type="monotone"
              dataKey="teamInvolvement"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              name="Team Involvement"
            />
            <Line
              type="monotone"
              dataKey="communication"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
              name="Communication"
            />
            <Line
              type="monotone"
              dataKey="satisfaction"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
              name="Satisfaction"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium text-foreground">Confidence</p>
          <p className="text-xs text-muted-foreground">Leadership confidence level</p>
        </div>
        <div className="text-center">
          <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium text-foreground">Team Involvement</p>
          <p className="text-xs text-muted-foreground">Team engagement score</p>
        </div>
        <div className="text-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium text-foreground">Communication</p>
          <p className="text-xs text-muted-foreground">Communication clarity</p>
        </div>
        <div className="text-center">
          <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm font-medium text-foreground">Satisfaction</p>
          <p className="text-xs text-muted-foreground">Overall satisfaction</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TrendChart;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MoodVisualization = ({ moodEntries }) => {
  // Process mood data for charts
  const processedData = moodEntries
    .slice(-14) // Last 14 entries
    .reverse()
    .map((entry, index) => ({
      day: `Day ${index + 1}`,
      mood: entry.mood.value,
      date: entry.date,
      label: entry.mood.label,
      emoji: entry.mood.emoji
    }));

  // Calculate mood distribution
  const moodDistribution = [
    { mood: 'Very Sad', count: 0, emoji: '😢' },
    { mood: 'Sad', count: 0, emoji: '😔' },
    { mood: 'Neutral', count: 0, emoji: '😐' },
    { mood: 'Happy', count: 0, emoji: '😊' },
    { mood: 'Very Happy', count: 0, emoji: '😄' }
  ];

  moodEntries.forEach(entry => {
    const index = entry.mood.value - 1;
    if (index >= 0 && index < moodDistribution.length) {
      moodDistribution[index].count++;
    }
  });

  // Calculate average mood
  const averageMood = moodEntries.length > 0 
    ? (moodEntries.reduce((sum, entry) => sum + entry.mood.value, 0) / moodEntries.length).toFixed(1)
    : 0;

  // Get mood trend
  const getMoodTrend = () => {
    if (processedData.length < 2) return 'neutral';
    const recent = processedData.slice(-3).map(d => d.mood);
    const earlier = processedData.slice(-6, -3).map(d => d.mood);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
    
    if (recentAvg > earlierAvg + 0.3) return 'improving';
    if (recentAvg < earlierAvg - 0.3) return 'declining';
    return 'stable';
  };

  const moodTrend = getMoodTrend();

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Average Mood</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-blue-600">{averageMood}</div>
            <div className="text-sm text-muted-foreground">out of 5.0</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Total Check-ins</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600">{moodEntries.length}</div>
            <div className="text-sm text-muted-foreground">mood entries</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Trend</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-2xl mb-1">
              {moodTrend === 'improving' && '📈'}
              {moodTrend === 'declining' && '📉'}
              {moodTrend === 'stable' && '➡️'}
            </div>
            <div className="text-sm font-medium capitalize text-purple-600">{moodTrend}</div>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trend Chart */}
      {processedData.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Mood Trend (Last 14 Days)</CardTitle>
            <p className="text-muted-foreground">Track your emotional journey over time</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  domain={[1, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  stroke="#64748b"
                  fontSize={12}
                />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-slate-800 p-3 border rounded-lg shadow-lg">
                          <p className="font-medium">{data.date}</p>
                          <p className="text-sm">
                            {data.emoji} {data.label} ({data.mood})
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, fill: '#1d4ed8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Mood Distribution */}
      {moodEntries.length > 0 && (
        <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Mood Distribution</CardTitle>
            <p className="text-muted-foreground">How often you experience different moods</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={moodDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="mood" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white dark:bg-slate-800 p-3 border rounded-lg shadow-lg">
                          <p className="font-medium">{data.emoji} {data.mood}</p>
                          <p className="text-sm">Count: {data.count}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {moodEntries.length === 0 && (
        <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-medium mb-2">No Data Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start tracking your mood to see beautiful insights about your mental health journey
            </p>
            <div className="text-sm text-muted-foreground">
              Your mood data will appear here as charts and visualizations
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MoodVisualization;

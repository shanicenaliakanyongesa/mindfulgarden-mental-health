
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import MoodTracker from '@/components/MoodTracker';
import JournalEntry from '@/components/JournalEntry';
import ResourceHub from '@/components/ResourceHub';
import EmergencySupport from '@/components/EmergencySupport';
import MoodVisualization from '@/components/MoodVisualization';
import { Moon, Sun, Heart, Flower } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [moodEntries, setMoodEntries] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [streak, setStreak] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved data from localStorage
    const savedMoods = localStorage.getItem('moodEntries');
    const savedJournal = localStorage.getItem('journalEntries');
    const savedStreak = localStorage.getItem('streak');
    
    if (savedMoods) setMoodEntries(JSON.parse(savedMoods));
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
    if (savedStreak) setStreak(parseInt(savedStreak));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const addMoodEntry = (mood) => {
    const newEntry = {
      id: Date.now(),
      mood,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };
    const updatedEntries = [newEntry, ...moodEntries];
    setMoodEntries(updatedEntries);
    localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    
    // Update streak
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem('streak', newStreak.toString());
    
    toast({
      title: "Mood logged successfully! 🌱",
      description: "Your mental garden is growing with each check-in.",
    });
  };

  const addJournalEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      ...entry,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString()
    };
    const updatedEntries = [newEntry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    toast({
      title: "Journal entry saved! ✨",
      description: "Your thoughts are safely stored in your digital garden.",
    });
  };

  const todaysQuote = "Every day is a new beginning. Take a deep breath, smile, and start again. 🌸";

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Flower className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Mindful Garden
              </h1>
              <p className="text-sm text-muted-foreground">Your sanctuary for mental wellness</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <EmergencySupport />
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full border-2 hover:scale-105 transition-transform"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </header>

        {/* Welcome & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2 border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Daily Inspiration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-lg italic text-center py-4 px-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                {todaysQuote}
              </blockquote>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-3xl font-bold text-green-600">{streak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
              <Progress value={(streak % 7) * (100/7)} className="w-full" />
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                🌱 Growing Strong
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="mood" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-2">
            <TabsTrigger value="mood" className="rounded-lg data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Mood Check-in
            </TabsTrigger>
            <TabsTrigger value="journal" className="rounded-lg data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              Journal
            </TabsTrigger>
            <TabsTrigger value="resources" className="rounded-lg data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Resources
            </TabsTrigger>
            <TabsTrigger value="insights" className="rounded-lg data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="mood" className="space-y-6">
            <MoodTracker onMoodSubmit={addMoodEntry} />
          </TabsContent>

          <TabsContent value="journal" className="space-y-6">
            <JournalEntry onJournalSubmit={addJournalEntry} journalEntries={journalEntries} />
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <ResourceHub />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <MoodVisualization moodEntries={moodEntries} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

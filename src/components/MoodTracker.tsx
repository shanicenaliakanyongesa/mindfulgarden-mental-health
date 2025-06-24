
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const moodOptions = [
  { emoji: '😢', label: 'Very Sad', value: 1, color: 'bg-blue-100 hover:bg-blue-200 border-blue-300' },
  { emoji: '😔', label: 'Sad', value: 2, color: 'bg-indigo-100 hover:bg-indigo-200 border-indigo-300' },
  { emoji: '😐', label: 'Neutral', value: 3, color: 'bg-gray-100 hover:bg-gray-200 border-gray-300' },
  { emoji: '😊', label: 'Happy', value: 4, color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300' },
  { emoji: '😄', label: 'Very Happy', value: 5, color: 'bg-green-100 hover:bg-green-200 border-green-300' },
];

const MoodTracker = ({ onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedMood) {
      onMoodSubmit({
        mood: selectedMood,
        note: note.trim(),
      });
      setSelectedMood(null);
      setNote('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          How are you feeling today?
        </CardTitle>
        <p className="text-muted-foreground">Take a moment to check in with yourself</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div className="grid grid-cols-5 gap-4">
          {moodOptions.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                selectedMood?.value === mood.value
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                  : mood.color
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="text-xs font-medium text-center">{mood.label}</div>
            </button>
          ))}
        </div>

        {/* Selected Mood Display */}
        {selectedMood && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg text-center animate-fade-in">
            <p className="text-lg">
              You're feeling <span className="font-semibold">{selectedMood.label}</span> today {selectedMood.emoji}
            </p>
          </div>
        )}

        {/* Optional Note */}
        <div className="space-y-2">
          <label className="text-sm font-medium">What's on your mind? (Optional)</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Share what's contributing to your mood today..."
            className="resize-none border-2 focus:border-green-400 transition-colors"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedMood || submitted}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          {submitted ? '✨ Logged Successfully!' : 'Log My Mood'}
        </Button>

        {submitted && (
          <div className="text-center text-green-600 font-medium animate-fade-in">
            🌱 Your mood has been added to your mental garden!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodTracker;

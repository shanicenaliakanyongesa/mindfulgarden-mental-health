
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const journalPrompts = [
  "What am I grateful for today?",
  "What challenged me today and how did I handle it?",
  "What brought me joy or peace today?",
  "What would I like to let go of?",
  "What am I looking forward to tomorrow?",
  "How did I take care of myself today?",
  "What emotions did I experience today?",
  "What lesson did I learn about myself today?"
];

const JournalEntry = ({ onJournalSubmit, journalEntries }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onJournalSubmit({
        title: title.trim() || 'Untitled Entry',
        content: content.trim(),
        prompt: selectedPrompt
      });
      setTitle('');
      setContent('');
      setSelectedPrompt('');
    }
  };

  const usePrompt = (prompt) => {
    setSelectedPrompt(prompt);
    setContent(prompt + '\n\n');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Journal Writing Area */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Express Your Thoughts
          </CardTitle>
          <p className="text-muted-foreground">Writing can be a powerful tool for processing emotions</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Inspiration Prompts */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Need inspiration? Try a prompt:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {journalPrompts.slice(0, 4).map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => usePrompt(prompt)}
                  className="text-xs h-auto p-2 justify-start hover:bg-blue-50 dark:hover:bg-blue-900/30"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Entry Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Entry Title (Optional)</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="border-2 focus:border-blue-400"
            />
          </div>

          {/* Entry Content */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Thoughts</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing... Let your thoughts flow freely."
              className="resize-none border-2 focus:border-blue-400 min-h-[200px]"
              rows={8}
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-xl"
          >
            Save to Journal
          </Button>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Recent Entries</CardTitle>
          <p className="text-muted-foreground">Your journey of self-reflection</p>
        </CardHeader>
        <CardContent>
          {journalEntries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-4xl mb-4">📝</div>
              <p>Your journal entries will appear here</p>
              <p className="text-sm">Start writing to begin your journey</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {journalEntries.slice(0, 5).map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-blue-400"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium truncate">{entry.title}</h4>
                    <span className="text-xs text-muted-foreground ml-2">{entry.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {entry.content.replace(entry.prompt || '', '').trim()}
                  </p>
                  {entry.prompt && (
                    <div className="mt-2 text-xs text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                      Prompt: {entry.prompt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntry;

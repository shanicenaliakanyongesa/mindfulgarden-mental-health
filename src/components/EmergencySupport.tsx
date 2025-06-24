import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const EmergencySupport = () => {
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  const startBreathing = () => {
    setIsBreathingActive(true);
    setTimeout(() => setIsBreathingActive(false), 60000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
          🆘 Emergency Support
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center text-red-600">🆘 Immediate Support & Crisis Resources (Kenya)</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-300">🚨 Crisis Hotlines - Call Now</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-lg">Kenya Red Cross</h4>
                <p className="text-2xl font-bold text-red-600">Call: 1199</p>
                <p className="text-sm">24/7 crisis support and medical emergencies</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-bold text-lg">Mental Health Crisis Line</h4>
                <p className="text-2xl font-bold text-red-600">Call: 1195</p>
                <p className="text-sm">Mental health crisis support across Kenya</p>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">🧘‍♀️ Quick Calming Techniques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">4-7-8 Breathing Technique</h4>
                <p className="text-sm mb-3">Inhale for 4, hold for 7, exhale for 8 seconds</p>
                <Button onClick={startBreathing} disabled={isBreathingActive} className="bg-blue-500 hover:bg-blue-600">
                  {isBreathingActive ? '🫁 Breathing in progress...' : '🫁 Start Breathing Exercise'}
                </Button>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">5-4-3-2-1 Grounding Technique</h4>
                <div className="text-sm space-y-1">
                  <p>👀 Name 5 things you can SEE</p>
                  <p>✋ Name 4 things you can TOUCH</p>
                  <p>👂 Name 3 things you can HEAR</p>
                  <p>👃 Name 2 things you can SMELL</p>
                  <p>👅 Name 1 thing you can TASTE</p>
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">🌟 Positive Affirmations</h4>
                <div className="text-sm space-y-1">
                  <p>"This feeling is temporary and will pass."</p>
                  <p>"I am stronger than my struggles."</p>
                  <p>"I deserve support and care."</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencySupport;

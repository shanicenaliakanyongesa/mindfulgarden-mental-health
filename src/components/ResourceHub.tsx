import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ResourceHub = () => {
  const crisisResources = [
    {
      name: "Kenya Red Cross",
      description: "24/7 crisis and medical support across Kenya.",
      contact: "Call: 1199",
      type: "Crisis"
    },
    {
      name: "Mental Health Crisis Line (Kenya)",
      description: "24/7 crisis support for mental health emergencies.",
      contact: "Call: 1195",
      type: "Crisis"
    },
    {
      name: "Amani Counselling Centre",
      description: "Information and support for mental health and counseling services.",
      contact: "Call: 0722-572877",
      type: "Support"
    }
  ];

  const resourceCategories = [ /* (same as your original) */ ];

  const professionalHelp = [
    {
      title: "Kenya Association of Psychologists",
      description: "Find qualified psychologists in Kenya.",
      link: "https://www.kap.or.ke/"
    },
    {
      title: "Nairobi Wellness Center",
      description: "Accessible therapy services across Kenya.",
      link: "https://nairobiwellnesscenter.org/"
    },
    {
      title: "Kenya Red Cross Mental Health Services",
      description: "Mental health support available via Red Cross centers.",
      link: "https://www.redcross.or.ke/"
    },
    {
      title: "Reading Resource: Verywell Mind",
      description: "Articles and guides for understanding mental health and self-care.",
      link: "https://www.verywellmind.com/"
    },
    {
      title: "Reading Resource: MindTools",
      description: "Articles and guides for emotional intelligence and mental resilience.",
      link: "https://www.mindtools.com/"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-700 dark:text-red-300 flex items-center gap-2">🚨 Immediate Crisis Support</CardTitle>
          <p className="text-red-600 dark:text-red-400">If you're in crisis, please reach out immediately:</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {crisisResources.map((resource, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-900 dark:text-slate-100">{resource.name}</h4>
                <Badge variant="secondary" className="text-xs">{resource.type}</Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{resource.description}</p>
              <p className="font-medium text-red-700 dark:text-red-300">{resource.contact}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Separator />
      {/* Continue with Resource Categories, Professional Support, and Self-Help Tools as per your original structure.*/}
    </div>
  );
};

export default ResourceHub;

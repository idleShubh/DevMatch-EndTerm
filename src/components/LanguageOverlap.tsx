
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";

interface LanguageOverlapProps {
  languageOverlap: {
    [key: string]: [number, number]; // [user1Count, user2Count]
  };
  users: [any, any];
}

const LanguageOverlap: React.FC<LanguageOverlapProps> = ({ languageOverlap, users }) => {
  // Get the sorted languages by combined usage
  const sortedLanguages = Object.entries(languageOverlap)
    .sort(([, a], [, b]) => (b[0] + b[1]) - (a[0] + a[1]))
    .slice(0, 6); // Top 6 languages

  const getUserPercentage = (userIndex: 0 | 1, language: string) => {
    const counts = languageOverlap[language];
    const userCount = counts[userIndex];
    const totalUserLanguages = Object.values(languageOverlap).reduce((sum, curr) => sum + curr[userIndex], 0);
    
    return totalUserLanguages > 0 ? Math.round((userCount / totalUserLanguages) * 100) : 0;
  };

  return (
    <Card className="bg-white/5 border-indigo-300/20 transition-all duration-300 hover:shadow-lg hover:bg-white/8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Code className="h-5 w-5 text-indigo-300" />
          Tech Stack Overlap
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {sortedLanguages.map(([language, [count1, count2]]) => (
            <div key={language} className="space-y-2 transition-transform duration-200 transform hover:translate-x-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">{language}</span>
                <span className="text-xs bg-indigo-900/40 px-2 py-1 rounded-full text-indigo-300 border border-indigo-500/20">
                  {String(count1)} vs {String(count2)} repos
                </span>
              </div>
              <div className="flex gap-2 h-4">
                <div className="flex-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full transition-all duration-500 ease-out" 
                    style={{ width: `${getUserPercentage(0, language)}%` }}
                    title={`${users[0]?.name}: ${getUserPercentage(0, language)}%`}
                  />
                </div>
                <div className="flex-1 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="bg-pink-500 h-full transition-all duration-500 ease-out" 
                    style={{ width: `${getUserPercentage(1, language)}%` }}
                    title={`${users[1]?.name}: ${getUserPercentage(1, language)}%`}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-indigo-200">
                <span className="text-blue-300">{users[0]?.login}</span>
                <span className="text-pink-300">{users[1]?.login}</span>
              </div>
            </div>
          ))}

          {sortedLanguages.length === 0 && (
            <p className="text-center text-indigo-200 py-6 bg-indigo-900/20 rounded-lg border border-indigo-500/20">
              No language data available for comparison
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageOverlap;

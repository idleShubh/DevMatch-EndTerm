
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DeveloperProfile from "@/components/DeveloperProfile";
import CompatibilityScore from "@/components/CompatibilityScore";
import CompatibilityFactors from "@/components/CompatibilityFactors";
import LanguageOverlap from "@/components/LanguageOverlap";
import { ArrowLeft, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { GithubUser, CompatibilityData } from "@/types/github";

interface CompatibilityResultsProps {
  users: [GithubUser | null, GithubUser | null];
  compatibilityData: CompatibilityData;
  onReset: () => void;
}

const CompatibilityResults: React.FC<CompatibilityResultsProps> = ({ users, compatibilityData, onReset }) => {
  const handleShare = () => {
    const shareData = {
      title: `DevMatch Compatibility Analysis`,
      text: `Check out the compatibility analysis for ${users[0]?.login} and ${users[1]?.login} on DevMatch!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('Shared successfully!'))
        .catch((error) => toast.error('Could not share: ', error.message));
    } else {
      toast.error('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onReset} className="hover:bg-indigo-900/30 transition-colors duration-200">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Analyze New Match
        </Button>
        <Button 
          variant="secondary" 
          onClick={handleShare} 
          className="bg-indigo-800/50 text-white hover:bg-indigo-700/50 transition-all duration-200 border border-indigo-500/30"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Results
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {users.map((user, index) => (
          <DeveloperProfile 
            key={index} 
            user={user!} 
            position={index === 0 ? "left" : "right"} 
          />
        ))}
      </div>

      <CompatibilityScore 
        overallScore={compatibilityData.overallScore} 
        matchTags={compatibilityData.matchTags} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CompatibilityFactors factors={compatibilityData.factors} />
        <LanguageOverlap languageOverlap={compatibilityData.languageOverlap} users={users} />
      </div>
      
      <div className="text-center pt-2">
        <p className="text-indigo-300 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-300" />
          Based on GitHub data analysis and compatibility algorithms
          <Sparkles className="h-4 w-4 text-amber-300" />
        </p>
      </div>
    </div>
  );
};

export default CompatibilityResults;

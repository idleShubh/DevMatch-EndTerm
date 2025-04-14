
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CompatibilityFactor } from "@/types/github";
import { Info } from "lucide-react";

interface CompatibilityFactorsProps {
  factors: CompatibilityFactor[];
}

const CompatibilityFactors: React.FC<CompatibilityFactorsProps> = ({ factors }) => {
  // Get progress color based on score
  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 75) return "bg-indigo-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-pink-500";
  };

  return (
    <Card className="bg-white/5 border-indigo-300/20 transition-all duration-300 hover:shadow-lg hover:bg-white/8">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Info className="h-5 w-5 text-indigo-300" />
          Compatibility Factors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {factors.map((factor, index) => (
          <div key={factor.name} className="space-y-2 transition-transform duration-200 transform hover:translate-x-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{factor.icon}</span>
                <h3 className="font-medium text-white">{factor.name}</h3>
              </div>
              <span className={`font-mono ${factor.score >= 75 ? 'text-emerald-300' : factor.score >= 60 ? 'text-indigo-300' : factor.score >= 40 ? 'text-amber-300' : 'text-pink-300'} transition-colors duration-300`}>
                {factor.score}%
              </span>
            </div>
            
            <Progress 
              value={factor.score} 
              className={`h-2 bg-gray-700 transition-all duration-300`}
              style={{
                '--progress-background': getProgressColor(factor.score),
              } as React.CSSProperties}
            />
            
            <p className="text-sm text-indigo-200 leading-relaxed">{factor.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CompatibilityFactors;

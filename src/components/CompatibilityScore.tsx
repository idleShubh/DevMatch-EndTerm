
import { CircleProgress } from "./CircleProgress";
import { Sparkles, Heart } from "lucide-react";

interface CompatibilityScoreProps {
  overallScore: number; // Changed from score to overallScore
  matchTags: string[];
}

const CompatibilityScore = ({ overallScore, matchTags }: CompatibilityScoreProps) => {
  // Determine the message based on the score
  const getMessage = () => {
    if (overallScore >= 90) return "Perfect Match!";
    if (overallScore >= 75) return "Great Match!";
    if (overallScore >= 60) return "Good Match";
    if (overallScore >= 40) return "Potential Match";
    return "Keep Looking";
  };

  // Determine color based on score
  const getScoreColor = () => {
    if (overallScore >= 90) return "text-emerald-300";
    if (overallScore >= 75) return "text-indigo-300";
    if (overallScore >= 60) return "text-blue-300";
    if (overallScore >= 40) return "text-amber-300";
    return "text-pink-300";
  };
  
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-indigo-300/20 rounded-xl p-8 text-center transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
        <Sparkles className="w-6 h-6 mr-2 text-indigo-300" />
        Compatibility Score
        <Sparkles className="w-6 h-6 ml-2 text-indigo-300" />
      </h2>
      
      <div className="flex flex-col items-center justify-center">
        <div className="w-44 h-44 relative mb-6">
          <CircleProgress value={overallScore} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className={`text-4xl font-bold ${getScoreColor()} transition-colors duration-300`}>
                {overallScore}%
              </div>
            </div>
          </div>
        </div>
        
        <h3 className={`text-2xl font-semibold ${getScoreColor()} mb-1 flex items-center justify-center gap-2 transition-colors duration-300`}>
          <Heart className="h-5 w-5" />
          {getMessage()}
          <Heart className="h-5 w-5" />
        </h3>
        
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {matchTags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-700/50 text-indigo-100 border border-indigo-500/30 shadow-sm transition-all duration-200 hover:bg-indigo-600/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompatibilityScore;

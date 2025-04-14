
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Github, Loader2, HeartHandshake, Sparkles, Link } from "lucide-react";

interface GithubInputFormProps {
  onSubmit: (username1: string, username2: string) => void;
  isLoading: boolean;
}

const GithubInputForm = ({ onSubmit, isLoading }: GithubInputFormProps) => {
  const [username1, setUsername1] = useState("");
  const [username2, setUsername2] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username1.trim(), username2.trim());
  };

  return (
    <Card className="p-8 max-w-xl mx-auto bg-white/10 backdrop-blur-sm border border-indigo-300/20 rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <HeartHandshake className="w-20 h-20 mx-auto text-indigo-400 mb-6" />
          <Sparkles className="w-8 h-8 text-amber-300 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
          GitHub Compatibility Checker
        </h2>
        <p className="text-indigo-200 text-lg max-w-md mx-auto">
          Enter two GitHub usernames or profile URLs to discover your perfect coding match.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="space-y-5">
          <div>
            <label htmlFor="username1" className="block text-sm font-medium text-indigo-200 mb-2">
              First Developer
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Github className="h-5 w-5 text-indigo-300" />
              </div>
              <Input
                id="username1"
                type="text"
                placeholder="Username or GitHub profile URL"
                value={username1}
                onChange={(e) => setUsername1(e.target.value)}
                className="pl-10 bg-white/5 border-indigo-300/30 text-white placeholder:text-indigo-300/50 transition-all duration-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                disabled={isLoading}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-300/70 pointer-events-none">
                <Link className="h-4 w-4" />
              </div>
            </div>
            <p className="text-indigo-300/70 text-xs mt-1">Example: idleshubh or https://github.com/idleshubh</p>
          </div>
          
          <div>
            <label htmlFor="username2" className="block text-sm font-medium text-indigo-200 mb-2">
              Second Developer
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Github className="h-5 w-5 text-indigo-300" />
              </div>
              <Input
                id="username2"
                type="text"
                placeholder="Username or GitHub profile URL"
                value={username2}
                onChange={(e) => setUsername2(e.target.value)}
                className="pl-10 bg-white/5 border-indigo-300/30 text-white placeholder:text-indigo-300/50 transition-all duration-200 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                disabled={isLoading}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-300/70 pointer-events-none">
                <Link className="h-4 w-4" />
              </div>
            </div>
            <p className="text-indigo-300/70 text-xs mt-1">Example: idleshubh or https://github.com/idleshubh</p>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-indigo-600"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing compatibility...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Check Compatibility
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-5 text-xs text-center text-indigo-300/70">
        Note: DevMatch only uses public GitHub data for analysis
      </div>
    </Card>
  );
};

export default GithubInputForm;

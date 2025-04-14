
import { Card, CardContent } from "@/components/ui/card";
import { GithubUser } from "@/types/github";
import { ExternalLink, Users, Code, Calendar, Github } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface DeveloperProfileProps {
  user: GithubUser;
  position?: "left" | "right"; // Make position optional with the ? modifier
}

const DeveloperProfile = ({ user, position }: DeveloperProfileProps) => {
  const githubJoinDate = new Date(user.created_at);
  const timeOnGithub = formatDistanceToNow(githubJoinDate, { addSuffix: true });
  
  return (
    <Card className={`bg-white/10 backdrop-blur-sm border border-indigo-300/20 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400/30
      ${position === "left" ? "transform-gpu md:rotate-[-1deg] hover:rotate-0" : "transform-gpu md:rotate-[1deg] hover:rotate-0"}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={user.avatar_url} 
              alt={`${user.name}'s avatar`}
              className="w-20 h-20 rounded-full border-2 border-indigo-400 transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1">
              <Github className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white truncate">{user.name}</h3>
            <a 
              href={user.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-300 text-sm flex items-center hover:text-indigo-200 transition-colors duration-200"
            >
              @{user.login}
              <ExternalLink className="ml-1 w-3 h-3" />
            </a>
          </div>
        </div>
        
        {user.bio && (
          <p className="text-indigo-100 mt-4 text-sm leading-relaxed line-clamp-2 bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/20">
            {user.bio}
          </p>
        )}
        
        <div className="grid grid-cols-3 gap-2 mt-5">
          <div className="flex flex-col items-center bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/20 transition-all duration-200 hover:bg-indigo-900/40 hover:border-indigo-500/30">
            <Code className="h-4 w-4 text-indigo-300 mb-1" />
            <span className="text-white font-semibold">{user.public_repos}</span>
            <span className="text-indigo-300 text-xs">Repos</span>
          </div>
          
          <div className="flex flex-col items-center bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/20 transition-all duration-200 hover:bg-indigo-900/40 hover:border-indigo-500/30">
            <Users className="h-4 w-4 text-indigo-300 mb-1" />
            <span className="text-white font-semibold">{user.followers}</span>
            <span className="text-indigo-300 text-xs">Followers</span>
          </div>
          
          <div className="flex flex-col items-center bg-indigo-900/30 p-3 rounded-lg border border-indigo-500/20 transition-all duration-200 hover:bg-indigo-900/40 hover:border-indigo-500/30">
            <Calendar className="h-4 w-4 text-indigo-300 mb-1" />
            <span className="text-white font-semibold">{timeOnGithub.includes("about") ? timeOnGithub.replace("about ", "") : timeOnGithub}</span>
            <span className="text-indigo-300 text-xs">Joined</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperProfile;


import { useState } from "react";
import DevMatchHeader from "@/components/DevMatchHeader";
import GithubInputForm from "@/components/GithubInputForm";
import CompatibilityResults from "@/components/CompatibilityResults";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { GithubUser, CompatibilityData } from "@/types/github";
import { calculateCompatibility } from "@/utils/compatibilityCalculator";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<[GithubUser | null, GithubUser | null]>([null, null]);
  const [compatibilityData, setCompatibilityData] = useState<CompatibilityData | null>(null);

  // Extract username from GitHub URL or return the username directly
  const extractUsername = (input: string): string => {
    // Check if the input is a GitHub URL
    const githubUrlRegex = /github\.com\/([^\/\s]+)/;
    const match = input.match(githubUrlRegex);
    
    // If it's a URL, return the extracted username, otherwise return the input as is
    return match ? match[1] : input;
  };

  const fetchGithubUser = async (input: string): Promise<GithubUser | null> => {
    try {
      const username = extractUsername(input);
      
      // Add a toast notification to show which username we're fetching
      toast.info(`Fetching ${username}'s GitHub data...`, { id: `fetch-${username}`, duration: 2000 });
      
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Please try again later.");
        }
        throw new Error(`GitHub user not found: ${username}`);
      }
      
      const userData = await response.json();
      
      // Fetch additional repos data
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      
      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Please try again later.");
        }
        throw new Error(`Could not fetch repositories for ${username}`);
      }
      
      const reposData = await reposResponse.json();
      
      return {
        login: userData.login,
        name: userData.name || userData.login,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        bio: userData.bio || "",
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        repos: reposData,
      };
    } catch (error) {
      console.error("Error fetching GitHub user:", error);
      
      // Show a more user-friendly error message
      if (error instanceof Error) {
        toast.error(error.message);
      }
      
      return null;
    }
  };

  const handleSubmit = async (username1: string, username2: string) => {
    if (!username1 || !username2) {
      toast.error("Please enter both GitHub usernames");
      return;
    }

    // Compare extracted usernames to check if they're the same
    const extractedUsername1 = extractUsername(username1);
    const extractedUsername2 = extractUsername(username2);
    
    if (extractedUsername1 === extractedUsername2) {
      toast.error("Please enter two different GitHub profiles");
      return;
    }

    setIsLoading(true);
    setCompatibilityData(null);

    try {
      toast.info("Finding developers...", { duration: 2000 });
      
      const [user1, user2] = await Promise.all([
        fetchGithubUser(username1),
        fetchGithubUser(username2)
      ]);

      if (!user1 || !user2) {
        throw new Error("Could not fetch one or both users");
      }

      setUsers([user1, user2]);
      
      // Show calculating toast
      toast.info("Analyzing compatibility...", { duration: 2000 });
      
      // Calculate compatibility
      const compatibility = calculateCompatibility(user1, user2);
      setCompatibilityData(compatibility);
      
      toast.success("Match analysis complete!");
    } catch (error) {
      console.error("Error in submission:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze compatibility");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setUsers([null, null]);
    setCompatibilityData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-indigo-950 to-purple-950">
      <div className="container mx-auto px-4 py-10 flex-grow">
        <DevMatchHeader />
        
        <main className="mt-12 max-w-6xl mx-auto">
          {!compatibilityData ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <GithubInputForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading} 
              />
            </div>
          ) : (
            <CompatibilityResults 
              users={users} 
              compatibilityData={compatibilityData}
              onReset={resetForm}
            />
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

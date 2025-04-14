
export interface GithubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  created_at: string;
  updated_at: string;
}

export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  repos: GithubRepo[];
}

export interface CompatibilityFactor {
  name: string;
  score: number;
  description: string;
  icon: string;
}

export interface CompatibilityData {
  overallScore: number;
  factors: CompatibilityFactor[];
  matchTags: string[];
  languageOverlap: {
    [key: string]: [number, number]; // [user1Count, user2Count]
  };
}

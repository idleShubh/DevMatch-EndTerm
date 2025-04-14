
import { GithubUser, CompatibilityData } from "@/types/github";

export const calculateCompatibility = (user1: GithubUser, user2: GithubUser): CompatibilityData => {
  // Calculate language overlap
  const languageOverlap = getLanguageOverlap(user1, user2);
  
  // Calculate various compatibility factors
  const techStackFactor = calculateTechStackFactor(languageOverlap);
  const activityPatternFactor = calculateActivityPatternFactor(user1, user2);
  const repoSizeFactor = calculateRepoSizeFactor(user1, user2);
  const collaborationStyleFactor = calculateCollaborationStyleFactor(user1, user2);
  const communityFactor = calculateCommunityFactor(user1, user2);

  // Calculate overall score (weighted average)
  const factors = [
    {
      name: "Tech Stack Compatibility",
      score: techStackFactor.score,
      description: techStackFactor.description,
      icon: "💻"
    },
    {
      name: "Activity Pattern",
      score: activityPatternFactor.score,
      description: activityPatternFactor.description,
      icon: "⏱️"
    },
    {
      name: "Project Scope Alignment",
      score: repoSizeFactor.score,
      description: repoSizeFactor.description,
      icon: "📊"
    },
    {
      name: "Collaboration Style",
      score: collaborationStyleFactor.score,
      description: collaborationStyleFactor.description,
      icon: "🤝"
    },
    {
      name: "Community Engagement",
      score: communityFactor.score,
      description: communityFactor.description,
      icon: "👥"
    }
  ];
  
  // Calculate weighted score
  const weights = [0.3, 0.2, 0.15, 0.2, 0.15];
  const overallScore = Math.round(
    factors.reduce((sum, factor, index) => sum + factor.score * weights[index], 0)
  );
  
  // Generate match tags based on factors and score
  const matchTags = generateMatchTags(factors, overallScore, user1, user2);
  
  return {
    overallScore,
    factors,
    matchTags,
    languageOverlap
  };
};

const getLanguageOverlap = (user1: GithubUser, user2: GithubUser) => {
  const languages: {[key: string]: [number, number]} = {};
  
  // Count languages for user1
  user1.repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = languages[repo.language] || [0, 0];
      languages[repo.language][0]++;
    }
  });
  
  // Count languages for user2
  user2.repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = languages[repo.language] || [0, 0];
      languages[repo.language][1]++;
    }
  });
  
  return languages;
};

const calculateTechStackFactor = (languageOverlap: {[key: string]: [number, number]}) => {
  // Count shared languages
  const sharedLanguages = Object.values(languageOverlap).filter(([count1, count2]) => count1 > 0 && count2 > 0).length;
  const totalLanguages = Object.keys(languageOverlap).length;
  
  // Calculate overlap percentage
  const overlapPercentage = totalLanguages > 0 ? Math.round((sharedLanguages / totalLanguages) * 100) : 0;
  
  // Get the most common shared language
  let mostCommonShared = "";
  let maxSharedCount = 0;
  
  Object.entries(languageOverlap).forEach(([language, [count1, count2]]) => {
    if (count1 > 0 && count2 > 0 && count1 + count2 > maxSharedCount) {
      maxSharedCount = count1 + count2;
      mostCommonShared = language;
    }
  });
  
  // Generate description
  let description = "";
  if (overlapPercentage >= 70) {
    description = `Excellent tech stack alignment! You both work with many of the same languages${mostCommonShared ? `, especially ${mostCommonShared}` : ''}.`;
  } else if (overlapPercentage >= 40) {
    description = `Good overlap in programming languages${mostCommonShared ? ` with a shared focus on ${mostCommonShared}` : ''}.`;
  } else if (overlapPercentage > 0) {
    description = `Limited tech stack overlap, but you share experience with ${mostCommonShared || 'a few languages'}.`;
  } else {
    description = "Your tech stacks are completely different, which could bring diverse perspectives.";
  }
  
  return {
    score: Math.max(30, overlapPercentage), // Minimum 30% score to avoid too low scores
    description
  };
};

const calculateActivityPatternFactor = (user1: GithubUser, user2: GithubUser) => {
  // Compare account age
  const user1Age = new Date().getTime() - new Date(user1.created_at).getTime();
  const user2Age = new Date().getTime() - new Date(user2.created_at).getTime();
  const ageDifference = Math.abs(user1Age - user2Age) / (1000 * 60 * 60 * 24 * 365); // difference in years
  
  // Compare activity level using recent repo updates
  const getLastYearUpdates = (user: GithubUser) => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    return user.repos.filter(repo => {
      const updateDate = new Date(repo.updated_at);
      return updateDate > oneYearAgo;
    }).length;
  };
  
  const user1Activity = getLastYearUpdates(user1);
  const user2Activity = getLastYearUpdates(user2);
  const activityRatio = Math.min(user1Activity, user2Activity) / Math.max(user1Activity, user2Activity) || 0;
  
  // Calculate score
  let score = 100;
  
  // Reduce score based on age difference (up to 30 points)
  score -= Math.min(30, ageDifference * 10);
  
  // Reduce score based on activity difference (up to 40 points)
  score -= Math.min(40, (1 - activityRatio) * 40);
  
  // Ensure minimum score
  score = Math.max(40, score);
  
  // Generate description
  let description = "";
  if (score >= 80) {
    description = "You both have similar GitHub activity patterns and experience levels.";
  } else if (score >= 60) {
    description = "Your GitHub activity rhythms are somewhat aligned, though with some differences.";
  } else {
    description = "Your GitHub activity patterns differ significantly, which may require adjusting expectations.";
  }
  
  return {
    score: Math.round(score),
    description
  };
};

const calculateRepoSizeFactor = (user1: GithubUser, user2: GithubUser) => {
  // Compare average repo size based on stars as a proxy for project complexity/scope
  const getAverageStars = (user: GithubUser) => {
    if (user.repos.length === 0) return 0;
    const totalStars = user.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    return totalStars / user.repos.length;
  };
  
  const user1AvgStars = getAverageStars(user1);
  const user2AvgStars = getAverageStars(user2);
  
  // Calculate the ratio of the smaller to the larger (for comparison)
  const maxAvgStars = Math.max(user1AvgStars, user2AvgStars);
  const minAvgStars = Math.min(user1AvgStars, user2AvgStars);
  const starRatio = maxAvgStars > 0 ? minAvgStars / maxAvgStars : 1;
  
  // Calculate score
  const score = Math.round(40 + starRatio * 60); // Scaled to 40-100 range
  
  // Generate description
  let description = "";
  if (score >= 80) {
    description = "You both tend to work on similar-sized projects based on GitHub stars.";
  } else if (score >= 60) {
    description = "There's some difference in the project sizes you typically work on.";
  } else {
    description = "You tend to work on projects of different scales and complexity.";
  }
  
  return {
    score,
    description
  };
};

const calculateCollaborationStyleFactor = (user1: GithubUser, user2: GithubUser) => {
  // Analyze forks as a proxy for collaboration style
  const getForkRatio = (user: GithubUser) => {
    if (user.repos.length === 0) return 0;
    const forkCount = user.repos.filter(repo => repo.fork).length;
    return forkCount / user.repos.length;
  };
  
  const user1ForkRatio = getForkRatio(user1);
  const user2ForkRatio = getForkRatio(user2);
  
  // Calculate the difference in fork ratios
  const forkRatioDifference = Math.abs(user1ForkRatio - user2ForkRatio);
  
  // Calculate score (100 for identical, lower for differences)
  const score = Math.round(100 - (forkRatioDifference * 100));
  
  // Generate description
  let description = "";
  if (user1ForkRatio > 0.5 && user2ForkRatio > 0.5) {
    description = "You both actively contribute to existing projects, suggesting a collaborative style.";
  } else if (user1ForkRatio < 0.3 && user2ForkRatio < 0.3) {
    description = "You both prefer creating original projects rather than contributing to existing ones.";
  } else {
    description = "You have different approaches to collaboration vs. original work.";
  }
  
  return {
    score,
    description
  };
};

const calculateCommunityFactor = (user1: GithubUser, user2: GithubUser) => {
  // Compare follower-to-following ratios as a proxy for community engagement style
  const getFollowerRatio = (user: GithubUser) => {
    if (user.following === 0) return user.followers > 0 ? 2 : 1; // Avoid division by zero
    return user.followers / user.following;
  };
  
  const user1Ratio = getFollowerRatio(user1);
  const user2Ratio = getFollowerRatio(user2);
  
  // Calculate how similar their ratios are
  const maxRatio = Math.max(user1Ratio, user2Ratio);
  const minRatio = Math.min(user1Ratio, user2Ratio);
  const ratioSimilarity = minRatio / maxRatio;
  
  // Calculate score
  const score = Math.round(40 + (ratioSimilarity * 60)); // Scale to 40-100
  
  // Generate description
  let description = "";
  if (user1Ratio > 1.5 && user2Ratio > 1.5) {
    description = "You're both community leaders with more followers than people you follow.";
  } else if (user1Ratio < 0.7 && user2Ratio < 0.7) {
    description = "You both actively follow others, suggesting you're community-focused learners.";
  } else if (ratioSimilarity > 0.7) {
    description = "You have similar approaches to community engagement on GitHub.";
  } else {
    description = "You engage with the GitHub community in different ways.";
  }
  
  return {
    score,
    description
  };
};

const generateMatchTags = (
  factors: { name: string; score: number; description: string; icon: string }[],
  overallScore: number,
  user1: GithubUser,
  user2: GithubUser
): string[] => {
  const tags: string[] = [];
  
  // Overall score tags
  if (overallScore >= 85) tags.push("🔥 Dream Team");
  else if (overallScore >= 75) tags.push("✨ Great Match");
  else if (overallScore >= 60) tags.push("👍 Solid Match");
  
  // Tech stack tags
  const techFactor = factors.find(f => f.name === "Tech Stack Compatibility");
  if (techFactor && techFactor.score >= 80) tags.push("🧩 Tech Stack Aligned");
  
  // Activity pattern tags
  const activityFactor = factors.find(f => f.name === "Activity Pattern");
  if (activityFactor && activityFactor.score >= 75) tags.push("⏱️ In Sync");
  
  // Special case tags
  const user1RepoCount = user1.public_repos;
  const user2RepoCount = user2.public_repos;
  const totalRepos = user1RepoCount + user2RepoCount;
  
  if (totalRepos > 50) tags.push("🏆 Experienced Duo");
  if (totalRepos > 100) tags.push("🚀 Power Coders");
  
  // If one user has many more followers, they might be a mentor
  if (user1.followers > user2.followers * 5 && user1.followers > 100) {
    tags.push("🧠 Mentor-Mentee");
  } else if (user2.followers > user1.followers * 5 && user2.followers > 100) {
    tags.push("🧠 Mentor-Mentee");
  }
  
  // Check for complementary skills
  const languageSet1 = new Set(user1.repos.map(repo => repo.language).filter(Boolean));
  const languageSet2 = new Set(user2.repos.map(repo => repo.language).filter(Boolean));
  
  let uniqueToUser1 = 0;
  let uniqueToUser2 = 0;
  
  languageSet1.forEach(lang => {
    if (!languageSet2.has(lang)) uniqueToUser1++;
  });
  
  languageSet2.forEach(lang => {
    if (!languageSet1.has(lang)) uniqueToUser2++;
  });
  
  if (uniqueToUser1 >= 3 && uniqueToUser2 >= 3) {
    tags.push("💡 Complementary Skills");
  }
  
  // Add hackathon tag if both are active
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  const user1RecentActivity = user1.repos.some(repo => new Date(repo.updated_at) > oneMonthAgo);
  const user2RecentActivity = user2.repos.some(repo => new Date(repo.updated_at) > oneMonthAgo);
  
  if (user1RecentActivity && user2RecentActivity && overallScore >= 65) {
    tags.push("⚡ Hackathon Ready");
  }
  
  // Limit to max 4 tags
  return tags.slice(0, 4);
};

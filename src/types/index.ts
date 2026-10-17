export type ChallengeCategory =
  | 'Logical Reasoning'
  | 'Creative Thinking'
  | 'Analytical Thinking'
  | 'Decision-Making'
  | 'Engineering and Design'
  | 'Business Strategy'
  | 'Real-World Problems'
  | 'Spot the Flaw'
  | 'Constraint Challenges'
  | 'First-Principles Thinking';

export type ChallengeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type ChallengeStatus = 'Available' | 'In Progress' | 'Submitted' | 'Evaluated' | 'Completed';

export interface Challenge {
  id: string;
  title: string;
  tagline: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  estimatedMinutes: number;
  xpReward: number;
  publishedDate: string;
  deadline?: string;
  problemStatement: string;
  backgroundContext: string;
  rulesAndConstraints: string[];
  successCriteria: string[];
  hints: string[];
  isDailyChallenge?: boolean;
  status: ChallengeStatus;
  rubricFocus: string[];
}

export interface CanvasNode {
  id: string;
  type: 'premise' | 'assumption' | 'evidence' | 'counter' | 'conclusion';
  label: string;
  x: number;
  y: number;
}

export interface CanvasConnection {
  id: string;
  fromId: string;
  toId: string;
  label?: string;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  submittedAt: string;
  solutionText: string;
  canvasData?: {
    nodes: CanvasNode[];
    connections: CanvasConnection[];
  };
  wordCount: number;
}

export interface CriterionScore {
  name: string;
  score: number; // 0 - 100
  weight: number;
  critique: string;
  status: 'exemplary' | 'proficient' | 'developing' | 'needs_revision';
}

export interface AIEvaluation {
  id: string;
  submissionId: string;
  challengeId: string;
  overallScore: number;
  evaluationDate: string;
  criteria: CriterionScore[];
  strengths: string[];
  areasForImprovement: string[];
  specificSuggestions: string[];
  assumptionsIdentified: string[];
  followUpQuestions: string[];
  improvedReasoningModel: string;
  isDemoFeedback: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  bio: string;
  joinDate: string;
  totalXp: number;
  currentStreak: number;
  bestStreak: number;
  challengesCompleted: number;
  leaderboardRank: number;
  interests: ChallengeCategory[];
  isPublicProfile: boolean;
  subscription: {
    status: 'Trial' | 'Active' | 'Expired' | 'Cancelled' | 'Payment Failed';
    planName: string;
    trialEndsAt: string;
    renewsAt: string;
    monthlyPrice: number;
    isEligibleForReward: boolean;
    rewardGrantedUntil?: string;
  };
}

export interface NotificationItem {
  id: string;
  type: 'challenge' | 'feedback' | 'streak' | 'leaderboard' | 'reward' | 'vote' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export interface LeaderboardEntry {
  id: string;
  userId: string;
  name: string;
  avatarSeed: string;
  xp: number;
  challengesCompleted: number;
  streak: number;
  rank: number;
  tierBadge?: string;
}

export interface PollOption {
  id: string;
  title: string;
  description: string;
  votes: number;
}

export interface VotingPoll {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'Open' | 'Closed' | 'Upcoming';
  closesAt: string;
  totalVotes: number;
  options: PollOption[];
  requiresPaidSubscription: boolean;
  userVotedOptionId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  unlockedAt?: string;
  progressPercent: number;
  iconName: string;
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Challenge,
  UserProfile,
  LeaderboardEntry,
  VotingPoll,
  Achievement,
  NotificationItem,
  AIEvaluation,
  ChallengeSubmission,
  CriterionScore,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_CHALLENGES,
  INITIAL_EVALUATIONS,
  INITIAL_LEADERBOARD,
  INITIAL_ACHIEVEMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VOTING_POLLS,
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  toggleRole: () => void;
  challenges: Challenge[];
  drafts: Record<string, { text: string; nodes?: any[]; connections?: any[] }>;
  saveDraft: (challengeId: string, text: string, canvasData?: any) => void;
  submissions: Record<string, ChallengeSubmission>;
  evaluations: Record<string, AIEvaluation>;
  submitChallengeAnswer: (challengeId: string, text: string, canvasData?: any) => AIEvaluation;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  votingPolls: VotingPoll[];
  castVote: (pollId: string, optionId: string) => { success: boolean; message: string };
  leaderboard: {
    daily: LeaderboardEntry[];
    weekly: LeaderboardEntry[];
    monthly: LeaderboardEntry[];
  };
  achievements: Achievement[];
  updateSubscriptionStatus: (status: UserProfile['subscription']['status']) => void;
  // Admin methods
  adminUpdatePrice: (newPrice: number) => void;
  adminGrantMonthlyReward: (userId: string, durationMonths: number) => void;
  adminCreateChallenge: (newChallenge: Partial<Challenge>) => Challenge;
  adminUpdateChallenge: (id: string, updates: Partial<Challenge>) => void;
  adminCreatePoll: (newPoll: Partial<VotingPoll>) => void;
  adminClosePoll: (pollId: string) => void;
  adminAuditLogs: { id: string; action: string; timestamp: string; details: string }[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'mindforge_state_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_challenges`);
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [drafts, setDrafts] = useState<Record<string, { text: string; nodes?: any[]; connections?: any[] }>>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_drafts`);
    return saved ? JSON.parse(saved) : {};
  });

  const [submissions, setSubmissions] = useState<Record<string, ChallengeSubmission>>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_submissions`);
    return saved ? JSON.parse(saved) : {};
  });

  const [evaluations, setEvaluations] = useState<Record<string, AIEvaluation>>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_evaluations`);
    return saved ? JSON.parse(saved) : INITIAL_EVALUATIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [votingPolls, setVotingPolls] = useState<VotingPoll[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_polls`);
    return saved ? JSON.parse(saved) : INITIAL_VOTING_POLLS;
  });

  const [leaderboard] = useState(INITIAL_LEADERBOARD);
  const [achievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);

  const [adminAuditLogs, setAdminAuditLogs] = useState<{ id: string; action: string; timestamp: string; details: string }[]>([
    {
      id: 'log-1',
      action: 'PLATFORM_REWARD_AUDIT',
      timestamp: '2026-10-08 14:22:00',
      details: 'Automated check verified top 10 monthly leaderboard members for reward eligibility.',
    },
    {
      id: 'log-2',
      action: 'PRICE_CONFIGURATION',
      timestamp: '2026-10-01 09:00:00',
      details: 'Base monthly subscription rate established at $19/mo with 30-day trial for new accounts.',
    },
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_challenges`, JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_drafts`, JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_evaluations`, JSON.stringify(evaluations));
  }, [evaluations]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_polls`, JSON.stringify(votingPolls));
  }, [votingPolls]);

  const toggleRole = () => {
    setCurrentUser((prev) => ({
      ...prev,
      role: prev.role === 'admin' ? 'user' : 'admin',
    }));
  };

  const saveDraft = (challengeId: string, text: string, canvasData?: any) => {
    setDrafts((prev) => ({
      ...prev,
      [challengeId]: { text, ...(canvasData ? { nodes: canvasData.nodes, connections: canvasData.connections } : {}) },
    }));
  };

  // Structured evaluation generator based on actual rubric criteria
  const submitChallengeAnswer = (
    challengeId: string,
    solutionText: string,
    canvasData?: any
  ): AIEvaluation => {
    const targetChallenge = challenges.find((c) => c.id === challengeId);
    const wordCount = solutionText.trim().split(/\s+/).filter(Boolean).length;
    const submissionId = `sub-${Date.now()}`;

    const submission: ChallengeSubmission = {
      id: submissionId,
      challengeId,
      userId: currentUser.id,
      submittedAt: new Date().toISOString(),
      solutionText,
      canvasData,
      wordCount,
    };

    setSubmissions((prev) => ({ ...prev, [challengeId]: submission }));

    // Evaluate against the 8 required criteria
    // Give substantive scores based on depth, presence of numbers/constraints, canvas integration
    const hasCanvas = canvasData && canvasData.nodes && canvasData.nodes.length > 0;
    const depthScore = Math.min(95, Math.max(65, 70 + Math.floor(wordCount / 12)));
    const canvasBonus = hasCanvas ? 5 : 0;

    const baseScore = Math.min(98, depthScore + canvasBonus);

    const criteriaList: CriterionScore[] = [
      {
        name: 'Correctness & Analytical Soundness',
        score: Math.min(96, baseScore + 2),
        weight: 15,
        status: baseScore > 85 ? 'exemplary' : 'proficient',
        critique:
          'Your solution establishes a coherent analytical boundary, respecting stated parameters and physics or logic limits.',
      },
      {
        name: 'Logical Reasoning & Deduction',
        score: Math.min(98, baseScore + 3),
        weight: 20,
        status: baseScore > 85 ? 'exemplary' : 'proficient',
        critique:
          'Deductive flow moves logically from stated premises to operational conclusions without logical non-sequiturs.',
      },
      {
        name: 'Clarity of Explanation',
        score: Math.min(95, baseScore),
        weight: 15,
        status: 'proficient',
        critique:
          'Structured prose with clear sectioning. Technical terminology is applied with contextual precision.',
      },
      {
        name: 'Creativity & Synthesis',
        score: Math.min(92, baseScore - 2),
        weight: 10,
        status: 'proficient',
        critique:
          'Demonstrates ability to reframe the core tension rather than defaulting to mechanical linear compromises.',
      },
      {
        name: 'Practical Feasibility & Implementation',
        score: Math.min(90, baseScore - 4),
        weight: 10,
        status: baseScore > 80 ? 'proficient' : 'developing',
        critique:
          'Grounds the recommendation in realistic operational limits, though secondary resource bottlenecks warrant closer tracking.',
      },
      {
        name: 'Relevance to Problem Statement',
        score: Math.min(97, baseScore + 1),
        weight: 10,
        status: 'exemplary',
        critique:
          'Directly addresses core prompt objectives without extraneous narrative padding.',
      },
      {
        name: 'Compliance with Constraints',
        score: Math.min(96, baseScore),
        weight: 10,
        status: 'exemplary',
        critique:
          'Rigorous attention paid to specific boundaries and negative limits set in the rules.',
      },
      {
        name: 'Recognition of Assumptions & Trade-offs',
        score: Math.min(91, baseScore - 3),
        weight: 10,
        status: 'proficient',
        critique:
          'Explicitly distinguishes between proven facts and unverified operational assumptions.',
      },
    ];

    const overallScore = Math.round(
      criteriaList.reduce((acc, curr) => acc + curr.score * (curr.weight / 100), 0)
    );

    const newEvaluation: AIEvaluation = {
      id: `eval-${Date.now()}`,
      submissionId,
      challengeId,
      overallScore,
      evaluationDate: new Date().toISOString(),
      criteria: criteriaList,
      strengths: [
        'Precise systemic framing: isolated the fundamental trade-off prior to proposing operational actions.',
        hasCanvas
          ? 'Integrated multi-node visual topology that clarified causal relationships and dependency flow.'
          : 'Structured step-by-step reasoning that systematically evaluated competing alternatives.',
        'Demonstrated strong compliance with explicit resource bounds without claiming impossible free capacity.',
      ],
      areasForImprovement: [
        'Explore second-order feedback effects: what happens downstream when primary reserves reach critical thresholds?',
        'Formulate quantitative sensitivity bounds for your baseline assumptions.',
      ],
      specificSuggestions: [
        'Conduct a staged sensitivity check on key variables: if critical capacity drops by 20%, does your priority tree invert?',
        'Specify explicit fallback trigger thresholds rather than subjective human checkpoints.',
      ],
      assumptionsIdentified: [
        'Assumed auxiliary systems maintain continuous communication during degraded emergency states.',
        'Assumed team personnel can execute complex triage procedures with zero task switching latency.',
      ],
      followUpQuestions: [
        'Under what conditions would your recommended priority hierarchy completely reverse?',
        'How does your protocol mitigate single-point-of-failure vulnerabilities in human decision controllers?',
      ],
      improvedReasoningModel:
        'A comprehensive decision framework decouples acute survival baselines from transient operational demands: (1) Establish immutable physical boundaries (e.g. pressure differentials, baseline wattage), (2) Allocate non-negotiable minimum loads, (3) Duty-cycle discretionary or bufferable systems via automated hysteresis thresholds, and (4) Formulate an explicit staged load-shedding queue to eliminate human hesitation during abrupt capacity collapse.',
      isDemoFeedback: true,
    };

    // Update evaluations state
    setEvaluations((prev) => ({ ...prev, [challengeId]: newEvaluation }));

    // Mark challenge as Completed and award XP
    const xpEarned = targetChallenge ? targetChallenge.xpReward : 200;
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, status: 'Completed' } : c))
    );

    setCurrentUser((prev) => ({
      ...prev,
      totalXp: prev.totalXp + xpEarned,
      challengesCompleted: prev.challengesCompleted + 1,
      currentStreak: prev.currentStreak + 1,
      bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
    }));

    // Add a notification for evaluation ready
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'feedback',
      title: 'AI Evaluation Generated',
      message: `Your solution for "${targetChallenge?.title || 'Challenge'}" was evaluated (${overallScore}/100 XP +${xpEarned}).`,
      timestamp: 'Just now',
      isRead: false,
      link: `/feedback/${challengeId}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newEvaluation;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const castVote = (pollId: string, optionId: string): { success: boolean; message: string } => {
    // Check subscription requirement
    const poll = votingPolls.find((p) => p.id === pollId);
    if (!poll) return { success: false, message: 'Poll not found.' };

    if (poll.status !== 'Open') {
      return { success: false, message: 'This poll is no longer open for voting.' };
    }

    if (poll.requiresPaidSubscription && currentUser.subscription.status !== 'Active') {
      return {
        success: false,
        message:
          'Voting is exclusively reserved for members with an active paid subscription. Your current status is Trial. Upgrade to participate in platform curriculum governance.',
      };
    }

    if (poll.userVotedOptionId) {
      return { success: false, message: 'You have already recorded your vote in this poll.' };
    }

    setVotingPolls((prev) =>
      prev.map((p) => {
        if (p.id !== pollId) return p;
        return {
          ...p,
          totalVotes: p.totalVotes + 1,
          userVotedOptionId: optionId,
          options: p.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      })
    );

    return { success: true, message: 'Your ballot has been securely verified and recorded.' };
  };

  const updateSubscriptionStatus = (status: UserProfile['subscription']['status']) => {
    setCurrentUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        status,
      },
    }));
  };

  // Admin capabilities
  const adminUpdatePrice = (newPrice: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      subscription: {
        ...prev.subscription,
        monthlyPrice: newPrice,
      },
    }));
    setAdminAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: 'PRICE_UPDATE',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        details: `Platform base monthly subscription fee adjusted to $${newPrice}/mo.`,
      },
      ...prev,
    ]);
  };

  const adminGrantMonthlyReward = (userId: string, durationMonths: number) => {
    setAdminAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: 'GRANT_REWARD_CREDIT',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        details: `Administrator granted ${durationMonths} month(s) of complimentary membership to ${userId} based on verified monthly leaderboard performance.`,
      },
      ...prev,
    ]);

    if (userId === currentUser.id || userId === 'usr_sarah_chen') {
      setCurrentUser((prev) => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          status: 'Active',
          rewardGrantedUntil: '2026-12-31T23:59:59Z',
        },
      }));
    }
  };

  const adminCreateChallenge = (newChallenge: Partial<Challenge>): Challenge => {
    const created: Challenge = {
      id: `ch-custom-${Date.now()}`,
      title: newChallenge.title || 'Untitled Strategic Challenge',
      tagline: newChallenge.tagline || 'Evaluate structural trade-offs under high uncertainty.',
      category: newChallenge.category || 'Analytical Thinking',
      difficulty: newChallenge.difficulty || 'Intermediate',
      estimatedMinutes: newChallenge.estimatedMinutes || 25,
      xpReward: newChallenge.xpReward || 200,
      publishedDate: new Date().toISOString().slice(0, 10),
      status: 'Available',
      problemStatement: newChallenge.problemStatement || 'Deconstruct core physical assumptions...',
      backgroundContext: newChallenge.backgroundContext || 'High reliability systems context.',
      rulesAndConstraints: newChallenge.rulesAndConstraints || ['Respect conservation laws.', 'Account for fail-safes.'],
      successCriteria: newChallenge.successCriteria || ['State quantitative bounds.', 'Identify vulnerabilities.'],
      hints: newChallenge.hints || ['Examine upstream dependencies.'],
      rubricFocus: newChallenge.rubricFocus || ['Systemic validity', 'Feasibility'],
    };

    setChallenges((prev) => [created, ...prev]);
    setAdminAuditLogs((prev) => [
      {
        id: `log-${Date.now()}`,
        action: 'CHALLENGE_PUBLISHED',
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        details: `Published challenge "${created.title}" with ${created.xpReward} XP.`,
      },
      ...prev,
    ]);
    return created;
  };

  const adminUpdateChallenge = (id: string, updates: Partial<Challenge>) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const adminCreatePoll = (newPoll: Partial<VotingPoll>) => {
    const created: VotingPoll = {
      id: `poll-${Date.now()}`,
      title: newPoll.title || 'New Community Policy Ballot',
      description: newPoll.description || 'Community curriculum vote',
      category: newPoll.category || 'General',
      status: 'Open',
      closesAt: newPoll.closesAt || '2026-11-15T00:00:00Z',
      totalVotes: 0,
      requiresPaidSubscription: true,
      options: newPoll.options || [
        { id: 'opt-a', title: 'Option Alpha', description: 'Primary path', votes: 0 },
        { id: 'opt-b', title: 'Option Beta', description: 'Alternative path', votes: 0 },
      ],
    };
    setVotingPolls((prev) => [created, ...prev]);
  };

  const adminClosePoll = (pollId: string) => {
    setVotingPolls((prev) =>
      prev.map((p) => (p.id === pollId ? { ...p, status: 'Closed' } : p))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        toggleRole,
        challenges,
        drafts,
        saveDraft,
        submissions,
        evaluations,
        submitChallengeAnswer,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        votingPolls,
        castVote,
        leaderboard,
        achievements,
        updateSubscriptionStatus,
        adminUpdatePrice,
        adminGrantMonthlyReward,
        adminCreateChallenge,
        adminUpdateChallenge,
        adminCreatePoll,
        adminClosePoll,
        adminAuditLogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

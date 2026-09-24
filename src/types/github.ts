export interface ContributionDay {
  date: string;
  count: number;
  color?: string;
  intensity: 0 | 1 | 2 | 3 | 4;
  weekday: number; // 0 = Sunday, 6 = Saturday
}

export interface ContributionWeek {
  firstDay: string;
  contributionDays: ContributionDay[];
}

export interface ContributionMonthHeader {
  name: string;
  firstWeekIndex: number;
}

export interface ContributionStreaks {
  currentStreak: number;
  longestStreak: number;
  mostActiveDay: {
    date: string;
    count: number;
  } | null;
}

export interface GitHubContributionData {
  success: boolean;
  username: string;
  totalContributions: number;
  weeks: ContributionWeek[];
  months: ContributionMonthHeader[];
  streaks: ContributionStreaks;
  error?: string;
}

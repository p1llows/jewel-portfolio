import {
  ContributionDay,
  ContributionWeek,
  ContributionMonthHeader,
  ContributionStreaks,
  GitHubContributionData,
} from "@/types/github";

const GITHUB_GRAPHQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          months {
            name
            firstDay
            totalWeeks
          }
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
              color
              weekday
            }
          }
        }
      }
    }
  }
`;

export async function fetchGitHubContributions(
  username: string = "p1llows"
): Promise<GitHubContributionData> {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Jewel-Ramirez-Portfolio",
        },
        body: JSON.stringify({
          query: GITHUB_GRAPHQL_QUERY,
          variables: { username },
        }),
        next: { revalidate: 3600 },
      });

      if (res.ok) {
        const json = await res.json();
        const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

        if (calendar) {
          return processCalendarData(username, calendar.totalContributions, calendar.weeks, calendar.months);
        }
      }
    } catch (err) {
      console.warn("GitHub GraphQL fetch warning:", err);
    }
  }

  // Fallback: Fetch directly from GitHub user contributions URL (server-side)
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const html = await res.text();
      return parseGitHubHtmlContributions(username, html);
    }
  } catch (err) {
    console.error("GitHub HTML fallback fetch error:", err);
  }

  return {
    success: false,
    username,
    totalContributions: 0,
    weeks: [],
    months: [],
    streaks: { currentStreak: 0, longestStreak: 0, mostActiveDay: null },
    error: "Unable to load GitHub activity.",
  };
}

function calculateIntensity(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 8) return 3;
  return 4;
}

function processCalendarData(
  username: string,
  totalContributions: number,
  rawWeeks: any[],
  rawMonths?: any[]
): GitHubContributionData {
  const weeks: ContributionWeek[] = [];
  const allDays: ContributionDay[] = [];

  rawWeeks.forEach((w: any) => {
    const days: ContributionDay[] = (w.contributionDays || []).map((d: any) => {
      const count = d.contributionCount ?? d.count ?? 0;
      const [year, month, dayNum] = (d.date || "").split("-").map(Number);
      const weekday = d.weekday ?? (year ? new Date(Date.UTC(year, month - 1, dayNum)).getUTCDay() : 0);

      const dayObj: ContributionDay = {
        date: d.date,
        count,
        color: d.color,
        intensity: calculateIntensity(count),
        weekday,
      };
      allDays.push(dayObj);
      return dayObj;
    });

    weeks.push({
      firstDay: w.firstDay || (days[0] ? days[0].date : ""),
      contributionDays: days,
    });
  });

  let months: ContributionMonthHeader[] = [];

  if (rawMonths && rawMonths.length > 0) {
    let accumulatedWeeks = 0;
    rawMonths.forEach((m: any, idx: number) => {
      // If the first month spans fewer than 2 weeks, skip rendering its label to prevent crowding with month 1
      if (idx === 0 && m.totalWeeks < 2 && rawMonths.length > 1) {
        accumulatedWeeks += m.totalWeeks;
        return;
      }

      months.push({
        name: m.name,
        firstWeekIndex: accumulatedWeeks,
      });

      accumulatedWeeks += m.totalWeeks;
    });
  } else {
    months = calculateMonthHeaders(weeks);
  }

  const streaks = calculateStreaks(allDays);

  return {
    success: true,
    username,
    totalContributions,
    weeks,
    months,
    streaks,
  };
}

function parseGitHubHtmlContributions(username: string, html: string): GitHubContributionData {
  const countMatch = html.match(/([\d,]+)\s+contributions\s+in/i);
  const totalContributions = countMatch ? parseInt(countMatch[1].replace(/,/g, ""), 10) : 0;

  const dayRegex = /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"[^>]*>/g;
  const days: ContributionDay[] = [];

  let match;
  while ((match = dayRegex.exec(html)) !== null) {
    const date = match[1];
    const level = parseInt(match[2], 10) as 0 | 1 | 2 | 3 | 4;

    const snippet = html.substring(match.index, match.index + 350);
    const tooltipMatch = snippet.match(/<tool-tip[^>]*>([^<]+)<\/tool-tip>/i);
    let count: number = level > 0 ? level : 0;

    if (tooltipMatch) {
      const text = tooltipMatch[1];
      if (text.toLowerCase().includes("no contribution")) {
        count = 0;
      } else {
        const numMatch = text.match(/([\d,]+)\s+contribution/i);
        if (numMatch) count = parseInt(numMatch[1].replace(/,/g, ""), 10);
      }
    }

    const [year, month, dayNum] = date.split("-").map(Number);
    const weekday = new Date(Date.UTC(year, month - 1, dayNum)).getUTCDay();

    days.push({
      date,
      count,
      intensity: calculateIntensity(count),
      weekday,
    });
  }

  const weeks: ContributionWeek[] = [];
  let currentWeekDays: ContributionDay[] = [];

  days.forEach((day) => {
    if (currentWeekDays.length > 0 && day.weekday === 0) {
      weeks.push({
        firstDay: currentWeekDays[0].date,
        contributionDays: currentWeekDays,
      });
      currentWeekDays = [];
    }
    currentWeekDays.push(day);
  });

  if (currentWeekDays.length > 0) {
    weeks.push({
      firstDay: currentWeekDays[0].date,
      contributionDays: currentWeekDays,
    });
  }

  const months = calculateMonthHeaders(weeks);
  const streaks = calculateStreaks(days);

  return {
    success: true,
    username,
    totalContributions: totalContributions || days.reduce((acc, d) => acc + d.count, 0),
    weeks,
    months,
    streaks,
  };
}

function calculateMonthHeaders(weeks: ContributionWeek[]): ContributionMonthHeader[] {
  const monthStarts: { name: string; firstWeekIndex: number }[] = [];
  let lastMonthStr = "";

  weeks.forEach((week, weekIdx) => {
    if (!week.contributionDays || week.contributionDays.length === 0) return;

    // Find first day in week or day matching -01
    const targetDay = week.contributionDays.find((d) => d.date && d.date.endsWith("-01")) || week.contributionDays[0];
    if (!targetDay || !targetDay.date) return;

    const parts = targetDay.date.split("-");
    if (parts.length < 2) return;
    const monthStr = parts[1];

    if (monthStr !== lastMonthStr) {
      const monthIdx = parseInt(monthStr, 10) - 1;
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      monthStarts.push({
        name: monthNames[monthIdx],
        firstWeekIndex: weekIdx,
      });
      lastMonthStr = monthStr;
    }
  });

  // Filter out headers that are too close together
  const filteredMonths: ContributionMonthHeader[] = [];
  monthStarts.forEach((m, idx) => {
    const nextMonth = monthStarts[idx + 1];

    // If first month has < 2 weeks before next month starts, skip it
    if (idx === 0 && nextMonth && nextMonth.firstWeekIndex - m.firstWeekIndex < 2) {
      return;
    }

    const lastKept = filteredMonths[filteredMonths.length - 1];
    if (!lastKept || m.firstWeekIndex - lastKept.firstWeekIndex >= 2) {
      filteredMonths.push(m);
    }
  });

  return filteredMonths;
}

function calculateStreaks(days: ContributionDay[]): ContributionStreaks {
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;
  let mostActiveDay: { date: string; count: number } | null = null;

  for (const day of days) {
    if (day.count > 0) {
      tempStreak += 1;
      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }

    if (mostActiveDay === null || day.count > mostActiveDay.count) {
      mostActiveDay = { date: day.date, count: day.count };
    }
  }

  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      currentStreak += 1;
    } else {
      if (i === days.length - 1) continue;
      break;
    }
  }

  return {
    currentStreak,
    longestStreak,
    mostActiveDay: mostActiveDay !== null && (mostActiveDay as { date: string; count: number }).count > 0 ? mostActiveDay : null,
  };
}

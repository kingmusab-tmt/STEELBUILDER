import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "achievements.json");

interface Achievement {
  id: string;
  number: number;
  label: string;
  order: number;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "1", number: 600, label: "Completed projects", order: 1 },
  { id: "2", number: 190, label: "Customers and partners", order: 2 },
  { id: "3", number: 800, label: "Employees", order: 3 },
  { id: "4", number: 9, label: "Years of expertise", order: 4 },
];

export function loadAchievements(): Achievement[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Fall back to default
  }
  saveAchievements(DEFAULT_ACHIEVEMENTS);
  return DEFAULT_ACHIEVEMENTS;
}

export function saveAchievements(achievements: Achievement[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(achievements, null, 2));
}

export function updateAchievement(
  id: string,
  updates: Partial<Achievement>
): Achievement | null {
  const achievements = loadAchievements();
  const index = achievements.findIndex((a) => a.id === id);
  if (index === -1) return null;

  achievements[index] = { ...achievements[index], ...updates };
  saveAchievements(achievements);
  return achievements[index];
}

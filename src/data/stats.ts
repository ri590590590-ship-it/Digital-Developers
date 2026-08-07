export interface Stat {
  icon: string; target: number; label: string;
}

export const stats: Stat[] = [
  { icon: "🏆", target: 200, label: "Projects Completed" },
  { icon: "😊", target: 150, label: "Happy Clients" },
  { icon: "👥", target: 50, label: "Team Members" },
  { icon: "📅", target: 10, label: "Years Experience" },
];

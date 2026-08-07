export interface ProcessStep {
  num: string; badge: string; title: string; desc: string;
}

export const processSteps: ProcessStep[] = [
  { num: "🔍", badge: "01", title: "Discover", desc: "Deep dive into your goals, audience, and business requirements." },
  { num: "📊", badge: "02", title: "Research", desc: "Market analysis, competitor research, and user persona development." },
  { num: "🎨", badge: "03", title: "Design", desc: "Wireframes, prototypes, and pixel-perfect UI/UX design." },
  { num: "💻", badge: "04", title: "Development", desc: "Clean, scalable code built with modern technologies and best practices." },
  { num: "🧪", badge: "05", title: "Testing", desc: "Rigorous QA testing across devices, browsers, and performance benchmarks." },
  { num: "🚀", badge: "06", title: "Launch", desc: "Smooth deployment with zero downtime and full monitoring setup." },
  { num: "💎", badge: "07", title: "Support", desc: "Ongoing maintenance, updates, and strategic growth support." },
];

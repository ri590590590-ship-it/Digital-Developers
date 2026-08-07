export interface Tech {
  icon: string;
  name: string;
  category: string;
  description: string;
}

export const technologies: Tech[] = [
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l-7 4v6c0 5 3.5 8.5 7 10 3.5-1.5 7-5 7-10V6l-7-4z" /></svg>',
    name: 'Next.js',
    category: 'Framework',
    description: 'SEO-ready React applications with server rendering, routing, and edge performance.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2L6 18l2 4 8-16-2-4z" /></svg>',
    name: 'React',
    category: 'UI Library',
    description: 'Component-driven interfaces with rich interactions and fast re-rendering.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16" /><path d="M7 3v4" /><path d="M17 3v4" /><rect x="4" y="7" width="16" height="12" rx="2" /></svg>',
    name: 'TypeScript',
    category: 'Language',
    description: 'Safer, scalable development with strict typing and better long-term maintenance.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /><path d="M8 4v16" /></svg>',
    name: 'Tailwind',
    category: 'Styling',
    description: 'Responsive design systems with utility-first consistency and rapid iteration.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="8" /></svg>',
    name: 'Node.js',
    category: 'Runtime',
    description: 'High-performance APIs and server-side logic for scalable digital products.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16" /><path d="M7 3v4" /><path d="M17 3v4" /><rect x="4" y="7" width="16" height="12" rx="3" /></svg>',
    name: 'Supabase',
    category: 'Backend',
    description: 'Fast auth, storage, and database infrastructure for modern product launches.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 4v5c0 4.5-2.5 7.5-7 9-4.5-1.5-7-4.5-7-9V7l7-4z" /></svg>',
    name: 'GSAP',
    category: 'Animation',
    description: 'Premium motion choreography and polished, fluid transitions.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v18" /><path d="M3 8l9-5 9 5" /><path d="M3 16l9 5 9-5" /></svg>',
    name: 'Three.js',
    category: '3D',
    description: 'Immersive scenes and lightweight interactive visual storytelling.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h12" /><path d="M8 8h8" /><path d="M8 12h8" /><path d="M8 16h5" /></svg>',
    name: 'SEO',
    category: 'Growth',
    description: 'Search-optimized architecture that improves visibility and conversion quality.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>',
    name: 'Performance',
    category: 'Optimization',
    description: 'Fast loading experiences tuned for smooth interactions and Core Web Vitals.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h10" /><path d="M7 12h10" /><path d="M7 17h6" /></svg>',
    name: 'Analytics',
    category: 'Insights',
    description: 'Measurement-first builds that turn product usage into clear business decisions.'
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l8-8 8 8" /><path d="M7 9v9h10V9" /></svg>',
    name: 'Accessibility',
    category: 'Experience',
    description: 'Inclusive interfaces designed for clarity, keyboard support, and readability.'
  }
];

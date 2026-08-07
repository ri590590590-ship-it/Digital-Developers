export interface BlogPost {
  cat: string; title: string; excerpt: string; slug: string; img: string; alt: string; date: string; read: string;
}

export const blogPosts: BlogPost[] = [
  {cat: "Web Design",title: "How to Build a High-Converting Business Website",excerpt: "Learn the exact framework we use to design business websites that turn visitors into paying customers — from strategy to launch.",slug: "high-converting-business-website",img: "/images/svc-business.jpg",alt: "Business website design on a laptop",date: "Aug 4, 2026",read: "8 min read"},
  {cat: "Development",title: "Next.js vs React in 2026",excerpt: "A practical comparison of React and Next.js for modern web projects — when to use each, performance, SEO and developer experience.",slug: "nextjs-vs-react-2026",img: "/images/svc-nextjs.jpg",alt: "Next.js and React code comparison",date: "Jul 28, 2026",read: "10 min read"},
  {cat: "SEO",title: "Core Web Vitals Explained",excerpt: "What Core Web Vitals actually measure, why they affect your Google rankings, and how to fix the three most common problems.",slug: "core-web-vitals-explained",img: "/images/svc-seo.jpg",alt: "Website performance and Core Web Vitals chart",date: "Jul 20, 2026",read: "9 min read"},
  {cat: "Development",title: "Why Custom Web Apps Beat Templates",excerpt: "Templates are fast, but they box you in. Here's why a custom-built web application pays for itself within the first year.",slug: "custom-web-apps-vs-templates",img: "/images/svc-webapp.jpg",alt: "Custom web application development",date: "Jul 12, 2026",read: "7 min read"},
  {cat: "SEO",title: "SEO Guide for Pakistani Businesses",excerpt: "Local SEO tactics that actually work in Pakistan — Google Business Profile, Urdu-friendly content, and ranking for local keywords.",slug: "seo-guide-pakistan",img: "/images/svc-corporate.jpg",alt: "SEO strategy for Pakistani businesses",date: "Jul 5, 2026",read: "11 min read"},
  {cat: "Business",title: "The Real Cost of a Website in Pakistan",excerpt: "From freelancer one-offs to agency builds — a transparent breakdown of what a professional website really costs in Pakistan in 2026.",slug: "cost-of-website-pakistan",img: "/images/svc-landing.jpg",alt: "Cost of building a website in Pakistan",date: "Jun 26, 2026",read: "8 min read"},
];

export const blogCategories = ['All','Web Design','Development','SEO','Business'];

export const blogBySlug = (slug: string): BlogPost | undefined => blogPosts.find((p) => p.slug === slug);

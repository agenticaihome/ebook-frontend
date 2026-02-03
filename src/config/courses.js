/**
 * Course Configuration - Multi-Course Platform
 * AgenticAiHome.com
 */

export const COURSES = {
  home: {
    id: 'home',
    slug: 'ai-at-home',
    title: 'AI at Home',
    subtitle: 'Reclaim 5+ hours/week from household chaos',
    description: 'Build a team of 10 AI agents to handle meal planning, morning routines, emails, and family logistics. Zero tech skills needed.',
    price: 39.99,
    originalPrice: 49.99,
    icon: '🏠',
    color: 'teal',
    gradient: 'from-teal-500 to-cyan-500',
    borderColor: 'border-teal-500/30',
    bgColor: 'bg-teal-500/10',
    instructor: 'Captain Efficiency',
    duration: '10 chapters',
    level: 'Beginner',
    features: [
      '10 hands-on chapters',
      'Build real AI agents that work for you',
      'Morning brief, meal planning, calendar agents',
      'Email triage & family coordination',
      'Mini-games & badges for motivation',
      'Lifetime access + updates',
    ],
    chapters: [
      { id: 'intro', title: 'Welcome to the Agent Army', free: true, path: '/intro' },
      { id: 'ch1', title: 'Morning Brief Agent', free: true, path: '/part1/chapter1', badge: 'morning_commander' },
      { id: 'ch2', title: 'Meal Planning Agent', free: true, path: '/part1/chapter2', badge: 'meal_master' },
      { id: 'ch3', title: 'Memory & Events Agent', free: false, path: '/part1/chapter3', badge: 'memory_keeper' },
      { id: 'ch4', title: 'Email Triage Agent', free: false, path: '/part2/chapter1', badge: 'inbox_zero_hero' },
      { id: 'ch5', title: 'Finance Guardian Agent', free: false, path: '/part2/chapter2', badge: 'money_clarity' },
      { id: 'ch6', title: 'Health & Wellness Agent', free: false, path: '/part2/chapter3', badge: 'wellness_warrior' },
      { id: 'ch7', title: 'Priority Matrix Agent', free: false, path: '/part3/chapter1', badge: 'priority_pro' },
      { id: 'ch8', title: 'Custom Agent Builder', free: false, path: '/part3/chapter2', badge: 'agent_builder' },
      { id: 'ch9', title: 'Growing Your System', free: false, path: '/part3/chapter3', badge: 'growth_mindset' },
      { id: 'ch10', title: 'Agent Army Graduation', free: false, path: '/part4/chapter1', badge: 'automation_commander' },
      { id: 'ch11', title: 'Bonus: 24/7 Agents', free: false, path: '/bonus/chapter11', badge: 'always_on_master' },
    ],
    testimonials: [
      { name: 'Sarah M.', role: 'Working Mom', quote: 'I finally have time for myself again. The meal planning agent alone saves me 3 hours a week.' },
      { name: 'Mike R.', role: 'Remote Worker', quote: 'My mornings went from chaos to calm. The morning brief agent is like having a personal assistant.' },
    ],
  },

  business: {
    id: 'business',
    slug: 'ai-for-business',
    title: 'AI for Small Business',
    subtitle: 'Your first AI employee — works 24/7, costs $50/month',
    description: 'Hire an AI team to handle customer service, sales follow-ups, bookkeeping, and operations. Built by a small business owner who automated everything.',
    price: 99.00,
    originalPrice: 149.00,
    icon: '💼',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    instructor: 'The Efficiency Team',
    duration: '7 weeks',
    level: 'All Levels',
    badge: 'NEW',
    features: [
      '7 AI "hires" with step-by-step setup',
      'Real tools: Zapier, HubSpot, Upfirst, Lindy',
      'Copy-paste prompts for every agent',
      'ROI calculator for each chapter',
      'Real-world tested by actual business owners',
      'Lifetime access + new tools added',
    ],
    chapters: [
      { id: 'intro', title: 'Your AI Hiring Strategy', free: true, path: '/courses/business' },
      { id: 'week1', title: 'Week 1: Chief of Staff', free: true, path: '/courses/business/week1', badge: 'chief_of_staff', tools: ['ChatGPT/Claude/Gemini', 'Zapier'] },
      { id: 'week2', title: 'Week 2: AI Receptionist', free: false, path: '/courses/business/week2', badge: 'receptionist', tools: ['Upfirst', 'Intercom', 'Tidio'] },
      { id: 'week3', title: 'Week 3: Marketing Manager', free: false, path: '/courses/business/week3', badge: 'marketing_manager', tools: ['Canva AI', 'Copy.ai', 'Buffer'] },
      { id: 'week4', title: 'Week 4: Sales Rep', free: false, path: '/courses/business/week4', badge: 'sales_rep', tools: ['HubSpot AI', 'Lindy', 'Apollo'] },
      { id: 'week5', title: 'Week 5: Bookkeeper', free: false, path: '/courses/business/week5', badge: 'bookkeeper', tools: ['QuickBooks AI', 'Zapier', 'Fathom'] },
      { id: 'week6', title: 'Week 6: IT Manager', free: false, path: '/courses/business/week6', badge: 'it_manager', tools: ['UptimeRobot', 'Zapier', 'PagerDuty'] },
      { id: 'week7', title: 'Week 7: Operations Manager', free: false, path: '/courses/business/week7', badge: 'operations_manager', tools: ['Lindy', 'Make', 'Custom Agents'] },
    ],
    testimonials: [
      { name: 'Coming Soon', role: 'Be the first!', quote: 'This course is brand new. Early students get priority support and shape future content.' },
    ],
    comingSoon: false,
  },
};

export const BUNDLES = {
  complete: {
    id: 'complete',
    title: 'Complete AI Bundle',
    subtitle: 'Master AI for life and business',
    description: 'Get both courses and save $20. Learn to automate your personal life AND your business.',
    courses: ['home', 'business'],
    price: 119.00,
    originalPrice: 148.99,
    savings: 20,
    icon: '🎁',
    gradient: 'from-purple-500 to-pink-500',
  },
};

// Helper functions
export const getCourse = (courseId) => COURSES[courseId];
export const getBundle = (bundleId) => BUNDLES[bundleId];
export const getAllCourses = () => Object.values(COURSES);
export const getAllBundles = () => Object.values(BUNDLES);

// Price formatting
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Check if user owns a course
export const userOwnsCourse = (courseId, ownedCourses = []) => {
  if (ownedCourses.includes('all') || ownedCourses.includes('complete')) {
    return true;
  }
  return ownedCourses.includes(courseId);
};

// Check if chapter is accessible
export const isChapterAccessible = (courseId, chapterId, ownedCourses = []) => {
  const course = getCourse(courseId);
  if (!course) return false;
  
  const chapter = course.chapters.find(c => c.id === chapterId);
  if (!chapter) return false;
  
  // Free chapters are always accessible
  if (chapter.free) return true;
  
  // Check if user owns the course
  return userOwnsCourse(courseId, ownedCourses);
};

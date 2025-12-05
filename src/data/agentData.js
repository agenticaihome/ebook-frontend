export const AGENT_RARITY = {
    COMMON: { color: 'green', hex: '#10B981', label: 'Common' },
    RARE: { color: 'blue', hex: '#3B82F6', label: 'Rare' },
    EPIC: { color: 'purple', hex: '#8B5CF6', label: 'Epic' },
    LEGENDARY: { color: 'gold', hex: '#F59E0B', label: 'Legendary' },
};

export const AGENT_DECKS = {
    DAILY_OPS: 'Daily Ops',
    DIGITAL_OPS: 'Digital Ops',
    LIFE_SYSTEMS: 'Life Systems',
    LEGENDARY: 'Legendary',
};

export const agents = [
    // DAILY OPS DECK
    {
        id: 'morning_brief',
        name: 'Morning Brief Agent',
        role: 'Daily Ops',
        rarity: 'COMMON',
        deck: AGENT_DECKS.DAILY_OPS,
        stats: {
            timeSaved: '15 min/day',
            moneySaved: '$0',
            complexity: 1,
            powerLevel: 20,
        },
        description: 'Generates a concise morning briefing with weather, calendar, and top priorities.',
        prompt: `You are my Morning Brief Agent. 
Review my calendar, tasks, and the local weather. 
Generate a concise 3-bullet summary of what I need to know today. 
Highlight any conflicts or urgent items.`,
        icon: '☀️',
    },
    {
        id: 'meal_planner',
        name: 'Meal Planner',
        role: 'Daily Ops',
        rarity: 'COMMON',
        deck: AGENT_DECKS.DAILY_OPS,
        stats: {
            timeSaved: '1 hr/week',
            moneySaved: '$50/week',
            complexity: 2,
            powerLevel: 35,
        },
        description: 'Creates a weekly meal plan based on dietary preferences and available ingredients.',
        prompt: `You are my Meal Planner Agent.
Plan 5 dinners for the upcoming week.
Dietary restrictions: [INSERT RESTRICTIONS].
Goal: Healthy, under 30 mins to cook.
Output a shopping list sorted by aisle.`,
        icon: '🍽️',
    },
    {
        id: 'grocery_list',
        name: 'Grocery List Generator',
        role: 'Daily Ops',
        rarity: 'COMMON',
        deck: AGENT_DECKS.DAILY_OPS,
        stats: {
            timeSaved: '30 min/week',
            moneySaved: '$20/week',
            complexity: 1,
            powerLevel: 25,
        },
        description: 'Organizes random items into a structured shopping list.',
        prompt: `You are my Grocery List Generator.
Take this list of random items: [INSERT ITEMS].
Organize them by supermarket aisle (Produce, Dairy, Meat, Pantry).
Flag any items that might be expensive or hard to find.`,
        icon: '🛒',
    },
    {
        id: 'cleaning_coordinator',
        name: 'Cleaning Coordinator',
        role: 'Daily Ops',
        rarity: 'RARE',
        deck: AGENT_DECKS.DAILY_OPS,
        stats: {
            timeSaved: '1 hr/week',
            moneySaved: '$0',
            complexity: 3,
            powerLevel: 45,
        },
        description: 'Breaks down cleaning tasks into manageable daily chunks.',
        prompt: `You are my Cleaning Coordinator.
I have 2 hours this weekend to clean.
Create a prioritized checklist of high-impact cleaning tasks.
Focus on visible areas and hygiene.`,
        icon: '🧹',
    },
    {
        id: 'maintenance_manager',
        name: 'Maintenance Manager',
        role: 'Daily Ops',
        rarity: 'RARE',
        deck: AGENT_DECKS.DAILY_OPS,
        stats: {
            timeSaved: '2 hrs/month',
            moneySaved: '$100/mo',
            complexity: 3,
            powerLevel: 50,
        },
        description: 'Tracks home maintenance schedules and reminds you of seasonal tasks.',
        prompt: `You are my Maintenance Manager.
It is currently [CURRENT MONTH].
List the essential home maintenance tasks for this season.
Include filter changes, safety checks, and outdoor prep.`,
        icon: '🔧',
    },
    {
        id: 'supplies_tracker',
        name: 'Supplies Tracker',
        role: 'Daily Ops',
        rarity: 'COMMON',
        deck: AGENT_DECKS.DAILY_OPS,
        stats: {
            timeSaved: '15 min/week',
            moneySaved: '$10/mo',
            complexity: 1,
            powerLevel: 20,
        },
        description: 'Predicts when household supplies will run out.',
        prompt: `You are my Supplies Tracker.
I bought [ITEM] on [DATE]. It usually lasts [DURATION].
Calculate when I need to reorder.
Remind me 1 week before.`,
        icon: '📦',
    },

    // DIGITAL OPS DECK
    {
        id: 'email_triage',
        name: 'Email Triage Specialist',
        role: 'Digital Ops',
        rarity: 'RARE',
        deck: AGENT_DECKS.DIGITAL_OPS,
        stats: {
            timeSaved: '2 hrs/week',
            moneySaved: '$0',
            complexity: 3,
            powerLevel: 60,
        },
        description: 'Scans your inbox to identify high-priority messages and filter noise.',
        prompt: `You are my Email Triage Specialist.
Here are the subject lines and senders of my unread emails: [INSERT LIST].
Identify the top 3 that require immediate action.
Explain why they are urgent.`,
        icon: '📧',
    },
    {
        id: 'email_drafter',
        name: 'Email Drafter',
        role: 'Digital Ops',
        rarity: 'RARE',
        deck: AGENT_DECKS.DIGITAL_OPS,
        stats: {
            timeSaved: '1 hr/week',
            moneySaved: '$0',
            complexity: 2,
            powerLevel: 55,
        },
        description: 'Drafts professional responses to common emails.',
        prompt: `You are my Email Drafter.
Draft a polite but firm decline to this invitation: [INSERT EMAIL].
Keep it under 3 sentences.
Offer a future date to reconnect.`,
        icon: '✍️',
    },
    {
        id: 'calendar_defender',
        name: 'The Calendar Defender',
        role: 'Digital Ops',
        rarity: 'EPIC',
        deck: AGENT_DECKS.DIGITAL_OPS,
        stats: {
            timeSaved: '3 hrs/week',
            moneySaved: '$0',
            complexity: 4,
            powerLevel: 75,
        },
        description: 'Protects your deep work time and optimizes your schedule.',
        prompt: `You are The Calendar Defender.
Review my schedule for next week.
Identify fragmented time blocks.
Propose a rescheduled version that groups meetings and creates 2-hour deep work blocks.`,
        icon: '🛡️',
    },
    {
        id: 'meeting_prep',
        name: 'Meeting Prep Agent',
        role: 'Digital Ops',
        rarity: 'RARE',
        deck: AGENT_DECKS.DIGITAL_OPS,
        stats: {
            timeSaved: '30 min/mtg',
            moneySaved: '$0',
            complexity: 3,
            powerLevel: 50,
        },
        description: 'Prepares briefings and research for upcoming meetings.',
        prompt: `You are my Meeting Prep Agent.
I am meeting with [PERSON/COMPANY] about [TOPIC].
Research them and provide 3 key talking points.
Anticipate 2 difficult questions they might ask.`,
        icon: '🤝',
    },
    {
        id: 'admin_tracker',
        name: 'Admin Tracker',
        role: 'Digital Ops',
        rarity: 'RARE',
        deck: AGENT_DECKS.DIGITAL_OPS,
        stats: {
            timeSaved: '1 hr/week',
            moneySaved: '$20/mo',
            complexity: 3,
            powerLevel: 45,
        },
        description: 'Keeps track of forms, renewals, and bureaucratic tasks.',
        prompt: `You are my Admin Tracker.
List the documents required for [TASK, e.g., Passport Renewal].
Create a step-by-step checklist with deadlines.`,
        icon: '📂',
    },
    {
        id: 'subscription_auditor',
        name: 'Subscription Auditor',
        role: 'Digital Ops',
        rarity: 'COMMON',
        deck: AGENT_DECKS.DIGITAL_OPS,
        stats: {
            timeSaved: '15 min/mo',
            moneySaved: '$50/mo',
            complexity: 1,
            powerLevel: 30,
        },
        description: 'Identifies unused subscriptions and helps cancel them.',
        prompt: `You are my Subscription Auditor.
Review this list of monthly charges: [INSERT LIST].
Flag any that look like recurring subscriptions.
Draft a cancellation email for [SERVICE].`,
        icon: '💳',
    },

    // LIFE SYSTEMS DECK
    {
        id: 'health_coordinator',
        name: 'Health Coordinator',
        role: 'Life Systems',
        rarity: 'EPIC',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '1 hr/week',
            moneySaved: '$100/mo',
            complexity: 4,
            powerLevel: 70,
        },
        description: 'Manages appointments, records, and health metrics.',
        prompt: `You are my Health Coordinator.
Analyze my recent sleep and activity data: [INSERT DATA].
Suggest 3 adjustments to improve energy levels.
Draft a message to my doctor asking about [SYMPTOM].`,
        icon: '❤️',
    },
    {
        id: 'medication_manager',
        name: 'Medication Manager',
        role: 'Life Systems',
        rarity: 'RARE',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '10 min/week',
            moneySaved: '$0',
            complexity: 2,
            powerLevel: 40,
        },
        description: 'Tracks prescriptions and supplements.',
        prompt: `You are my Medication Manager.
Create a schedule for these supplements: [LIST].
Check for any known interactions between them.`,
        icon: '💊',
    },
    {
        id: 'wellness_tracker',
        name: 'Wellness Tracker',
        role: 'Life Systems',
        rarity: 'RARE',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '20 min/week',
            moneySaved: '$0',
            complexity: 2,
            powerLevel: 45,
        },
        description: 'Logs and visualizes wellness habits.',
        prompt: `You are my Wellness Tracker.
I want to build a habit of [HABIT].
Design a simple tracking system I can use in my notes app.
Create a reward structure for hitting milestones.`,
        icon: '🧘',
    },
    {
        id: 'connection_agent',
        name: 'Connection Agent',
        role: 'Life Systems',
        rarity: 'EPIC',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '1 hr/week',
            moneySaved: '$0',
            complexity: 4,
            powerLevel: 65,
        },
        description: 'Reminds you to reach out to friends and family.',
        prompt: `You are my Connection Agent.
It has been 3 months since I spoke to [NAME].
Draft a warm, low-pressure text to reconnect.
Suggest a coffee meetup based on their location in [CITY].`,
        icon: '💬',
    },
    {
        id: 'occasion_tracker',
        name: 'Occasion Tracker',
        role: 'Life Systems',
        rarity: 'RARE',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '30 min/mo',
            moneySaved: '$20/yr',
            complexity: 2,
            powerLevel: 40,
        },
        description: 'Reminds you of birthdays and anniversaries with gift ideas.',
        prompt: `You are my Occasion Tracker.
[NAME]'s birthday is in 2 weeks. They like [INTERESTS].
Suggest 3 unique gift ideas under $50.
Draft a birthday card message.`,
        icon: '🎁',
    },
    {
        id: 'network_nurturer',
        name: 'Network Nurturer',
        role: 'Life Systems',
        rarity: 'EPIC',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '2 hrs/week',
            moneySaved: '$0',
            complexity: 4,
            powerLevel: 70,
        },
        description: 'Strategically manages your professional network.',
        prompt: `You are my Network Nurturer.
I met [NAME] at [EVENT]. They work in [INDUSTRY].
Draft a follow-up email to cement the connection.
Suggest a relevant article I could send them.`,
        icon: '🌐',
    },
    {
        id: 'recovery_aware_learner',
        name: 'Recovery-Aware Learner',
        role: 'Life Systems',
        rarity: 'EPIC',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '2 hrs/week',
            moneySaved: '$0',
            complexity: 4,
            powerLevel: 75,
        },
        description: 'Optimizes your learning schedule based on your energy.',
        prompt: `You are my Recovery-Aware Learner.
I am feeling [ENERGY LEVEL: High/Low].
I need to learn about [TOPIC].
Create a study plan that matches my current state.`,
        icon: '🧠',
    },
    {
        id: 'second_brain',
        name: 'Second Brain',
        role: 'Life Systems',
        rarity: 'EPIC',
        deck: AGENT_DECKS.LIFE_SYSTEMS,
        stats: {
            timeSaved: '5 hrs/week',
            moneySaved: '$0',
            complexity: 5,
            powerLevel: 80,
        },
        description: 'Organizes and retrieves your knowledge.',
        prompt: `You are my Second Brain.
I remember reading something about [TOPIC] last month.
Search my notes and summarize the key concepts.
Connect this to [OTHER TOPIC].`,
        icon: '🗂️',
    },

    // LEGENDARY DECK
    {
        id: 'the_conductor',
        name: 'The Conductor',
        role: 'Master',
        rarity: 'LEGENDARY',
        deck: AGENT_DECKS.LEGENDARY,
        stats: {
            timeSaved: '10 hrs/week',
            moneySaved: '$500/mo',
            complexity: 5,
            powerLevel: 100,
        },
        description: 'The master orchestrator of your entire Life OS.',
        prompt: `You are The Conductor.
Review the outputs from my Calendar Defender, Meal Planner, and Task Manager.
Identify conflicts and synergies.
Create a master schedule for the week that balances all domains.`,
        icon: '🎼',
    },
    {
        id: 'daily_briefing_commander',
        name: 'Daily Briefing Commander',
        role: 'Master',
        rarity: 'LEGENDARY',
        deck: AGENT_DECKS.LEGENDARY,
        stats: {
            timeSaved: '30 min/day',
            moneySaved: '$0',
            complexity: 5,
            powerLevel: 90,
        },
        description: 'Synthesizes all daily inputs into a single command view.',
        prompt: `You are the Daily Briefing Commander.
Compile a "State of the Union" for my day.
Include: Top 3 priorities, Health status, Financial alerts, and Relationship reminders.
Format as a military briefing.`,
        icon: '🎖️',
    },
    {
        id: 'weekly_review_overseer',
        name: 'Weekly Review Overseer',
        role: 'Master',
        rarity: 'LEGENDARY',
        deck: AGENT_DECKS.LEGENDARY,
        stats: {
            timeSaved: '2 hrs/week',
            moneySaved: '$100/week',
            complexity: 5,
            powerLevel: 95,
        },
        description: 'Conducts a deep retrospective of your week.',
        prompt: `You are the Weekly Review Overseer.
Review my completed tasks and calendar from last week.
Calculate my "Efficiency Score."
Identify 3 areas for improvement next week.`,
        icon: '📊',
    },
    {
        id: 'system_health_monitor',
        name: 'System Health Monitor',
        role: 'Master',
        rarity: 'LEGENDARY',
        deck: AGENT_DECKS.LEGENDARY,
        stats: {
            timeSaved: 'Auto',
            moneySaved: 'Auto',
            complexity: 5,
            powerLevel: 99,
        },
        description: 'Constantly checks for friction in your systems.',
        prompt: `You are the System Health Monitor.
I felt overwhelmed on [DAY].
Analyze my inputs from that day.
Diagnose the system failure (e.g., too many meetings, poor sleep, unclear tasks).
Prescribe a system fix.`,
        icon: '💓',
    },
];

export const getAgentById = (id) => agents.find((a) => a.id === id);
export const getAgentsByDeck = (deck) => agents.filter((a) => a.deck === deck);

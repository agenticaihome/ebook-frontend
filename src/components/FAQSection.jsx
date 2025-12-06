import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FAQSection - Expandable FAQ for common objections and questions
 * Addresses the "what if..." and "but I..." concerns that block readers
 */

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
    <div className="border-b border-slate-700 last:border-0">
        <button
            onClick={onToggle}
            className="w-full flex items-start justify-between gap-4 py-4 text-left hover:bg-slate-900/30 transition-colors px-1"
        >
            <div className="flex items-start gap-3">
                <MessageCircle className="text-teal-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-white font-medium">{question}</span>
            </div>
            {isOpen ? (
                <ChevronUp className="text-slate-400 flex-shrink-0" size={18} />
            ) : (
                <ChevronDown className="text-slate-400 flex-shrink-0" size={18} />
            )}
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                >
                    <div className="pb-4 pl-10 pr-4">
                        <div className="text-slate-300 text-sm space-y-2">
                            {typeof answer === 'string' ? <p>{answer}</p> : answer}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const FAQSection = ({ title = "Common Questions", faqs, className = '' }) => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className={`bg-gradient-to-br from-slate-900/30 to-slate-800/20 rounded-2xl border border-slate-500/40 backdrop-blur-sm overflow-hidden ${className}`}>
            <div className="p-5 border-b border-slate-700">
                <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <HelpCircle className="text-teal-400" size={20} />
                    {title}
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                    Real questions from real explorers. Click to expand.
                </p>
            </div>

            <div className="px-4">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                ))}
            </div>

            {/* Pro Tip at bottom */}
            <div className="p-4 bg-teal-900/20 border-t border-teal-500/30">
                <p className="text-teal-400 text-sm flex items-start gap-2">
                    <Lightbulb size={16} className="flex-shrink-0 mt-0.5" />
                    <span>
                        <strong>Still have questions?</strong> Ask your AI companion!
                        Just describe your situation and ask for advice.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default FAQSection;

// Pre-built FAQ sets for each chapter
export const chapter3FAQs = [
    {
        question: "Should I actually be worried about AI privacy?",
        answer: "For personal use (meal planning, morning briefs, schedules), risk is low. The data you share isn't valuable to hackers. But avoid sharing: passwords, financial account numbers, Social Security numbers, or truly sensitive business secrets. The 3-Tier system helps you decide what's safe."
    },
    {
        question: "What's the absolute minimum I need to do?",
        answer: "One 30-second step: Turn off chat history/training in your AI tool's settings. That's it. This prevents your conversations from training future models. The Privacy Lockdown section shows you exactly where to click for each tool."
    },
    {
        question: "Is it safe to use my real name and location?",
        answer: "First names and general locations (city-level) are fine for personal use. Avoid: full home addresses, phone numbers, or any info that could be used for identity theft. 'I live in Austin and my name is Sarah' is safe. 'My SSN is 123-45-6789' is not."
    },
    {
        question: "What if I already shared sensitive info?",
        answer: "Don't panic. Delete that conversation, clear your chat history, and move forward with better habits. Most AI tools don't permanently store individual conversations once you've opted out of training. The risk is low but not zero."
    },
    {
        question: "Which AI tool is most private?",
        answer: "Claude (Anthropic) currently has the strongest privacy defaults—it doesn't train on your data by default. ChatGPT requires you to opt out. Gemini is tied to your Google account. But ALL cloud AI tools process your data on their servers. For truly sensitive work, consider local AI tools (not covered in this guide)."
    }
];

export const chapter4FAQs = [
    {
        question: "What if I don't wake up with my phone nearby?",
        answer: "That's actually ideal! Check your morning brief when you're ready, not the moment you wake up. Many explorers check it with their first coffee. The point is one quick look vs. chaos-scrolling through multiple apps."
    },
    {
        question: "Won't this just be another notification I ignore?",
        answer: "Unlike app notifications that buzz you constantly, YOU control when you check in. Set one reminder at your preferred time. Most explorers check it as part of their morning routine—same time every day."
    },
    {
        question: "What about weekends? My routine is different.",
        answer: "Your morning brief can include day-of-week logic. Tell your companion: 'On weekends, skip work items and focus on family activities and rest.' It adapts to your patterns."
    },
    {
        question: "How is this different from just checking my calendar app?",
        answer: "Calendar shows WHAT. Your companion shows WHAT + WHY + CONTEXT. It synthesizes weather, meetings, deadlines, and priorities into one 30-second read instead of 5 app checks."
    }
];

export const chapter5FAQs = [
    {
        question: "I'm too busy to cook elaborate meals.",
        answer: "Tell your companion: 'Only suggest recipes under 30 minutes with 5 ingredients or less.' It will optimize for YOUR constraints, not Pinterest-perfect meals."
    },
    {
        question: "My partner/family is skeptical about AI.",
        answer: "You don't need to explain it. Just share the output: 'Here's dinner this week.' The meal plan looks like... a meal plan. The AI is invisible once you have the result."
    },
    {
        question: "What about dietary restrictions?",
        answer: "Companions excel at this. Define restrictions once: 'Sarah is gluten-free, Jake hates mushrooms, we're reducing red meat.' Every suggestion respects these automatically."
    },
    {
        question: "I already use a meal planning app.",
        answer: "Great! Your companion can work alongside it. Use AI to generate ideas, then plug them into your favorite app. Or ask it to format output specifically for your app."
    },
    {
        question: "Grocery delivery doesn't work in my area.",
        answer: "AI meal planning works for any shopping method—in-store, pickup, or delivery. It creates organized lists by store section so in-person shopping is faster too."
    }
];

export const chapter6FAQs = [
    {
        question: "I already use Todoist/Cozi/OurHome for this.",
        answer: "Perfect! Your AI companion can generate content FOR those apps. Ask it to output in a format you can copy-paste, or use Zapier to auto-add tasks. Your existing tools become smarter."
    },
    {
        question: "My family won't follow a schedule.",
        answer: "Start with just yourself. Track YOUR tasks. As the mental load lifts, others notice. Then share specific, contextual reminders: 'Hey, the AI says air filters should be changed this weekend—can you grab those?'"
    },
    {
        question: "This seems like a lot of upfront work.",
        answer: "The 4-Pillars setup takes about 20 minutes total. That's a one-time investment that saves 2+ hours every week. After the first week, it's just reviewing and tweaking."
    },
    {
        question: "What if I live alone?",
        answer: "Even better! No family coordination needed. Your companion tracks everything from cleaning schedules to seasonal maintenance to 'when did I last change that?' questions. It's your external brain."
    }
];

export const chapter7FAQs = [
    {
        question: "What if I need to check email more than twice a day for my job?",
        answer: "Adjust to your reality! The key isn't a specific number—it's INTENTIONAL windows vs. reactive checking. Even 4 scheduled email blocks (9am, 12pm, 3pm, 5pm) is better than 50 random peeks. Tell your AI: 'My job requires more email. Suggest a realistic schedule.'"
    },
    {
        question: "Won't people get annoyed if I don't respond immediately?",
        answer: "Studies show: response expectations are often in YOUR head. Most emails don't need same-hour replies. Add an email signature: 'I check email at [times]. For urgent matters, text me.' You'll train people AND reduce anxiety."
    },
    {
        question: "My inbox is already at 10,000+ emails. Where do I start?",
        answer: "Don't organize the past—just stop the bleeding. Archive everything older than 30 days. Declare email bankruptcy. Then apply triage to NEW emails only. Your AI helps you stay at inbox zero GOING FORWARD, not dig through history."
    },
    {
        question: "What about really urgent emails I might miss?",
        answer: "Set up VIP filters for truly urgent senders (boss, key clients, family). Most email apps let these bypass your normal schedule with notifications. Everything else can wait for your scheduled windows."
    }
];

export const chapter8FAQs = [
    {
        question: "My boss schedules meetings. I can't say no.",
        answer: "You can't decline, but you CAN influence. Try: 'I have a conflict at 2pm—is 10am possible?' Block focus time BEFORE meetings land. Leaders respect proactive time management more than you think."
    },
    {
        question: "Isn't blocking focus time just meeting avoidance?",
        answer: "Focus time is where real work happens. Meetings discuss work; focus time DOES work. Your Calendar Defense Agent helps you protect productive time while still being collaborative. It's not avoidance—it's balance."
    },
    {
        question: "What if my whole team has a meetings-heavy culture?",
        answer: "Start by protecting just ONE 90-minute block, 3x/week. As your output improves, you gain credibility to protect more. Lead by example—often others are waiting for someone to push back first."
    },
    {
        question: "How do I decline gracefully?",
        answer: "The chapter includes 5 copy-paste decline templates. The key: be helpful, not defensive. Offer alternatives: 'Can't make 3pm, but I can join for the first 30 min' or 'Could you send notes after?'"
    }
];

export const chapter9FAQs = [
    {
        question: "I don't have that many recurring admin tasks.",
        answer: "You might be surprised! Car registration, insurance renewals, domain renewals, prescription refills, license renewals, tax deadlines, open enrollment... The inventory tool helps you realize what's actually lurking."
    },
    {
        question: "Can't I just use a calendar for reminders?",
        answer: "You can! But AI adds context, multi-reminder sequences (30 days, 7 days, 3 days), and tracks related tasks. 'Passport expires in 60 days' + 'You need photos, forms, and an appointment' is more helpful than a single calendar ping."
    },
    {
        question: "What about subscriptions I genuinely need?",
        answer: "Keep them! The Subscription Audit isn't about canceling everything—it's about DECIDING consciously. Many people pay for services they forgot about. The goal is intentional spending, not extreme frugality."
    },
    {
        question: "How does this work with my partner's admin stuff?",
        answer: "Two options: (1) Share one AI companion for household admin, or (2) Each person tracks their responsibilities separately. Most couples do a hybrid—shared for household, separate for personal."
    }
];

export const chapter10FAQs = [
    {
        question: "Isn't tracking health obsessive?",
        answer: "There's a difference between obsessive tracking and gentle reminders. Your Health Agent isn't counting every calorie—it's making sure you don't miss your annual physical or run out of medication. Light touch, high impact."
    },
    {
        question: "I hate going to the doctor.",
        answer: "Fair! But preventive care catches problems early. Your AI makes it EASIER, not harder. It handles the scheduling anxiety, reminds you far in advance, and tracks what's due so you decide when you're ready."
    },
    {
        question: "My health is fine, I don't need this.",
        answer: "Healthy people benefit most from prevention! This chapter is less about fixing problems and more about maintaining what's working. Annual checkups, medication timing, hydration reminders—simple stuff that keeps you healthy."
    },
    {
        question: "What if I'm managing a chronic condition?",
        answer: "AI companions excel at chronic condition management: tracking symptoms, medication timing, appointment scheduling, and noticing patterns. Tell your companion about your condition and it becomes a specialized health assistant."
    }
];

export const chapter11FAQs = [
    {
        question: "This seems cold—putting friends in 'circles.'",
        answer: "It's not about ranking people by value. It's recognizing that your BEST friend needs different attention than a college acquaintance. The circles ensure everyone gets appropriate attention instead of no one getting enough."
    },
    {
        question: "What if I'm introverted and don't want to reach out more?",
        answer: "Quality over quantity! An introvert's inner circle might be 3 people, not 7. The system adapts to YOU. Even one thoughtful message per month is better than guilty silence. Small gestures, big impact."
    },
    {
        question: "Won't people think it's weird if I suddenly start reaching out?",
        answer: "People love being thought of! 'Hey, saw this and thought of you' or 'Been meaning to catch up' is universally appreciated. No one thinks it's weird—they think it's kind."
    },
    {
        question: "I already have friends, I don't need to 'manage' relationships.",
        answer: "Great! This is about keeping them. Friendships fade not from lack of love but from life getting busy. Your AI just makes sure important people don't slip through the cracks while you're juggling everything else."
    }
];

export const chapter12FAQs = [
    {
        question: "I don't have time to learn new things.",
        answer: "You have time—just scattered. 15 minutes while waiting for coffee. Audiobooks during commute. One article at lunch. Your Learning Agent finds micro-learning opportunities you're already missing."
    },
    {
        question: "How is this different from just watching YouTube tutorials?",
        answer: "Unstructured learning is forgettable. Your AI creates learning PATHS with spaced repetition, application exercises, and progress tracking. It's the difference between watching a video and actually retaining the skill."
    },
    {
        question: "What if I don't know what I want to learn?",
        answer: "Perfect! Tell your AI your goals: 'I want to be better at my job' or 'I want to be a more interesting person.' It suggests relevant skills and learning paths based on YOUR situation."
    },
    {
        question: "Isn't AI learning making us dumber?",
        answer: "AI handles the logistics (what to learn, when to review, tracking progress) so you can focus on actual LEARNING. It's like having a personal tutor. The thinking is still yours—the scheduling isn't."
    }
];

export const chapter13FAQs = [
    {
        question: "Do I really need to integrate everything?",
        answer: "Not necessarily! Start with 2-3 agents that solve your biggest pain points. The Life OS grows organically. Integration is about reducing duplication, not maximizing complexity."
    },
    {
        question: "How do I avoid everything breaking if one agent fails?",
        answer: "Good agents are loosely coupled. If your Meal Agent breaks, your Calendar Agent still works. The Conductor oversees everything but individual agents are independent. Start simple, add redundancy later."
    },
    {
        question: "This seems like it could become overwhelming.",
        answer: "That's why we build incrementally! Each chapter adds ONE system. By now you have 12+ agents, but you built them one at a time. Complexity grows gradually, not all at once."
    },
    {
        question: "What if I want to use different AI tools for different things?",
        answer: "Totally fine! Use Claude for writing, ChatGPT for research, Gemini for scheduling. The prompts work across tools. Your Conductor can even coordinate outputs from multiple AIs."
    }
];

export const chapter14FAQs = [
    {
        question: "When should I use advanced prompting vs. simple prompts?",
        answer: "Simple works 80% of the time. Use CRAFT framework when: output quality matters, task is complex, or you're getting poor results. Don't over-engineer routine requests."
    },
    {
        question: "My AI gives different answers each time. Is that normal?",
        answer: "Yes! AI is probabilistic. For consistency: be more specific, provide examples of desired output, and use lower 'temperature' settings if available. Some variation is normal and even useful."
    },
    {
        question: "How do I know if I'm prompting well?",
        answer: "Good prompts get good results on the first try. If you're constantly clarifying, your prompt needs work. The CRAFT framework helps: Context, Role, Action, Format, Tone."
    },
    {
        question: "Should I share my prompts with others?",
        answer: "Absolutely! Prompts aren't secret sauce—sharing helps everyone. Many people customize prompts from this guide. Join communities where people share and iterate on prompts together."
    }
];

export const chapter15FAQs = [
    {
        question: "What if my AI stops working like it used to?",
        answer: "AI models update regularly. If behavior changes: re-test your prompts, check for new settings, and refresh your instructions. Sometimes a simple 'Please follow these instructions exactly' helps."
    },
    {
        question: "My agent is being lazy / giving short answers.",
        answer: "Try: 'Please provide a thorough, detailed response' or split complex tasks into steps. Sometimes AIs take shortcuts when they shouldn't. Clear expectations fix most issues."
    },
    {
        question: "How do I know if the AI is making mistakes?",
        answer: "Spot-check important outputs! Verify facts, dates, and calculations. AI is powerful but not perfect. Trust but verify—especially for anything health, legal, or financial."
    },
    {
        question: "What if I get overwhelmed managing all these agents?",
        answer: "Pull back! You don't need every agent. Start with 2-3 that solve your biggest problems. Add more only when the first ones are running smoothly. Simplify, then expand."
    }
];

export const chapter16FAQs = [
    {
        question: "What should I do first now that I've finished the book?",
        answer: "Review your 3 highest-impact agents and make sure they're running consistently. Most value comes from routine, not novelty. Master what you have before adding more."
    },
    {
        question: "How do I keep this going long-term?",
        answer: "Weekly 15-minute review: What's working? What needs adjustment? Which agent needs a refresh? Small maintenance prevents system decay. Your Weekly Review Agent helps with this."
    },
    {
        question: "Should I share this with family/friends?",
        answer: "If it's helped you, absolutely share it! Many readers teach these systems to their partners, parents, or colleagues. Each person can customize agents to their own needs."
    },
    {
        question: "What's next for AI at home?",
        answer: "AI evolves fast! Follow updates, experiment with new features, and stay curious. The foundations you've built will make adopting new capabilities much easier. You're now AI-fluent."
    }
];


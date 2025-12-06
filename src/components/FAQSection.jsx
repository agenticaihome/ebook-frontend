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
    },
    {
        question: "How do I share this with my partner?",
        answer: "Three options: (1) Share the AI chat with them, (2) Export to a shared app like Cozi, or (3) Send them weekly summaries. Most couples find option 2 or 3 works best—AI stays behind the scenes."
    }
];

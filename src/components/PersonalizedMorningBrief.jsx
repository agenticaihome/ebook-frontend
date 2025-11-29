import React from 'react';
import { useUser } from '../context/UserContext';

const PersonalizedMorningBrief = () => {
    const { userState } = useUser();
    const persona = userState?.persona || 'general';

    const content = {
        parent: {
            title: "👪 PARENT MODE BRIEF",
            weather: "🌤️ WEATHER: 68°F. Pack light jackets for kids.",
            events: [
                "• 8:15 AM — School Drop-off (Leave by 7:55)",
                "• 2:00 PM — Pediatrician Appt (Leo)",
                "• 5:30 PM — Soccer Practice (Pack snacks)"
            ],
            prep: "→ PREP: Sign permission slip before drop-off",
            priority: "Leo's appointment forms + Dinner prep (Tacos)"
        },
        professional: {
            title: "💼 EXECUTIVE BRIEF",
            weather: "🌤️ WEATHER: 68°F. Good for lunch meeting.",
            events: [
                "• 9:00 AM — Q3 Strategy Review",
                "• 11:30 AM — Client Call: Johnson Account",
                "• 2:00 PM — Team Standup"
            ],
            prep: "→ PREP: Review Q3 metrics deck before 9am",
            priority: "Finalize Johnson proposal before call"
        },
        student: {
            title: "🎓 STUDY BRIEF",
            weather: "🌤️ WEATHER: 68°F. Library is AC'd, bring hoodie.",
            events: [
                "• 10:00 AM — Chem 101 Lecture",
                "• 1:00 PM — Study Group (Library 3B)",
                "• 11:59 PM — History Paper DUE"
            ],
            prep: "→ PREP: Print Chem lab report",
            priority: "Submit History Paper (Draft is 90% done)"
        },
        general: {
            title: "☀️ MORNING BRIEF",
            weather: "🌤️ WEATHER: 68°F → 74°F, partly cloudy",
            events: [
                "• 9:00 AM — Team standup (30 min)",
                "• 11:30 AM — Client call: Johnson project",
                "• 2:00 PM — Dentist appointment"
            ],
            prep: "→ PREP: Review proposal draft before call",
            priority: "Finalize Johnson proposal. Block 10-11:30."
        }
    };

    const data = content[persona] || content.general;

    return (
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm text-slate-300 my-6 shadow-lg">
            <div className="text-cyan-400 mb-4">════════════════════════════════════</div>
            <div className="text-white font-bold mb-2">{data.title} — Tuesday, March 18</div>
            <div className="text-cyan-400 mb-4">════════════════════════════════════</div>

            <div className="mb-4">
                <div className="text-yellow-400 mb-1">{data.weather}</div>
            </div>

            <div className="mb-4">
                <div className="text-purple-400 mb-1">📅 TODAY ({data.events.length} events):</div>
                {data.events.map((event, idx) => (
                    <div key={idx} className="pl-4">{event}</div>
                ))}
                <div className="pl-6 text-cyan-400 mt-1">{data.prep}</div>
            </div>

            <div className="mb-4">
                <div className="text-green-400 mb-1">🎯 TODAY'S PRIORITY:</div>
                <div className="pl-4">{data.priority}</div>
            </div>

            <div className="text-cyan-400">════════════════════════════════════</div>
            <div className="mt-2 text-slate-500 text-xs">Time to read: 2 minutes | Decisions made for you: 5+</div>
        </div>
    );
};

export default PersonalizedMorningBrief;

import React from 'react';
import { Check, X } from 'lucide-react';

/**
 * Password strength meter component
 * Shows visual indicator of password strength with requirements
 */
const PasswordStrengthMeter = ({ password }) => {
    // Calculate strength
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passedChecks = Object.values(checks).filter(Boolean).length;

    // Determine strength level and color
    let strength = 'weak';
    let color = 'red';
    let width = '20%';

    if (passedChecks >= 5) {
        strength = 'strong';
        color = 'green';
        width = '100%';
    } else if (passedChecks >= 4) {
        strength = 'good';
        color = 'teal';
        width = '80%';
    } else if (passedChecks >= 3) {
        strength = 'fair';
        color = 'yellow';
        width = '60%';
    } else if (passedChecks >= 2) {
        strength = 'weak';
        color = 'orange';
        width = '40%';
    }

    const colorClasses = {
        red: 'bg-red-500',
        orange: 'bg-orange-500',
        yellow: 'bg-yellow-500',
        teal: 'bg-teal-500',
        green: 'bg-green-500',
    };

    const textColors = {
        red: 'text-red-400',
        orange: 'text-orange-400',
        yellow: 'text-yellow-400',
        teal: 'text-teal-400',
        green: 'text-green-400',
    };

    if (!password) return null;

    return (
        <div className="mt-3 space-y-3">
            {/* Strength Bar */}
            <div className="space-y-1">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Password strength</span>
                    <span className={textColors[color]}>{strength.charAt(0).toUpperCase() + strength.slice(1)}</span>
                </div>
                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${colorClasses[color]} transition-all duration-300 rounded-full`}
                        style={{ width }}
                    />
                </div>
            </div>

            {/* Requirements Checklist */}
            <div className="grid grid-cols-2 gap-1 text-xs">
                <RequirementItem met={checks.length} text="8+ characters" />
                <RequirementItem met={checks.uppercase} text="Uppercase" />
                <RequirementItem met={checks.lowercase} text="Lowercase" />
                <RequirementItem met={checks.number} text="Number" />
            </div>
        </div>
    );
};

const RequirementItem = ({ met, text }) => (
    <div className={`flex items-center gap-1.5 ${met ? 'text-green-400' : 'text-slate-500'}`}>
        {met ? <Check size={12} /> : <X size={12} />}
        <span>{text}</span>
    </div>
);

export default PasswordStrengthMeter;

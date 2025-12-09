import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

/**
 * Universal Button Component
 * 
 * Variants:
 * - primary: Teal-cyan gradient (Start, Continue, Next)
 * - purchase: Amber-orange gradient (Unlock, Buy, Get Access)
 * - secondary: Slate outline (Back, Skip, Cancel)
 * - ghost: Minimal (utility actions)
 * 
 * Sizes: xl, lg, md, sm, xs
 */

const variants = {
    primary: `
        bg-gradient-to-r from-teal-500 to-cyan-500 
        hover:from-teal-400 hover:to-cyan-400 
        text-white font-bold
        shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40
        hover:scale-[1.02] active:scale-[0.98]
    `,
    purchase: `
        bg-gradient-to-r from-amber-500 to-orange-500 
        hover:from-amber-400 hover:to-orange-400 
        text-white font-bold
        shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40
        hover:scale-[1.02] active:scale-[0.98]
    `,
    secondary: `
        bg-slate-800/50 border border-slate-600 
        hover:bg-slate-700 hover:border-teal-500/50 
        text-slate-300 hover:text-white font-medium
    `,
    ghost: `
        bg-transparent hover:bg-slate-800/50
        text-slate-400 hover:text-white font-medium
    `,
    danger: `
        bg-red-500/20 border border-red-500/30
        hover:bg-red-500/30 hover:border-red-500/50
        text-red-400 hover:text-red-300 font-medium
    `,
};

const sizes = {
    xl: 'py-5 px-10 text-xl rounded-2xl gap-3',
    lg: 'py-4 px-8 text-lg rounded-2xl gap-3',
    md: 'py-3 px-6 text-base rounded-xl gap-2',
    sm: 'py-2 px-4 text-sm rounded-lg gap-2',
    xs: 'py-1.5 px-3 text-xs rounded-lg gap-1.5',
};

const disabledStyles = 'opacity-60 cursor-not-allowed hover:scale-100 active:scale-100';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    className = '',
    onClick,
    type = 'button',
    ...props
}) => {
    const baseStyles = `
        inline-flex items-center justify-center
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:ring-offset-2 focus:ring-offset-slate-900
    `;

    const combinedStyles = `
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${disabled || loading ? disabledStyles : ''}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const content = (
        <>
            {loading && <Loader2 size={size === 'xl' ? 24 : size === 'lg' ? 20 : 16} className="animate-spin" />}
            {!loading && icon && iconPosition === 'left' && icon}
            <span>{children}</span>
            {!loading && icon && iconPosition === 'right' && icon}
        </>
    );

    // If it's a react-router Link
    if (to && !disabled && !loading) {
        return (
            <Link to={to} className={combinedStyles} {...props}>
                {content}
            </Link>
        );
    }

    // If it's an external link
    if (href && !disabled && !loading) {
        return (
            <a href={href} className={combinedStyles} target="_blank" rel="noopener noreferrer" {...props}>
                {content}
            </a>
        );
    }

    // Regular button
    return (
        <button
            type={type}
            className={combinedStyles}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;

// Named exports for convenience
export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const PurchaseButton = (props) => <Button variant="purchase" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;

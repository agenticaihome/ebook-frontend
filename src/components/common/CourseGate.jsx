import React from 'react';
import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, CreditCard, ArrowRight, CheckCircle, Shield, Gift } from 'lucide-react';
import { getCourse, formatPrice, BUNDLES } from '../../config/courses';

/**
 * Get owned courses from localStorage
 * Returns array of course IDs: ['home', 'business'] or ['complete'] for bundle
 */
const getOwnedCourses = () => {
  try {
    // Check for bundle purchase
    const bundlePurchase = localStorage.getItem('bundle_purchase');
    if (bundlePurchase) {
      const parsed = JSON.parse(bundlePurchase);
      if (parsed?.paid === true) return ['complete', 'home', 'business'];
    }
    
    // Check for individual course purchases
    const owned = [];
    
    // Legacy: Check old stripe/ergo payment (grants 'home' course)
    const stripePayment = localStorage.getItem('stripe_payment');
    const ergoPayment = localStorage.getItem('ergo_payment');
    const betaAccess = localStorage.getItem('beta_access');
    
    if (stripePayment) {
      const parsed = JSON.parse(stripePayment);
      if (parsed?.paid === true) owned.push('home');
    }
    if (ergoPayment) {
      const parsed = JSON.parse(ergoPayment);
      if (parsed?.paid === true) owned.push('home');
    }
    if (betaAccess === 'true') {
      owned.push('home', 'business'); // Beta users get everything
    }
    
    // Check for new course-specific purchases
    const coursePurchases = localStorage.getItem('course_purchases');
    if (coursePurchases) {
      const parsed = JSON.parse(coursePurchases);
      if (Array.isArray(parsed)) {
        owned.push(...parsed);
      }
    }
    
    return [...new Set(owned)]; // Dedupe
  } catch (e) {
    console.error('Error reading owned courses:', e);
    return [];
  }
};

/**
 * Check if user has access to a specific course
 */
const hasAccess = (courseId) => {
  const owned = getOwnedCourses();
  if (owned.includes('complete')) return true; // Bundle = all access
  return owned.includes(courseId);
};

/**
 * CourseGate - Protects paid course content
 * Shows paywall if user doesn't own the course
 */
const CourseGate = ({ courseId, children }) => {
  const course = getCourse(courseId);
  const bundle = BUNDLES.complete;
  
  if (hasAccess(courseId)) {
    return <>{children}</>;
  }
  
  if (!course) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <p className="text-slate-400">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-${course.color}-500/10 rounded-full blur-[100px]`} />
      </div>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg text-3xl`}>
              {course.icon}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
            <p className="text-slate-400 text-sm">
              {course.subtitle}
            </p>
          </div>

          {/* What's included */}
          <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700/30">
            <p className="text-white font-semibold mb-3 text-sm flex items-center gap-2">
              <Sparkles size={16} className="text-amber-400" />
              What's included:
            </p>
            <ul className="space-y-2.5">
              {course.features.slice(0, 4).map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle size={16} className={`text-${course.color}-400 mt-0.5 flex-shrink-0`} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="text-center mb-6 py-4 border-y border-slate-700/30">
            <p className={`text-${course.color}-400 text-xs font-semibold tracking-wider uppercase mb-2`}>
              Launch Price
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-black text-white">{formatPrice(course.price)}</span>
              {course.originalPrice > course.price && (
                <span className="text-slate-500 line-through text-lg">{formatPrice(course.originalPrice)}</span>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-1">One-time payment • Lifetime access</p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link
              to={`/checkout?course=${courseId}`}
              className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white py-3.5 rounded-xl font-bold transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2`}
            >
              <CreditCard size={18} />
              Get {course.title}
              <ArrowRight size={18} />
            </Link>
            
            {/* Bundle upsell */}
            <Link
              to="/checkout?bundle=complete"
              className="w-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white py-3 rounded-xl font-medium transition-all border border-slate-600/50 hover:border-slate-500 flex items-center justify-center gap-2 text-sm"
            >
              <Gift size={16} className="text-purple-400" />
              Get Both Courses — {formatPrice(bundle.price)}
              <span className="text-xs text-green-400 font-semibold ml-1">Save ${bundle.savings}</span>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-slate-700/30">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Shield size={14} className="text-green-500" />
              Secure checkout
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <CheckCircle size={14} className="text-green-500" />
              30-day guarantee
            </div>
          </div>

          {/* Already purchased */}
          <p className="text-center text-slate-500 text-xs mt-5">
            Already purchased? <Link to="/claim-access" className={`text-${course.color}-400 font-medium hover:underline`}>Claim your access</Link>
          </p>
        </div>
      </m.div>
    </div>
  );
};

// Export helper functions for use elsewhere
export { getOwnedCourses, hasAccess };
export default CourseGate;

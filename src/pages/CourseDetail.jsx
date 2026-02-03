import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, Check, Lock, Play, Clock, Users, BookOpen,
  Star, Shield, Zap, Gift, ChevronRight, Bot
} from 'lucide-react';
import { getCourse, formatPrice, BUNDLES } from '../config/courses';
import { hasAccess } from '../components/common/CourseGate';

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  const bundle = BUNDLES.complete;
  const userHasAccess = hasAccess(courseId);
  
  if (!course) {
    return <Navigate to="/courses" replace />;
  }
  
  return (
    <>
      <Helmet>
        <title>{course.title} — Agentic AI Home</title>
        <meta name="description" content={course.description} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-950">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-${course.color}-500/10 rounded-full blur-[150px]`} />
        </div>
        
        {/* Hero */}
        <section className="relative z-10 px-6 pt-12 pb-8 md:pt-20 md:pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link to="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 text-sm">
              ← All Courses
            </Link>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Left: Course Info */}
              <div className="flex-1">
                {/* Badge */}
                {course.badge && (
                  <span className={`inline-block px-3 py-1 rounded-full bg-${course.color}-500/20 text-${course.color}-400 text-xs font-bold mb-4`}>
                    {course.badge}
                  </span>
                )}
                
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                    {course.icon}
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white">{course.title}</h1>
                    <p className="text-slate-400">{course.subtitle}</p>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  {course.description}
                </p>
                
                {/* Meta */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <BookOpen size={16} className={`text-${course.color}-400`} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Users size={16} className={`text-${course.color}-400`} />
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Bot size={16} className={`text-${course.color}-400`} />
                    <span>By {course.instructor}</span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 mb-6">
                  <h3 className="text-white font-bold mb-4">What you'll learn:</h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {course.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                        <Check size={16} className={`text-${course.color}-400 mt-0.5 flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Right: Purchase Card */}
              <div className="w-full md:w-80 sticky top-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl"
                >
                  {/* Price */}
                  <div className="text-center mb-6">
                    <p className={`text-${course.color}-400 text-xs font-semibold tracking-wider uppercase mb-2`}>
                      Launch Price
                    </p>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-4xl font-black text-white">{formatPrice(course.price)}</span>
                      {course.originalPrice > course.price && (
                        <span className="text-slate-500 line-through">{formatPrice(course.originalPrice)}</span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm mt-1">One-time • Lifetime access</p>
                  </div>
                  
                  {/* CTA */}
                  {userHasAccess ? (
                    <Link
                      to={course.chapters[0].path}
                      className={`w-full bg-gradient-to-r ${course.gradient} text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all`}
                    >
                      <Play size={18} />
                      Continue Learning
                    </Link>
                  ) : (
                    <>
                      <Link
                        to={`/checkout?course=${courseId}`}
                        className={`w-full bg-gradient-to-r ${course.gradient} text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all mb-3`}
                      >
                        Get Full Access
                        <ArrowRight size={18} />
                      </Link>
                      
                      <Link
                        to="/checkout?bundle=complete"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 text-sm transition-all"
                      >
                        <Gift size={16} className="text-purple-400" />
                        Bundle: {formatPrice(bundle.price)}
                        <span className="text-green-400 text-xs">Save ${bundle.savings}</span>
                      </Link>
                    </>
                  )}
                  
                  {/* Trust */}
                  <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-700/30">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Shield size={12} className="text-green-500" />
                      30-day guarantee
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Zap size={12} className="text-amber-500" />
                      Instant access
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Curriculum */}
        <section className="relative z-10 px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Course Curriculum</h2>
            
            <div className="space-y-3">
              {course.chapters.map((chapter, index) => {
                const isAccessible = chapter.free || userHasAccess;
                
                return (
                  <motion.div
                    key={chapter.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {isAccessible ? (
                      <Link
                        to={chapter.path}
                        className={`flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-${course.color}-500/50 hover:bg-slate-900/80 transition-all group`}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium group-hover:text-${course.color}-400 transition-colors">
                            {chapter.title}
                          </h3>
                          {chapter.tools && (
                            <p className="text-slate-500 text-xs mt-1">
                              Tools: {chapter.tools.join(', ')}
                            </p>
                          )}
                        </div>
                        {chapter.free && (
                          <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium">
                            FREE
                          </span>
                        )}
                        <ChevronRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 opacity-60">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-slate-400 font-medium">{chapter.title}</h3>
                          {chapter.tools && (
                            <p className="text-slate-600 text-xs mt-1">
                              Tools: {chapter.tools.join(', ')}
                            </p>
                          )}
                        </div>
                        <Lock size={16} className="text-slate-600" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        {course.testimonials && course.testimonials.length > 0 && (
          <section className="relative z-10 px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-8">What Students Say</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {course.testimonials.map((testimonial, i) => (
                  <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="text-white font-medium">{testimonial.name}</p>
                      <p className="text-slate-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Final CTA */}
        {!userHasAccess && (
          <section className="relative z-10 px-6 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to hire your AI {course.id === 'business' ? 'team' : 'agents'}?
              </h2>
              <p className="text-slate-400 mb-8">
                Start with the free chapters. See how it works. Then decide.
              </p>
              <Link
                to={course.chapters.find(c => c.free)?.path || `/checkout?course=${courseId}`}
                className={`inline-flex items-center gap-2 bg-gradient-to-r ${course.gradient} text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all`}
              >
                <Play size={20} />
                Start Free Preview
                <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default CourseDetail;

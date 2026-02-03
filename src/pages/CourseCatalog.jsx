import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRight, Check, Sparkles, Clock, Users, Shield, 
  Zap, BookOpen, Star, Gift, TrendingUp, Bot
} from 'lucide-react';
import { COURSES, BUNDLES, formatPrice } from '../config/courses';

// Course Card Component
const CourseCard = ({ course, index }) => {
  const isNew = course.badge === 'NEW';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-slate-900/80 backdrop-blur-xl border ${course.borderColor} rounded-2xl p-6 md:p-8 hover:border-opacity-60 transition-all hover:shadow-2xl hover:shadow-${course.color}-500/10 group`}
    >
      {/* Badge */}
      {isNew && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
          NEW
        </div>
      )}
      
      {/* Icon & Title */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-3xl shadow-lg`}>
          {course.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{course.title}</h3>
          <p className="text-slate-400 text-sm">{course.subtitle}</p>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-slate-300 mb-6 leading-relaxed">
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
          <span>{course.instructor}</span>
        </div>
      </div>
      
      {/* Features */}
      <ul className="space-y-2 mb-6">
        {course.features.slice(0, 4).map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
            <Check size={16} className={`text-${course.color}-400 mt-0.5 flex-shrink-0`} />
            {feature}
          </li>
        ))}
      </ul>
      
      {/* Pricing */}
      <div className="flex items-baseline gap-3 mb-6">
        <span className={`text-3xl font-black text-${course.color}-400`}>
          {formatPrice(course.price)}
        </span>
        {course.originalPrice > course.price && (
          <span className="text-slate-500 line-through text-lg">
            {formatPrice(course.originalPrice)}
          </span>
        )}
        <span className="text-slate-500 text-sm">one-time</span>
      </div>
      
      {/* CTA */}
      <Link
        to={`/courses/${course.id}`}
        className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white py-3 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02]`}
      >
        View Course
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Link>
      
      {/* Free preview note */}
      <p className="text-center text-slate-500 text-xs mt-3">
        Preview first chapters free • 30-day money-back guarantee
      </p>
    </motion.div>
  );
};

// Bundle Card Component
const BundleCard = ({ bundle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 md:p-8"
    >
      {/* Savings Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
        Save ${bundle.savings}
      </div>
      
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">{bundle.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{bundle.title}</h3>
        <p className="text-slate-400">{bundle.subtitle}</p>
      </div>
      
      {/* Included Courses */}
      <div className="flex justify-center gap-4 mb-6">
        {bundle.courses.map(courseId => {
          const course = COURSES[courseId];
          return (
            <div key={courseId} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${course.bgColor} border ${course.borderColor}`}>
              <span>{course.icon}</span>
              <span className="text-sm font-medium text-white">{course.title}</span>
            </div>
          );
        })}
      </div>
      
      {/* Pricing */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-3">
          <span className="text-4xl font-black text-white">{formatPrice(bundle.price)}</span>
          <span className="text-slate-500 line-through text-xl">{formatPrice(bundle.originalPrice)}</span>
        </div>
        <p className="text-slate-400 text-sm mt-1">Both courses • Lifetime access</p>
      </div>
      
      {/* CTA */}
      <Link
        to="/checkout?bundle=complete"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 hover:scale-[1.02]"
      >
        <Gift size={20} />
        Get the Bundle
        <ArrowRight size={18} />
      </Link>
    </motion.div>
  );
};

// Main Component
const CourseCatalog = () => {
  const courses = Object.values(COURSES);
  const bundle = BUNDLES.complete;
  
  return (
    <>
      <Helmet>
        <title>Agentic AI Home — Master AI for Life & Business</title>
        <meta name="description" content="Learn to build AI agents that work for you 24/7. Courses for personal productivity and small business automation. No coding required." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#0a1628] to-slate-950">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500 rounded-full blur-[150px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500 rounded-full blur-[150px]"
          />
        </div>
        
        {/* Hero Section */}
        <section className="relative z-10 px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-900/30 border border-teal-500/30 text-teal-400 text-sm font-medium mb-6">
                <Sparkles size={16} />
                AI Courses for Real People
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Stop Doing Everything.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-400">
                  Start Delegating to AI.
                </span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                Build AI agents that handle your boring stuff — at home and at work.
                <br />
                <span className="text-white font-semibold">No coding. No tech skills. Just results.</span>
              </p>
              
              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-teal-400" />
                  <span>Save <span className="text-white font-bold">5+ hours/week</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-400" />
                  <span><span className="text-white font-bold">30-day</span> money-back</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-amber-400" />
                  <span><span className="text-white font-bold">Lifetime</span> access</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Course Cards */}
        <section className="relative z-10 px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {courses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Bundle Section */}
        <section className="relative z-10 px-6 pb-16">
          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Want Both?</h2>
              <p className="text-slate-400">Master AI for your entire life — personal and professional</p>
            </motion.div>
            <BundleCard bundle={bundle} />
          </div>
        </section>
        
        {/* Social Proof / About Section */}
        <section className="relative z-10 px-6 pb-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-amber-500 mx-auto mb-6 flex items-center justify-center text-3xl">
                👨‍⚕️
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Built by Someone Who Actually Uses This</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                I'm Dr. Nate Hubert — an endodontic resident, dad of two toddlers, and founder of 4 online businesses.
                I don't have time. But I have an AI assistant that monitors my sites, handles customer emails, 
                tracks payments, and sends me morning briefings.
              </p>
              <p className="text-slate-400 text-sm">
                This isn't theory. This is what I do every day. And I'll show you exactly how.
              </p>
              
              {/* Business logos/names */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-slate-700/50">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">DentDx</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">HoopLog</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">FitRate</span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs">+ This Site</span>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Footer CTA */}
        <section className="relative z-10 px-6 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to hire your first AI employee?
            </h2>
            <p className="text-slate-400 mb-8">
              Start with a free preview. See how it works. Then decide.
            </p>
            <Link
              to="/courses/business"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg hover:scale-[1.02]"
            >
              <TrendingUp size={20} />
              Start with AI for Business
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default CourseCatalog;

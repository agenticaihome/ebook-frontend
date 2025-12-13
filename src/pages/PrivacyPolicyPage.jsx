import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

const PrivacyPolicyPage = () => {
    const lastUpdated = "December 13, 2024";

    return (
        <WebbookLayout>
            <Helmet>
                <title>Privacy Policy | Agentic AI Home</title>
                <meta name="description" content="Privacy Policy for Agentic AI Home. Learn how we collect, use, and protect your personal information." />
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="min-h-screen bg-[#0a0a12] text-slate-300 py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
                            <ArrowLeft size={18} />
                            Back to Home
                        </Link>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center">
                                <Shield className="text-teal-400" size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-white">Privacy Policy</h1>
                                <p className="text-slate-400 text-sm">Last Updated: {lastUpdated}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-slate max-w-none space-y-8">

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">1. Introduction</h2>
                            <p>
                                Agentic AI Home ("we," "our," or "us") operates the website located at agenticaihome.com (the "Site").
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our Site and use our services.
                            </p>
                            <p>
                                By accessing or using the Site, you agree to this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">2. Information We Collect</h2>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">2.1 Personal Information</h3>
                            <p>We may collect personal information that you voluntarily provide when you:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Create an account (email address, password)</li>
                                <li>Make a purchase (payment information processed by third parties)</li>
                                <li>Subscribe to our newsletter (email address)</li>
                                <li>Contact our support team (email address, message content)</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">2.2 Automatically Collected Information</h3>
                            <p>When you access the Site, we may automatically collect:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Device information (browser type, operating system)</li>
                                <li>IP address (anonymized for analytics)</li>
                                <li>Usage data (pages viewed, time spent, navigation patterns)</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">2.3 Information NOT Collected</h3>
                            <p>We do NOT collect:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Social Security numbers or government IDs</li>
                                <li>Full credit card numbers (handled by Stripe)</li>
                                <li>Biometric data</li>
                                <li>Location data beyond general geographic region</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">3. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process transactions and send related information</li>
                                <li>Send administrative messages (account confirmation, password resets)</li>
                                <li>Respond to customer service requests</li>
                                <li>Analyze usage patterns to improve user experience</li>
                                <li>Detect and prevent fraudulent activity</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">4. Third-Party Services</h2>
                            <p>We use the following third-party services that may collect information:</p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">4.1 Payment Processors</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Stripe:</strong> Processes credit/debit card payments. Stripe's privacy policy is available at <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">stripe.com/privacy</a></li>
                                <li><strong>Ergo Blockchain:</strong> For cryptocurrency payments, transactions are recorded on the public Ergo blockchain</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">4.2 Analytics</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Google Analytics:</strong> We use Google Analytics to understand how visitors interact with our Site. You can opt out using Google's opt-out browser add-on</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">4.3 Hosting</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Our Site is hosted on secure servers with industry-standard security measures</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">5. Cookies and Tracking</h2>
                            <p>We use cookies and similar technologies for:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Essential Cookies:</strong> Required for site functionality (login sessions, preferences)</li>
                                <li><strong>Analytics Cookies:</strong> Help us understand site usage</li>
                                <li><strong>Security Cookies:</strong> CSRF protection and fraud prevention</li>
                            </ul>
                            <p className="mt-4">
                                You can control cookies through your browser settings. Disabling cookies may affect site functionality.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">6. Data Security</h2>
                            <p>We implement appropriate technical and organizational measures to protect your information, including:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>HTTPS encryption for all data transmission</li>
                                <li>Secure password hashing (bcrypt)</li>
                                <li>Regular security audits and updates</li>
                                <li>Limited access to personal data on a need-to-know basis</li>
                            </ul>
                            <p className="mt-4">
                                However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">7. Data Retention</h2>
                            <p>We retain your personal information for as long as:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Your account remains active</li>
                                <li>Necessary to provide our services</li>
                                <li>Required by applicable law</li>
                                <li>Needed to resolve disputes or enforce agreements</li>
                            </ul>
                            <p className="mt-4">
                                You may request deletion of your account and associated data by contacting us at support@agenticaihome.com.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">8. Your Rights</h2>
                            <p>Depending on your location, you may have the right to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate personal information</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                <li><strong>Portability:</strong> Request your data in a machine-readable format</li>
                                <li><strong>Objection:</strong> Object to certain processing of your personal information</li>
                            </ul>
                            <p className="mt-4">
                                To exercise these rights, contact us at <a href="mailto:support@agenticaihome.com" className="text-teal-400 hover:underline">support@agenticaihome.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">9. Children's Privacy</h2>
                            <p>
                                Our Site is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
                                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">10. International Data Transfers</h2>
                            <p>
                                Your information may be transferred to and processed in countries other than your own.
                                These countries may have different data protection laws. By using our Site, you consent to such transfers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">11. Do Not Sell My Information</h2>
                            <p>
                                <strong>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</strong>
                            </p>
                            <p>
                                California residents: Under the California Consumer Privacy Act (CCPA), you have the right to opt out of the sale of your personal information.
                                Since we do not sell personal information, this right does not apply.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">12. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page
                                and updating the "Last Updated" date. Continued use of the Site after changes constitutes acceptance of the updated policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">13. Contact Us</h2>
                            <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-4">
                                <p className="font-bold text-white">Agentic AI Home</p>
                                <p>Email: <a href="mailto:support@agenticaihome.com" className="text-teal-400 hover:underline">support@agenticaihome.com</a></p>
                            </div>
                        </section>

                    </div>

                    {/* Footer spacer for mobile nav */}
                    <div className="h-24 md:hidden" />
                </div>
            </div>
        </WebbookLayout>
    );
};

export default PrivacyPolicyPage;

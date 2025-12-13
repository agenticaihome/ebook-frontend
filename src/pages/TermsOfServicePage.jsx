import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';
import WebbookLayout from '../components/layout/WebbookLayout';

const TermsOfServicePage = () => {
    const lastUpdated = "December 13, 2024";
    const effectiveDate = "December 13, 2024";

    return (
        <WebbookLayout>
            <Helmet>
                <title>Terms of Service | Agentic AI Home</title>
                <meta name="description" content="Terms of Service for Agentic AI Home. Read our terms and conditions before using our services." />
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
                                <FileText className="text-teal-400" size={24} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-white">Terms of Service</h1>
                                <p className="text-slate-400 text-sm">Last Updated: {lastUpdated}</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-invert prose-slate max-w-none space-y-8">

                        <section className="bg-slate-800/30 p-6 rounded-xl border border-slate-700">
                            <p className="text-white font-medium">
                                PLEASE READ THESE TERMS OF SERVICE CAREFULLY. BY ACCESSING OR USING OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS.
                                IF YOU DO NOT AGREE TO ALL OF THESE TERMS, DO NOT ACCESS OR USE OUR SERVICES.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">1. Agreement to Terms</h2>
                            <p>
                                These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and
                                Agentic AI Home ("Company," "we," "us," or "our") governing your access to and use of agenticaihome.com (the "Site")
                                and all related content, services, and products.
                            </p>
                            <p>
                                By accessing or using the Site, you represent that you are at least 18 years of age or have the legal capacity to
                                enter into binding contracts in your jurisdiction. If you are accessing the Site on behalf of an organization,
                                you represent that you have the authority to bind that organization to these Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">2. Description of Services</h2>
                            <p>Agentic AI Home provides:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>An interactive webbook teaching AI agent implementation for personal productivity</li>
                                <li>Downloadable templates, guides, and educational materials</li>
                                <li>Interactive games and learning tools</li>
                                <li>Access to user accounts and progress tracking</li>
                            </ul>
                            <p className="mt-4">
                                The content is educational in nature and provides general guidance. Results may vary based on individual implementation.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">3. Account Registration</h2>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">3.1 Account Creation</h3>
                            <p>
                                To access certain features, you must create an account. You agree to provide accurate, current, and complete information
                                and to update such information to keep it accurate, current, and complete.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">3.2 Account Security</h3>
                            <p>
                                You are responsible for safeguarding your password and for all activities under your account.
                                You agree to notify us immediately of any unauthorized use of your account.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">3.3 Account Termination</h3>
                            <p>
                                We reserve the right to suspend or terminate your account at our sole discretion for violation of these Terms
                                or for any conduct we deem harmful to the Site or other users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">4. Purchases and Payment</h2>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">4.1 Pricing</h3>
                            <p>
                                All prices are displayed in United States Dollars (USD) unless otherwise indicated.
                                We reserve the right to change prices at any time without notice.
                                Price changes will not affect orders already placed and confirmed.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">4.2 Payment Methods</h3>
                            <p>We accept the following payment methods:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Credit/Debit Cards:</strong> Processed securely through Stripe</li>
                                <li><strong>Cryptocurrency:</strong> Ergo (ERG) payments processed via blockchain</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">4.3 Order Confirmation</h3>
                            <p>
                                Upon successful payment, you will receive confirmation and immediate access to purchased content.
                                This constitutes acceptance of your order and a binding contract.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">4.4 Taxes</h3>
                            <p>
                                You are responsible for any applicable taxes, including sales tax, value-added tax, or other taxes
                                as required by your jurisdiction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">5. Refund Policy</h2>
                            <p>
                                <strong>30-Day Satisfaction Guarantee:</strong> We offer a full refund within 30 days of purchase if you are not satisfied with our services.
                            </p>
                            <p className="mt-4">To request a refund:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Contact us at <a href="mailto:support@agenticaihome.com" className="text-teal-400 hover:underline">support@agenticaihome.com</a></li>
                                <li>Include your order confirmation or transaction ID</li>
                                <li>Submit your request within 30 days of original purchase</li>
                            </ul>
                            <p className="mt-4">
                                Refunds for credit/debit card purchases will be credited to the original payment method.
                                Cryptocurrency refunds will be issued in the same cryptocurrency at the exchange rate at the time of refund.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">6. Intellectual Property Rights</h2>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">6.1 Our Content</h3>
                            <p>
                                All content on the Site, including but not limited to text, graphics, logos, images, audio, video, software,
                                and compilation thereof, is the exclusive property of Agentic AI Home or its licensors and is protected by
                                United States and international copyright, trademark, and other intellectual property laws.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">6.2 License to Use</h3>
                            <p>
                                Upon purchase, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use
                                the purchased content for your personal, non-commercial use. This license does not include:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Reselling or redistributing content</li>
                                <li>Commercial use without written permission</li>
                                <li>Modifying or creating derivative works</li>
                                <li>Removing copyright or proprietary notices</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">6.3 Templates</h3>
                            <p>
                                Templates and prompts provided for personal use may be used, modified, and adapted for your own personal
                                or professional productivity. You may not sell, license, or distribute these templates as standalone products.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">7. User Conduct</h2>
                            <p>You agree NOT to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Use the Site for any unlawful purpose or in violation of any applicable laws</li>
                                <li>Attempt to gain unauthorized access to any portion of the Site</li>
                                <li>Interfere with or disrupt the operation of the Site</li>
                                <li>Transmit viruses, malware, or other harmful code</li>
                                <li>Engage in data mining, scraping, or similar data gathering activities</li>
                                <li>Share account credentials with others</li>
                                <li>Impersonate any person or entity</li>
                                <li>Harass, abuse, or harm another person or entity</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">8. Third-Party Services and AI Tools</h2>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">8.1 External AI Services</h3>
                            <p>
                                Our educational content references third-party AI services (such as ChatGPT, Claude, Gemini, etc.).
                                We are not affiliated with these services and are not responsible for their availability, functionality,
                                pricing, or terms of service. Your use of third-party AI services is subject to their respective terms.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">8.2 No Endorsement</h3>
                            <p>
                                Reference to any third-party products, services, or websites does not constitute endorsement.
                                We make no representations regarding third-party services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">9. Disclaimers</h2>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">9.1 "As Is" Basis</h3>
                            <p className="uppercase font-semibold text-sm">
                                THE SITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
                                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
                                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">9.2 No Guaranteed Results</h3>
                            <p>
                                We make no representations or guarantees regarding specific outcomes, time savings, or results from using our content.
                                Individual results may vary based on effort, implementation, and external factors beyond our control.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">9.3 Educational Purpose Only</h3>
                            <p>
                                Content is for educational and informational purposes only. It is not professional, legal, financial, or medical advice.
                                Consult appropriate professionals for specific situations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">10. Limitation of Liability</h2>
                            <p className="uppercase font-semibold text-sm">
                                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL AGENTIC AI HOME, ITS OFFICERS, DIRECTORS,
                                EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY
                                DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE
                                LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SITE OR SERVICES.
                            </p>
                            <p className="mt-4">
                                In no event shall our total liability to you for all claims exceed the amount you paid us in the twelve (12)
                                months preceding the claim, or $100, whichever is greater.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">11. Indemnification</h2>
                            <p>
                                You agree to indemnify, defend, and hold harmless Agentic AI Home and its affiliates, officers, directors,
                                employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses
                                (including reasonable attorneys' fees) arising out of or relating to:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Your violation of these Terms</li>
                                <li>Your use of the Site or services</li>
                                <li>Your violation of any rights of another party</li>
                                <li>Your violation of any applicable law</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">12. Governing Law and Dispute Resolution</h2>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">12.1 Governing Law</h3>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the United States,
                                without regard to conflict of law principles.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">12.2 Informal Resolution</h3>
                            <p>
                                Before filing any formal dispute, you agree to attempt to resolve disputes informally by contacting us at
                                support@agenticaihome.com. We will attempt to resolve disputes within 30 days of receiving notice.
                            </p>

                            <h3 className="text-lg font-semibold text-teal-400 mt-4">12.3 Arbitration</h3>
                            <p>
                                Any dispute not resolved informally shall be resolved by binding arbitration conducted in accordance with
                                the rules of the American Arbitration Association. You agree to waive any right to participate in class actions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">13. Modifications to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Site
                                with an updated "Last Updated" date. Your continued use of the Site after any changes constitutes acceptance
                                of the modified Terms.
                            </p>
                            <p className="mt-4">
                                We encourage you to review these Terms periodically for any changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">14. Severability</h2>
                            <p>
                                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited
                                or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">15. Entire Agreement</h2>
                            <p>
                                These Terms, together with our Privacy Policy, constitute the entire agreement between you and Agentic AI Home
                                regarding your use of the Site and supersede all prior agreements and understandings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-2">16. Contact Information</h2>
                            <p>For questions about these Terms of Service, please contact us at:</p>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 mt-4">
                                <p className="font-bold text-white">Agentic AI Home</p>
                                <p>Email: <a href="mailto:support@agenticaihome.com" className="text-teal-400 hover:underline">support@agenticaihome.com</a></p>
                            </div>
                        </section>

                        <section className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 mt-8">
                            <p className="text-sm text-slate-400">
                                <strong className="text-white">Effective Date:</strong> {effectiveDate}
                            </p>
                            <p className="text-sm text-slate-400 mt-2">
                                By using Agentic AI Home, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                            </p>
                        </section>

                    </div>

                    {/* Footer spacer for mobile nav */}
                    <div className="h-24 md:hidden" />
                </div>
            </div>
        </WebbookLayout>
    );
};

export default TermsOfServicePage;

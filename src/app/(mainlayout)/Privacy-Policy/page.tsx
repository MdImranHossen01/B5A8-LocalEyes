// src/app/(mainlayout)/Privacy-Policy/page.tsx
import { Metadata } from 'next';
import { Shield, Lock, Eye, UserCheck, Database, Mail, Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - Local Guide Platform',
  description: 'Learn how we protect your privacy and handle your personal information on LocalEyes.',
};

const PrivacyPolicyPage = () => {
  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your privacy is our priority. Learn how we protect and handle your information.
            </p>
            <div className="mt-6 text-blue-200">
              <p>Last Updated: {lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                {[
                  { id: 'introduction', label: 'Introduction' },
                  { id: 'data-collection', label: 'Data We Collect' },
                  { id: 'data-use', label: 'How We Use Data' },
                  { id: 'data-sharing', label: 'Data Sharing' },
                  { id: 'user-rights', label: 'Your Rights' },
                  { id: 'cookies', label: 'Cookies & Tracking' },
                  { id: 'security', label: 'Security Measures' },
                  { id: 'children', label: "Children's Privacy" },
                  { id: 'changes', label: 'Policy Changes' },
                  { id: 'contact', label: 'Contact Us' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Privacy Principles</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Lock className="w-4 h-4 text-green-500 mr-2" />
                    <span>Transparency</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Eye className="w-4 h-4 text-green-500 mr-2" />
                    <span>Data Minimization</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <UserCheck className="w-4 h-4 text-green-500 mr-2" />
                    <span>User Control</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Database className="w-4 h-4 text-green-500 mr-2" />
                    <span>Secure Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              {/* Introduction */}
              <section id="introduction" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Welcome to LocalEyes. We are committed to protecting your privacy 
                  and ensuring you have a positive experience when using our platform to connect with local 
                  guides and authentic experiences.
                </p>
                <p className="text-gray-700">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you visit our website or use our services. Please read this privacy policy carefully. 
                  If you do not agree with the terms of this privacy policy, please do not access the site.
                </p>
              </section>

              {/* Data Collection */}
              <section id="data-collection" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Information We Collect</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                    <p className="text-gray-700 mb-3">We collect information you provide directly to us:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li><strong>Account Information:</strong> Name, email address, password, profile picture</li>
                      <li><strong>Profile Information:</strong> Bio, languages spoken, expertise, travel preferences</li>
                      <li><strong>Contact Information:</strong> Phone number, address (for guides)</li>
                      <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely by Stripe)</li>
                      <li><strong>Communication:</strong> Messages between users, support requests</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                    <p className="text-gray-700 mb-3">When you access our services:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                      <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                      <li><strong>Location Data:</strong> Approximate location (city-level) for tour recommendations</li>
                      <li><strong>Cookies & Tracking:</strong> See section 6 for details</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Information from Other Sources</h3>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>Social media platforms (when you connect your account)</li>
                      <li>Payment processors (transaction status, payment method)</li>
                      <li>Background check services (for guide verification)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Use */}
              <section id="data-use" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. How We Use Your Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {[
                    {
                      title: 'Service Delivery',
                      description: 'Create and manage your account, process bookings, facilitate payments',
                      icon: '✅'
                    },
                    {
                      title: 'Communication',
                      description: 'Send booking confirmations, updates, and customer support',
                      icon: '📧'
                    },
                    {
                      title: 'Personalization',
                      description: 'Recommend tours based on your interests and location',
                      icon: '🎯'
                    },
                    {
                      title: 'Safety & Security',
                      description: 'Verify identities, prevent fraud, ensure platform safety',
                      icon: '🛡️'
                    },
                    {
                      title: 'Improvement',
                      description: 'Analyze usage patterns to enhance user experience',
                      icon: '📈'
                    },
                    {
                      title: 'Legal Compliance',
                      description: 'Comply with legal obligations and enforce our terms',
                      icon: '⚖️'
                    },
                  ].map((use) => (
                    <div key={use.title} className="bg-gray-50 p-5 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{use.icon}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{use.title}</h4>
                          <p className="text-sm text-gray-600">{use.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Legal Basis for Processing</h4>
                  <p className="text-blue-800">
                    We process your personal information based on: (1) your consent, (2) contractual necessity, 
                    (3) legal obligations, and (4) legitimate interests that are not overridden by your data 
                    protection interests.
                  </p>
                </div>
              </section>

              {/* Data Sharing */}
              <section id="data-sharing" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. How We Share Your Information</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">With Other Users</h3>
                    <p className="text-gray-700 mb-3">For a functional booking platform:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li><strong>Tourists to Guides:</strong> Name, profile picture, contact info for confirmed bookings</li>
                      <li><strong>Guides to Tourists:</strong> Guide profile, expertise, reviews, contact info</li>
                      <li><strong>Reviews:</strong> Your name and profile picture with reviews you write</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">With Service Providers</h3>
                    <p className="text-gray-700 mb-3">We share information with trusted third parties:</p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li><strong>Payment Processors:</strong> Stripe for secure payment processing</li>
                      <li><strong>Hosting Providers:</strong> AWS for secure data storage</li>
                      <li><strong>Communication Tools:</strong> SendGrid for email delivery</li>
                      <li><strong>Analytics Services:</strong> Google Analytics (anonymized data)</li>
                      <li><strong>Background Check Services:</strong> For guide verification</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                    <p className="text-gray-700">
                      We may disclose your information if required by law, such as to comply with a subpoena 
                      or similar legal process, or when we believe in good faith that disclosure is necessary 
                      to protect our rights, protect your safety or the safety of others, investigate fraud, 
                      or respond to a government request.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">What We Never Sell</h3>
                    <p className="text-green-800">
                      <strong>We never sell your personal information to third parties.</strong> We do not 
                      rent or sell your personal information for marketing purposes.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Rights */}
              <section id="user-rights" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Your Privacy Rights</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { right: 'Access', desc: 'Request copies of your personal data' },
                      { right: 'Rectification', desc: 'Request correction of inaccurate data' },
                      { right: 'Erasure', desc: 'Request deletion of your personal data' },
                      { right: 'Restriction', desc: 'Request restriction of processing' },
                      { right: 'Portability', desc: 'Request transfer of data to another organization' },
                      { right: 'Objection', desc: 'Object to processing of your personal data' },
                    ].map((item) => (
                      <div key={item.right} className="bg-gray-50 p-5 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-1">{item.right}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">How to Exercise Your Rights</h3>
                    <p className="text-yellow-800 mb-4">
                      To exercise any of these rights, please contact us at privacy@localeyes.com. 
                      We will respond to your request within 30 days.
                    </p>
                    <p className="text-yellow-800">
                      You also have the right to complain to a data protection authority about our 
                      collection and use of your personal information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  6. Cookies & Tracking Technologies
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Types of Cookies We Use</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Essential Cookies</h4>
                        <p className="text-gray-700 text-sm">
                          Required for the website to function (login, security, shopping cart)
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Performance Cookies</h4>
                        <p className="text-gray-700 text-sm">
                          Collect anonymous data to improve website performance
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Functionality Cookies</h4>
                        <p className="text-gray-700 text-sm">
                          Remember your preferences (language, location, theme)
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Advertising Cookies</h4>
                        <p className="text-gray-700 text-sm">
                          Show relevant advertisements (you can opt out)
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Cookie Management</h3>
                    <p className="text-blue-800 mb-4">
                      You can control cookies through your browser settings. Most browsers allow you to 
                      refuse cookies or delete them. However, disabling essential cookies may affect 
                      website functionality.
                    </p>
                    <div className="flex items-center space-x-4">
                      <Cookie className="w-5 h-5 text-blue-700" />
                      <span className="text-blue-800 font-medium">
                        Our cookie consent banner allows you to customize your preferences
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section id="security" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Data Security</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Our Security Measures</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        '256-bit SSL encryption for data in transit',
                        'AES-256 encryption for data at rest',
                        'Regular security audits and penetration testing',
                        'Multi-factor authentication for admin access',
                        'Secure password hashing (bcrypt)',
                        'Regular security training for employees',
                        'Role-based access control',
                        'DDoS protection and monitoring',
                      ].map((measure, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <Lock className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{measure}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-2">Data Retention</h3>
                    <p className="text-yellow-800">
                      We retain your personal information only for as long as necessary to fulfill the 
                      purposes outlined in this Privacy Policy, unless a longer retention period is required 
                      or permitted by law.
                    </p>
                    <ul className="list-disc pl-6 text-yellow-800 mt-3 space-y-1">
                      <li>Account data: Until account deletion request</li>
                      <li>Transaction records: 7 years for tax purposes</li>
                      <li>Inactive accounts: Deleted after 2 years of inactivity</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Children's Privacy */}
              <section id="children" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
                <div className="bg-pink-50 p-6 rounded-lg">
                  <p className="text-pink-800">
                    Our services are not directed to individuals under the age of 16. We do not knowingly 
                    collect personal information from children under 16. If you become aware that a child 
                    has provided us with personal information, please contact us. If we become aware that 
                    we have collected personal information from a child under 16, we will take steps to 
                    delete such information.
                  </p>
                </div>
              </section>

              {/* Policy Changes */}
              <section id="changes" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Policy</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-3">
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                  </p>
                  <p className="text-gray-700">
                    You are advised to review this Privacy Policy periodically for any changes. Changes to 
                    this Privacy Policy are effective when they are posted on this page.
                  </p>
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Contact Us</h2>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0">
                      <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Privacy Questions</h3>
                      <p className="text-gray-700 mb-4">
                        If you have any questions about this Privacy Policy, please contact our Data Protection Officer.
                      </p>
                      <div className="space-y-2">
                        <p className="text-gray-900 font-medium">Email: privacy@localeyes.com</p>
                        <p className="text-gray-900 font-medium">Phone: +1 (555) 123-4567</p>
                        <p className="text-gray-900 font-medium">Address: 123 Privacy Lane, San Francisco, CA 94107</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Data Protection Officer</h4>
                    <p className="text-gray-700 mb-4">
                      Our Data Protection Officer (DPO) oversees compliance with data protection laws 
                      and can be contacted directly for privacy concerns.
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Alex Johnson</p>
                        <p className="text-sm text-gray-600">Data Protection Officer</p>
                        <p className="text-sm text-blue-600">dpo@localeyes.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Promise</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {[
                  {
                    title: 'Transparency',
                    desc: 'Clear explanation of data practices',
                    icon: '🔍'
                  },
                  {
                    title: 'Control',
                    desc: 'You decide how your data is used',
                    icon: '🎮'
                  },
                  {
                    title: 'Security',
                    desc: 'Enterprise-grade protection',
                    icon: '🛡️'
                  },
                ].map((item) => (
                  <div key={item.title} className="text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-gray-700 mb-4">
                  We&apos;re committed to protecting your privacy while delivering amazing local experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/contact" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Contact Privacy Team
                  </a>
                  <a 
                    href="/terms" 
                    className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    View Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600">
          <p className="mb-2">
            This Privacy Policy complies with GDPR, CCPA, and other global privacy regulations.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} LocalEyes. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
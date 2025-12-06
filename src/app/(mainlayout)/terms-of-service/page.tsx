// src/app/(mainlayout)/terms-of-service/page.tsx
import { Metadata } from 'next';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Ban, DollarSign, UserCheck, Globe, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - Local Guide Platform',
  description: 'Terms and conditions governing the use of LocalEyes platform for travelers and guides.',
};

const TermsOfServicePage = () => {
  const effectiveDate = "December 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Scale className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Please read these terms carefully before using LocalEyes platform
            </p>
            <div className="mt-6 text-blue-200">
              <p>Effective Date: {effectiveDate}</p>
              <p className="text-sm mt-2">By using our services, you agree to these terms</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Summary</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              This summary highlights key terms but doesn&apos;t replace the full agreement below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: <UserCheck className="w-6 h-6 text-blue-600" />,
                title: 'Account Responsibility',
                desc: 'You are responsible for your account security and content'
              },
              {
                icon: <DollarSign className="w-6 h-6 text-green-600" />,
                title: 'Payment Terms',
                desc: 'All fees are non-refundable except as specified'
              },
              {
                icon: <Shield className="w-6 h-6 text-purple-600" />,
                title: 'Safety First',
                desc: 'Follow safety guidelines and respect local laws'
              },
              {
                icon: <Ban className="w-6 h-6 text-red-600" />,
                title: 'Prohibited Content',
                desc: 'No illegal, dangerous, or inappropriate activities'
              },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Important Legal Notice</h3>
                <p className="text-yellow-800">
                  These Terms of Service constitute a legally binding agreement between you and LocalEyes. 
                  By accessing or using our platform, you acknowledge that you have read, understood, and 
                  agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {[
                  { id: 'agreement', label: '1. Agreement' },
                  { id: 'definitions', label: '2. Definitions' },
                  { id: 'eligibility', label: '3. Eligibility' },
                  { id: 'accounts', label: '4. Accounts' },
                  { id: 'services', label: '5. Services' },
                  { id: 'tourist-obligations', label: '6. Tourist Obligations' },
                  { id: 'guide-obligations', label: '7. Guide Obligations' },
                  { id: 'booking-payments', label: '8. Bookings & Payments' },
                  { id: 'cancellation-refunds', label: '9. Cancellations & Refunds' },
                  { id: 'reviews-content', label: '10. Reviews & Content' },
                  { id: 'prohibited-activities', label: '11. Prohibited Activities' },
                  { id: 'liability-disclaimer', label: '12. Liability Disclaimer' },
                  { id: 'intellectual-property', label: '13. Intellectual Property' },
                  { id: 'termination', label: '14. Termination' },
                  { id: 'governing-law', label: '15. Governing Law' },
                  { id: 'disputes', label: '16. Dispute Resolution' },
                  { id: 'changes', label: '17. Changes to Terms' },
                  { id: 'contact', label: '18. Contact Information' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Key Documents</h4>
                <div className="space-y-2">
                  <a 
                    href="/Privacy-Policy" 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy Policy
                  </a>
                  <a 
                    href="/community-guidelines" 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Community Guidelines
                  </a>
                  <a 
                    href="/cookie-policy" 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Cookie className="w-4 h-4 mr-2" />
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* 1. Agreement */}
              <section id="agreement" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-blue-600" />
                  1. Agreement to Terms
                </h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
                    These Terms of Service (&quot;Terms&quot;) govern your access to and use of the LocalEyes 
                    website, mobile application, and services (collectively, the &quot;Platform&quot;). 
                    Please read these Terms carefully before using our Platform.
                  </p>
                  <p className="mb-4">
                    By accessing or using the Platform, you agree to be bound by these Terms and our 
                    Privacy Policy. If you do not agree to these Terms, you may not access or use the Platform.
                  </p>
                  <div className="bg-blue-50 p-5 rounded-lg my-4">
                    <p className="font-medium text-blue-900">
                      These Terms apply to all users of the Platform, including tourists, guides, and 
                      any other visitors to our website or application.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. Definitions */}
              <section id="definitions" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Definitions</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="font-semibold text-gray-900">Platform</dt>
                      <dd className="text-gray-700 mb-3">The LocalEyes website, mobile apps, and related services</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Tourist</dt>
                      <dd className="text-gray-700 mb-3">A user who books tours or experiences through the Platform</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Guide</dt>
                      <dd className="text-gray-700 mb-3">A verified user who offers tours or experiences through the Platform</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Tour</dt>
                      <dd className="text-gray-700 mb-3">An experience or service offered by a Guide</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Booking</dt>
                      <dd className="text-gray-700 mb-3">A confirmed reservation for a Tour</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-900">Content</dt>
                      <dd className="text-gray-700 mb-3">Any information, text, images, or other materials posted on the Platform</dd>
                    </div>
                  </dl>
                </div>
              </section>

              {/* 3. Eligibility */}
              <section id="eligibility" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
                <div className="prose max-w-none text-gray-700 space-y-4">
                  <p>
                    To use the Platform, you must:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Be at least 18 years old</li>
                    <li>Have the legal capacity to enter into binding contracts</li>
                    <li>Not be prohibited from receiving our services under applicable laws</li>
                    <li>Provide accurate and complete registration information</li>
                  </ul>
                  <div className="bg-red-50 p-5 rounded-lg my-4">
                    <p className="font-medium text-red-900">
                      Guides must undergo verification and background checks before offering tours.
                      We reserve the right to refuse service to anyone at any time.
                    </p>
                  </div>
                </div>
              </section>

              {/* 4. Accounts */}
              <section id="accounts" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Account Registration</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Account Security</h3>
                    <p className="text-gray-700">
                      You are responsible for maintaining the confidentiality of your account credentials 
                      and for all activities that occur under your account. Notify us immediately of any 
                      unauthorized use of your account.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Account Accuracy</h3>
                    <p className="text-gray-700">
                      You must provide accurate, current, and complete information during registration 
                      and keep your account information updated. We reserve the right to suspend or 
                      terminate accounts with false information.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">One Account Per Person</h3>
                    <p className="text-gray-700">
                      You may only maintain one active account. Creating multiple accounts to circumvent 
                      restrictions or obtain additional benefits is strictly prohibited.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Services */}
              <section id="services" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Platform Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      What We Provide
                    </h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• Connection platform for tourists and guides</li>
                      <li>• Booking and payment processing</li>
                      <li>• User verification and background checks</li>
                      <li>• Review and rating system</li>
                      <li>• Customer support services</li>
                      <li>• Marketing and promotion of tours</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      What We Don&apos;t Provide
                    </h3>
                    <ul className="space-y-2 text-yellow-800">
                      <li>• Employment or agency relationship</li>
                      <li>• Insurance coverage for tours</li>
                      <li>• Guarantee of tour quality or safety</li>
                      <li>• Transportation or equipment</li>
                      <li>• Legal or tax advice</li>
                      <li>• Warranty for third-party services</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 bg-gray-50 p-5 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Disclaimer:</strong> LocalEyes is a marketplace platform. We do not own, 
                    create, sell, resell, provide, control, manage, offer, deliver, or supply any tours. 
                    Guides are independent contractors, not employees or agents of LocalEyes.
                  </p>
                </div>
              </section>

              {/* 6. Tourist Obligations */}
              <section id="tourist-obligations" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Tourist Responsibilities</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Accurate Information',
                      desc: 'Provide accurate booking information and special requirements'
                    },
                    {
                      title: 'Timely Arrival',
                      desc: 'Arrive on time for booked tours with necessary documents'
                    },
                    {
                      title: 'Respect & Courtesy',
                      desc: 'Treat guides and fellow travelers with respect and courtesy'
                    },
                    {
                      title: 'Safety Compliance',
                      desc: 'Follow all safety instructions and local laws during tours'
                    },
                    {
                      title: 'Payment Obligations',
                      desc: 'Pay all fees promptly and in accordance with these Terms'
                    },
                    {
                      title: 'Review Accuracy',
                      desc: 'Provide honest, fair, and accurate reviews of experiences'
                    },
                  ].map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. Guide Obligations */}
              <section id="guide-obligations" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Guide Responsibilities</h2>
                <div className="bg-green-50 p-6 rounded-lg mb-6">
                  <h3 className="font-semibold text-green-900 mb-3">Professional Standards</h3>
                  <p className="text-green-800 mb-4">
                    Guides must maintain high professional standards and comply with all applicable laws 
                    and regulations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-900 mb-2">Required</h4>
                      <ul className="text-green-800 space-y-1">
                        <li>• Valid permits and licenses</li>
                        <li>• Professional liability insurance</li>
                        <li>• First aid certification</li>
                        <li>• Accurate tour descriptions</li>
                        <li>• Timely communication</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900 mb-2">Prohibited</h4>
                      <ul className="text-green-800 space-y-1">
                        <li>• Misleading information</li>
                        <li>• Discrimination of any kind</li>
                        <li>• Unprofessional conduct</li>
                        <li>• Safety violations</li>
                        <li>• Solicitation outside platform</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* 8. Bookings & Payments */}
              <section id="booking-payments" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3 text-green-600" />
                  8. Bookings & Payments
                </h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Booking Process</h3>
                    <p className="text-gray-700 mb-3">
                      When you book a tour, you enter into a direct contract with the Guide. 
                      LocalEyes facilitates the booking but is not a party to this contract.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Booking requests must be confirmed by the Guide</li>
                      <li>Full payment is required to secure the booking</li>
                      <li>Guides may require additional information for special tours</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Payment Terms</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Service Fee</h4>
                        <p className="text-gray-700 text-sm">
                          LocalEyes charges a 15% service fee on all bookings. This fee is deducted 
                          from the total amount paid by the Tourist.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Payment Processing</h4>
                        <p className="text-gray-700 text-sm">
                          All payments are processed through Stripe. We do not store credit card 
                          information on our servers.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Guide Payouts</h4>
                        <p className="text-gray-700 text-sm">
                          Guides receive payment 48 hours after tour completion, minus our service fee.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 9. Cancellations & Refunds */}
              <section id="cancellation-refunds" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cancellations & Refunds</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Cancellation By</th>
                        <th className="border border-gray-300 p-3 text-left">Time Before Tour</th>
                        <th className="border border-gray-300 p-3 text-left">Refund Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">Tourist</td>
                        <td className="border border-gray-300 p-3">More than 7 days</td>
                        <td className="border border-gray-300 p-3">100% refund</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Tourist</td>
                        <td className="border border-gray-300 p-3">48-168 hours</td>
                        <td className="border border-gray-300 p-3">50% refund</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Tourist</td>
                        <td className="border border-gray-300 p-3">Less than 48 hours</td>
                        <td className="border border-gray-300 p-3">No refund</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Guide</td>
                        <td className="border border-gray-300 p-3">Any time</td>
                        <td className="border border-gray-300 p-3">100% refund + rebooking assistance</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Force Majeure</td>
                        <td className="border border-gray-300 p-3">Any time</td>
                        <td className="border border-gray-300 p-3">Full refund or credit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 bg-yellow-50 p-5 rounded-lg">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Service fees are non-refundable except in cases of guide 
                    cancellation or force majeure events. Refunds are processed within 5-10 business days.
                  </p>
                </div>
              </section>

              {/* 10. Reviews & Content */}
              <section id="reviews-content" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3 text-blue-600" />
                  10. Reviews & Content
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Review Guidelines</h3>
                    <p className="text-gray-700 mb-3">
                      Reviews must be honest, accurate, and based on actual experiences. We prohibit:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Fake or misleading reviews</li>
                      <li>Reviews based on discrimination</li>
                      <li>Threats or extortion attempts</li>
                      <li>Confidential information disclosure</li>
                      <li>Review manipulation or trading</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Content Ownership</h3>
                    <p className="text-gray-700">
                      You retain ownership of content you post, but grant LocalEyes a worldwide, 
                      non-exclusive, royalty-free license to use, display, and distribute your content 
                      in connection with the Platform.
                    </p>
                  </div>
                </div>
              </section>

              {/* 11. Prohibited Activities */}
              <section id="prohibited-activities" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Prohibited Activities</h2>
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-3">Strictly Forbidden</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-red-800 space-y-2">
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Illegal or dangerous activities
                      </li>
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Discrimination or harassment
                      </li>
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Fraud or misrepresentation
                      </li>
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Circumventing our payment system
                      </li>
                    </ul>
                    <ul className="text-red-800 space-y-2">
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Intellectual property infringement
                      </li>
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Spam or unauthorized advertising
                      </li>
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Reverse engineering or hacking
                      </li>
                      <li className="flex items-start">
                        <Ban className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        Violation of third-party rights
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 12. Liability Disclaimer */}
              <section id="liability-disclaimer" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Liability Disclaimer</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
                  <p className="text-gray-700 mb-4">
                    To the maximum extent permitted by law, LocalEyes shall not be liable for:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Any indirect, incidental, or consequential damages</li>
                    <li>Loss of profits, data, or business opportunities</li>
                    <li>Personal injury or property damage during tours</li>
                    <li>Actions or omissions of Guides or Tourists</li>
                    <li>Third-party services or products</li>
                  </ul>
                  <div className="mt-4 p-4 bg-blue-50 rounded">
                    <p className="text-blue-800">
                      <strong>Maximum Liability:</strong> In no event shall our total liability exceed 
                      the amount of fees you paid to us in the six months preceding the claim.
                    </p>
                  </div>
                </div>
              </section>

              {/* 13. Intellectual Property */}
              <section id="intellectual-property" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Intellectual Property</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <p className="text-gray-700">
                      The LocalEyes Platform, including all content, features, and functionality, 
                      is owned by LocalEyes and protected by copyright, trademark, and other laws.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Trademarks</h3>
                    <p className="text-gray-700">
                      The LocalEyes name, logo, and all related names, logos, product and service 
                      names, designs, and slogans are trademarks of LocalEyes. You must not use such 
                      marks without our prior written permission.
                    </p>
                  </div>
                </div>
              </section>

              {/* 14. Termination */}
              <section id="termination" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Termination</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We may terminate or suspend your account and access to the Platform immediately, 
                    without prior notice or liability, for any reason, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>Violation of these Terms</li>
                    <li>Fraudulent or illegal activity</li>
                    <li>Creating risk or possible legal exposure</li>
                    <li>Failure to pay fees</li>
                    <li>Extended periods of inactivity</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Upon termination, your right to use the Platform will cease immediately. 
                    All provisions of these Terms which by their nature should survive termination 
                    shall survive, including ownership provisions, warranty disclaimers, and 
                    limitations of liability.
                  </p>
                </div>
              </section>

              {/* 15. Governing Law */}
              <section id="governing-law" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-blue-600" />
                  15. Governing Law
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700">
                    These Terms shall be governed by and construed in accordance with the laws of 
                    the State of California, United States, without regard to its conflict of law 
                    provisions.
                  </p>
                  <p className="text-gray-700 mt-3">
                    Any legal action or proceeding arising under these Terms will be brought 
                    exclusively in the federal or state courts located in San Francisco County, 
                    California, and you hereby consent to personal jurisdiction and venue in such courts.
                  </p>
                </div>
              </section>

              {/* 16. Dispute Resolution */}
              <section id="disputes" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">16. Dispute Resolution</h2>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Mandatory Arbitration</h3>
                    <p className="text-blue-800">
                      Any dispute, claim, or controversy arising out of or relating to these Terms 
                      shall be resolved by binding arbitration in San Francisco, California, 
                      in accordance with the rules of the American Arbitration Association.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Class Action Waiver</h3>
                    <p className="text-blue-800">
                      You agree that any arbitration or proceeding shall be conducted in your 
                      individual capacity and not as a class action or other representative action.
                    </p>
                  </div>
                </div>
              </section>

              {/* 17. Changes to Terms */}
              <section id="changes" className="mb-12 scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">17. Changes to Terms</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4">
                    We reserve the right to modify these Terms at any time. If we make material 
                    changes, we will notify you by email or through the Platform at least 30 days 
                    before the changes take effect.
                  </p>
                  <p className="text-gray-700">
                    Your continued use of the Platform after the effective date of the revised 
                    Terms constitutes your acceptance of the changes. If you do not agree to the 
                    new terms, you must stop using the Platform.
                  </p>
                </div>
              </section>

              {/* 18. Contact */}
              <section id="contact" className="scroll-mt-20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">18. Contact Information</h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Questions About These Terms?</h3>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                      If you have any questions about these Terms of Service, please contact our legal team.
                    </p>
                    <div className="space-y-3">
                      <p className="text-gray-900 font-medium">Email: legal@localeyes.com</p>
                      <p className="text-gray-900 font-medium">Phone: +1 (555) 987-6543</p>
                      <p className="text-gray-900 font-medium">
                        Address: 123 Legal Street, San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Acceptance Box */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Acceptance of Terms</h3>
                <p className="text-gray-700 mb-6">
                  By using the LocalEyes Platform, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/Privacy-Policy" 
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Read Privacy Policy
                  </a>
                  <a 
                    href="/contact" 
                    className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Contact Legal Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600 text-sm">
          <p className="mb-2">
            These Terms of Service were last updated on {effectiveDate}.
          </p>
          <p>
            © {new Date().getFullYear()} LocalEyes Technologies, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// Cookie icon component (since it's not imported from lucide-react)
const Cookie = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
    />
  </svg>
);

export default TermsOfServicePage;
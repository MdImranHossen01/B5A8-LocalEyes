// src/app/(mainlayout)/contact/page.tsx
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Local Guide Platform',
  description: 'Get in touch with our team for support, inquiries, or partnership opportunities.',
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              We&apos;re here to help you connect with amazing local experiences
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Address</h3>
                    <p className="text-gray-600 mt-1">General Inquiries</p>
                    <a 
                      href="mailto:hello@localeyes.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium block mt-2"
                    >
                      hello@localeyes.com
                    </a>
                    <p className="text-gray-600 mt-1">Support</p>
                    <a 
                      href="mailto:support@localeyes.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium block mt-1"
                    >
                      support@localeyes.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Number</h3>
                    <p className="text-gray-600 mt-1">Mon-Fri from 9am to 6pm</p>
                    <a 
                      href="tel:+11234567890" 
                      className="text-blue-600 hover:text-blue-700 font-medium block mt-2"
                    >
                      +1 (123) 456-7890
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      International: +1 (987) 654-3210
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Location</h3>
                    <p className="text-gray-600 mt-1">Visit our headquarters</p>
                    <address className="not-italic text-gray-700 mt-2">
                      123 Travel Street<br />
                      San Francisco, CA 94107<br />
                      United States
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-700">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-700">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-pink-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Live Chat</h3>
                    <p className="text-gray-600 mt-1">Quick answers, 24/7</p>
                    <button className="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                      Start Live Chat
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Facebook', icon: '👥', color: 'bg-blue-500' },
                    { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' },
                    { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
                    { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700' },
                    { name: 'YouTube', icon: '🎥', color: 'bg-red-600' },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`${social.color} w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity`}
                      aria-label={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form & FAQ */}
          <div className="lg:col-span-2">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">We&apos;ll get back to you within 24 hours</p>
                </div>
              </div>

              <ContactForm/>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {[
                  {
                    question: 'How do I become a guide on your platform?',
                    answer: 'Click "Become a Guide" in the navigation, fill out the application form, and our team will review your profile within 3-5 business days. Guides are selected based on expertise, experience, and passion for sharing local knowledge.'
                  },
                  {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple/Google Pay. All payments are securely processed through Stripe with 256-bit SSL encryption.'
                  },
                  {
                    question: 'Can I cancel or reschedule a booking?',
                    answer: 'Yes! You can cancel for a full refund up to 24 hours before the tour. Rescheduling is free if done at least 48 hours in advance. Check your booking details for specific policies.'
                  },
                  {
                    question: 'How are guides verified on your platform?',
                    answer: 'All guides undergo a thorough verification process including identity verification, background checks, and skill assessments. We also require references and conduct interviews to ensure quality.'
                  },
                  {
                    question: 'Do you offer group discounts?',
                    answer: 'Yes! Groups of 6+ people get a 15% discount. For larger groups (15+), contact our team for special rates and custom tour arrangements.'
                  },
                  {
                    question: 'What languages do your guides speak?',
                    answer: 'Our guides speak over 20 languages including English, Spanish, French, German, Italian, Japanese, Mandarin, and more. Use the language filter when searching for tours.'
                  },
                ].map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              {/* Still have questions? */}
              <div className="mt-12 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Can&apos;t find the answer you&apos;re looking for? Please chat with our friendly team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    📞 Call Us Now
                  </button>
                  <button className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    💬 Start Live Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Find Our Office</h3>
                <p className="text-gray-600 mb-6">
                  Visit us at our headquarters in San Francisco. We&apos;d love to meet you!
                </p>
              </div>
              {/* Placeholder for Map */}
              <div className="h-64 bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-4">🗺️</div>
                  <p className="text-gray-700 font-medium">Interactive Map Coming Soon</p>
                  <p className="text-gray-600 text-sm mt-2">123 Travel Street, San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers discovering authentic local experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/explore"
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Explore Tours
              </a>
              <a 
                href="/become-guide"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Become a Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
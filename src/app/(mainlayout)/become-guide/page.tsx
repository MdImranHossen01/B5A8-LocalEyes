import React from 'react';
import { 
  CheckCircle, 
  DollarSign, 
  Globe, 
  Users, 
  Clock, 
  Shield,
  Star,
  Calendar,
  MessageSquare,
  Award,
  TrendingUp,
  Heart
} from 'lucide-react';
import Link from 'next/link';

const BecomeGuidePage = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Earn Extra Income',
      description: 'Turn your local knowledge into a profitable side hustle. Guides earn $50-200 per tour.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Flexible Schedule',
      description: 'Work when you want. Set your own hours and availability.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Meet Travelers',
      description: 'Connect with people from around the world and share your culture.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Build Your Brand',
      description: 'Establish yourself as a local expert and grow your reputation.',
      color: 'bg-amber-100 text-amber-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Growth Opportunities',
      description: 'Start with basic tours and expand to specialized experiences.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Share Your Passion',
      description: 'Showcase what you love about your city and culture.',
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  const requirements = [
    '18 years or older',
    'Excellent knowledge of your city/region',
    'Good communication skills in at least one language',
    'Passion for sharing local culture',
    'Reliable internet connection',
    'Valid government ID for verification'
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and tell us about yourself, your expertise, and your city.',
      icon: '👤'
    },
    {
      number: '02',
      title: 'Submit for Verification',
      description: 'Upload your ID and complete our background check process.',
      icon: '✅'
    },
    {
      number: '03',
      title: 'Create Your Tours',
      description: 'Design unique tour experiences with photos and descriptions.',
      icon: '🗺️'
    },
    {
      number: '04',
      title: 'Start Hosting',
      description: 'Get bookings, meet travelers, and earn money doing what you love!',
      icon: '🎉'
    }
  ];

  const successStories = [
    {
      name: 'Maria Rodriguez',
      location: 'Barcelona, Spain',
      quote: 'I went from sharing food tips with friends to earning $3,000/month with my tapas tours!',
      earnings: '$3,000/month',
      tours: 'Food & Culture Tours'
    },
    {
      name: 'Kenji Tanaka',
      location: 'Tokyo, Japan',
      quote: 'As a retired history teacher, I now share my knowledge with travelers and earn extra income.',
      earnings: '$2,500/month',
      tours: 'Historical Walking Tours'
    },
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      quote: 'LocalGuide helped me turn my passion for street art into a full-time business.',
      earnings: '$4,200/month',
      tours: 'Street Art & Graffiti Tours'
    }
  ];

  const faqs = [
    {
      question: 'How much can I earn as a guide?',
      answer: 'Most guides earn between $500-$5,000 per month, depending on location, tour type, and availability. Top guides in popular destinations can earn over $10,000/month.'
    },
    {
      question: 'How do I get paid?',
      answer: 'We handle all payments securely. You get paid directly to your bank account 48 hours after each completed tour. No hidden fees - we take a 15% commission only when you get booked.'
    },
    {
      question: 'Do I need special qualifications?',
      answer: 'No formal qualifications needed! We value local knowledge and passion most. However, certain specialized tours (like adventure activities) may require certifications.'
    },
    {
      question: 'How much time do I need to commit?',
      answer: 'As little or as much as you want! Many guides start with 1-2 tours per week. You control your schedule completely through our calendar system.'
    },
    {
      question: 'What support do you provide?',
      answer: 'We offer comprehensive guide training, marketing support, insurance coverage, 24/7 customer support, and a community of experienced guides to help you succeed.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Become a <span className="text-blue-600">Local Guide</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Turn your local knowledge into income. Share your passion, meet travelers, and earn money showing people around your city.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register?role=guide"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Start Your Journey
              </Link>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Watch Guide Video
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Guides</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$50M+</div>
              <div className="text-gray-600">Paid to Guides</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">120+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Become a LocalGuide?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of guides who are earning money while sharing their passion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start Guiding in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our process is designed to get you started quickly and easily
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg h-full">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-blue-200 transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/register?role=guide"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <CheckCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What You Need to Get Started
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Becoming a LocalGuide is simple. Here are the basic requirements:
              </p>
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <Shield className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-bold mb-2">we have Got You Covered</h3>
                <p className="opacity-90">All guides receive:</p>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Liability insurance up to $1M</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>24/7 emergency support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Marketing & promotion</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Guide training materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from guides who transformed their lives with LocalGuide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                    <p className="text-gray-600">{story.location}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic mb-6">
                  "{story.quote}"
                </blockquote>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Monthly Earnings</p>
                      <p className="font-bold text-green-600">{story.earnings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Specialization</p>
                      <p className="font-bold text-blue-600">{story.tours}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about becoming a guide
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="mb-6 opacity-90">Join our community of passionate local guides today.</p>
              <Link
                href="/register?role=guide"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeGuidePage;
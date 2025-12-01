export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Find Your Guide',
      description: 'Browse through verified local guides and read reviews from fellow travelers.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Book Your Experience',
      description: 'Choose your preferred date and time, and book directly through our secure platform.',
      icon: '📅',
    },
    {
      number: '03',
      title: 'Meet & Explore',
      description: 'Connect with your guide and discover hidden gems only locals know about.',
      icon: '🤝',
    },
    {
      number: '04',
      title: 'Share Your Story',
      description: 'Leave reviews and share your amazing experiences with the community.',
      icon: '⭐',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with LocalGuide is simple and straightforward
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg">
            Become a Guide
          </button>
        </div>
      </div>
    </section>
  );
}
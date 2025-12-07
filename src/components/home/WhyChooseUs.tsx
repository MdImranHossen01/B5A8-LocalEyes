export function WhyChooseUs() {
  const features = [
    {
      icon: '🏆',
      title: 'Verified Local Experts',
      description: 'All our guides are carefully vetted and verified to ensure quality and safety.',
    },
    {
      icon: '💎',
      title: 'Hidden Gems',
      description: 'Discover places and experiences you won\'t find in typical travel guides.',
    },
    {
      icon: '🤝',
      title: 'Personalized Experiences',
      description: 'Tours tailored to your interests, pace, and preferences.',
    },
    {
      icon: '💰',
      title: 'Fair Prices',
      description: 'Direct booking with local guides means better prices for you.',
    },
    {
      icon: '🛡️',
      title: 'Secure Booking',
      description: 'Safe and secure payment system with customer protection.',
    },
    {
      icon: '🌍',
      title: 'Cultural Immersion',
      description: 'Authentic cultural experiences that respect local communities.',
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Why Choose LocalGuide?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are changing the way people travel by connecting you directly with passionate locals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 card-hover"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Trusted by Travelers Worldwide
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
            <div className="text-gray-700 font-semibold">TripAdvisor</div>
            <div className="text-gray-700 font-semibold">Lonely Planet</div>
            <div className="text-gray-700 font-semibold">National Geographic</div>
            <div className="text-gray-700 font-semibold">Forbes Travel</div>
          </div>
        </div>
      </div>
    </section>
  );
}
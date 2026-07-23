export function WhyChooseUs() {
  const features = [
    {
      icon: '🏆',
      title: 'Experienced Tour Operators',
      description: 'With years of travel expertise, we organize highly structured, safe, and engaging tours.',
    },
    {
      icon: '💰',
      title: 'Best Price Guarantee',
      description: 'Enjoy premium hotels, transport, and sightseeing services at competitive rates with zero hidden charges.',
    },
    {
      icon: '🤝',
      title: 'Tailormade Packages',
      description: 'Customized itineraries designed precisely around your interests, group size, and specific budget.',
    },
    {
      icon: '🌍',
      title: 'Worldwide Destinations',
      description: 'From local treasures like the Sundarbans to international hotspots like Dubai, Malaysia, and Europe.',
    },
    {
      icon: '🛡️',
      title: 'Secure Booking & Payments',
      description: 'SSL secured transactions, convenient payment options, and flexible cancellation policies.',
    },
    {
      icon: '📞',
      title: '24/7 Dedicated Support',
      description: 'Our responsive team is always available to assist you throughout your journey from start to finish.',
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black italic text-gray-900 dark:text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Khulna Tours & Travels?
            </span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            We provide premium domestic & international travel packages with top-notch support, hotels, and flight configurations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center space-y-4"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
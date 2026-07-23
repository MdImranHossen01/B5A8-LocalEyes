'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Plane, Globe, FileText, Compass } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  bnName: string;
  image: string;
  serviceTag: string;
  description: string;
  bnDescription: string;
  icon: React.ReactNode;
}

export function PopularDestinations() {
  const router = useRouter();

  const destinations: Destination[] = [
    {
      id: 'saudi-arabia',
      name: 'Saudi Arabia',
      bnName: 'সৌদি আরব',
      image: '/assets/populardestination/saudi.webp',
      serviceTag: 'Hajj & Umrah Packages',
      description: 'Perform Hajj and Umrah with our fully guided, worry-free premium spiritual packages.',
      bnDescription: 'অভিজ্ঞ গাইড ও প্রিমিয়াম হোটেলসহ বিশ্বস্ত হজ্জ ও ওমরাহ প্যাকেজ সমূহ।',
      icon: <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      id: 'dubai-uae',
      name: 'UAE (Dubai)',
      bnName: 'দুবাই (UAE)',
      image: '/assets/populardestination/dubai.webp',
      serviceTag: 'Express Visa & Luxury Tours',
      description: 'Explore the modern architectural marvels of Dubai with instant tourist visa processing.',
      bnDescription: 'অন-ডিমান্ড ট্যুরিস্ট ভিসা ও আকর্ষণীয় দুবাই ভ্রমণ প্যাকেজ।',
      icon: <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 'malaysia',
      name: 'Malaysia',
      bnName: 'মালয়েশিয়া',
      image: '/assets/populardestination/malaysia.webp',
      serviceTag: 'Holiday Packages & Study Visa',
      description: 'Enjoy tropical rainforests, sandy beaches, and modern cities with our special holiday deals.',
      bnDescription: 'কুয়ালালামপুর ও লংকাউই দ্বীপপুঞ্জে ফ্যামিলি হলিডে এবং স্টাডি ভিসা সাপোর্ট।',
      icon: <Plane className="w-4 h-4 text-red-600 dark:text-red-400" />,
    },
    {
      id: 'italy',
      name: 'Italy',
      bnName: 'ইতালি',
      image: '/assets/populardestination/italy.webp',
      serviceTag: 'Schengen Visa Assistance',
      description: 'Apply for Italian tourist and business visas with complete document processing support.',
      bnDescription: 'ইতালি সহ পুরো ইউরোপের জন্য সেনজেন ভিসা এবং ডকুমেন্ট প্রসেসিং সাপোর্ট।',
      icon: <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />,
    },
    {
      id: 'oman',
      name: 'Oman',
      bnName: 'ওমান',
      image: '/assets/populardestination/oman.webp',
      serviceTag: 'Employment & Transit Visa',
      description: 'Smooth processing for work permits, employment entry visas, and flight tickets to Muscat.',
      bnDescription: 'ওমান ওয়ার্ক পারমিট, এমপ্লয়মেন্ট ভিসা এবং মাস্কাট ফ্লাইট টিকিট বুকিং।',
      icon: <Compass className="w-4 h-4 text-orange-600 dark:text-orange-400" />,
    },
    {
      id: 'qatar',
      name: 'Qatar',
      bnName: 'কাতার',
      image: '/assets/populardestination/qatar.webp',
      serviceTag: 'Business & Flight Bookings',
      description: 'Book flights with Qatar Airways and get transit visa support to explore Doha.',
      bnDescription: 'কাতার এয়ারওয়েজে সুলভ মূল্যে টিকিট এবং দোহা ট্রানজিট ট্যুর সাপোর্ট।',
      icon: <Plane className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    },
  ];

  const handleDestinationClick = (destinationName: string) => {
    router.push(`/explore?search=${encodeURIComponent(destinationName)}`);
  };

  return (
    <section className="py-10 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block mb-2">
            Explore Popular Gateways
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Popular Travel & Visa Destinations
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Accurate flight tickets, visa processing, and curated tour packages for our most demanded global routes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800/80 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              onClick={() => handleDestinationClick(destination.name)}
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-gray-200/50 dark:border-gray-800/50">
                  {destination.icon}
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {destination.serviceTag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {destination.name}
                    </h3>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 font-bengali">
                      {destination.bnName}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {destination.description}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-bengali italic mb-6">
                    {destination.bnDescription}
                  </p>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition-all font-bold text-sm shadow-sm group-hover:shadow-md">
                  Inquire Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
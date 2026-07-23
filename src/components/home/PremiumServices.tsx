"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    id: "air-ticket",
    title: "AIR TICKET",
    bnTitle: "বিমান টিকিট",
    image: "/assets/service/air-ticket.webp",
    desc: "Global flight bookings at the best rates",
    link: "/explore"
  },
  {
    id: "hajj-umrah",
    title: "HAJJ & UMRAH",
    bnTitle: "হজ্জ ও ওমরাহ",
    image: "/assets/service/hajj-umrah.webp",
    desc: "Dedicated spiritual journey packages",
    link: "/tours"
  },
  {
    id: "packages",
    title: "PACKAGES",
    bnTitle: "ট্যুর প্যাকেজ",
    image: "/assets/service/packages.webp",
    desc: "Curated domestic & international tours",
    link: "/explore"
  },
  {
    id: "visa-service",
    title: "VISA SERVICE",
    bnTitle: "ভিসা প্রসেসিং",
    image: "/assets/service/visa-service.webp",
    desc: "Hassle-free global visa assistance",
    link: "/explore"
  }
];

export function PremiumServices() {
  return (
    <section className="py-10 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
            Exclusive Travel Offerings
          </h2>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-4" />
        </div>

        {/* Services 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200/40 dark:border-gray-800/40 transition-all duration-500 cursor-pointer bg-gray-900"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.75] group-hover:brightness-[0.65]"
                />
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              </div>

              {/* Card Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">

                {/* Top Arrow Icon */}
                <div className="self-end w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                {/* Bottom Text */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase block">
                    {service.desc}
                  </span>

                  <h3 className="text-2xl font-black tracking-wide text-white font-serif uppercase">
                    {service.title}
                  </h3>

                  <p className="text-sm font-bengali text-gray-300 font-medium">
                    {service.bnTitle}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

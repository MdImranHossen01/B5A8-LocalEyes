"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Plane,
  FileText,
  CheckCircle2,
  Compass
} from "lucide-react";

const countries = [
  { name: "Oman", bnName: "ওমান", code: "om" },
  { name: "UAE (Dubai)", bnName: "দুবাই (UAE)", code: "ae" },
  { name: "Saudi Arabia", bnName: "সৌদি আরব", code: "sa" },
  { name: "Bahrain", bnName: "বাহরাইন", code: "bh" },
  { name: "Qatar", bnName: "কাতার", code: "qa" },
  { name: "Malaysia", bnName: "মালয়েশিয়া", code: "my" },
  { name: "Italy", bnName: "ইতালি", code: "it" },
  { name: "Brunei", bnName: "ব্রুনাই", code: "bn" }
];

export function KhulnaToursSection() {
  return (
    <section className="relative py-10 md:py-16 overflow-hidden bg-radial from-blue-50/50 via-transparent to-transparent dark:from-indigo-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-5xl font-extrabold italic tracking-tight text-gray-900 dark:text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Khulna
            </span>
            {" "}Tours & Travels
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Your trusted gateway to global destinations. We specialize in hassle-free air ticket bookings and visa processing services worldwide.
          </motion.p>
        </div>

        {/* Features & Countries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Block: Services & Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-white/70 dark:bg-gray-950/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 shadow-xl"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Our Premium Services
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Air Ticket Booking
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Domestic and international flight bookings with major global airlines at competitive rates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Visa Processing Services
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      End-to-end guidance, documentation support, and visa processing for all major tourist destinations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-800/60">
              <p className="text-blue-600 dark:text-blue-400 font-medium text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                সকল দেশের টিকেট এবং ভিসা প্রসেসিং করা হয়।
              </p>
            </div>
          </motion.div>

          {/* Right Block: Countries Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 rounded-3xl bg-white/70 dark:bg-gray-950/40 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Key Visa & Travel Destinations
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Specialized visa processing, work permits, and travel packages available for:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <motion.div
                    key={country.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800/80 text-center flex flex-col items-center justify-center transition-all duration-300"
                  >
                    <div className="relative w-16 h-10 mb-3 overflow-hidden shadow-sm border border-gray-200/60 dark:border-gray-700/60">
                      <Image
                        src={`https://flagcdn.com/w80/${country.code}.png`}
                        alt={`${country.name} flag`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {country.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {country.bnName}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

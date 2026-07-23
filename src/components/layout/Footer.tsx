// G:\Level 2\Milestone 8\localeyes\src\components\layout\Footer.tsx
import Link from 'next/link';
import Logo from '../Logo';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <Logo />
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting travelers with passionate local guides for authentic experiences around the world.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* For Travelers */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-white">For Travelers</h4>
            <ul className="space-y-3">
              <li><Link href="/explore" className="text-gray-400 hover:text-white text-sm transition-colors">Browse Tours</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">How It Works</Link></li>
              <li><Link href="/safety" className="text-gray-400 hover:text-white text-sm transition-colors">Safety Guidelines</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Travel Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/Privacy-Policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
          <p className="text-gray-400 text-sm text-center">
            © 2024 Khulna Tours & Travels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
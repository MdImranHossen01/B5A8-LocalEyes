import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">LocalGuide</h3>
            <p className="text-gray-400 mb-4">
              Connecting travelers with passionate local guides for authentic experiences around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
            </div>
          </div>

          {/* For Travelers */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Travelers</h4>
            <ul className="space-y-2">
              <li><Link href="/explore" className="text-gray-400 hover:text-white">Browse Tours</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white">How It Works</Link></li>
              <li><Link href="/safety" className="text-gray-400 hover:text-white">Safety Guidelines</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Travel Blog</Link></li>
            </ul>
          </div>

          {/* For Guides */}
          <div>
            <h4 className="text-lg font-semibold mb-4">For Guides</h4>
            <ul className="space-y-2">
              <li><Link href="/become-guide" className="text-gray-400 hover:text-white">Become a Guide</Link></li>
              <li><Link href="/guide-resources" className="text-gray-400 hover:text-white">Resources</Link></li>
              <li><Link href="/success-stories" className="text-gray-400 hover:text-white">Success Stories</Link></li>
              <li><Link href="/guide-guidelines" className="text-gray-400 hover:text-white">Guidelines</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © 2024 LocalGuide Platform. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm">Sitemap</Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm">Accessibility</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {/* Store Info */}
        <div>
          <h2 className="text-xl font-bold mb-4"> FreshCart</h2>
          <p className="text-sm text-gray-300">
            Your trusted online store for quality products and fast delivery
            across the globe.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-300">Cairo, Egypt</p>
          <p className="text-sm text-gray-300">+20 123 456 7890</p>
          <p className="text-sm text-gray-300">support@FreshCart.com</p>
        </div>

        {/* Social Info (Text only) */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <p className="text-sm text-gray-300">Facebook</p>
          <p className="text-sm text-gray-300">Instagram</p>
          <p className="text-sm text-gray-300">Twitter</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FreshCart All rights reserved.
      </div>
    </footer>
  );
}

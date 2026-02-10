import React from 'react'

function Footer() {
   return (
    <footer className="bg-black text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 p-10">

        <div>
          <h2 className="text-white font-bold text-xl mb-3">ShopEase</h2>
          <p>Your trusted online shopping partner.</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Products</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p>Email: support@shopease.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>

      <div className="text-center border-t border-gray-700 py-4 text-sm">
        © 2026 ShopEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer

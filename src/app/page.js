'use client';

import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import QRCode from 'react-qr-code'; // Import the QRCode component

export default function LawyerEcard() {
  // Replace this with dynamic data in a real scenario
  const lawyerLink = 'https://yourdomain.com/ecard/jane-smith'; // Dynamic link per lawyer

  return (
    <div className="min-h-screen bg-black lg:bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-stone-100 rounded-2xl shadow-xl p-6 text-center">
        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/images/lawyer-profile.jpg"
            alt="Jane Smith"
            width={120}
            height={120}
            className="rounded-full border-4 border-gray-200"
          />
        </div>

        {/* Name & Title */}
        <h1 className="text-2xl font-bold text-gray-900">Jane Smith</h1>
        <p className="text-sm text-gray-500">Senior Attorney, Justice & Co. Law Firm</p>

        {/* Practice Areas */}
        <div className="mt-4">
          <p className="text-gray-700">⚖️ Criminal Law, Immigration Law, Family Law</p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2">
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaPhone /> +1 (555) 123-4567
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaEnvelope /> jane@justiceco.com
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaMapMarkerAlt />
            <a
              href="https://maps.google.com?q=123+Legal+St,+Lawville"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              123 Legal St, Lawville
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://linkedin.com/in/janesmith" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-700 text-xl" />
          </a>
          <a href="https://twitter.com/janesmithlaw" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-400 text-xl" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition w-full md:w-auto">
            📅 Schedule Consultation
          </button>
          <button className="border border-gray-400 px-6 py-2 rounded-md hover:bg-gray-100 transition w-full md:w-auto">
            📄 Download vCard
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-6 italic text-gray-500">"Justice is our mission."</p>

        {/* Dynamic QR Code */}
        <div className="mt-4 flex justify-center">
          {/* Render the dynamic QR code */}
          <QRCode value={lawyerLink} size={100} />
        </div>
      </div>
    </div>
  );
}

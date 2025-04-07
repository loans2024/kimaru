'use client';

import Image from 'next/image';
import { FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';

export default function LawyerEcard() {
  const router = useRouter();

  const lawyerLink = 'https://kimaru.netlify.app/ecard/kimaru'; // Dynamic link per lawyer

  return (
    <div className="min-h-screen bg-black lg:bg-white flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl bg-stone-100 rounded-2xl shadow-xl p-6 text-center relative">

        {/* Close Button */}
        <button
          aria-label="Close eCard"
          onClick={() => router.back()} // Go back to previous page
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <SiX className="text-2xl" />
        </button>

        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <div className="w-[270px] h-[170px] bg-white rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/kimaru.jpeg"
              alt="Kevin Kimaru"
              width={140}
              height={130}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Name & Title */}
        <h1 className="text-3xl font-bold text-gray-900 font-playfair">Kevin Kimaru</h1>
        <p className="text-sm text-gray-500">Kimaru Kimutai & Co. Advocates</p>

        {/* Practice Areas */}
        <div className="mt-4">
          <p className="text-black">⚖️ Expert in Conveyancing and Litigation</p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2">
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaPhone /> +254 (729) 128-937
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaEnvelope /> kimarulaw@gmail.com
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaMapMarkerAlt />
            <a
              href="https://maps.google.com?q=123+Legal+St,+Lawville"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Lumumba Drive next to Cider Dental Clinic Eldoret Kenya
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://linkedin.com/in/janesmith" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-700 text-xl" />
          </a>
          <a href="https://x.com/kimarulaw" target="_blank" rel="noopener noreferrer">
            <SiX className="text-gray-900 text-xl hover:text-blue-500 transition" />
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
        <p className="mt-6 italic text-gray-500 font-playfair">&quot;Dedication. Passion. Abilities. Knowledge.&quot;</p>

        {/* Dynamic QR Code */}
        <div className="mt-4 flex justify-center">
          <QRCode value={lawyerLink} size={100} />
        </div>
      </div>
    </div>
  );
}


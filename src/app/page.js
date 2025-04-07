'use client';

import Image from 'next/image';
import { FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import QRCode from 'react-qr-code';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LawyerEcard() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    date: '',
    comment: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Here you’ll send data to backend in future
    setShowForm(false); // Close form after submission
  };

  const lawyerLink = 'https://kimaru.netlify.app/ecard/kimaru'; // Dynamic link per lawyer

  return (
    <div className="min-h-screen bg-black lg:bg-white flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl bg-stone-100 rounded-2xl shadow-xl p-6 text-center relative">

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
          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition w-full md:w-auto"
          >
            📅 Schedule Consultation
          </button>
          <button className="border border-gray-400 px-6 py-2 rounded-md hover:bg-gray-100 transition w-full md:w-auto">
            📄 Download vCard
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-6 italic text-gray-500 font-playfair">
          &quot;Dedication. Passion. Abilities. Knowledge.&quot;
        </p>

        {/* QR Code */}
        <div className="mt-4 flex justify-center">
          <QRCode value={lawyerLink} size={100} />
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            >
              <SiX className="text-2xl" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Book a Consultation</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
            <input
              type="text"
              name="contact"
              placeholder="Phone or Email"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
            <input
              type="date"
              name="date"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
            <textarea
              name="comment"
              placeholder="Additional Comments"
              onChange={handleChange}
              className="w-full border rounded-md p-2 mb-3"
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


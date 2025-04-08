'use client';

import { useState } from 'react';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { IoClose } from 'react-icons/io5';

export default function LawyerEcard() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    date: '',
    comment: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting payload:', formData);

    const response = await fetch('https://kelvinkimaru.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Form submitted successfully');
      setShowForm(false);
    } else {
      const errText = await response.text();
      console.error('Error submitting form:', response.status, errText);
    }
  };

  const lawyerData = {
    name: 'Kevin Kimaru',
    title: 'Kimaru Kimutai & Co. Advocates',
    profileImage: '/images/kimaru.jpeg',
    tagline: 'Dedication. Passion. Abilities. Knowledge.',
    practiceAreas: ['Conveyancing', 'Litigation'],
    phone: '+254729128937',
    email: 'Kimarukevin770@gmail.com',
    officeAddress: 'Lumumba Drive next to Cider Dental Clinic Eldoret, Kenya',
    mapLink: 'https://maps.google.com?q=Lumumba+Drive+Eldoret+Kenya',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/kevinkimaru',
      twitter: 'https://twitter.com/kevinkimaru',
    },
  };

  const lawyerLink = 'https://kimaru.netlify.app/ecard/kimaru';

  const downloadVCard = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${lawyerData.name}
ORG:${lawyerData.title}
TEL;TYPE=WORK,VOICE:${lawyerData.phone}
EMAIL:${lawyerData.email}
ADR;TYPE=WORK:;;${lawyerData.officeAddress}
URL:${lawyerLink}
NOTE:Expert in ${lawyerData.practiceAreas.join(' and ')}
END:VCARD
`.trim();

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lawyerData.name.replace(/\s+/g, '_')}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black lg:bg-white flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-2xl bg-stone-100 rounded-2xl shadow-xl p-6 text-center relative">
        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <div className="w-[270px] h-[170px] bg-white rounded-lg overflow-hidden shadow-md">
            <Image
              src={lawyerData.profileImage}
              alt={lawyerData.name}
              width={140}
              height={130}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Name & Title */}
        <h1 className="text-3xl font-bold text-gray-900 font-playfair">{lawyerData.name}</h1>
        <p className="text-sm text-gray-500">{lawyerData.title}</p>

        {/* Practice Areas */}
        <div className="mt-4">
          <p className="text-black">⚖️ Expert in {lawyerData.practiceAreas.join(' and ')}</p>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2">
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaPhone /> {lawyerData.phone}
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaEnvelope /> {lawyerData.email}
          </p>
          <p className="flex items-center justify-center gap-2 text-gray-700">
            <FaMapMarkerAlt />
            <a
              href={lawyerData.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {lawyerData.officeAddress}
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-4">
          <a href={lawyerData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-700 text-xl" />
          </a>
          <a href={lawyerData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
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
          <button
            onClick={downloadVCard}
            className="border border-gray-400 px-6 py-2 rounded-md hover:bg-gray-100 transition w-full md:w-auto"
          >
            📄 Download vCard
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-6 italic text-gray-400 font-playfair">
          &quot;{lawyerData.tagline}&quot;
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.name}
                className="w-full border rounded-md p-2"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Phone or Email"
                onChange={handleChange}
                value={formData.contact}
                className="w-full border rounded-md p-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                value={formData.email}
                className="w-full border rounded-md p-2"
                required
              />
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={formData.date}
                className="w-full border rounded-md p-2"
                required
              />
              <textarea
                name="comment"
                placeholder="Additional Comments"
                onChange={handleChange}
                value={formData.comment}
                className="w-full border rounded-md p-2"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}



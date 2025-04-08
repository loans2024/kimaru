'use client';

import { useState } from 'react';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { SiX } from 'react-icons/si';
import { IoClose } from 'react-icons/io5';

export default function LawyerEcard() {
  const [showCard, setShowCard] = useState(true);

  const lawyerData = {
    name: 'Kevin Kimaru',
    title: 'Kimaru Kimutai & Co. Advocates',
    profileImage: '/images/kimaru.jpeg',
    firmLogoUrl: '/firm-logo.png',
    tagline: 'Dedication. Passion. Abilities. Knowledge.',
    practiceAreas: ['Conveyancing', 'Litigation'],
    phone: '+254729128937',
    email: 'kimarulaw@gmail.com',
    website: 'https://kimaru.netlify.app',
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
URL:${lawyerData.website}
ADR;TYPE=WORK:;;${lawyerData.officeAddress}
END:VCARD
`.trim();

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${lawyerData.name.replace(/\s+/g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!showCard) return null;

  return (
    <div className="min-h-screen bg-black lg:bg-white flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-stone-100 rounded-2xl shadow-xl p-6 text-center">
        {/* Profile Photo */}
        <div className="flex justify-center mb-4">
          <div className="w-[270px] h-[170px] bg-white rounded-lg overflow-hidden shadow-md">
            <Image
              src={lawyerData.profileImage}
              alt={`${lawyerData.name} profile`}
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
          {lawyerData.practiceAreas?.length > 0 && (
            <p className="text-black">
              ⚖️ Expert in {lawyerData.practiceAreas.join(' and ')}
            </p>
          )}
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
          {lawyerData.socialLinks?.linkedin && (
            <a href={lawyerData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-700 text-xl" />
            </a>
          )}
          {lawyerData.socialLinks?.twitter && (
            <a href={lawyerData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
              <SiX className="text-gray-900 text-xl hover:text-blue-500 transition" />
            </a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition w-full md:w-auto">
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
        <p className="mt-6 italic text-gray-500 font-playfair">
          &quot;{lawyerData.tagline}&quot;
        </p>

        {/* QR Code */}
        <div className="mt-4 flex justify-center">
          <QRCode value={lawyerLink} size={100} />
        </div>
      </div>
    </div>
  );
}




'use client';

import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import QRCode from 'react-qr-code';

export default function LawyerEcard() {
  // Hardcode the lawyer data
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

  // Hardcode the lawyerLink or compute from a dynamic param if needed
  const lawyerLink = 'https://kimaru.netlify.app/ecard/kimaru';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        {/* Firm Logo */}
        <div className="flex justify-center">
          <Image
            src={lawyerData.firmLogoUrl}
            alt="Firm Logo"
            width={120}
            height={120}
            className="rounded-full"
          />
        </div>

        {/* Profile Photo + Name/Title */}
        <div className="text-center space-y-2">
          <Image
            src={lawyerData.profileImage}
            alt={lawyerData.name}
            width={120}
            height={120}
            className="rounded-full mx-auto"
          />
          <h1 className="text-2xl font-bold">{lawyerData.name}</h1>
          <p className="text-sm text-gray-600">{lawyerData.title}</p>
        </div>

        {/* Tagline */}
        {lawyerData.tagline && (
          <p className="italic text-center text-gray-700">&quot;{lawyerData.tagline}&quot;</p>
        )}

        {/* Practice Areas */}
        {lawyerData.practiceAreas?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-1">Practice Areas</h2>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {lawyerData.practiceAreas.map((area, i) => (
                <li key={i}>{area}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-1 text-sm">
          <p><strong>Phone:</strong> {lawyerData.phone}</p>
          <p><strong>Email:</strong> {lawyerData.email}</p>
          {lawyerData.website && (
            <p>
              <strong>Website:</strong>{' '}
              <a
                href={lawyerData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {lawyerData.website}
              </a>
            </p>
          )}
        </div>

        {/* Office Address */}
        {lawyerData.officeAddress && (
          <div className="text-sm">
            <p><strong>Office:</strong> {lawyerData.officeAddress}</p>
            {lawyerData.mapLink && (
              <a
                href={lawyerData.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View on Google Maps
              </a>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href={`tel:${lawyerData.phone}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-full"
          >
            Schedule Consultation
          </a>
          <a
            href={`mailto:${lawyerData.email}`}
            className="px-4 py-2 border rounded-full"
          >
            Download vCard
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-4">
          {lawyerData.socialLinks?.linkedin && (
            <a href={lawyerData.socialLinks.linkedin} target="_blank">
              <FaLinkedin className="text-blue-700 text-xl" />
            </a>
          )}
          {lawyerData.socialLinks?.twitter && (
            <a href={lawyerData.socialLinks.twitter} target="_blank">
              <FaTwitter className="text-blue-400 text-xl" />
            </a>
          )}
        </div>

        {/* Dynamic QR Code */}
        <div className="flex justify-center mt-6">
          <div style={{ background: 'white', padding: '16px' }}>
            <QRCode
              value={lawyerLink}
              size={150}
              level="M"
              includeMargin
            />
          </div>
        </div>
      </div>
    </div>
  );
}

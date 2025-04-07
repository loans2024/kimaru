'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function LawyerEcard() {
  const { lawyerid } = useParams();
  const [lawyerData, setLawyerData] = useState(null);

  useEffect(() => {
    if (!lawyerid) return;

    const fetchLawyerData = async () => {
      try {
        const res = await fetch(`/api/lawyers/${lawyerid}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setLawyerData(data);
      } catch (err) {
        console.error('Failed to fetch lawyer data:', err);
      }
    };

    fetchLawyerData();
  }, [lawyerid]);

  if (!lawyerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading lawyer profile…</p>
      </div>
    );
  }

  // Build the exact URL you want embedded in the QR code:
  const lawyerLink = `https://kimaru.netlify.app/ecard/${lawyerid}`;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        {/* Firm Logo */}
        <div className="flex justify-center">
          <Image
            src={lawyerData.firmLogoUrl || '/firm-logo.png'}
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

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import QRCode from 'react-qr-code';

export default function LawyerEcard() {
  // Use the same case as your dynamic route folder: [lawyerid]
  const { lawyerid } = useParams();
  const [lawyerData, setLawyerData] = useState(null);

  useEffect(() => {
    if (!lawyerid) return; // Early return if lawyerid is not yet available

    console.log("Fetching data for lawyerid:", lawyerid);

    // Fetch the lawyer data dynamically using the lawyerid
    const fetchLawyerData = async () => {
      try {
        const response = await fetch(`/api/lawyers/${lawyerid}`);
        const data = await response.json();
        console.log("Fetched lawyer data:", data);
        setLawyerData(data);
      } catch (error) {
        console.error("Error fetching lawyer data:", error);
      }
    };

    fetchLawyerData();
  }, [lawyerid]);

  // Render loading state while data is being fetched
  if (!lawyerData) {
    return <div>Loading...</div>;
  }

  // Dynamic link per lawyer
  const lawyerLink = `https://kimaru.netlify.app/ecard/kimaru${lawyerid}`;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6 sm:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8 space-y-6">
        {/* Firm Logo */}
        <div className="flex justify-center">
          <Image
            src="/firm-logo.png"
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
        <p className="italic text-center text-gray-700">&quot;{lawyerData.tagline}&quot;</p>

        {/* Practice Areas */}
        <div>
          <h2 className="font-semibold mb-1">Practice Areas</h2>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {lawyerData.practiceAreas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-1 text-sm">
          <p><strong>Phone:</strong> {lawyerData.phone}</p>
          <p><strong>Email:</strong> {lawyerData.email}</p>
          <p>
            <strong>Website:</strong> 
            <a href={lawyerData.website} className="text-blue-600 underline">
              {lawyerData.website}
            </a>
          </p>
        </div>

        {/* Address + Map Link */}
        <div className="text-sm">
          <p><strong>Office:</strong> {lawyerData.officeAddress}</p>
          <a
            href={lawyerData.mapLink}
            target="_blank"
            className="text-blue-500 underline"
          >
            View on Google Maps
          </a>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={`tel:${lawyerData.phone}`} className="px-4 py-2 bg-blue-600 text-white rounded-full">
            Schedule Consultation
          </a>
          <a href={`mailto:${lawyerData.email}`} className="px-4 py-2 border rounded-full">
            Download vCard
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-4">
          {lawyerData.socialLinks?.linkedin && (
            <a href={lawyerData.socialLinks.linkedin} target="_blank">
              <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
            </a>
          )}
          {lawyerData.socialLinks?.twitter && (
            <a href={lawyerData.socialLinks.twitter} target="_blank">
              <Image src="/x-icon.png" alt="Twitter" width={24} height={24} />
            </a>
          )}
        </div>

        {/* Dynamic QR Code */}
        {lawyerid && (
          <div className="flex justify-center mt-6">
            <QRCode value={lawyerLink} size={128} />
          </div>
        )}
      </div>
    </div>
  );
}

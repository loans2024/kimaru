// src/app/api/lawyers/[lawyerid]/route.js
import { NextResponse } from 'next/server';

// Mock data — replace with real data source later
const MOCK_LAWYERS = {
  kimaru: {
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
  },
  // you can add more lawyer entries here...
};

export async function GET(request, { params }) {
  const { lawyerid } = params;
  const data = MOCK_LAWYERS[lawyerid];

  if (!data) {
    return NextResponse.json(
      { error: `No lawyer found for id "${lawyerid}"` },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}

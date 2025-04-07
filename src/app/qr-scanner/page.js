// qr-scanner/page.js
'use client';

import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText, decodedResult) => {
        alert(`Scanned result: ${decodedText}`);
        // You can also redirect or handle scanned text here
      },
      (errorMessage) => {
        console.warn(errorMessage);
      }
    );

    return () => scanner.clear();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">📷 Scan QR Code</h2>
        <div id="qr-reader" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

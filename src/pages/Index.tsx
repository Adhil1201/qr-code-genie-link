
import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Download, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [url, setUrl] = useState('https://lovable.dev');
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qrcode.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto pt-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
              <Link2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            QR Code Generator
          </h1>
          <p className="text-gray-600 text-lg">
            Generate QR codes instantly from any URL
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-gray-800">
              Enter your URL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="text-lg h-14 border-2 border-gray-200 focus:border-purple-500 transition-colors duration-200"
              />
              <p className="text-sm text-gray-500">
                Paste or type your URL above to generate a QR code
              </p>
            </div>

            {url && (
              <div className="flex flex-col items-center space-y-6">
                <div 
                  ref={qrRef}
                  className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={url}
                    viewBox={`0 0 256 256`}
                    bgColor="transparent"
                    fgColor="#1f2937"
                  />
                </div>

                <Button
                  onClick={downloadQRCode}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download QR Code
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Your QR code updates automatically as you type
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

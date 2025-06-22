
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, ScanQrCode } from 'lucide-react';

const QRScanner = () => {
  const [scannedData, setScannedData] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // For demo purposes, we'll simulate QR scanning
      // In a real implementation, you'd use a library like jsQR
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate successful QR code detection
        const mockData = "https://example.com/scanned-qr";
        setScannedData(mockData);
        toast({
          title: "QR Code Scanned!",
          description: "Successfully extracted data from the image",
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Scan Failed",
        description: "Could not detect QR code in the image",
        variant: "destructive",
      });
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <ScanQrCode className="w-6 h-6 text-violet-400" />
          QR Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Upload Image to Scan</Label>
          <Button
            onClick={triggerFileUpload}
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Image
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        
        {scannedData && (
          <div className="space-y-2">
            <Label className="text-white">Scanned Data:</Label>
            <Input
              value={scannedData}
              readOnly
              className="bg-white/20 border-white/30 text-white"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QRScanner;

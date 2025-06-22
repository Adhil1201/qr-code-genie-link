
import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Download, Link2, Settings, Palette, Ruler, Sparkles, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Iridescence from '@/components/Iridescence';
import QRValidator from '@/components/QRValidator';
import ClickSpark from '@/components/ClickSpark';
import ProfileCard from '@/components/ProfileCard';
import QRScanner from '@/components/QRScanner';
import LoadingAnimation from '@/components/LoadingAnimation';
import ShareButton from '@/components/ShareButton';

const Index = () => {
  const [url, setUrl] = useState('https://lovable.dev');
  const [qrSize, setQrSize] = useState([256]);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showCustomization, setShowCustomization] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadQRCode = () => {
    setIsGenerating(true);
    
    // Show loading for 2 seconds for demo
    setTimeout(() => {
      const svg = qrRef.current?.querySelector('svg');
      if (!svg) {
        setIsGenerating(false);
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      canvas.width = qrSize[0];
      canvas.height = qrSize[0];

      img.onload = () => {
        if (ctx) {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const pngFile = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.download = 'qrcode.png';
          downloadLink.href = pngFile;
          downloadLink.click();
        }
        setIsGenerating(false);
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }, 2000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Copied to clipboard",
        description: "URL has been copied to your clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Iridescence Background with white theme */}
      <Iridescence 
        color={[0.9, 0.95, 1]}
        amplitude={0.3}
        speed={0.8}
      />
      
      <div className="relative z-10 min-h-screen bg-white/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto pt-12 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-4 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Link2 className="w-12 h-12 text-gray-800" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
              QR Code Generator
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create stunning, customizable QR codes instantly. Perfect for sharing URLs, contact info, and more with beautiful design options.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Sparkles className="w-6 h-6 text-yellow-600" />
                <span className="text-gray-800 font-medium">Instant Generation</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Palette className="w-6 h-6 text-purple-600" />
                <span className="text-gray-800 font-medium">Full Customization</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <Shield className="w-6 h-6 text-violet-600" />
                <span className="text-gray-800 font-medium">URL Validation</span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                {/* Main Content Card */}
                <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm border border-white/20">
                  <CardHeader className="text-center pb-6 bg-gradient-to-r from-white/60 to-purple-100/30 rounded-t-lg border-b border-white/20">
                    <CardTitle className="text-3xl text-gray-800 flex items-center justify-center gap-3">
                      <Zap className="w-8 h-8 text-violet-600" />
                      QR Code Generator
                    </CardTitle>
                    <p className="text-gray-600 mt-2">Enter your URL and generate your QR code</p>
                  </CardHeader>
                  <CardContent className="space-y-8 p-8">
                    {/* QR Code Display - Above URL input */}
                    {url && (
                      <div className="flex flex-col items-center space-y-6">
                        {isGenerating ? (
                          <div className="flex flex-col items-center space-y-4">
                            <LoadingAnimation />
                            <p className="text-gray-600">Generating your QR code...</p>
                          </div>
                        ) : (
                          <div 
                            ref={qrRef}
                            className="p-6 rounded-2xl shadow-xl border-2 border-white/30 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
                            style={{ backgroundColor: bgColor }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
                            <QRCode
                              size={qrSize[0]}
                              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                              value={url}
                              viewBox={`0 0 ${qrSize[0]} ${qrSize[0]}`}
                              bgColor={bgColor}
                              fgColor={fgColor}
                            />
                          </div>
                        )}

                        <div className="flex gap-4">
                          <Button
                            onClick={downloadQRCode}
                            disabled={isGenerating}
                            className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 hover:from-purple-700 hover:via-violet-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                          >
                            <Download className="w-5 h-5 mr-3" />
                            Download QR Code
                          </Button>
                          
                          <ShareButton url={url} onCopy={copyToClipboard} />
                        </div>
                      </div>
                    )}

                    {/* URL Input Section */}
                    <div className="space-y-4">
                      <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Link2 className="w-5 h-5" />
                        Website URL
                      </Label>
                      <Input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="text-lg h-14 border-2 border-gray-300 focus:border-violet-500 transition-colors duration-200 bg-white/40 text-gray-800 rounded-xl shadow-inner placeholder:text-gray-500"
                      />
                    </div>

                    {/* Customization Toggle Button */}
                    <div className="flex justify-center">
                      <ClickSpark 
                        onClick={() => setShowCustomization(!showCustomization)}
                        className="cursor-pointer"
                      >
                        <Button
                          variant="outline"
                          className="flex items-center gap-3 bg-gradient-to-r from-violet-100/50 to-purple-100/50 hover:from-violet-200/60 hover:to-purple-200/60 border-2 border-violet-300/50 hover:border-violet-400/70 transition-all duration-300 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 text-gray-800"
                        >
                          <Settings className="w-6 h-6" />
                          {showCustomization ? 'Hide Customization' : 'Customize Your QR Code'}
                        </Button>
                      </ClickSpark>
                    </div>

                    {/* Customization Panel - Show only when toggled */}
                    {showCustomization && (
                      <div className="space-y-8 animate-fade-in">
                        {/* QR Validation Section */}
                        <div className="space-y-4 p-6 bg-gradient-to-r from-green-100/40 to-emerald-100/40 rounded-xl border-2 border-green-300/50">
                          <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            QR Code Validation
                          </Label>
                          <QRValidator url={url} />
                        </div>

                        {/* Size Control Section */}
                        <div className="space-y-4 p-6 bg-gradient-to-r from-violet-100/40 to-purple-100/40 rounded-xl border-2 border-violet-300/50">
                          <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Ruler className="w-5 h-5" />
                            QR Code Size
                          </Label>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600 font-medium">128px</span>
                              <span className="font-bold text-violet-600 bg-violet-100/60 px-4 py-2 rounded-full text-lg">
                                {qrSize[0]}px
                              </span>
                              <span className="text-sm text-gray-600 font-medium">400px</span>
                            </div>
                            <Slider
                              value={qrSize}
                              onValueChange={setQrSize}
                              max={400}
                              min={128}
                              step={32}
                              className="w-full"
                            />
                          </div>
                        </div>

                        {/* Color Customization Section */}
                        <div className="space-y-6 p-6 bg-gradient-to-r from-purple-100/40 to-violet-100/40 rounded-xl border-2 border-purple-300/50">
                          <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <Palette className="w-5 h-5" />
                            Color Theme
                          </Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <Label className="font-semibold text-gray-700">QR Code Color</Label>
                              <div className="flex items-center space-x-4 p-4 bg-white/40 rounded-xl border-2 border-white/30 shadow-inner">
                                <input
                                  type="color"
                                  value={fgColor}
                                  onChange={(e) => setFgColor(e.target.value)}
                                  className="w-16 h-16 rounded-xl border-3 border-gray-300 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                                />
                                <div className="flex-1">
                                  <Input
                                    value={fgColor}
                                    onChange={(e) => setFgColor(e.target.value)}
                                    className="font-mono text-sm border-gray-300 bg-white/40 text-gray-800"
                                    placeholder="#000000"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <Label className="font-semibold text-gray-700">Background Color</Label>
                              <div className="flex items-center space-x-4 p-4 bg-white/40 rounded-xl border-2 border-white/30 shadow-inner">
                                <input
                                  type="color"
                                  value={bgColor}
                                  onChange={(e) => setBgColor(e.target.value)}
                                  className="w-16 h-16 rounded-xl border-3 border-gray-300 cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                                />
                                <div className="flex-1">
                                  <Input
                                    value={bgColor}
                                    onChange={(e) => setBgColor(e.target.value)}
                                    className="font-mono text-sm border-gray-300 bg-white/40 text-gray-800"
                                    placeholder="#ffffff"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* QR Code Info */}
                    {url && (
                      <div className="w-full p-6 bg-gradient-to-r from-white/60 to-violet-100/30 rounded-xl border border-white/30">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-yellow-600" />
                          QR Code Details
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p><span className="font-medium">Size:</span> {qrSize[0]}px × {qrSize[0]}px</p>
                          <p><span className="font-medium">Format:</span> PNG</p>
                          <p><span className="font-medium">URL:</span> <span className="break-all">{url}</span></p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - 1 column */}
              <div className="space-y-8">
                {/* QR Profile Card */}
                <div className="flex justify-center">
                  <ProfileCard 
                    url={url}
                    qrSize={180}
                    qrFgColor={fgColor}
                    qrBgColor={bgColor}
                    className="w-full max-w-sm"
                  />
                </div>
                
                {/* QR Scanner */}
                <QRScanner />
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-16 text-center pb-8">
            <p className="text-gray-700 text-lg">
              🎨 Your QR code updates automatically as you customize it
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Powered by advanced QR generation technology with beautiful iridescent effects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

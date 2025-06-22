
import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { Download, Link2, Share2, Copy, Facebook, Twitter, Palette, Ruler, Sparkles, Shield, Zap, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Aurora from '@/components/Aurora';
import QRValidator from '@/components/QRValidator';
import ClickSpark from '@/components/ClickSpark';

const Index = () => {
  const [url, setUrl] = useState('https://lovable.dev');
  const [qrSize, setQrSize] = useState([256]);
  const [fgColor, setFgColor] = useState('#1f2937');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showCustomization, setShowCustomization] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

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
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
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

  const shareToSocial = (platform: string) => {
    const text = `Check out this QR code for: ${url}`;
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Aurora Background with black, green, violet theme */}
      <Aurora 
        colorStops={["#000000", "#10b981", "#8b5cf6"]}
        amplitude={0.8}
        blend={0.6}
        speed={0.5}
      />
      
      <div className="relative z-10 min-h-screen bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto pt-12 px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-violet-600 to-emerald-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Link2 className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-green-200 to-violet-200 bg-clip-text text-transparent mb-4">
              QR Code Generator
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create stunning, customizable QR codes instantly. Perfect for sharing URLs, contact info, and more with beautiful design options.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-white font-medium">Instant Generation</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Palette className="w-6 h-6 text-green-400" />
                <span className="text-white font-medium">Full Customization</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Shield className="w-6 h-6 text-violet-400" />
                <span className="text-white font-medium">URL Validation</span>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Main Content Card */}
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6 bg-gradient-to-r from-green-50 to-violet-50 rounded-t-lg">
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
                    <div 
                      ref={qrRef}
                      className="p-6 rounded-2xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
                      style={{ backgroundColor: bgColor }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer"></div>
                      <QRCode
                        size={qrSize[0]}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={url}
                        viewBox={`0 0 ${qrSize[0]} ${qrSize[0]}`}
                        bgColor={bgColor}
                        fgColor={fgColor}
                      />
                    </div>

                    <Button
                      onClick={downloadQRCode}
                      className="bg-gradient-to-r from-green-600 via-violet-600 to-emerald-600 hover:from-green-700 hover:via-violet-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Download className="w-5 h-5 mr-3" />
                      Download QR Code
                    </Button>
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
                    className="text-lg h-14 border-2 border-gray-200 focus:border-violet-500 transition-colors duration-200 bg-white rounded-xl shadow-inner"
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
                      className="flex items-center gap-3 bg-gradient-to-r from-violet-50 to-green-50 hover:from-violet-100 hover:to-green-100 border-2 border-violet-200 hover:border-violet-400 transition-all duration-300 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
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
                    <div className="space-y-4 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-100">
                      <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        QR Code Validation
                      </Label>
                      <QRValidator url={url} />
                    </div>

                    {/* Size Control Section */}
                    <div className="space-y-4 p-6 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border-2 border-violet-100">
                      <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Ruler className="w-5 h-5" />
                        QR Code Size
                      </Label>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 font-medium">128px</span>
                          <span className="font-bold text-violet-600 bg-violet-100 px-4 py-2 rounded-full text-lg">
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
                    <div className="space-y-6 p-6 bg-gradient-to-r from-green-50 to-violet-50 rounded-xl border-2 border-green-100">
                      <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Color Theme
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <Label className="font-semibold text-gray-700">QR Code Color</Label>
                          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-inner">
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
                                className="font-mono text-sm border-gray-300"
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label className="font-semibold text-gray-700">Background Color</Label>
                          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border-2 border-gray-200 shadow-inner">
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
                                className="font-mono text-sm border-gray-300"
                                placeholder="#ffffff"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share Section */}
                    <div className="space-y-6 p-6 bg-gradient-to-r from-violet-50 to-green-50 rounded-xl border-2 border-violet-100">
                      <Label className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Share2 className="w-5 h-5" />
                        Share Options
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          className="flex items-center gap-2 bg-white hover:bg-violet-50 border-2 hover:border-violet-300 transition-all duration-200 h-12"
                        >
                          <Copy className="w-4 h-4" />
                          Copy URL
                        </Button>
                        <Button
                          onClick={() => shareToSocial('twitter')}
                          variant="outline"
                          className="flex items-center gap-2 bg-white hover:bg-green-50 border-2 hover:border-green-400 transition-all duration-200 h-12"
                        >
                          <Twitter className="w-4 h-4" />
                          Twitter
                        </Button>
                        <Button
                          onClick={() => shareToSocial('facebook')}
                          variant="outline"
                          className="flex items-center gap-2 bg-white hover:bg-violet-50 border-2 hover:border-violet-600 transition-all duration-200 h-12"
                        >
                          <Facebook className="w-4 h-4" />
                          Facebook
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* QR Code Info */}
                {url && (
                  <div className="w-full p-6 bg-gradient-to-r from-gray-50 to-violet-50 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
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

          {/* Footer Info */}
          <div className="mt-16 text-center pb-8">
            <p className="text-white/70 text-lg">
              🎨 Your QR code updates automatically as you customize it
            </p>
            <p className="text-white/50 text-sm mt-2">
              Powered by advanced QR generation technology with beautiful aurora effects
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

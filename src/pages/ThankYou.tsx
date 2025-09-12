import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CheckCircle, 
  Heart, 
  Share2, 
  Gift, 
  Mail, 
  Copy,
  Facebook,
  Twitter,
  Instagram,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ThankYou = () => {
  const location = useLocation();
  const { toast } = useToast();
  const { orderTotal = 0, orderItems = 0, customerEmail = '' } = location.state || {};
  
  const [referralEmail, setReferralEmail] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  const [orderNumber] = useState(() => `FC${Date.now().toString().slice(-6)}`);

  const referralCode = `FRIEND${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const shareUrl = `https://fossickandco.com.au?ref=${referralCode}`;

  useEffect(() => {
    // Confetti effect on load
    const timer = setTimeout(() => {
      // Add any celebration animation here
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReferralSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);
    
    // Simulate sending referral
    setTimeout(() => {
      toast({
        title: "Referral sent!",
        description: "Your friend will receive a special discount code via email.",
      });
      setReferralEmail('');
      setIsSharing(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard.",
    });
  };

  const socialShare = (platform: string) => {
    const text = "I just discovered the most beautiful boutique gifts at Fossick & Co! Check them out:";
    let url = '';
    
    switch (platform) {
      case 'facebook':
        url = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so copy to clipboard
        copyToClipboard(`${text} ${shareUrl}`);
        toast({
          title: "Ready to share!",
          description: "Post content copied to clipboard. Perfect for your Instagram story!",
        });
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          
          <h1 className="text-hero mb-4">Thank You!</h1>
          <p className="text-editorial text-muted-foreground max-w-2xl mx-auto">
            Your order has been confirmed and will be lovingly prepared by our team. 
            Get ready for something truly special to arrive at your door.
          </p>
        </div>

        {/* Order Details */}
        <Card className="card-editorial mb-8 animate-scale-in">
          <div className="text-center mb-6">
            <h2 className="text-subheading mb-2">Order Confirmation</h2>
            <p className="text-muted-foreground">Order #{orderNumber}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">${orderTotal}</div>
              <div className="text-sm text-muted-foreground">Total Amount</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{orderItems}</div>
              <div className="text-sm text-muted-foreground">Items Ordered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">2-3</div>
              <div className="text-sm text-muted-foreground">Business Days</div>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to <strong>{customerEmail}</strong>
            </p>
          </div>
        </Card>

        {/* What's Next */}
        <Card className="card-editorial mb-8">
          <h2 className="text-subheading mb-6">What Happens Next?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Order Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our team will carefully prepare and package your items with love and attention to detail.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Shipping Notification</h3>
                <p className="text-sm text-muted-foreground">
                  You'll receive tracking information once your package is on its way to you.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enjoy Your Gift</h3>
                <p className="text-sm text-muted-foreground">
                  Experience the joy of beautiful, thoughtfully curated items that tell a story.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Referral Program */}
        <Card className="card-editorial mb-8">
          <div className="text-center mb-6">
            <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
            <h2 className="text-subheading mb-2">Share the Love</h2>
            <p className="text-muted-foreground">
              Give your friends $20 off their first order and you'll get $20 credit too!
            </p>
          </div>
          
          {/* Referral Link */}
          <div className="bg-muted rounded-lg p-4 mb-4">
            <Label className="text-sm font-medium">Your Referral Link</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input value={shareUrl} readOnly className="font-mono text-sm" />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => copyToClipboard(shareUrl)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Email Referral */}
          <form onSubmit={handleReferralSend} className="mb-6">
            <Label htmlFor="referralEmail" className="text-sm font-medium">
              Send a Personal Invitation
            </Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                id="referralEmail"
                type="email"
                placeholder="friend@email.com"
                value={referralEmail}
                onChange={(e) => setReferralEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isSharing || !referralEmail}>
                {isSharing ? (
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>

          {/* Social Sharing */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Or share on social media</p>
            <div className="flex justify-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => socialShare('facebook')}
                className="text-blue-600 hover:bg-blue-50"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => socialShare('twitter')}
                className="text-blue-400 hover:bg-blue-50"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => socialShare('instagram')}
                className="text-pink-600 hover:bg-pink-50"
              >
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Continue Shopping */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button variant="cta" size="lg">
                <Gift className="h-4 w-4 mr-2" />
                Send Another Gift
              </Button>
            </Link>
            
            <Link to="/products">
              <Button variant="ghost" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Questions about your order? Contact us at{' '}
            <a href="mailto:hello@fossickandco.com.au" className="text-primary hover:underline">
              hello@fossickandco.com.au
            </a>
          </p>
        </div>

        {/* Review Prompt */}
        <Card className="card-editorial mt-8 text-center">
          <Star className="h-8 w-8 text-accent mx-auto mb-4" />
          <h3 className="text-subheading mb-2">Love what you received?</h3>
          <p className="text-muted-foreground mb-4">
            Your review helps other gift-givers discover the perfect pieces and supports our artisan partners.
          </p>
          <Button variant="secondary">
            Leave a Review
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default ThankYou;
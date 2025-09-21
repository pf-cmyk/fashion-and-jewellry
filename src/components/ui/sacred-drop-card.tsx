import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, Package, Truck } from 'lucide-react';
import garnetRingImage from '@/assets/garnet-zircon-pearl-ring.png';

interface SacredDropCardProps {
  onPurchase?: () => void;
}

const SacredDropCard = ({ onPurchase }: SacredDropCardProps) => {
  const [isShimmering, setIsShimmering] = useState(false);

  const handleHover = () => {
    setIsShimmering(true);
    setTimeout(() => setIsShimmering(false), 1000);
  };

  return (
    <Card className="sacred-drop-card overflow-hidden border-0 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm">
      <div className="relative">
        {/* Cinematic image with golden aura */}
        <div 
          className="relative overflow-hidden bg-gradient-to-br from-amber-900/20 via-transparent to-purple-900/20"
          onMouseEnter={handleHover}
        >
          <img 
            src={garnetRingImage}
            alt="Garnet Zircon & Pearl Open Ring"
            className={`w-full h-80 object-cover transition-all duration-700 ${
              isShimmering ? 'scale-105 brightness-110' : 'scale-100'
            }`}
          />
          
          {/* Golden aura overlay */}
          <div className={`absolute inset-0 bg-gradient-radial from-amber-400/30 via-transparent to-transparent transition-opacity duration-700 ${
            isShimmering ? 'opacity-60' : 'opacity-20'
          }`} />
          
          {/* Glassmorphic backdrop effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        </div>

        {/* Sacred Drop badge */}
        <Badge className="absolute top-6 left-6 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-semibold px-4 py-2 rounded-full shadow-lg">
          <Sparkles className="h-4 w-4 mr-2" />
          Sacred Drop
        </Badge>

        {/* Ceremonial urgency */}
        <Badge className="absolute top-6 right-6 bg-purple-900/90 text-white backdrop-blur-sm animate-pulse border border-purple-400/30">
          Ceremonial drop - meant for one
        </Badge>
      </div>

      <div className="p-8 space-y-6">
        {/* Product details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium tracking-wide">Sacred Drop</span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-amber-500 fill-current" />
              <span className="text-sm font-medium">5.0 (1)</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-serif tracking-tight text-foreground">
            Garnet Zircon & Pearl Open Ring
          </h3>
          
          <p className="text-muted-foreground font-light italic leading-relaxed">
            "Three stones. One moment. Proof of presence, sealed in shimmer."
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl font-bold text-foreground">$349</span>
          <span className="text-sm text-muted-foreground">AUD</span>
        </div>

        {/* Bohemian details */}
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-start space-x-3">
            <Package className="h-4 w-4 mt-0.5 text-accent" />
            <div>
              <p className="font-medium text-foreground">Ceremonial Packaging</p>
              <p>Linen wrap, handwritten card, natural fiber ribbon</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Truck className="h-4 w-4 mt-0.5 text-accent" />
            <div>
              <p className="font-medium text-foreground">Sacred Delivery</p>
              <p>3–7 days global, tracked with care</p>
            </div>
          </div>
        </div>

        {/* Sacred Purchase Button */}
        <Button 
          onClick={onPurchase}
          className="w-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 text-black font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Unlock Sacred Vault Access
        </Button>

        <p className="text-xs text-muted-foreground text-center font-light">
          By purchasing, you gain exclusive access to the Sacred Drop Vault
        </p>
      </div>
    </Card>
  );
};

export { SacredDropCard };
export default SacredDropCard;
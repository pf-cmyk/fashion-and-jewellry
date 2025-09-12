import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Gift, Package, PenTool, Sparkles, Heart } from 'lucide-react';
import giftWrappingImage from '@/assets/gift-wrapping.jpg';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: any;
  popular?: boolean;
  image?: string;
}

const Upsell = () => {
  const location = useLocation();
  const { selectedProducts = [], products = [] } = location.state || {};
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const addOns: AddOn[] = [
    {
      id: 'premium-wrap',
      name: 'Premium Gift Wrapping',
      description: 'Beautiful hand-wrapped packaging with sustainable materials, custom ribbon, and elegant finishing touches.',
      price: 15,
      icon: Gift,
      popular: true,
      image: giftWrappingImage
    },
    {
      id: 'handwritten-note',
      name: 'Handwritten Personal Note',
      description: 'A thoughtfully written personal message on our signature letterpress card, sealed with wax.',
      price: 8,
      icon: PenTool,
      popular: true
    },
    {
      id: 'express-shipping',
      name: 'Express Shipping',
      description: 'Next-day delivery across Australia with tracking and insurance included.',
      price: 25,
      icon: Package
    },
    {
      id: 'care-package',
      name: 'Care Instructions Card',
      description: 'Detailed care instructions and story about the artisan who created your piece.',
      price: 5,
      icon: Heart
    },
    {
      id: 'seasonal-extras',
      name: 'Seasonal Extras',
      description: 'Curated seasonal additions like dried flowers, local chocolates, or small decorative elements.',
      price: 18,
      icon: Sparkles,
      popular: true
    }
  ];

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const subtotal = selectedProducts.reduce((sum: number, id: string) => {
    const product = products.find((p: any) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  const addOnTotal = selectedAddOns.reduce((sum, id) => {
    const addOn = addOns.find(a => a.id === id);
    return sum + (addOn?.price || 0);
  }, 0);

  const total = subtotal + addOnTotal;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/products" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Products
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Step 3 of 4 - Enhance Your Gift
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="text-center mb-8">
              <h1 className="text-heading mb-4">Make It Extra Special</h1>
              <p className="text-editorial text-muted-foreground">
                Elevate your gift with our curated add-ons, each designed to create 
                a more meaningful and memorable experience.
              </p>
            </div>

            {/* Featured Add-on */}
            <Card className="card-editorial mb-8 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="order-2 md:order-1 flex flex-col justify-center">
                  <div className="flex items-center mb-3">
                    <Gift className="h-6 w-6 text-primary mr-2" />
                    <span className="text-sm font-medium text-accent">MOST POPULAR</span>
                  </div>
                  <h3 className="text-subheading mb-4">Premium Gift Wrapping</h3>
                  <p className="text-editorial text-muted-foreground mb-6">
                    Transform your gift into a work of art with our signature wrapping service. 
                    Each package is carefully crafted by hand using sustainable materials.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">$15</span>
                    <Button 
                      variant={selectedAddOns.includes('premium-wrap') ? "secondary" : "primary"}
                      onClick={() => toggleAddOn('premium-wrap')}
                    >
                      {selectedAddOns.includes('premium-wrap') ? 'Added' : 'Add to Order'}
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src={giftWrappingImage} 
                    alt="Premium gift wrapping"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </Card>

            {/* All Add-ons */}
            <div className="space-y-4">
              {addOns.filter(addOn => addOn.id !== 'premium-wrap').map((addOn) => {
                const Icon = addOn.icon;
                const isSelected = selectedAddOns.includes(addOn.id);

                return (
                  <Card
                    key={addOn.id}
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-medium)] ${
                      isSelected 
                        ? 'border-primary bg-primary/5 shadow-[var(--shadow-soft)]' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => toggleAddOn(addOn.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-lg mr-3">{addOn.name}</h3>
                          {addOn.popular && (
                            <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">{addOn.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">${addOn.price}</span>
                          <Checkbox 
                            checked={isSelected}
                            onCheckedChange={() => toggleAddOn(addOn.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="card-editorial sticky top-24">
              <h3 className="text-subheading mb-6">Order Summary</h3>
              
              {/* Selected Products */}
              <div className="space-y-3 mb-6">
                {selectedProducts.map((productId: string) => {
                  const product = products.find((p: any) => p.id === productId);
                  if (!product) return null;
                  
                  return (
                    <div key={productId} className="flex justify-between items-start">
                      <div className="flex-1 pr-3">
                        <div className="font-medium text-sm">{product.name}</div>
                        <div className="text-xs text-muted-foreground">{product.category}</div>
                      </div>
                      <div className="font-medium">${product.price}</div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Add-ons */}
              {selectedAddOns.length > 0 && (
                <div className="border-t pt-4 mb-6">
                  <div className="text-sm font-medium mb-3 text-muted-foreground">Add-ons:</div>
                  <div className="space-y-2">
                    {selectedAddOns.map((addOnId) => {
                      const addOn = addOns.find(a => a.id === addOnId);
                      if (!addOn) return null;
                      
                      return (
                        <div key={addOnId} className="flex justify-between items-center">
                          <span className="text-sm">{addOn.name}</span>
                          <span className="font-medium">${addOn.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal}</span>
                </div>
                {addOnTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Add-ons:</span>
                    <span>${addOnTotal}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mt-6">
                <Link to="/checkout" state={{ selectedProducts, products, selectedAddOns, addOns }}>
                  <Button variant="cta" className="w-full">
                    Continue to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                
                <Button variant="ghost" className="w-full text-sm">
                  Skip Add-ons
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="border-t pt-4 mt-6 text-center text-xs text-muted-foreground">
                <div className="space-y-1">
                  <div>🔒 Secure Payment</div>
                  <div>🚚 Free Shipping Over $100</div>
                  <div>💝 Satisfaction Guaranteed</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upsell;
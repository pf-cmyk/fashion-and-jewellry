import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Shield, Clock, Check, Apple } from 'lucide-react';
import { UrgencyTimer } from '@/components/ui/urgency-timer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts = [], products = [], selectedAddOns = [], addOns = [] } = location.state || {};
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    state: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = selectedProducts.reduce((sum: number, id: string) => {
    const product = products.find((p: any) => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  const addOnTotal = selectedAddOns.reduce((sum: number, id: string) => {
    const addOn = addOns.find((a: any) => a.id === id);
    return sum + (addOn?.price || 0);
  }, 0);

  const shipping = subtotal >= 100 ? 0 : 12;
  const total = subtotal + addOnTotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          orderTotal: total,
          orderItems: selectedProducts.length + selectedAddOns.length,
          customerEmail: formData.email
        }
      });
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/upsell" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Add-ons
            </Link>
            
            <div className="flex items-center space-x-4">
              <UrgencyTimer initialMinutes={47} className="text-sm" />
              <div className="text-sm text-muted-foreground">
                Step 4 of 4 - Secure Checkout
              </div>
              <div className="flex items-center text-accent">
                <Shield className="h-4 w-4 mr-1" />
                <span className="text-xs">Secured</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <h1 className="text-heading mb-8">Complete Your Order</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <Card className="card-editorial">
                <h2 className="text-subheading mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              {/* Shipping Information */}
              <Card className="card-editorial">
                <h2 className="text-subheading mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Your Street"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NSW"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postcode">Postcode</Label>
                    <Input
                      id="postcode"
                      name="postcode"
                      required
                      value={formData.postcode}
                      onChange={handleInputChange}
                      placeholder="2000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0412 345 678"
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="card-editorial">
                <h2 className="text-subheading mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  {/* Payment Options */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      type="button"
                      variant={paymentMethod === 'apple' ? "primary" : "ghost"}
                      onClick={() => setPaymentMethod('apple')}
                      className="h-16 flex items-center justify-center"
                    >
                      <Apple className="h-6 w-6 mr-2" />
                      Apple Pay
                    </Button>
                    
                    <Button
                      type="button"
                      variant={paymentMethod === 'afterpay' ? "primary" : "ghost"}
                      onClick={() => setPaymentMethod('afterpay')}
                      className="h-16 flex items-center justify-center"
                    >
                      Afterpay
                    </Button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-background px-4 text-muted-foreground">or pay with card</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant={paymentMethod === 'card' ? "primary" : "ghost"}
                    onClick={() => setPaymentMethod('card')}
                    className="w-full h-16 flex items-center justify-center"
                  >
                    <CreditCard className="h-6 w-6 mr-2" />
                    Credit / Debit Card
                  </Button>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <Label>Card Number</Label>
                        <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Expiry</Label>
                          <Input placeholder="MM/YY" className="mt-1" />
                        </div>
                        <div>
                          <Label>CVC</Label>
                          <Input placeholder="123" className="mt-1" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Submit Button */}
              <Button 
                type="submit" 
                variant="hero" 
                size="xl" 
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Complete Order - ${total}
                    <Shield className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="card-editorial sticky top-24">
              <h3 className="text-subheading mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {selectedProducts.map((productId: string) => {
                  const product = products.find((p: any) => p.id === productId);
                  if (!product) return null;
                  
                  return (
                    <div key={productId} className="flex justify-between items-start">
                      <div className="flex-1 pr-3">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.category}</div>
                      </div>
                      <div className="font-medium">${product.price}</div>
                    </div>
                  );
                })}
                
                {selectedAddOns.map((addOnId: string) => {
                  const addOn = addOns.find((a: any) => a.id === addOnId);
                  if (!addOn) return null;
                  
                  return (
                    <div key={addOnId} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">+ {addOn.name}</span>
                      <span className="font-medium">${addOn.price}</span>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal + addOnTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Urgency & Trust */}
              <div className="mt-6 space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <Clock className="h-5 w-5 text-red-600 mx-auto mb-2 animate-pulse" />
                  <div className="text-sm font-medium text-red-800">⚠️ Limited Stock Alert</div>
                  <div className="text-xs text-red-600">
                    Only 3 left in stock! 17 people have this in their cart
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded text-green-700">
                    <Check className="h-3 w-3" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded text-blue-700">
                    <Check className="h-3 w-3" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded text-purple-700">
                    <Check className="h-3 w-3" />
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded text-red-700">
                    <Check className="h-3 w-3" />
                    <span>Guaranteed</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
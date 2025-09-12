import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Heart, ShoppingBag, Clock, Star, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  featured?: boolean;
  urgency?: string;
  rating: number;
  reviews: number;
}

const Products = () => {
  const location = useLocation();
  const quizData = location.state?.quizData;
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Mock products based on quiz data
  const products: Product[] = [
    {
      id: '1',
      name: 'Handcrafted Ceramic Vase',
      price: 89,
      originalPrice: 129,
      image: '/placeholder.svg',
      description: 'Beautiful artisan vase with unique glazing, perfect for fresh flowers or as a standalone piece.',
      category: 'Home Decor',
      featured: true,
      urgency: 'Only 3 left in stock',
      rating: 4.9,
      reviews: 127
    },
    {
      id: '2',
      name: 'Artisan Jewelry Box',
      price: 165,
      image: '/placeholder.svg',
      description: 'Handmade wooden jewelry box with velvet interior and intricate details.',
      category: 'Accessories',
      rating: 4.8,
      reviews: 89
    },
    {
      id: '3',
      name: 'Luxury Candle Set',
      price: 78,
      originalPrice: 95,
      image: '/placeholder.svg',
      description: 'Set of three premium soy candles with unique Australian-inspired scents.',
      category: 'Home & Lifestyle',
      featured: true,
      urgency: 'Flash sale - 48 hours left',
      rating: 4.7,
      reviews: 203
    },
    {
      id: '4',
      name: 'Vintage Silk Scarf',
      price: 120,
      image: '/placeholder.svg',
      description: 'Luxurious silk scarf with hand-painted botanical design, perfect for any season.',
      category: 'Fashion',
      rating: 4.9,
      reviews: 156
    },
    {
      id: '5',
      name: 'Artisan Tea Collection',
      price: 45,
      image: '/placeholder.svg',
      description: 'Curated collection of premium loose-leaf teas from local growers.',
      category: 'Gourmet',
      rating: 4.6,
      reviews: 92
    },
    {
      id: '6',
      name: 'Hand-thrown Pottery Set',
      price: 220,
      originalPrice: 280,
      image: '/placeholder.svg',
      description: 'Complete dinner set crafted by local artisan, each piece unique.',
      category: 'Home Decor',
      featured: true,
      urgency: 'Limited edition - only 5 sets available',
      rating: 5.0,
      reviews: 67
    }
  ];

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const totalPrice = selectedProducts.reduce((sum, id) => {
    const product = products.find(p => p.id === id);
    return sum + (product?.price || 0);
  }, 0);

  const savings = selectedProducts.reduce((sum, id) => {
    const product = products.find(p => p.id === id);
    const originalPrice = product?.originalPrice || product?.price || 0;
    const currentPrice = product?.price || 0;
    return sum + (originalPrice - currentPrice);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/quiz" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Quiz
            </Link>
            
            {selectedProducts.length > 0 && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">
                  {selectedProducts.length} item{selectedProducts.length !== 1 ? 's' : ''} selected
                </div>
                <Link to="/upsell" state={{ selectedProducts, products }}>
                  <Button variant="cta">
                    Continue to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Personalized Header */}
        {quizData && (
          <div className="text-center mb-12">
            <h1 className="text-heading mb-4">Perfect Gifts for Your {quizData.recipient}</h1>
            <p className="text-editorial text-muted-foreground max-w-2xl mx-auto">
              Based on your preferences, we've curated these beautiful pieces that would be perfect for 
              {quizData.occasion === 'justbecause' ? ' showing you care' : ` ${quizData.occasion}`}.
            </p>
          </div>
        )}

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-subheading mb-6 flex items-center">
            <Star className="h-6 w-6 text-accent mr-2" />
            Featured Recommendations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter(product => product.featured).map((product) => (
              <Card
                key={product.id}
                className="product-card cursor-pointer overflow-hidden border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)]"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {product.urgency && (
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground animate-pulse">
                      <Clock className="h-3 w-3 mr-1" />
                      {product.urgency}
                    </Badge>
                  )}
                  
                  {product.originalPrice && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                      Save ${product.originalPrice - product.price}
                    </Badge>
                  )}

                  <div className="product-overlay flex items-center justify-center">
                    <Button
                      variant={selectedProducts.includes(product.id) ? "secondary" : "primary"}
                      size="sm"
                      onClick={() => toggleProduct(product.id)}
                      className="transform scale-90 group-hover:scale-100 transition-transform"
                    >
                      {selectedProducts.includes(product.id) ? (
                        <>Selected <Heart className="h-4 w-4 ml-1 fill-current" /></>
                      ) : (
                        <>Add to Bundle <Plus className="h-4 w-4 ml-1" /></>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-accent fill-current" />
                      <span className="text-sm ml-1">{product.rating} ({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleProduct(product.id)}
                      className={selectedProducts.includes(product.id) ? "text-primary" : ""}
                    >
                      {selectedProducts.includes(product.id) ? (
                        <Heart className="h-5 w-5 fill-current" />
                      ) : (
                        <Heart className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-subheading mb-6">Complete Collection</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="product-card cursor-pointer overflow-hidden border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)]"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div className="product-overlay flex items-center justify-center">
                    <Button
                      variant={selectedProducts.includes(product.id) ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => toggleProduct(product.id)}
                      className="bg-white/90 backdrop-blur-sm"
                    >
                      {selectedProducts.includes(product.id) ? (
                        <Heart className="h-4 w-4 fill-current text-primary" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{product.category}</span>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-accent fill-current" />
                      <span className="text-xs ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Floating Cart Summary */}
        {selectedProducts.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-card rounded-2xl shadow-[var(--shadow-strong)] p-6 border max-w-sm animate-scale-in">
            <h3 className="font-semibold mb-4">Your Bundle</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-accent">
                  <span>You save:</span>
                  <span>-${savings}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
            
            <Link to="/upsell" state={{ selectedProducts, products }}>
              <Button variant="cta" className="w-full">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Continue ({selectedProducts.length} items)
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
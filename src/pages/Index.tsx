import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Gift, Sparkles } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';
import { SocialProof } from '@/components/ui/social-proof';
import { UrgencyTimer } from '@/components/ui/urgency-timer';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Scroll reveal effect
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(35, 15, 97, 0.4), rgba(35, 15, 97, 0.6)), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <UrgencyTimer className="mb-4" />
            
            <h1 className="text-hero text-white mb-6 leading-none">
              Gifts That Tell
              <span className="block text-accent">Stories</span>
            </h1>
            
            <p className="text-editorial text-white/90 mb-6 max-w-2xl mx-auto">
              Discover carefully curated treasures from Kalgoorlie's premier boutique. 
              Each piece chosen to create moments that matter.
            </p>
            
            <div className="mb-6 flex justify-center items-center gap-6 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>FREE Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>30-Day Money Back</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/quiz">
                <Button variant="hero" size="xl" className="group relative overflow-hidden">
                  Find The Perfect Gift Now →
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-variant to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </Link>
              
              <Link to="/story">
                <Button variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 text-sm text-white/80">
              ⚡ 1,247+ customers shopped in the last 24 hours
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 animate-bounce delay-300">
          <Heart className="h-8 w-8 text-accent/60" />
        </div>
        <div className="absolute bottom-32 right-16 animate-bounce delay-700">
          <Gift className="h-10 w-10 text-secondary/60" />
        </div>
        <div className="absolute top-1/3 right-20 animate-bounce delay-500">
          <Sparkles className="h-6 w-6 text-accent/80" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-heading mb-6">Why Choose Luxe Jewel Co?</h2>
            <p className="text-editorial text-muted-foreground max-w-3xl mx-auto">
              Join over 15,000+ satisfied customers who trust us for meaningful gifts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-editorial text-center scroll-reveal hover:shadow-[var(--shadow-elegant)] transition-all border">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-variant rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-subheading mb-4">Curated with Love</h3>
              <p className="text-editorial text-muted-foreground mb-4">
                Every item is handpicked by our team, ensuring quality and uniqueness in every gift.
              </p>
              <div className="text-sm text-primary font-semibold">⭐ 4.9/5 Rating</div>
            </div>

            <div className="card-editorial text-center scroll-reveal hover:shadow-[var(--shadow-elegant)] transition-all border">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-variant rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                <Gift className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-subheading mb-4">FREE Premium Wrapping</h3>
              <p className="text-editorial text-muted-foreground mb-4">
                Beautiful, sustainable packaging that makes the unboxing as special as the gift itself.
              </p>
              <div className="text-sm text-green-600 font-semibold">💎 $25 Value Included</div>
            </div>

            <div className="card-editorial text-center scroll-reveal hover:shadow-[var(--shadow-elegant)] transition-all border">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-variant rounded-full flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-subheading mb-4">Lightning Fast Shipping</h3>
              <p className="text-editorial text-muted-foreground mb-4">
                We partner with trusted couriers to deliver your gifts in 1-3 business days.
              </p>
              <div className="text-sm text-primary font-semibold">🚚 Express Available</div>
            </div>
          </div>

          <div className="text-center mt-16 scroll-reveal">
            <div className="bg-gradient-to-r from-primary/10 to-primary-variant/10 rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold mb-4">🎯 Perfect Gift Guarantee</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Not happy? We'll replace it or refund 100% - no questions asked
              </p>
              <Link to="/quiz">
                <Button variant="cta" size="lg" className="hover:scale-105 transition-transform">
                  Find Your Perfect Gift Now →
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto text-center px-6 scroll-reveal">
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">15,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⭐⭐⭐⭐⭐</span>
                <span className="font-bold text-lg">4.9</span>
              </div>
              <div className="text-sm text-muted-foreground">1,200+ Reviews</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">24H</div>
              <div className="text-sm text-muted-foreground">Fast Shipping</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Guarantee</div>
            </div>
          </div>
          
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4 inline-block">
            <div className="flex items-center gap-2 text-yellow-800">
              <span className="animate-pulse">🔥</span>
              <span className="font-semibold">Limited Time: 40% OFF everything + FREE shipping ends in 2 days!</span>
              <span className="animate-pulse">🔥</span>
            </div>
          </div>
        </div>
      </section>
      
      <SocialProof />
    </div>
  );
};

export default Index;
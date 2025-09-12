import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Gift, Sparkles } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

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
            <h1 className="text-hero text-white mb-6 leading-none">
              Gifts That Tell
              <span className="block text-accent">Stories</span>
            </h1>
            
            <p className="text-editorial text-white/90 mb-8 max-w-2xl mx-auto">
              Discover carefully curated treasures from Kalgoorlie's premier boutique. 
              Each piece chosen to create moments that matter.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/quiz">
                <Button variant="hero" size="xl" className="group">
                  Find The Perfect Gift
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/story">
                <Button variant="ghost" size="lg" className="text-white border-white/30 hover:bg-white/10">
                  Our Story
                </Button>
              </Link>
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
            <h2 className="text-heading mb-6">Why Choose Fossick & Co?</h2>
            <p className="text-editorial text-muted-foreground max-w-3xl mx-auto">
              Every piece in our collection has been thoughtfully selected to bring joy, 
              beauty, and meaning to your gifting experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-editorial text-center scroll-reveal">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-subheading mb-4">Curated with Love</h3>
              <p className="text-editorial text-muted-foreground">
                Every item is handpicked by our team, ensuring quality and uniqueness in every gift.
              </p>
            </div>

            <div className="card-editorial text-center scroll-reveal">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-subheading mb-4">Premium Wrapping</h3>
              <p className="text-editorial text-muted-foreground">
                Beautiful, sustainable packaging that makes the unboxing as special as the gift itself.
              </p>
            </div>

            <div className="card-editorial text-center scroll-reveal">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-subheading mb-4">Local Artisans</h3>
              <p className="text-editorial text-muted-foreground">
                Supporting local creators and bringing you authentic, one-of-a-kind treasures.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 scroll-reveal">
            <Link to="/quiz">
              <Button variant="cta" size="lg">
                Start Your Gift Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center px-6 scroll-reveal">
          <p className="text-editorial text-muted-foreground mb-8">Trusted by gift-givers across Australia</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-sm font-medium">⭐⭐⭐⭐⭐ 500+ Reviews</div>
            <div className="text-sm font-medium">🚚 Fast Shipping</div>
            <div className="text-sm font-medium">♻️ Sustainable</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
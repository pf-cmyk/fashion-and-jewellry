import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Heart, MapPin, Users, Award } from 'lucide-react';
import storefrontImage from '@/assets/storefront.jpg';

const Story = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      location: "Perth, WA",
      rating: 5,
      text: "I've never experienced such thoughtful curation and personal service. Every piece I've bought from Luxe Jewel Co has been absolutely perfect.",
      purchase: "Handcrafted Ceramic Collection"
    },
    {
      name: "Emma Thompson", 
      location: "Adelaide, SA",
      rating: 5,
      text: "The attention to detail in both the products and packaging is extraordinary. My sister was moved to tears by her birthday gift.",
      purchase: "Artisan Jewelry Box"
    },
    {
      name: "Michael Chen",
      location: "Melbourne, VIC", 
      rating: 5,
      text: "As someone who struggles with gift-giving, Luxe Jewel Co made me look like a thoughtful genius. My wife still raves about her anniversary gift.",
      purchase: "Luxury Candle Set"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-hero mb-6">Our Story</h1>
          <p className="text-editorial text-muted-foreground max-w-3xl mx-auto mb-8">
            Born from a passion for beautiful objects and meaningful connections, 
            Luxe Jewel Co celebrates the art of thoughtful gifting in the heart of Kalgoorlie.
          </p>
        </section>

        {/* Main Story */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h2 className="text-heading mb-6">Where Stories Begin</h2>
            <div className="space-y-6 text-editorial text-muted-foreground">
              <p>
                In 2019, founders Emma and James discovered that gift-giving had lost its soul. 
                Mass-produced items and impersonal online shopping had stripped away the joy 
                of finding that perfect, meaningful piece.
              </p>
              <p>
                They envisioned a different approach—a curated experience where every item 
                tells a story, supports local artisans, and creates genuine moments of connection. 
                From their boutique in historic Kalgoorlie, they began fostering relationships 
                with talented creators across Australia.
              </p>
              <p>
                Today, Luxe Jewel Co stands as a beacon for conscious consumption and meaningful gifting, 
                proving that the perfect gift isn't just about the object—it's about the love, 
                thought, and story that comes with it.
              </p>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <img 
              src={storefrontImage} 
              alt="Luxe Jewel Co storefront in Kalgoorlie"
              className="rounded-2xl shadow-[var(--shadow-strong)] w-full"
            />
          </div>
        </section>

        {/* Values Grid */}
        <section className="mb-20">
          <h2 className="text-heading text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-editorial text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-subheading mb-4">Thoughtful Curation</h3>
              <p className="text-editorial text-muted-foreground">
                Every piece in our collection is chosen with intention, ensuring it meets our 
                standards for quality, beauty, and meaning.
              </p>
            </Card>

            <Card className="card-editorial text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-subheading mb-4">Local Artisans</h3>
              <p className="text-editorial text-muted-foreground">
                We proudly support Australian creators, fostering a community of skilled 
                artisans and bringing their unique stories to life.
              </p>
            </Card>

            <Card className="card-editorial text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-subheading mb-4">Sustainable Practice</h3>
              <p className="text-editorial text-muted-foreground">
                From eco-friendly packaging to supporting sustainable production methods, 
                we care about our impact on the world.
              </p>
            </Card>
          </div>
        </section>

        {/* Location */}
        <section className="card-hero text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <MapPin className="h-8 w-8 text-accent mr-3" />
            <h2 className="text-heading">Visit Us in Kalgoorlie</h2>
          </div>
          <p className="text-editorial text-muted-foreground max-w-2xl mx-auto mb-6">
            Our boutique is located in the heart of Kalgoorlie's historic district, 
            where you can experience our curated collection in person and meet the 
            team behind the magic.
          </p>
          <div className="text-lg font-medium">
            123 Hannan Street, Kalgoorlie WA 6430<br />
            Tuesday - Saturday, 10am - 5pm
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-heading text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-editorial">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                
                <blockquote className="text-editorial text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="border-t pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <div className="text-xs text-accent mt-1">Purchased: {testimonial.purchase}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="card-hero max-w-3xl mx-auto">
            <h2 className="text-heading mb-6">Ready to Create Your Own Story?</h2>
            <p className="text-editorial text-muted-foreground mb-8">
              Join thousands of thoughtful gift-givers who trust Luxe Jewel Co to help 
              them create meaningful moments and lasting memories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/quiz">
                <Button variant="hero" size="lg">
                  Find Your Perfect Gift
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              
              <Link to="/products">
                <Button variant="ghost" size="lg">
                  Browse Collection
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Story;
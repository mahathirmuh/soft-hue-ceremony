import { Heart } from "lucide-react";
import coupleHero from "@/assets/couple-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={coupleHero} 
          alt="Sarah and Michael" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <Heart className="w-12 h-12 text-primary mx-auto mb-8 animate-float" />
          
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground mb-4">
            Sarah <span className="text-primary">&</span> Michael
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            are getting married
          </p>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-border/50 inline-block">
            <p className="text-lg text-foreground mb-2">Save the Date</p>
            <p className="text-3xl font-serif font-semibold text-primary mb-2">
              June 15, 2024
            </p>
            <p className="text-lg text-muted-foreground">
              Garden Pavilion, Rosewood Estate
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default HeroSection;
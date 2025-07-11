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
          
          {/* Bismillah */}
          <div className="mb-8">
            <p className="text-2xl md:text-3xl text-primary font-arabic mb-2" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-sm text-muted-foreground italic">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl font-bold text-foreground mb-4">
            Cahya Maulida <span className="text-primary">&</span> Mahathir Muhammad
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            are getting married
          </p>

          {/* Quranic Verse */}
          <div className="mb-8 max-w-3xl mx-auto">
            <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-border/30 mb-6">
              <p className="text-xl md:text-2xl text-primary font-arabic mb-3 leading-relaxed" dir="rtl">
                ٱلَّذِينَ تَتَوَفَّىٰهُمُ ٱلۡمَلَٰٓئِكَةُ طَيِّبِينَ يَقُولُونَ سَلَٰمٌ عَلَيۡكُمُ ٱدۡخُلُواْ ٱلۡجَنَّةَ بِمَا كُنتُمۡ تَعۡمَلُونَ
              </p>
              <p className="text-sm md:text-base text-muted-foreground italic mb-2">
                "Those whose souls the angels take while they are virtuous, saying to them, 'Peace be upon you! Enter Paradise for what you used to do.'"
              </p>
              <p className="text-xs text-muted-foreground/70">
                - Surah An-Nahl (16:32)
              </p>
            </div>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-border/50 inline-block">
            <p className="text-lg text-foreground mb-2">Save the Date</p>
            <p className="text-3xl font-serif font-semibold text-primary mb-2">
              May 6, 2026
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
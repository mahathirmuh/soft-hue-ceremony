import { Heart } from "lucide-react";
import animeHero from "@/assets/anime-hijabi-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={animeHero} 
          alt="Cahya Maulida Saputri and Mahathir Muhammad" 
          className="w-full h-full object-cover opacity-30"
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

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            <div>Cahya Maulida Saputri</div>
            <div className="text-primary text-5xl md:text-7xl my-2">&</div>
            <div>Mahathir Muhammad</div>
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
              Masjid Agung Al-Ikhlas, Penajam Paser Utara
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements with Batik Patterns */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      
      {/* Batik-style decorative elements */}
      <div className="absolute top-32 right-32 w-24 h-24 opacity-20 animate-float" style={{animationDelay: '3s'}}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-primary">
          <pattern id="batik1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.3"/>
            <path d="M5,5 Q10,0 15,5 Q10,10 5,5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#batik1)"/>
        </svg>
      </div>
      
      <div className="absolute bottom-32 left-32 w-32 h-32 opacity-15 animate-float" style={{animationDelay: '4s'}}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-secondary">
          <pattern id="batik2" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
            <polygon points="7.5,2 12,7.5 7.5,13 3,7.5" fill="currentColor" opacity="0.4"/>
            <circle cx="7.5" cy="7.5" r="1" fill="currentColor" opacity="0.6"/>
          </pattern>
          <rect width="100" height="100" fill="url(#batik2)"/>
        </svg>
      </div>
      
      <div className="absolute top-1/3 left-16 w-20 h-20 opacity-25 animate-float" style={{animationDelay: '5s'}}>
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
          <pattern id="batik3" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M12.5,5 Q20,12.5 12.5,20 Q5,12.5 12.5,5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <circle cx="12.5" cy="12.5" r="2" fill="currentColor" opacity="0.3"/>
          </pattern>
          <rect width="100" height="100" fill="url(#batik3)"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
import { useEffect, useState } from 'react';

const FireworksText = () => {
  const [fireworks, setFireworks] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const createFirework = () => {
      const newFirework = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 50 + 25,
      };
      setFireworks(prev => [...prev, newFirework]);

      // Remove firework after animation
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
      }, 2000);
    };

    const interval = setInterval(createFirework, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground animate-bounce">
          UBUR UBUR IKAN LELE, KENA PRANK LEEE
        </h2>
      </div>

      {/* Fireworks */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute pointer-events-none"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {/* Firework explosion */}
          <div className="relative">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full animate-ping"
                style={{
                  transform: `rotate(${i * 45}deg) translateX(20px)`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
            
            {/* Center burst */}
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-pulse" />
            
            {/* Sparkles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                style={{
                  transform: `rotate(${i * 30}deg) translateX(${15 + Math.random() * 20}px)`,
                  animationDelay: `${0.5 + i * 0.05}s`,
                  animationDuration: '1.5s',
                }}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default FireworksText;
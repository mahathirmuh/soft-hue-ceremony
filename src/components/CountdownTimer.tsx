import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const weddingDate = new Date('2026-05-06T16:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <section className="py-20 px-4 bg-gradient-romantic">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Counting Down to Forever
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Until we say "I do"
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds },
          ].map((item, index) => (
            <Card 
              key={item.label} 
              className="p-6 bg-card/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary font-serif mb-2">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="text-sm uppercase tracking-wide text-muted-foreground font-medium">
                {item.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
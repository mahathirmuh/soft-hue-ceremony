import { useEffect, useRef } from 'react';

const AutoPlayMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Autoplay blocked:', error);
        });
      }
    };

    // Try to play immediately
    playMusic();

    // Also try on first user interaction
    const handleFirstInteraction = () => {
      playMusic();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return (
    <audio 
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
    >
      {/* Replace this source with your "Kalam Eineh | Ya Lel Ya Leli - Sherine" audio file */}
      <source src="/kalam-eineh-sherine.mp3" type="audio/mpeg" />
      <source src="/kalam-eineh-sherine.wav" type="audio/wav" />
      {/* Fallback message */}
      Your browser does not support the audio element.
    </audio>
  );
};

export default AutoPlayMusic;
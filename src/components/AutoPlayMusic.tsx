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
      <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" type="audio/wav" />
      {/* Fallback for browsers that don't support the audio element */}
    </audio>
  );
};

export default AutoPlayMusic;
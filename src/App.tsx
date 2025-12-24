import { useEffect, useState, useRef } from 'react';
import './App.css';

interface Snowflake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
}

interface Gift {
  id: number;
  emoji: string;
  title: string;
  message: string;
  rewardEmoji: string;
}

function App() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  
  // Responsive light count: 14 for mobile, 28 for desktop
  const [lightCount, setLightCount] = useState(window.innerWidth < 768 ? 14 : 28);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // --- AUDIO HANDLER ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume to 30% so it's not loud
    audio.volume = 0.3;

    const playAudio = () => {
      audio.play()
        .then(() => {
          // If successful, remove listeners
          document.removeEventListener('click', playAudio);
          document.removeEventListener('touchstart', playAudio);
        })
        .catch((error) => {
          console.log("Autoplay waiting for interaction:", error);
        });
    };

    // Attempt auto-play immediately
    playAudio();

    // Fallback: Play on the first tap/click anywhere if autoplay was blocked
    document.addEventListener('click', playAudio);
    document.addEventListener('touchstart', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, []);

  // --- RESIZE HANDLER (for Lights) ---
  useEffect(() => {
    const handleResize = () => {
      setLightCount(window.innerWidth < 768 ? 14 : 28);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate Lights
  const lights = Array.from({ length: lightCount }).map((_, i) => {
    const t = i / (lightCount - 1);
    const y = 200 * t * (1 - t);

    return {
      id: i,
      left: t * 100,
      top: y, 
      color: ['#ff3333', '#00ff00', '#ffd700', '#3366ff'][i % 4],
      delay: Math.random() * 2
    };
  });

  const gifts: Gift[] = [
    { id: 1, emoji: '🎁', title: 'Warm Hugs!', message: 'Sending you a big virtual hug this Christmas.', rewardEmoji: '🧸' },
    { id: 2, emoji: '🎁', title: 'Sweet Treats!', message: 'May your days be as sweet as holiday chocolate.', rewardEmoji: '🍫' },
    { id: 3, emoji: '🎁', title: 'Pure Joy!', message: 'Wishing you happiness that lasts all year round.', rewardEmoji: '✨' },
  ];

  useEffect(() => {
    const flakes = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 0.5,
    }));
    setSnowflakes(flakes);

    const newStars = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: Math.random() * 60,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="container">
      {/* Audio Element */}
      <audio ref={audioRef} src="/christmas.mp3" loop />

      {/* --- Christmas Lights --- */}
      <div className="light-wire-container">
        <svg className="light-wire-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,0 Q50,20 100,0" fill="none" stroke="#222" strokeWidth="0.5" />
        </svg>
        
        {lights.map((light) => (
          <div
            key={light.id}
            className="christmas-light"
            style={{
              left: `${light.left}%`,
              top: `${light.top}px`, 
              backgroundColor: light.color,
              boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
              animationDelay: `${light.delay}s`
            }}
          >
            <div className="bulb-socket"></div>
          </div>
        ))}
      </div>

      {/* --- Sky & Background --- */}
      <div className="moon">🌕</div>

      <div className="cloud" style={{ width: '200px', height: '60px', top: '15%', left: '-10%', animationDuration: '45s' }}></div>
      <div className="cloud" style={{ width: '150px', height: '50px', top: '25%', left: '-20%', animationDelay: '5s' }}></div>
      <div className="cloud" style={{ width: '180px', height: '55px', top: '10%', right: '-10%', animationDuration: '55s', animationDirection: 'reverse' }}></div>

      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* --- Background Characters --- */}
      <img src="/santa.gif" alt="Santa" className="bg-element santa-img" />
      
      {/* Existing Pikachu (Right side) */}
      <img src="/pikachu.gif" alt="Pikachu" className="bg-element pikachu-img" />
      
      {/* NEW Pokemon GIF (Left side) */}
      <img src="/pokemon.gif" alt="Christmas Pokemon" className="bg-element pokemon-gif" />
      
      <div className="bg-element snowman">☃️</div>

      {/* Trees */}
      <div className="bg-element bg-tree" style={{ left: '2%', transform: 'scale(0.8)' }}>🎄</div>
      <div className="bg-element bg-tree" style={{ left: '15%', transform: 'scale(1.0)' }}>🎄</div>
      <div className="bg-element bg-tree" style={{ left: '28%', transform: 'scale(0.7)', opacity: 0.8 }}>🎄</div>
      
      <div className="bg-element bg-tree" style={{ right: '35%', transform: 'scale(0.7)', opacity: 0.8 }}>🎄</div>
      <div className="bg-element bg-tree" style={{ right: '22%', transform: 'scale(1.1)' }}>🎄</div>
      <div className="bg-element bg-tree" style={{ right: '5%', transform: 'scale(0.9)' }}>🎄</div>

      {/* --- Snow --- */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
            fontSize: `${flake.size}rem`,
          }}
        >
          ❄
        </div>
      ))}

      {/* --- Main Card --- */}
      <div className="card-container">
        <div className="card">
          <h1>Merry Christmas</h1>
          <h2>To You!</h2>
          <p>Tap a gift below for a special surprise</p>
        </div>
      </div>

      {/* --- Ground & Gifts --- */}
      <div className="ground">
        {Array.from({ length: 15 }).map((_, i) => (
          <div 
            key={i} 
            className="sparkle"
            style={{
              width: Math.random() * 5 + 2 + 'px',
              height: Math.random() * 5 + 2 + 'px',
              left: Math.random() * 80 + 10 + '%',
              bottom: Math.random() * 60 + 10 + 'px',
              animationDelay: Math.random() * 2 + 's'
            }}
          ></div>
        ))}

        <div className="gifts-row">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className="gift-box"
              onClick={() => setSelectedGift(gift)}
            >
              {gift.emoji}
            </div>
          ))}
        </div>
      </div>

      {/* --- POPUP MODAL --- */}
      {selectedGift && (
        <div className="overlay" onClick={() => setSelectedGift(null)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-light-corner top-left">
              <div className="modal-bulb red"></div>
              <div className="modal-bulb green"></div>
              <div className="modal-bulb red"></div>
            </div>
            <div className="modal-light-corner top-right">
              <div className="modal-bulb green"></div>
              <div className="modal-bulb red"></div>
              <div className="modal-bulb green"></div>
            </div>

            <span className="popup-emoji">{selectedGift.rewardEmoji}</span>
            <div className="popup-title">{selectedGift.title}</div>
            <div className="popup-msg">{selectedGift.message}</div>
            <button className="close-btn" onClick={() => setSelectedGift(null)}>
              Thank You!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
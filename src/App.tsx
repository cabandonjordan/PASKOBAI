import { useEffect, useState } from 'react';
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

  // Generate Lights hanging in a curve
  const totalLights = 24;
  const lights = Array.from({ length: totalLights }).map((_, i) => {
    // Calculate a simple curve (parabola) for the Y position
    // x goes from -1 to 1
    const x = (i / (totalLights - 1)) * 2 - 1; 
    const y = x * x * 40; // Curve depth
    return {
      id: i,
      left: (i / (totalLights - 1)) * 100,
      top: y,
      color: ['#ff3333', '#00ff00', '#ffd700', '#3333ff'][i % 4], // Red, Green, Gold, Blue
      delay: Math.random() * 2
    };
  });

  const gifts: Gift[] = [
    { id: 1, emoji: '🎁', title: 'Warm Hugs!', message: 'Sending you a big virtual hug this Christmas.', rewardEmoji: '🧸' },
    { id: 2, emoji: '🎁', title: 'Sweet Treats!', message: 'May your days be as sweet as holiday chocolate.', rewardEmoji: '🍫' },
    { id: 3, emoji: '🎁', title: 'Pure Joy!', message: 'Wishing you happiness that lasts all year round.', rewardEmoji: '✨' },
  ];

  useEffect(() => {
    // Snowflakes
    const flakes = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 0.5,
    }));
    setSnowflakes(flakes);

    // Stars
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
      
      {/* --- NEW: Christmas Lights --- */}
      <div className="light-wire-container">
        {/* The wire line itself */}
        <svg className="light-wire-svg" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,0 Q50,20 100,0" fill="none" stroke="#333" strokeWidth="0.5" />
        </svg>
        
        {/* The bulbs */}
        {lights.map((light) => (
          <div
            key={light.id}
            className="christmas-light"
            style={{
              left: `${light.left}%`,
              top: `${light.top + 10}px`, // Offset to hang below wire
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
      
      {/* Shooting Star */}
      <div className="shooting-star"></div>

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

      {/* --- Background Characters & Trees --- */}
      <img src="/santa.gif" alt="Santa" className="bg-element santa-img" />
      <img src="/baymax.gif" alt="Baymax" className="bg-element baymax-img" />
      <img src="/pikachu.gif" alt="Pikachu" className="bg-element pikachu-img" />
      
      <div className="bg-element snowman">☃️</div>

      {/* Added 'glow' class to trees for extra magic */}
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
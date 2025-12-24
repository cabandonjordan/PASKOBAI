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

  const gifts: Gift[] = [
    { id: 1, emoji: '🎁', title: 'Warm Hugs!', message: 'Sending you a big virtual hug this Christmas.', rewardEmoji: '🧸' },
    { id: 2, emoji: '🎁', title: 'Sweet Treats!', message: 'May your days be as sweet as holiday chocolate.', rewardEmoji: '🍫' },
    { id: 3, emoji: '🎁', title: 'Pure Joy!', message: 'Wishing you happiness that lasts all year round.', rewardEmoji: '✨' },
  ];

  useEffect(() => {
    const flakes = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 0.5,
    }));
    setSnowflakes(flakes);

    const newStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: Math.random() * 50,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="container">
      {/* --- Hanging Lights (Top) --- */}
      <div className="wire">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="light"></div>
        ))}
      </div>

      {/* --- Sky & Background --- */}
      <div className="moon">🌕</div>
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
      
      <div className="bg-element bg-tree" style={{ left: '5%', opacity: 0.5 }}>🎄</div>
      <div className="bg-element bg-tree" style={{ left: '25%', transform: 'scale(0.8)' }}>🎄</div>
      <div className="bg-element bg-tree" style={{ right: '30%', opacity: 0.6 }}>🎄</div>
      <div className="bg-element bg-tree" style={{ right: '5%', transform: 'scale(1.2)' }}>🎄</div>


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
            
            {/* Modal Corner Lights */}
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
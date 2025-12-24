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

  // You can customize your messages here!
  const gifts: Gift[] = [
    { id: 1, emoji: '🎁', title: 'Warm Hugs!', message: 'Sending you a big virtual hug this Christmas.', rewardEmoji: '🧸' },
    { id: 2, emoji: '🎁', title: 'Sweet Treats!', message: 'May your days be as sweet as holiday chocolate.', rewardEmoji: '🍫' },
    { id: 3, emoji: '🎁', title: 'Pure Joy!', message: 'Wishing you happiness that lasts all year round.', rewardEmoji: '✨' },
  ];

  useEffect(() => {
    // Generate Snow
    const flakes = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 0.5,
    }));
    setSnowflakes(flakes);

    // Generate Stars
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
      {/* --- Hanging Lights --- */}
      <div className="wire">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="light"></div>
        ))}
      </div>

      {/* --- Sky --- */}
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

      {/* --- SANTA GIF --- */}
      {/* Make sure santa.gif is in your public folder */}
      <img src="/santa.gif" alt="Santa" className="santa-img" />

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
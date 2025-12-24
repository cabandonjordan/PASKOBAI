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
  surprise: string;
  isOpened: boolean;
}

function App() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  
  // Interactive Gifts
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, emoji: '🎁', surprise: '🧸 Toy!', isOpened: false },
    { id: 2, emoji: '🎁', surprise: '💖 Love', isOpened: false },
    { id: 3, emoji: '🎁', surprise: '💰 Cash', isOpened: false },
    { id: 4, emoji: '🎁', surprise: '🍫 Choco', isOpened: false },
  ]);

  // Setup animations on load
  useEffect(() => {
    // Generate Snow
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 5,
      size: Math.random() * 1.5 + 0.5,
    }));
    setSnowflakes(flakes);

    // Generate Background Stars
    const newStars = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: Math.random() * 60, // Top 60% of screen only
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  const handleGiftClick = (id: number) => {
    setGifts((prev) =>
      prev.map((gift) => {
        if (gift.id === id && !gift.isOpened) {
          return { ...gift, isOpened: true };
        }
        return gift;
      })
    );

    // Reset after 2 seconds
    setTimeout(() => {
      setGifts((prev) =>
        prev.map((gift) => (gift.id === id ? { ...gift, isOpened: false } : gift))
      );
    }, 2000);
  };

  return (
    <div className="container">
      {/* --- Decoration: Hanging Lights --- */}
      <div className="wire">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="light"></div>
        ))}
      </div>

      {/* --- Background: Stars & Moon --- */}
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

      {/* --- Flying Santa --- */}
      <div className="santa-container">🎅🦌💨</div>

      {/* --- Falling Snow --- */}
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

      {/* --- Main Greeting Card --- */}
      <div className="card-container">
        <div className="card">
          <h1>Merry Christmas</h1>
          <h2>To The World!</h2>
          <p>May your holidays be filled with<br/>warmth and wonderful surprises.</p>
        </div>
      </div>

      {/* --- Ground, Snowman & Gifts --- */}
      <div className="snowman">☃️</div>
      
      <div className="ground">
        <div className="gifts-row">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className={`gift-box ${gift.isOpened ? 'shake' : ''}`}
              onClick={() => handleGiftClick(gift.id)}
            >
              {gift.emoji}
              {gift.isOpened && <div className="gift-reward">{gift.surprise}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
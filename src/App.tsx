import { useEffect, useState } from 'react';
import './App.css';

interface Snowflake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

interface Gift {
  id: number;
  emoji: string;
  surprise: string;
  isOpened: boolean;
}

function App() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  
  // These are the gifts on the ground
  const [gifts, setGifts] = useState<Gift[]>([
    { id: 1, emoji: '🎁', surprise: '🧸', isOpened: false },
    { id: 2, emoji: '🎁', surprise: '💖', isOpened: false },
    { id: 3, emoji: '🎁', surprise: '🍫', isOpened: false },
  ]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      size: Math.random() * 1 + 0.5,
    }));
    setSnowflakes(flakes);
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

    // Reset the gift after 2 seconds so they can click again
    setTimeout(() => {
      setGifts((prev) =>
        prev.map((gift) => (gift.id === id ? { ...gift, isOpened: false } : gift))
      );
    }, 2000);
  };

  return (
    <div className="container">
      {/* Background Elements */}
      <div className="santa-container">🎅🦌💨</div>
      
      <div className="bg-tree" style={{ left: '10%' }}>🌲</div>
      <div className="bg-tree" style={{ left: '80%' }}>🌲</div>
      <div className="bg-tree" style={{ left: '25%', fontSize: '5rem', opacity: 0.4 }}>🌲</div>

      {/* Snow */}
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

      {/* Main Card */}
      <div className="card-container">
        <div className="card">
          <h1>Merry Christmas</h1>
          <h2>To You!</h2>
          <p>Click the gifts below for a surprise!</p>
        </div>
      </div>

      {/* The Ground & Interactive Gifts */}
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
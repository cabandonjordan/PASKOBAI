import { useEffect, useState } from 'react';
import './App.css';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  size: number;
}

function App() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 5 + 3,
      animationDelay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3,
      size: Math.random() * 1.5 + 0.5
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            opacity: flake.opacity,
            fontSize: `${flake.size}rem`,
          }}
        >
          ❄
        </div>
      ))}
      <div className="card">
        <div className="icon">🎄</div>
        <h1>Merry Christmas</h1>
        <h2>To All</h2>
        <p>May your days be merry and bright,<br />and may all your Christmases be white.</p>
      </div>
    </div>
  );
}

export default App;
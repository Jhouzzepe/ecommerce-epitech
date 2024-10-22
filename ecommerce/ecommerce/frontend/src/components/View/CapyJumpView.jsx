import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Player = ({ position }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: position.y,
      left: position.x,
      width: '50px',
      height: '50px',
      backgroundImage: 'url(https://play-lh.googleusercontent.com/3fyl5s6UX42eJfsRI7-jolIQfCgPPhjrS2h955zhjlmPd4fiyjB8CGh2lUj2MPd2Aq0)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }} />
  );
};

const Platform = ({ position }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: position.y,
      left: position.x,
      width: '100px',
      height: '20px',
      backgroundColor: 'deeppink'
    }} />
  );
};

const Coin = ({ position }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: position.y + 20,
      left: position.x + 40,
      width: '20px',
      height: '20px',
      backgroundColor: 'gold',
      borderRadius: '50%'
    }} />
  );
};

const generatePlatforms = (count, width, startingY) => {
  const platforms = [];
  let previousY = startingY;
  let previousX = 200;

  for (let i = 0; i < count; i++) {
    let x, y;
    do {
      const horizontalGap = Math.floor(Math.random() * 200) - 100;
      const verticalGap = Math.floor(Math.random() * 50) + 100;
      x = Math.max(0, Math.min(previousX + horizontalGap, width - 100));
      y = previousY + verticalGap;
    } while (Math.abs(x - previousX) < 50 && Math.abs(y - previousY) < 50);

    const hasCoin = Math.random() < 0.5;

    platforms.push({ x, y, hasCoin, isCollected: false });
    previousY = y;
    previousX = x;
  }
  return platforms;
};

const CapyJump = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 225, y: 150 });
  const [platforms, setPlatforms] = useState(generatePlatforms(7, 500, 0));
  const [velocity, setVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [canPlay, setCanPlay] = useState(true);

  const updateCapyCoins = async (coinsCollected) => {
    try {
      const response = await axios.post('/api/update-capy-coins/', { coins: coinsCollected });
      if (response.data.discount_code) {
        alert(`Félicitations ! Vous avez gagné un coupon de réduction de 10%: ${response.data.discount_code}`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des CapyCoins:', error);
    }
  };

  useEffect(() => {
    const lastPlayTime = localStorage.getItem('lastPlayTime');
    if (lastPlayTime) {
      const timePassed = Date.now() - parseInt(lastPlayTime, 10);
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
      const remainingTime = cooldownPeriod - timePassed;
      if (remainingTime > 0) {
        setCanPlay(false);
        setTimeLeft(remainingTime);
        const interval = setInterval(() => {
          const updatedTimeLeft = remainingTime - (Date.now() - parseInt(lastPlayTime, 10));
          if (updatedTimeLeft <= 0) {
            clearInterval(interval);
            setCanPlay(true);
            setTimeLeft(null);
            localStorage.removeItem('lastPlayTime');
          } else {
            setTimeLeft(updatedTimeLeft);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, []);

  useEffect(() => {
    if (score >= 1000) {
      setGameOver(true);
      updateCapyCoins(score);
      localStorage.setItem('lastPlayTime', Date.now().toString());
    }
  }, [score]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (canPlay && !gameOver) {
        if (e.key === 'ArrowLeft') {
          setPlayerPosition(prev => ({ ...prev, x: Math.max(prev.x - 15, 0) }));
        } else if (e.key === 'ArrowRight') {
          setPlayerPosition(prev => ({ ...prev, x: Math.min(prev.x + 15, 450) }));
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canPlay, gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (canPlay && !gameOver) {
        setVelocity(prev => prev - 1);
        let newPositionY = playerPosition.y + velocity;
        let standingPlatform = platforms.find(p =>
          playerPosition.x + 25 >= p.x && playerPosition.x + 25 <= p.x + 100 &&
          newPositionY >= p.y && newPositionY <= p.y + 20
        );

        if (standingPlatform) {
          setVelocity(18);
        }

        const updatedPlatforms = platforms.map(platform => {
          if (!platform.isCollected &&
            platform.hasCoin &&
            playerPosition.x + 25 >= platform.x + 40 && playerPosition.x + 25 <= platform.x + 60 &&
            newPositionY >= platform.y + 20 && newPositionY <= platform.y + 40) {
            setScore(prevScore => prevScore + 1000);
            return { ...platform, isCollected: true };
          }
          return platform;
        });

        setPlatforms(updatedPlatforms);
        setPlayerPosition(prev => ({ ...prev, y: newPositionY }));

        if (newPositionY > 350) {
          const downShift = newPositionY - 350;
          const newPlatforms = updatedPlatforms.map(p => ({ ...p, y: p.y - downShift }));
          const filteredPlatforms = newPlatforms.filter(p => p.y > 0);
          const newGeneratedPlatforms = generatePlatforms(2, 500, Math.max(...filteredPlatforms.map(p => p.y)));

          setPlatforms([...filteredPlatforms, ...newGeneratedPlatforms]);
          setPlayerPosition(prev => ({ ...prev, y: 350 }));
        }

        if (newPositionY < 0) {
          setGameOver(true);
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, [playerPosition, velocity, platforms, canPlay, gameOver]);

  const resetGame = () => {
    setPlatforms(generatePlatforms(7, 500, 0));
    setPlayerPosition({ x: 225, y: 150 });
    setVelocity(18);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <p>Score: {score} Capy Coins</p>
        {timeLeft !== null && (
          <p>Temps restant: {Math.floor(timeLeft / 3600000)}h {Math.floor((timeLeft % 3600000) / 60000)}min {Math.floor((timeLeft % 60000) / 1000)}sec</p>
        )}
      </div>
      <div style={{
        position: 'relative',
        width: '500px',
        height: '700px',
        overflow: 'hidden',
        border: '1px solid black',
        backgroundImage: 'url(https://media.giphy.com/media/2wh8ugh52dGSJYrA26/giphy.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {!canPlay ? (
          <div style={{ textAlign: 'center', marginTop: '300px' }}>
            <p>Bravo, tu peux revenir jouer dans 24 heures !</p>
            <p>Temps restant: {Math.floor(timeLeft / 3600000)}h {Math.floor((timeLeft % 3600000) / 60000)}min {Math.floor((timeLeft % 60000) / 1000)}sec</p>
          </div>
        ) : gameOver && score >= 1000 ? (
          <div style={{ textAlign: 'center', marginTop: '300px' }}>
            <p>Bravo ! Vous avez gagné 1000 Capy Coins.</p>
            <button onClick={resetGame} disabled>Recommencer une partie dans 24 heures</button>
          </div>
        ) : gameOver ? (
          <div style={{ textAlign: 'center', marginTop: '300px' }}>
            <p>Game Over!</p>
            <p>Score: {score} Capy Coins</p>
            <button onClick={resetGame}>Recommencer une partie ?</button>
          </div>
        ) : (
          <>
            <Player position={playerPosition} />
            {platforms.map((platform, index) => (
              <React.Fragment key={index}>
                <Platform position={platform} />
                {platform.hasCoin && !platform.isCollected && <Coin position={platform} />}
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CapyJump;

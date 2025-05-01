import React, { useRef, useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { initFood, initBots, handleRestart } from 'src/game/gameLogic.ts';
import { GAME_SETTINGS } from 'src/types/types.ts';

const Solar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef({ x: GAME_SETTINGS.worldWidth / 2, y: GAME_SETTINGS.worldHeight / 2 });
  const [mass, setMass] = useState(GAME_SETTINGS.initialMass);
  const massRef = useRef<any>(mass);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const foodRef = useRef(initFood());
  const botsRef = useRef(initBots());
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setStarted(true);
      return;
    }

    const timer = setTimeout(() => setCountdown((prev) => (prev ?? 1) - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animationId: number;

    const resize = () => {
      const parent = canvas.parentElement!;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (!started || gameOver) return;

      const { width, height } = canvas;
      const player = playerRef.current;
      const currentMass = massRef.current;
      const playerRadius = Math.sqrt(currentMass) * 5;
      const playerSpeed = GAME_SETTINGS.baseSpeed / (Math.sqrt(currentMass) * 0.1);

      const dxP = mouseRef.current.x - width / 2;
      const dyP = mouseRef.current.y - height / 2;
      const distP = Math.hypot(dxP, dyP) || 1;
      player.x += (dxP / distP) * playerSpeed;
      player.y += (dyP / distP) * playerSpeed;

      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2 - player.x, height / 2 - player.y);

      for (let i = foodRef.current.length - 1; i >= 0; i--) {
        const f = foodRef.current[i];
        const d = Math.hypot(f.x - player.x, f.y - player.y);
        if (d < f.radius + playerRadius) {
          foodRef.current.splice(i, 1);
          massRef.current += 1;
          setMass(massRef.current);
          continue;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#9CA3AF';
        ctx.fill();
      }

      for (let i = botsRef.current.length - 1; i >= 0; i--) {
        const bot = botsRef.current[i];
        bot.radius = Math.sqrt(bot.mass) * 5;
        const speed = (GAME_SETTINGS.baseSpeed / (Math.sqrt(bot.mass) * 0.5)) * bot.speedFactor;

        const dToPlayer = Math.hypot(bot.x - player.x, bot.y - player.y);
        let targetX: number, targetY: number;

        if (bot.mass > massRef.current * 1.1) {
          targetX = player.x;
          targetY = player.y;
        } else if (bot.mass < massRef.current * 0.9) {
          targetX = 2 * bot.x - player.x;
          targetY = 2 * bot.y - player.y;
        } else {
          if (Date.now() - bot.lastDirChange > 2000) {
            const ang = Math.random() * Math.PI * 2;
            bot.dx = Math.cos(ang);
            bot.dy = Math.sin(ang);
            bot.lastDirChange = Date.now();
          }
          targetX = bot.x + bot.dx * 100;
          targetY = bot.y + bot.dy * 100;
        }

        const ang = Math.atan2(targetY - bot.y, targetX - bot.x);
        bot.x += Math.cos(ang) * speed;
        bot.y += Math.sin(ang) * speed;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        if (bot.x - bot.radius < 0) bot.x = bot.radius;
        if (bot.x + bot.radius > canvasWidth) bot.x = canvasWidth - bot.radius;
        if (bot.y - bot.radius < 0) bot.y = bot.radius;
        if (bot.y + bot.radius > canvasHeight) bot.y = canvasHeight - bot.radius;

        for (let j = foodRef.current.length - 1; j >= 0; j--) {
          const f = foodRef.current[j];
          if (Math.hypot(f.x - bot.x, f.y - bot.y) < f.radius + bot.radius) {
            foodRef.current.splice(j, 1);
            bot.mass += 1;
          }
        }

        if (dToPlayer < bot.radius + playerRadius) {
          if (bot.mass > massRef.current * 1.1) {
            setGameOver(true);
            return;
          } else if (massRef.current > bot.mass * 1.1) {
            botsRef.current.splice(i, 1);
            massRef.current += bot.mass;
            setMass(massRef.current);
            continue;
          }
        }

        ctx.beginPath();
        ctx.arc(bot.x, bot.y, bot.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#9CA3AF';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(player.x, player.y, playerRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#22D3EE';
      ctx.fill();

      ctx.restore();
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [started, gameOver]);

  return (
    <div className="relative max-w-screen mx-auto px-8 py-4 bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
      <div>
        <h5 className="text-gray-400 uppercase text-xs tracking-widest">
          <span className="mr-1">An</span>
          <a
            href="https://agar.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 underline underline-offset-4 decoration-secondary hover:text-secondary transition-colors"
          >
            Agar.io
          </a>{' '}
          Clone
        </h5>

        <h2 className="mt-1 text-2xl font-bold text-white mb-3">A Quick Game</h2>
      </div>
      <div className="w-full h-full relative bg-primary rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-[600px] block"
          onMouseMove={(e) => {
            const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          }}
        />

        {/* Mass Display */}
        <div className="absolute top-4 left-4 px-4 py-2 text-sm rounded-lg border border-gray-400 text-white bg-neutral-900/60 font-mono">
          Mass: <span className="text-white font-bold">{mass}</span>
        </div>

        {/* Split Button */}
        {started && !gameOver && (
          <button
            onClick={() => {
              const newMass = Math.max(GAME_SETTINGS.initialMass, Math.floor(massRef.current / 2));
              massRef.current = newMass;
              setMass(newMass);
            }}
            className="absolute bottom-6 right-6 px-5 py-2 border-2 border-primary rounded-full text-primary font-semibold hover:bg-primary hover:text-neutral-900 transition"
          >
            Split
          </button>
        )}

        {/* Countdown Overlay */}
        {!started && countdown !== null && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900 transition-opacity">
            <div className="text-6xl font-bold text-green-500 animate-pulse">
              {countdown === 0 ? 'Go!' : countdown}
            </div>
          </div>
        )}

        {/* Initial Start Button */}
        {!started && countdown === null && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900">
            <button
              onClick={() => setCountdown(3)}
              className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:opacity-90 transition"
            >
              <FaPlay />
            </button>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/70 z-10">
            <div className="p-6 bg-neutral-900 border border-gray-400 rounded-lg text-gray-200">
              <h1 className="text-2xl font-bold mb-4">Game Over</h1>
              <button
                onClick={() => {
                  handleRestart(setMass, setGameOver, playerRef, massRef, initFood, initBots);
                  setStarted(false);
                  setCountdown(null);
                }}
                className="px-4 py-2 bg-primary text-neutral-900 rounded-lg hover:opacity-90"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solar;

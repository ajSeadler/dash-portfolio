import React, { useRef, useEffect, useState } from 'react';
import { FaPlay, FaUtensils } from 'react-icons/fa';
import { initFood, initBots, handleRestart } from 'src/game/gameLogic.ts';
import { GAME_SETTINGS } from 'src/types/types.ts';
import { FaMousePointer, FaDotCircle, FaCompressAlt, FaSkullCrossbones } from 'react-icons/fa';

const Solar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef({
    x: GAME_SETTINGS.worldWidth / 2,
    y: GAME_SETTINGS.worldHeight / 2,
  });
  const [mass, setMass] = useState(GAME_SETTINGS.initialMass);
  const massRef = useRef<any>(mass);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#22D3EE');

  const foodRef = useRef(initFood());
  const botsRef = useRef(initBots());
  const mouseRef = useRef({ x: 0, y: 0 });

  // Countdown timer
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setStarted(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((p) => (p ?? 1) - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Main game loop
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

      // Move player toward mouse
      const dxP = mouseRef.current.x - width / 2;
      const dyP = mouseRef.current.y - height / 2;
      const distP = Math.hypot(dxP, dyP) || 1;
      player.x += (dxP / distP) * playerSpeed;
      player.y += (dyP / distP) * playerSpeed;

      // Clear & center world
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2 - player.x, height / 2 - player.y);

      // Draw & eat food
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

      // Bots logic & drawing
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

        // Keep bots within world bounds
        if (bot.x - bot.radius < 0) bot.x = bot.radius;
        if (bot.x + bot.radius > GAME_SETTINGS.worldWidth)
          bot.x = GAME_SETTINGS.worldWidth - bot.radius;
        if (bot.y - bot.radius < 0) bot.y = bot.radius;
        if (bot.y + bot.radius > GAME_SETTINGS.worldHeight)
          bot.y = GAME_SETTINGS.worldHeight - bot.radius;

        // Bot eats food
        for (let j = foodRef.current.length - 1; j >= 0; j--) {
          const f = foodRef.current[j];
          if (Math.hypot(f.x - bot.x, f.y - bot.y) < f.radius + bot.radius) {
            foodRef.current.splice(j, 1);
            bot.mass += 1;
          }
        }

        // Bot eats other bots
        for (let j = botsRef.current.length - 1; j >= 0; j--) {
          const other = botsRef.current[j];
          if (i !== j && Math.hypot(bot.x - other.x, bot.y - other.y) < bot.radius + other.radius) {
            if (bot.mass > other.mass * 1.1) {
              botsRef.current.splice(j, 1);
              bot.mass += other.mass;
            }
          }
        }

        // Player vs Bot collision
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

        // Draw bot
        ctx.beginPath();
        ctx.arc(bot.x, bot.y, bot.radius, 0, Math.PI * 2);
        ctx.fillStyle = bot.mass < massRef.current ? '#34D399' : '#F87171'; // green if smaller, red if larger
        ctx.fill();

        // Bot label
        const label = 'Bot';
        ctx.font = 'bold 14px sans-serif';
        const textW = ctx.measureText(label).width;
        const pad = 6;
        ctx.fillStyle = 'rgba(17, 24, 39, 0.8)';
        ctx.fillRect(bot.x - textW / 2 - pad / 2, bot.y - bot.radius - 24, textW + pad, 20);
        ctx.fillStyle = '#F3F4F6';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, bot.x, bot.y - bot.radius - 14);
      }

      // ─── Player draw: rotate sprite to face movement ─────────────────
      const curMass = massRef.current;
      const radius = Math.sqrt(curMass) * 5;
      // angle to mouse in world coords:

      ctx.beginPath();
      ctx.arc(player.x, player.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = selectedColor;
      ctx.fill();

      ctx.restore();
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [started, gameOver, selectedColor]);

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

        {/* Initial Start Screen */}
        {!started && countdown === null && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 bg-gray-900">
            {/* Game Rules */}
            <div className="w-full max-w-md bg-neutral-200 border border-neutral-300 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-primary text-lg font-semibold mb-5 tracking-wide">How to Play</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex gap-3 items-start">
                  <FaMousePointer className="text-primary w-4 h-4 mt-1" />
                  <p>Move your circle using the mouse cursor.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <FaDotCircle className="text-primary w-4 h-4 mt-1" />
                  <p>Collect gray dots to increase your mass.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <FaUtensils className="text-primary w-4 h-4 mt-1" />
                  <p>Eat smaller bots (green). Avoid larger ones (red).</p>
                </div>
                <div className="flex gap-3 items-start">
                  <FaCompressAlt className="text-primary w-4 h-4 mt-1" />
                  <p>
                    Use <span className="text-secondary font-medium">Split</span> to halve your mass
                    and make fast moves.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <FaSkullCrossbones className="text-primary w-4 h-4 mt-1" />
                  <p>If you're eaten by a bigger bot, it's game over.</p>
                </div>
              </div>
            </div>

            {/* Color Picker */}
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-200 tracking-wide">
                Choose Your Color
              </h2>
              <div className="flex gap-4">
                {['#22D3EE', '#F87171', '#FACC15', '#34D399', '#818CF8'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${
                      selectedColor === color
                        ? 'ring-4 ring-white scale-110'
                        : 'opacity-80 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Start Button */}
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

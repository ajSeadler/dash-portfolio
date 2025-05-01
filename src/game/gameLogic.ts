import { Food, Bot, GAME_SETTINGS } from '../types/types';

export const initFood = (): Food[] => {
  return Array.from({ length: GAME_SETTINGS.foodCount }, () => ({
    x: Math.random() * GAME_SETTINGS.worldWidth,
    y: Math.random() * GAME_SETTINGS.worldHeight,
    radius: GAME_SETTINGS.foodRadius,
  }));
};

export const initBots = (): Bot[] => {
  return Array.from({ length: GAME_SETTINGS.botCount }, () => {
    const mass = GAME_SETTINGS.initialMass * (0.5 + Math.random() * 1.5);
    return {
      x: Math.random() * GAME_SETTINGS.worldWidth,
      y: Math.random() * GAME_SETTINGS.worldHeight,
      mass,
      radius: Math.sqrt(mass) * 5,
      speedFactor: 0.5 + Math.random(),
      dx: 0,
      dy: 0,
      lastDirChange: Date.now(),
    };
  });
};

export const handleRestart = (
  setMass: React.Dispatch<React.SetStateAction<number>>,
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
  playerRef: React.RefObject<{ x: number; y: number }>,
  massRef: React.RefObject<number>,
  initFood: () => Food[],
  initBots: () => Bot[],
) => {
  playerRef.current = { x: GAME_SETTINGS.worldWidth / 2, y: GAME_SETTINGS.worldHeight / 2 };
  massRef.current = GAME_SETTINGS.initialMass;
  setMass(GAME_SETTINGS.initialMass);
  initFood();
  initBots();
  setGameOver(false);
};

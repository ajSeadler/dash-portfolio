export interface Food {
  x: number;
  y: number;
  radius: number;
}

export interface Bot {
  x: number;
  y: number;
  mass: number;
  radius: number;
  speedFactor: number;
  dx: number;
  dy: number;
  lastDirChange: number;
}

export const GAME_SETTINGS = {
  initialMass: 10,
  foodCount: 200,
  botCount: 20,
  foodRadius: 5,
  worldWidth: 3000,
  worldHeight: 3000,
  baseSpeed: 2,
};

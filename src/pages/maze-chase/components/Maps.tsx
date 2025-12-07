import { useEffect, useRef } from "react";

// Import semua texture
import wallA from "../assets/wall.jpeg";
import floorA from "../assets/floor.jpeg";

import wallB from "../assets/wall.jpeg";
import floorB from "../assets/floor.jpeg";

import wallC from "../assets/wall.jpeg";
import floorC from "../assets/floor.jpeg";

const TILE_SIZE = 10;

interface MapsProps {
  mapId: string | number;
}

// Semua layout maze
const MAP_LAYOUTS: Record<string, number[][]> = {
  "1": [
    [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1,
    ],
    [
      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1,
    ],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],

  "2": [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],

  "3": [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
};

// Texture per mapId
const MAP_TEXTURES: Record<string, { wall: string; floor: string }> = {
  "1": { wall: wallA, floor: floorA },
  "2": { wall: wallB, floor: floorB },
  "3": { wall: wallC, floor: floorC },
};

const Maps = ({ mapId }: MapsProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const MAZE = MAP_LAYOUTS[String(mapId)] ?? MAP_LAYOUTS["1"];
  const TEXTURE = MAP_TEXTURES[String(mapId)] ?? MAP_TEXTURES["1"];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const wallImg = new Image();
    wallImg.src = TEXTURE.wall;

    const floorImg = new Image();
    floorImg.src = TEXTURE.floor;

    wallImg.onload = () => {
      floorImg.onload = () => {
        for (let y = 0; y < MAZE.length; y++) {
          for (let x = 0; x < MAZE[y].length; x++) {
            const tile = MAZE[y][x];
            const img = tile === 1 ? wallImg : floorImg;

            ctx.drawImage(
              img,
              x * TILE_SIZE,
              y * TILE_SIZE,
              TILE_SIZE,
              TILE_SIZE,
            );
          }
        }
      };
    };
  }, [mapId]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <canvas
        ref={canvasRef}
        width={MAZE[0].length * TILE_SIZE}
        height={MAZE.length * TILE_SIZE}
      />
    </div>
  );
};

export default Maps;

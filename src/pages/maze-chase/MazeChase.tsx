import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import Maps from "./components/Maps";
import heart from "./assets/heart.png";
import forrest from "./assets/forrest.jpeg";

const Game = () => {
  const [stage, setStage] = useState("start");
  const [hideButton, setHideButton] = useState(false);

  const handleStart = () => {
    // 1️⃣ Hilangkan tombol START
    setHideButton(true);

    // 2️⃣ Mulai zoom animation
    setTimeout(() => {
      setStage("zoom");
    }, 200);

    // 3️⃣ Munculkan maze setelah selesai zoom
    setTimeout(() => {
      setStage("maze");
    }, 1400);
  };

  return (
    <>
      <style>
        {`
          @keyframes zoomCenter {
            from { transform: scale(1); opacity: 1; }
            to { transform: scale(1.8); opacity: 1; }
          }
          .zoom-center {
            animation: zoomCenter 1.4s ease-out forwards;
          }

          @keyframes mazePop {
            from { transform: scale(0.2); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .maze-pop {
            animation: mazePop 0.6s ease-out forwards;
          }
        `}
      </style>

      {/* 1️⃣ Start Screen (background tetap) */}
      {stage === "start" && (
        <StartScreen hideButton={hideButton} onStart={handleStart} />
      )}

      {/* 2️⃣ Zoom Animation */}
      {stage === "zoom" && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-cover bg-center zoom-center"
          style={{
            backgroundImage:
              "url('https://tse3.mm.bing.net/th/id/OIP.92BupXyOnqGmZqhFbNsiUgHaE8?pid=Api&P=0&h=1000')",
          }}
        ></div>
      )}

      {/* 3️⃣ Final Maze Page */}
      {stage === "maze" && (
        <div
          className="w-screen h-screen bg-cover bg-center relative maze-pop"
          style={{
            backgroundImage: `url(${forrest})`,
          }}
        >
          {/* Timer */}
          <div className="absolute top-4 left-4 text-white text-3xl font-bold drop-shadow-lg">
            18:58
          </div>

          {/* Hearts */}
          <div className="absolute top-4 right-4 flex gap-2">
            <img src={heart} className="w-10" />
            <img src={heart} className="w-10" />
            <img src={heart} className="w-10" />
          </div>

          {/* Maze */}
          <div className="flex justify-center items-center w-full h-full px-4">
            <Maps mapId={1} />
          </div>

          {/* Textbox */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-3 text-xl rounded-xl max-w-3xl text-center backdrop-blur-md">
            The recount text structure consists of: Orientation, Events, and
            Re-orientation.
          </div>

          <div className="absolute bottom-6 left-6 z-50">
            <button className="w-12 h-12 bg-black/40 hover:bg-black/60 rounded-lg text-white text-3xl flex justify-center items-center backdrop-blur-md">
              ☰
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;

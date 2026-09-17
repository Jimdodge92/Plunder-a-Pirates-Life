import React from 'react';
import { useGame } from '../context/GameContext';
import { calculateGridBounds } from '../utils/gridCoordinates';
import { sounds } from '../utils/soundEffects';
import { Compass, Sparkles, Check, ArrowLeft, Anchor, ChevronRight } from 'lucide-react';

export default function BoardSetupPage() {
  const {
    alphabetTiles,
    setAlphabetTiles,
    numberTiles,
    setNumberTiles,
    setAppStage,
  } = useGame();

  const { totalLetters, totalNumbers, displayRange } = calculateGridBounds(alphabetTiles, numberTiles);

  const presets = [
    { label: 'Standard Board (2x3 Tiles)', alpha: 2, num: 3, desc: 'A–L (12 letters) x 1–18 (18 numbers)' },
    { label: 'Quick Skirmish (2x2 Tiles)', alpha: 2, num: 2, desc: 'A–L (12 letters) x 1–12 (12 numbers)' },
    { label: 'Large Voyage (3x3 Tiles)', alpha: 3, num: 3, desc: 'A–R (18 letters) x 1–18 (18 numbers)' },
    { label: 'Grand Fleet Armada (3x4 Tiles)', alpha: 3, num: 4, desc: 'A–R (18 letters) x 1–24 (24 numbers)' },
  ];

  const handleConfirm = () => {
    sounds.playPageTurn();
    setAppStage('companion');
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl parchment-container rounded-3xl p-6 sm:p-9 flex flex-col items-center shadow-2xl">
        
        {/* Back Link */}
        <div className="w-full flex justify-start mb-2">
          <button
            onClick={() => setAppStage('welcome')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#5d4037] hover:text-[#2d1b14] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Title</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center w-full mb-6">
          <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-[#4e342e] border-2 border-[#b8860b] flex items-center justify-center text-amber-300 shadow-md">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="font-pirata text-3xl sm:text-4xl text-[#3e2723] tracking-wide leading-tight">
            Chart Your Sea Grid
          </h2>
          <p className="text-xs font-bold uppercase tracking-wider text-[#8b4513] mt-1">
            Select the modular tiles for your game board
          </p>
        </div>

        {/* Live Boundary Preview Plaque */}
        <div className="w-full bg-[#fdf6e3] border-2 border-[#8b4513] rounded-2xl p-4 mb-6 shadow-inner text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8b4513]/70 block mb-1">
            Active Sea Coordinates
          </span>
          <div className="font-pirata text-3xl sm:text-4xl text-[#3e2723] font-bold tracking-wider">
            {displayRange}
          </div>
          <div className="text-xs text-[#5d4037] mt-1 font-mono">
            {totalLetters} Letters (Depth) &bull; {totalNumbers} Numbers (Length)
          </div>
          <div className="text-[11px] text-[#8b4513]/80 font-bold mt-1">
            {totalLetters * totalNumbers} Total Coordinate Spaces
          </div>
        </div>

        {/* Tile Selectors */}
        <div className="w-full space-y-5 mb-6">
          {/* Alphabet Tiles */}
          <div className="bg-[#fdf6e3]/60 border border-[#8b4513]/40 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#3e2723]">
                Alphabet Tiles (Depth / Rows):
              </label>
              <select
                value={alphabetTiles}
                onChange={(e) => setAlphabetTiles(parseInt(e.target.value, 10))}
                className="bg-[#fdf6e3] border-2 border-[#8b4513] rounded-lg px-3 py-1 text-xs font-bold text-[#3e2723] shadow-sm focus:outline-none cursor-pointer"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Tile{i > 0 ? 's' : ''} ({(i + 1) * 6} Letters)
                  </option>
                ))}
              </select>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={alphabetTiles}
              onChange={(e) => setAlphabetTiles(parseInt(e.target.value, 10))}
              className="w-full accent-[#8b4513] cursor-pointer h-2 bg-[#d4b88c] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#8b4513]/70 font-semibold mt-1">
              <span>1 Tile (A-F)</span>
              <span>Default 2 (A-L)</span>
              <span>10 Tiles (A-BH)</span>
            </div>
          </div>

          {/* Number Tiles */}
          <div className="bg-[#fdf6e3]/60 border border-[#8b4513]/40 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#3e2723]">
                Number Tiles (Length / Columns):
              </label>
              <select
                value={numberTiles}
                onChange={(e) => setNumberTiles(parseInt(e.target.value, 10))}
                className="bg-[#fdf6e3] border-2 border-[#8b4513] rounded-lg px-3 py-1 text-xs font-bold text-[#3e2723] shadow-sm focus:outline-none cursor-pointer"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} Tile{i > 0 ? 's' : ''} ({(i + 1) * 6} Numbers)
                  </option>
                ))}
              </select>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={numberTiles}
              onChange={(e) => setNumberTiles(parseInt(e.target.value, 10))}
              className="w-full accent-[#8b4513] cursor-pointer h-2 bg-[#d4b88c] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#8b4513]/70 font-semibold mt-1">
              <span>1 Tile (1-6)</span>
              <span>Default 3 (1-18)</span>
              <span>12 Tiles (1-72)</span>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="w-full mb-7">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5d4037] mb-2 px-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Popular Sea Presets</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {presets.map((preset, idx) => {
              const isSelected = alphabetTiles === preset.alpha && numberTiles === preset.num;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setAlphabetTiles(preset.alpha);
                    setNumberTiles(preset.num);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#5d4037] border-[#ffd700] text-amber-100 shadow-md scale-[1.02]'
                      : 'bg-[#fdf6e3]/70 hover:bg-[#fdf6e3] border-[#8b4513]/40 text-[#4e342e]'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span>{preset.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-300" />}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-200/70' : 'text-[#8b4513]/70'}`}>
                    {preset.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm and Set Sail Button */}
        <button
          onClick={handleConfirm}
          className="w-full pirate-btn-gold py-4 rounded-2xl font-pirata text-2xl sm:text-3xl tracking-wider uppercase font-bold flex items-center justify-center gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-amber-400"
        >
          <span>Confirm & Set Sail!</span>
          <ChevronRight className="w-6 h-6 text-amber-950" />
        </button>

      </div>
    </div>
  );
}
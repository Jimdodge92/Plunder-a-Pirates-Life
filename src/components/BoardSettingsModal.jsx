import React from 'react';
import { useGame } from '../context/GameContext';
import { calculateGridBounds } from '../utils/gridCoordinates';
import { X, Check, Grid, Sparkles } from 'lucide-react';

export default function BoardSettingsModal() {
  const {
    settingsOpen,
    setSettingsOpen,
    alphabetTiles,
    setAlphabetTiles,
    numberTiles,
    setNumberTiles,
  } = useGame();

  if (!settingsOpen) return null;

  const { totalLetters, totalNumbers, displayRange } = calculateGridBounds(alphabetTiles, numberTiles);

  const presets = [
    { label: 'Standard Board (Default)', alpha: 2, num: 3, desc: 'A–L (12) x 1–18 (18) spaces' },
    { label: 'Quick Skirmish (Compact)', alpha: 2, num: 2, desc: 'A–L (12) x 1–12 (12) spaces' },
    { label: 'Large Voyage (3x3)', alpha: 3, num: 3, desc: 'A–R (18) x 1–18 (18) spaces' },
    { label: 'Grand Fleet Armada (3x4)', alpha: 3, num: 4, desc: 'A–R (18) x 1–24 (24) spaces' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#3e2723] border-4 border-[#b8860b] rounded-2xl p-5 sm:p-6 shadow-2xl text-amber-100 font-inter max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setSettingsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#2b1810] hover:bg-red-950/80 border border-amber-500/50 text-amber-300 hover:text-red-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-amber-900/60 pb-3">
          <Grid className="w-7 h-7 text-amber-400" />
          <div>
            <h2 className="font-pirata text-2xl text-amber-200 leading-none">Chart the Sea Grid</h2>
            <p className="text-xs text-amber-400/80 mt-1">Configure your modular board tile dimensions</p>
          </div>
        </div>

        {/* Current Grid Summary Card */}
        <div className="bg-[#2d1a12] border-2 border-amber-900 rounded-xl p-4 mb-6 shadow-inner text-center">
          <div className="text-xs uppercase tracking-widest text-amber-400/70 font-semibold mb-1">
            Active Sea Boundaries
          </div>
          <div className="font-pirata text-3xl text-amber-200 tracking-wider">
            {displayRange}
          </div>
          <div className="text-xs text-amber-300/80 mt-1 font-mono">
            {totalLetters} Letters &bull; {totalNumbers} Numbers &bull; {totalLetters * totalNumbers} Total Coordinates
          </div>
        </div>

        {/* Selectors */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-amber-200">
                Alphabet Tiles (Depth / Rows):
              </label>
              <span className="font-mono text-xs px-2 py-0.5 bg-[#2d1a12] rounded border border-amber-800 text-amber-400">
                {alphabetTiles} Tiles ({totalLetters} Letters)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={alphabetTiles}
              onChange={(e) => setAlphabetTiles(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-[#2b1810] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-amber-400/60 mt-1">
              <span>1 Tile (A-F)</span>
              <span>Default (2)</span>
              <span>10 Tiles (A-BH)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-semibold text-amber-200">
                Number Tiles (Length / Columns):
              </label>
              <span className="font-mono text-xs px-2 py-0.5 bg-[#2d1a12] rounded border border-amber-800 text-amber-400">
                {numberTiles} Tiles ({totalNumbers} Numbers)
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={numberTiles}
              onChange={(e) => setNumberTiles(parseInt(e.target.value, 10))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-[#2b1810] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-amber-400/60 mt-1">
              <span>1 Tile (1-6)</span>
              <span>Default (3)</span>
              <span>12 Tiles (1-72)</span>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <div className="flex items-center gap-1 text-xs uppercase tracking-wider text-amber-400/80 font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-900/60 border-amber-400 text-amber-100 shadow-md'
                      : 'bg-[#2b1810]/70 hover:bg-[#3d2417] border-amber-900/60 text-amber-300/80'
                  }`}
                >
                  <div className="font-semibold text-xs text-amber-200 flex items-center justify-between">
                    <span>{preset.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <div className="text-[10px] text-amber-400/60 mt-0.5">{preset.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Done Action */}
        <button
          onClick={() => setSettingsOpen(false)}
          className="w-full pirate-btn-gold py-3 rounded-xl font-pirata text-xl tracking-wider uppercase font-bold shadow-lg"
        >
          Lock In Coordinates & Return
        </button>
      </div>
    </div>
  );
}
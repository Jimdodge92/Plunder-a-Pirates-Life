import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import { Plus, Minus, Trophy, Coins, Compass, Crosshair, UserPlus, Trash2 } from 'lucide-react';

const PIRATE_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

export default function FleetTracker() {
  const { captains, setCaptains } = useGame();
  const [newCaptainName, setNewCaptainName] = useState('');

  const updateCaptainStat = (id, stat, delta) => {
    if (stat === 'doubloons' && delta > 0) sounds.playCoin();

    setCaptains((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newVal = Math.max(0, (c[stat] || 0) + delta);
          return { ...c, [stat]: newVal };
        }
        return c;
      })
    );
  };

  const addCaptain = () => {
    const trimmed = newCaptainName.trim();
    if (!trimmed) return;
    const color = PIRATE_COLORS[captains.length % PIRATE_COLORS.length];
    const newCap = {
      id: Date.now().toString(),
      name: trimmed,
      ship: 'Galleon',
      doubloons: 5,
      masts: 2,
      cannons: 2,
      points: 2,
      color: color
    };
    setCaptains((prev) => [...prev, newCap]);
    setNewCaptainName('');
    sounds.playCoin();
  };

  const removeCaptain = (id) => {
    setCaptains((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-2xl parchment-container rounded-3xl p-5 sm:p-7 flex flex-col items-center gap-5">
        
        {/* Header */}
        <div className="text-center w-full">
          <h2 className="font-pirata text-3xl sm:text-4xl text-[#3e2723] tracking-wider drop-shadow-sm">
            Captains Fleet Roster
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6d4c41] mt-1">
            Track Plunder Points, Doubloons, and Ship Upgrades around the table
          </p>
        </div>

        {/* Add Captain Bar */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Enter Captain Name..."
            value={newCaptainName}
            onChange={(e) => setNewCaptainName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCaptain()}
            className="flex-1 bg-[#fdf6e3] border-2 border-[#8b4513] rounded-xl px-3.5 py-2 text-sm text-[#3e2723] font-semibold placeholder:text-[#8b4513]/50 focus:outline-none"
          />
          <button
            onClick={addCaptain}
            className="pirate-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Add</span>
          </button>
        </div>

        {/* Captains Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {captains.map((cap) => (
            <div
              key={cap.id}
              className="bg-[#fdf6e3] border-2 border-[#8b4513] rounded-2xl p-4 shadow-md relative overflow-hidden"
            >
              {/* Color Accent Stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: cap.color }}
              />

              {/* Captain Top Row */}
              <div className="flex items-center justify-between mb-3 pt-1">
                <div>
                  <h3 className="font-pirata text-2xl text-[#3e2723] leading-none">
                    {cap.name}
                  </h3>
                  <span className="text-[11px] font-semibold text-[#8b4513]/80 uppercase tracking-wider">
                    {cap.ship}
                  </span>
                </div>
                <button
                  onClick={() => removeCaptain(cap.id)}
                  className="text-stone-400 hover:text-red-700 p-1"
                  title="Dismiss Captain"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                
                {/* Plunder Points (Victory) */}
                <div className="bg-[#ebd5b3] rounded-xl p-2 flex items-center justify-between border border-[#8b4513]/30">
                  <div className="flex items-center gap-1.5 font-bold text-[#4e342e]">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    <span>Plunder: {cap.points}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'points', -1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'points', 1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Doubloons ($) */}
                <div className="bg-[#ebd5b3] rounded-xl p-2 flex items-center justify-between border border-[#8b4513]/30">
                  <div className="flex items-center gap-1.5 font-bold text-[#4e342e]">
                    <Coins className="w-4 h-4 text-yellow-600" />
                    <span>Gold: {cap.doubloons}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'doubloons', -1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'doubloons', 1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Cannons (Upgrades) */}
                <div className="bg-[#ebd5b3] rounded-xl p-2 flex items-center justify-between border border-[#8b4513]/30">
                  <div className="flex items-center gap-1.5 font-bold text-[#4e342e]">
                    <Crosshair className="w-4 h-4 text-red-700" />
                    <span>Cannons: {cap.cannons}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'cannons', -1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'cannons', 1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Masts (Speed) */}
                <div className="bg-[#ebd5b3] rounded-xl p-2 flex items-center justify-between border border-[#8b4513]/30">
                  <div className="flex items-center gap-1.5 font-bold text-[#4e342e]">
                    <Compass className="w-4 h-4 text-blue-700" />
                    <span>Masts: {cap.masts}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'masts', -1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => updateCaptainStat(cap.id, 'masts', 1)}
                      className="w-5 h-5 rounded bg-[#4e342e] text-amber-200 flex items-center justify-center font-bold hover:bg-[#6d4c41]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
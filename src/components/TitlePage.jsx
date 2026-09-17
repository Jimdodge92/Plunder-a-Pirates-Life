import React from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import compassRoseImg from '../assets/compass_rose.jpg';
import cardBackImg from '../assets/card_back.jpg';
import { Anchor, Compass, ChevronRight } from 'lucide-react';

export default function TitlePage() {
  const { setAppStage } = useGame();

  const handleBeginSetup = () => {
    sounds.playPageTurn();
    setAppStage('setup');
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8">
      {/* Grand Title Parchment Plaque */}
      <div className="w-full max-w-xl parchment-container rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Accent */}
        <div className="w-16 h-1 bg-[#8b4513] rounded-full opacity-60 mb-1" />

        {/* Central Nautical Emblem */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[#b8860b] shadow-[0_10px_25px_rgba(0,0,0,0.5)] overflow-hidden bg-[#2b1810] flex items-center justify-center group">
          <img
            src={compassRoseImg}
            alt="Compass Rose Emblem"
            className="w-full h-full object-cover opacity-80 group-hover:rotate-45 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-radial from-transparent to-black/50 pointer-events-none" />
          <div className="absolute z-10 w-14 h-14 rounded-full bg-[#1b0e0a]/80 border-2 border-amber-400 flex items-center justify-center shadow-lg">
            <Anchor className="w-8 h-8 text-amber-300" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="font-pirata text-4xl sm:text-6xl text-[#3e2723] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">
            Welcome to Plunder a Pirate's Life
          </h1>
          <p className="font-pirata text-2xl sm:text-3xl text-[#8b4513] tracking-wide mt-1 drop-shadow-sm">
            Created by Jim Dodge
          </p>
        </div>

        {/* Action Button - The Only Button on the Title Screen */}
        <div className="w-full max-w-sm pt-4">
          <button
            onClick={handleBeginSetup}
            className="w-full pirate-btn-gold py-4 sm:py-5 rounded-2xl font-pirata text-2xl sm:text-3xl tracking-wider uppercase font-bold flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-3 border-amber-300"
          >
            <span>Begin Setup</span>
            <ChevronRight className="w-6 h-6 text-amber-950" />
          </button>
        </div>

      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import cardBackImg from '../assets/card_back.jpg';
import cardWoodImg from '../assets/card_wood.jpg';
import cardRumImg from '../assets/card_rum.jpg';
import cardIronImg from '../assets/card_iron.jpg';
import cardGoldImg from '../assets/card_gold.jpg';
import { Sparkles, RotateCcw, Layers } from 'lucide-react';

const RESOURCE_DATA = {
  Wood: {
    name: 'Timber Wood',
    image: cardWoodImg,
    color: '#8b5a2b',
    quote: 'Sturdy oak logs and planks for repairs and shipwright upgrades.',
    type: 'Construction'
  },
  Rum: {
    name: 'Spiced Rum',
    image: cardRumImg,
    color: '#b85d19',
    quote: 'Captain’s reserve distilled in the islands. Keep crew morale high or trade for coin.',
    type: 'Luxury / Trade'
  },
  Iron: {
    name: 'Forged Iron',
    image: cardIronImg,
    color: '#5c6f84',
    quote: 'Heavy cannonballs and iron ingots. Essential for heavy armament.',
    type: 'Armament'
  },
  Gold: {
    name: 'Gold Doubloons',
    image: cardGoldImg,
    color: '#d4af37',
    quote: 'Piles of glittering Spanish treasure. The true wealth of the Seven Seas.',
    type: 'Currency'
  }
};

const RESOURCE_KEYS = ['Wood', 'Rum', 'Iron', 'Gold'];

export default function ResourceDeck() {
  const { bootyStats, addBootyStat, resetBootyStats } = useGame();
  const [currentResource, setCurrentResource] = useState('Gold');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);

    // If already flipped to front, flip back to back first, then reveal new card
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        executeDraw();
      }, 350);
    } else {
      executeDraw();
    }
  };

  const executeDraw = () => {
    // Pick random resource
    const randomKey = RESOURCE_KEYS[Math.floor(Math.random() * RESOURCE_KEYS.length)];
    setCurrentResource(randomKey);
    addBootyStat(randomKey);

    // Audio & flip
    sounds.playCoin();
    setIsFlipped(true);

    setTimeout(() => {
      setIsDrawing(false);
    }, 600);
  };

  const activeData = RESOURCE_DATA[currentResource];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-xl parchment-container rounded-3xl p-5 sm:p-7 flex flex-col items-center gap-5">
        
        {/* Header */}
        <div className="text-center w-full">
          <h2 className="font-pirata text-3xl sm:text-4xl text-[#3e2723] tracking-wider drop-shadow-sm">
            Draw from the Booty Deck!
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6d4c41] mt-1">
            Plunder islands, raid merchants, or harvest the sea
          </p>
        </div>

        {/* 3D Flipping Card Container */}
        <div
          onClick={handleDraw}
          className="relative w-64 h-96 sm:w-72 sm:h-[410px] cursor-pointer group perspective-1000 my-2"
          title="Click to draw a booty card!"
        >
          <div
            className={`w-full h-full duration-700 transform-style-3d transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Card Back Face */}
            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden border-4 border-[#b8860b] shadow-[0_12px_28px_rgba(0,0,0,0.6)] bg-[#2b1810]">
              <img
                src={cardBackImg}
                alt="Booty Deck Card Back"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 inset-x-0 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#1b0e0a]/80 backdrop-blur border border-amber-500/50 text-amber-300 font-pirata text-lg tracking-wider shadow-lg">
                  Tap to Draw Booty
                </span>
              </div>
            </div>

            {/* Card Front Face */}
            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden backface-hidden rotate-y-180 border-4 border-[#ffd700] shadow-[0_12px_32px_rgba(255,215,0,0.3)] bg-[#2b1810]">
              <img
                src={activeData.image}
                alt={activeData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Drawn Card Details Card */}
        {isFlipped && (
          <div className="w-full bg-[#fdf6e3] border-2 border-[#8b4513] rounded-2xl p-4 shadow-inner text-center animate-in fade-in zoom-in-95 duration-200">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#8b4513]/70 block">
              Bounty Uncovered
            </span>
            <div className="font-pirata text-3xl text-[#3e2723] font-bold tracking-wide">
              {activeData.name}
            </div>
            <p className="text-xs text-[#5d4037] italic mt-1 max-w-sm mx-auto">
              "{activeData.quote}"
            </p>
          </div>
        )}

        {/* Draw Button */}
        <button
          onClick={handleDraw}
          disabled={isDrawing}
          className="w-full pirate-btn-gold py-3.5 sm:py-4 rounded-2xl font-pirata text-2xl sm:text-3xl tracking-wider uppercase font-bold flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer shadow-lg"
        >
          <Sparkles className="w-6 h-6 text-amber-900" />
          <span>{isDrawing ? 'Drawing Booty...' : 'Draw Booty Card'}</span>
        </button>

        {/* Live Loot Tally */}
        <div className="w-full bg-[#fdf6e3]/70 border border-[#8b4513]/40 rounded-2xl p-3.5 mt-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#5d4037] mb-2 px-1">
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#8b4513]" />
              <span>Drawn Booty Haul (Total: {bootyStats.Total})</span>
            </div>
            {bootyStats.Total > 0 && (
              <button
                onClick={resetBootyStats}
                className="flex items-center gap-1 text-[11px] text-red-800 hover:text-red-950 underline"
                title="Reset session counts"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="bg-[#8b5a2b]/20 border border-[#8b5a2b]/40 rounded-xl p-2">
              <div className="text-[11px] font-bold text-[#5c3a19]">Wood</div>
              <div className="text-xl font-bold text-[#3e2723]">{bootyStats.Wood}</div>
            </div>
            <div className="bg-[#b85d19]/20 border border-[#b85d19]/40 rounded-xl p-2">
              <div className="text-[11px] font-bold text-[#7d3c0d]">Rum</div>
              <div className="text-xl font-bold text-[#3e2723]">{bootyStats.Rum}</div>
            </div>
            <div className="bg-[#5c6f84]/20 border border-[#5c6f84]/40 rounded-xl p-2">
              <div className="text-[11px] font-bold text-[#3d4a58]">Iron</div>
              <div className="text-xl font-bold text-[#3e2723]">{bootyStats.Iron}</div>
            </div>
            <div className="bg-[#d4af37]/20 border border-[#d4af37]/40 rounded-xl p-2">
              <div className="text-[11px] font-bold text-[#8a701e]">Gold</div>
              <div className="text-xl font-bold text-[#3e2723]">{bootyStats.Gold}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
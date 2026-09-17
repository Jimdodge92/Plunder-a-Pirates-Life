import React, { useState, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { pickRandomCoordinate, calculateGridBounds } from '../utils/gridCoordinates';
import { sounds } from '../utils/soundEffects';
import CompassDial from './CompassDial';
import { RotateCw, History, Settings2, Compass, Flame } from 'lucide-react';

export default function CoordinateDial() {
  const {
    alphabetTiles,
    numberTiles,
    setSettingsOpen,
    coordinateHistory,
    addCoordinateToHistory,
  } = useGame();

  const { totalLetters, totalNumbers, letters, displayRange, summary } = calculateGridBounds(
    alphabetTiles,
    numberTiles
  );

  const numberItems = Array.from({ length: totalNumbers }, (_, i) => (i + 1).toString());

  const [currentCoord, setCurrentCoord] = useState({ letter: 'A', number: 1, code: 'A-1' });
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(0);
  const [selectedNumberIndex, setSelectedNumberIndex] = useState(0);

  const [displayLetter, setDisplayLetter] = useState('A');
  const [displayNumber, setDisplayNumber] = useState('1');

  const [isSpinning, setIsSpinning] = useState(false);
  const [isFiring, setIsFiring] = useState(false);
  const [letterNeedleAngle, setLetterNeedleAngle] = useState(0);
  const [numberNeedleAngle, setNumberNeedleAngle] = useState(0);

  const spinTimeoutRef = useRef(null);

  const calculateTargetNeedleAngle = (prevAngle, targetIndex, totalItems) => {
    const anglePerItem = 360 / totalItems;
    const targetAngle = targetIndex * anglePerItem;
    const currentMod = ((prevAngle % 360) + 360) % 360;
    let diff = (targetAngle - currentMod + 360) % 360;
    if (diff === 0) diff = 360;
    const fullSpins = 5 * 360;
    return prevAngle + fullSpins + diff;
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const target = pickRandomCoordinate(alphabetTiles, numberTiles);
    const targetLetterIndex = letters.indexOf(target.letter);
    const targetNumberIndex = target.number - 1;

    setSelectedLetterIndex(targetLetterIndex);
    setSelectedNumberIndex(targetNumberIndex);

    const nextLetterAngle = calculateTargetNeedleAngle(letterNeedleAngle, targetLetterIndex, letters.length);
    const nextNumberAngle = calculateTargetNeedleAngle(numberNeedleAngle, targetNumberIndex, numberItems.length);

    setLetterNeedleAngle(nextLetterAngle);
    setNumberNeedleAngle(nextNumberAngle);

    // Settle needle quietly on the coordinate without any spin sound
    spinTimeoutRef.current = setTimeout(() => {
      setDisplayLetter(target.letter);
      setDisplayNumber(target.number.toString());
      setCurrentCoord(target);
      addCoordinateToHistory(target);
      setIsSpinning(false);
    }, 2600);
  };

  // Quick Fire Button: Plays cannon fire immediately, followed by the Wilhelm scream
  const handleQuickFire = () => {
    if (isFiring) return;
    setIsFiring(true);

    sounds.playCannon();

    setTimeout(() => {
      sounds.playWilhelm();
      setIsFiring(false);
    }, 1100);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Parchment Container */}
      <div className="w-full max-w-3xl parchment-container rounded-3xl p-5 sm:p-7 flex flex-col items-center gap-5 shadow-2xl">
        
        {/* Title and Board Size Header */}
        <div className="text-center w-full">
          <h2 className="font-pirata text-3xl sm:text-4xl text-[#3e2723] tracking-wider drop-shadow-sm flex items-center justify-center gap-2">
            <Compass className="w-8 h-8 text-[#8b4513]" />
            <span>Sea Grid Compasses</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6d4c41]">
              Sea Grid: {displayRange} ({summary})
            </span>
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-1 rounded text-[#5d4037] hover:text-[#2d1b14] hover:bg-amber-900/10 transition cursor-pointer"
              title="Change Sea Size"
            >
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dual Nautical Compasses with Quick Fire Button in between */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full my-2">
          {/* Latitude Compass (Letters) */}
          <CompassDial
            items={letters}
            needleAngle={letterNeedleAngle}
            isSpinning={isSpinning}
            label={`Latitude Compass (${letters.length} Letters)`}
            currentValue={isSpinning ? '...' : displayLetter}
            selectedIndex={selectedLetterIndex}
          />

          {/* Quick Cannon FIRE Button in between towards bottom */}
          <div className="flex flex-col items-center justify-center sm:self-end sm:mb-2 z-20">
            <button
              onClick={handleQuickFire}
              disabled={isFiring}
              className={`pirate-btn-crimson flex items-center gap-2 px-5 py-2 rounded-xl font-pirata text-xl uppercase tracking-wider font-bold shadow-xl border-2 border-red-500 hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                isFiring ? 'animate-pulse ring-4 ring-red-500/50' : ''
              }`}
              title="Fire Cannons!"
            >
              <Flame className="w-5 h-5 text-amber-300" />
              <span>{isFiring ? 'FIRING!' : 'FIRE'}</span>
            </button>
          </div>

          {/* Longitude Compass (Numbers) */}
          <CompassDial
            items={numberItems}
            needleAngle={numberNeedleAngle}
            isSpinning={isSpinning}
            label={`Longitude Compass (${numberItems.length} Numbers)`}
            currentValue={isSpinning ? '...' : displayNumber}
            selectedIndex={selectedNumberIndex}
          />
        </div>

        {/* Current Result Plaque - Clean without copy button */}
        <div className="w-full bg-[#fdf6e3] border-2 border-[#8b4513] rounded-2xl p-4 shadow-inner flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8b4513]/80 block">
            Compass Reading
          </span>
          <span className="font-pirata text-4xl sm:text-5xl text-[#3e2723] font-bold tracking-wider mt-0.5">
            {currentCoord.code}
          </span>
        </div>

        {/* Action Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full pirate-btn-gold py-4 sm:py-5 rounded-2xl font-pirata text-2xl sm:text-3xl tracking-wider uppercase font-bold flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer shadow-xl border-2 border-amber-300 hover:scale-[1.02] active:scale-98 transition-all"
        >
          <RotateCw className={`w-7 h-7 text-amber-950 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'Casting Your Luck...' : 'Cast Your Luck to the Seas!'}</span>
        </button>
      </div>

      {/* History Log */}
      {coordinateHistory.length > 0 && (
        <div className="w-full max-w-3xl mt-4 bg-[#23140e]/90 border border-amber-900/60 rounded-2xl p-4 shadow-xl text-amber-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-400/90">
            <History className="w-4 h-4" />
            <span>Recent Coordinates Log</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {coordinateHistory.slice(0, 8).map((coord, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-[#3a2016] border border-amber-700/60 rounded-lg text-xs font-mono font-bold text-amber-300 shadow-sm flex items-center gap-1.5"
              >
                <Compass className="w-3 h-3 text-amber-500" />
                {coord.code}
                <span className="text-[10px] text-amber-500/70 font-normal">({coord.timestamp})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
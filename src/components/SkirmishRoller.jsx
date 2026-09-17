import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { getRandomPirateTaunt } from '../utils/pirateTaunts';
import { Swords, Shield, Flame, Skull, Trophy, History, Volume2, VolumeX } from 'lucide-react';

const DICE_EMOJIS = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function SkirmishRoller() {
  const { battleHistory, addBattleRecord, soundMuted, toggleSound } = useGame();

  const [attackBonus, setAttackBonus] = useState(0);
  const [defenseBonus, setDefenseBonus] = useState(0);

  const [isRolling, setIsRolling] = useState(false);
  const [attackDie, setAttackDie] = useState(3);
  const [defenseDie, setDefenseDie] = useState(3);

  const [finalAttackTotal, setFinalAttackTotal] = useState(null);
  const [finalDefenseTotal, setFinalDefenseTotal] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [activeTaunt, setActiveTaunt] = useState(null);

  const rollIntervalRef = useRef(null);
  const tauntTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (rollIntervalRef.current) clearInterval(rollIntervalRef.current);
      if (tauntTimeoutRef.current) clearTimeout(tauntTimeoutRef.current);
    };
  }, []);

  const handleAttack = () => {
    if (isRolling) return;
    setIsRolling(true);
    setBattleResult(null);

    // Blast the cannons!
    sounds.playCannon();
    sounds.playDice();

    // Trigger pirate taunt for 10 seconds
    const randomTaunt = getRandomPirateTaunt();
    setActiveTaunt(randomTaunt);
    if (tauntTimeoutRef.current) {
      clearTimeout(tauntTimeoutRef.current);
    }
    tauntTimeoutRef.current = setTimeout(() => {
      setActiveTaunt(null);
    }, 10000);

    // Animate dice faces
    let ticks = 0;
    rollIntervalRef.current = setInterval(() => {
      ticks++;
      setAttackDie(Math.floor(Math.random() * 6) + 1);
      setDefenseDie(Math.floor(Math.random() * 6) + 1);
      if (ticks % 4 === 0) {
        sounds.playDice();
      }
    }, 80);

    setTimeout(() => {
      clearInterval(rollIntervalRef.current);

      const rawAttack = Math.floor(Math.random() * 6) + 1;
      const rawDefense = Math.floor(Math.random() * 6) + 1;

      setAttackDie(rawAttack);
      setDefenseDie(rawDefense);

      const totalAttack = rawAttack + attackBonus;
      const totalDefense = rawDefense + defenseBonus;

      setFinalAttackTotal(totalAttack);
      setFinalDefenseTotal(totalDefense);

      const attackerWins = totalAttack >= totalDefense; // Attacker wins ties in Plunder!

      const record = {
        attackerWins,
        rawAttack,
        rawDefense,
        attackBonus,
        defenseBonus,
        totalAttack,
        totalDefense,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };

      if (attackerWins) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#ffd700', '#ff4500', '#b8860b', '#d4af37']
        });
      }

      // All skirmishes end with the Wilhelm Scream!
      sounds.playWilhelm();

      setBattleResult(record);
      addBattleRecord(record);
      setIsRolling(false);
    }, 1400);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-xl parchment-container rounded-3xl p-5 sm:p-7 flex flex-col items-center gap-5">
        
        {/* Header */}
        <div className="text-center w-full">
          <h2 className="font-pirata text-3xl sm:text-4xl text-[#3e2723] tracking-wider drop-shadow-sm flex items-center justify-center gap-2">
            <Swords className="w-7 h-7 text-red-800" />
            <span>Ready for a Skirmish!</span>
            <Swords className="w-7 h-7 text-red-800 scale-x-[-1]" />
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6d4c41] mt-1">
            Resolve ship battles &bull; Attacker claims victory on ties
          </p>
        </div>

        {/* Combatants Grid: Attacker vs Defender */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 w-full">
          
          {/* Attacker Panel */}
          <div className="bg-[#fdf6e3] border-2 border-red-900/60 rounded-2xl p-4 flex flex-col items-center shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-900 mb-2">
              <Flame className="w-4 h-4 text-red-600" />
              <span>Attacker</span>
            </div>

            {/* Die Visual */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-red-800 to-red-950 border-3 border-amber-400 text-amber-200 flex items-center justify-center text-5xl sm:text-6xl shadow-lg my-1">
              {DICE_EMOJIS[attackDie - 1]}
            </div>

            {/* Bonus Selector */}
            <div className="w-full mt-3">
              <label className="text-[11px] font-semibold text-[#5d4037] block text-center mb-1">
                Cannon Bonus:
              </label>
              <select
                value={attackBonus}
                onChange={(e) => setAttackBonus(parseInt(e.target.value, 10))}
                className="w-full bg-[#ebd5b3] border border-[#8b4513] rounded-lg py-1 px-2 text-xs font-bold text-[#3e2723] text-center focus:outline-none"
              >
                <option value={0}>+0 Bonus</option>
                <option value={1}>+1 Cannons</option>
                <option value={2}>+2 Cannons</option>
                <option value={3}>+3 Cannons</option>
              </select>
            </div>
          </div>

          {/* Defender Panel */}
          <div className="bg-[#fdf6e3] border-2 border-blue-900/60 rounded-2xl p-4 flex flex-col items-center shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Defender</span>
            </div>

            {/* Die Visual */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-800 to-slate-950 border-3 border-amber-400 text-amber-200 flex items-center justify-center text-5xl sm:text-6xl shadow-lg my-1">
              {DICE_EMOJIS[defenseDie - 1]}
            </div>

            {/* Bonus Selector */}
            <div className="w-full mt-3">
              <label className="text-[11px] font-semibold text-[#5d4037] block text-center mb-1">
                Defense Upgrade:
              </label>
              <select
                value={defenseBonus}
                onChange={(e) => setDefenseBonus(parseInt(e.target.value, 10))}
                className="w-full bg-[#ebd5b3] border border-[#8b4513] rounded-lg py-1 px-2 text-xs font-bold text-[#3e2723] text-center focus:outline-none"
              >
                <option value={0}>+0 Defense</option>
                <option value={1}>+1 Hull</option>
                <option value={2}>+2 Hull</option>
                <option value={3}>+3 Hull</option>
              </select>
            </div>
          </div>

        </div>

        {/* Combat Result Banner */}
        {battleResult && (
          <div
            className={`w-full rounded-2xl p-4 text-center border-2 shadow-inner animate-in fade-in zoom-in-95 duration-200 ${
              battleResult.attackerWins
                ? 'bg-amber-100/90 border-amber-600 text-amber-950'
                : 'bg-slate-200/90 border-slate-600 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2 font-pirata text-2xl sm:text-3xl font-bold">
              {battleResult.attackerWins ? (
                <>
                  <Trophy className="w-6 h-6 text-amber-600" />
                  <span>Attacker Prevails!</span>
                </>
              ) : (
                <>
                  <Skull className="w-6 h-6 text-slate-700" />
                  <span>Defender Holds Firm!</span>
                </>
              )}
            </div>

            <div className="font-mono text-sm font-bold mt-1">
              Attacker Total: {battleResult.totalAttack} ({battleResult.rawAttack} + {battleResult.attackBonus}) vs Defender Total: {battleResult.totalDefense} ({battleResult.rawDefense} + {battleResult.defenseBonus})
            </div>

            <p className="text-xs italic mt-1 text-[#4e342e]">
              {battleResult.attackerWins
                ? '“Ye struck true, matey! Send them scurvy dogs to Davy Jones’ Locker!”'
                : '“Blast! Their hull withstood the broadside. Retreat to the fog!”'}
            </p>
          </div>
        )}

        {/* Pirate Taunt Banner - 10 Seconds */}
        {activeTaunt && (
          <div className="w-full bg-gradient-to-r from-[#2c1209] via-[#4d160f] to-[#2c1209] border-2 border-amber-400 rounded-2xl p-3.5 sm:p-4 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Skirmish Broadside!</span>
              <Skull className="w-4 h-4 text-amber-300" />
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
            <p className="font-pirata text-2xl sm:text-3xl text-amber-200 font-bold tracking-wide drop-shadow-md">
              “{activeTaunt}”
            </p>
          </div>
        )}

        {/* Attack Fire Button */}
        <button
          onClick={handleAttack}
          disabled={isRolling}
          className="w-full pirate-btn-crimson py-3.5 sm:py-4 rounded-2xl font-pirata text-2xl sm:text-3xl tracking-wider uppercase font-bold flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer shadow-xl"
        >
          <Flame className="w-6 h-6 text-amber-300" />
          <span>{isRolling ? 'Firing Broadsides...' : 'Fire Cannons! (Attack)'}</span>
        </button>

        {/* Audio Mute/Unmute toggle directly underneath Fire Button */}
        <div className="flex items-center justify-center -mt-2">
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold shadow-sm transition-all cursor-pointer ${
              soundMuted
                ? 'bg-red-950/85 border-red-700 text-red-300 hover:bg-red-900'
                : 'bg-[#3e2723]/85 border-[#b8860b]/70 text-amber-300 hover:bg-[#4e342e]'
            }`}
            title={soundMuted ? 'Audio Muted (Click to Unmute)' : 'Audio On (Click to Mute)'}
          >
            {soundMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span>Audio Muted (Click to Unmute)</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Audio On (Click to Mute)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Skirmish History Log */}
      {battleHistory.length > 0 && (
        <div className="w-full max-w-xl mt-4 bg-[#23140e]/90 border border-amber-900/60 rounded-2xl p-4 shadow-xl text-amber-200">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-400/90">
            <History className="w-4 h-4" />
            <span>Skirmish Battle Log</span>
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {battleHistory.slice(0, 6).map((bat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-1.5 bg-[#3a2016] border border-amber-800/50 rounded-xl text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold ${
                      bat.attackerWins ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  >
                    {bat.attackerWins ? 'Attacker Won' : 'Defender Won'}
                  </span>
                  <span className="text-amber-500/70">
                    ({bat.totalAttack} vs {bat.totalDefense})
                  </span>
                </div>
                <span className="text-[10px] text-amber-400/50">{bat.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
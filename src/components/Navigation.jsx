import React from 'react';
import { useGame } from '../context/GameContext';
import { Compass, Sparkles, Swords, Users, Volume2, VolumeX, Settings2, Anchor, Home } from 'lucide-react';

export default function Navigation() {
  const { activeTab, setActiveTab, soundMuted, toggleSound, setSettingsOpen, alphabetTiles, numberTiles, setAppStage } = useGame();

  const tabs = [
    { id: 'coordinates', label: 'Spin Dial', icon: Compass },
    { id: 'booty', label: 'Booty Deck', icon: Sparkles },
    { id: 'skirmish', label: 'Skirmish', icon: Swords },
    { id: 'fleet', label: 'Captains Log', icon: Users },
  ];

  return (
    <header className="w-full max-w-4xl mx-auto mb-4 px-2">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-[#2d1b14]/90 backdrop-blur border-2 border-[#b8860b] rounded-2xl px-4 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 border border-amber-400/50 flex items-center justify-center shadow-inner">
            <Anchor className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <h1 className="font-pirata text-2xl sm:text-3xl tracking-wide text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">
              Plunder, a Pirates Life
            </h1>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-400/80 mt-1">
              Created by Jim Dodge
            </p>
          </div>
        </div>

        {/* Right action icons */}
        <div className="flex items-center gap-2">
          {/* Return to Title Page button */}
          <button
            onClick={() => setAppStage('welcome')}
            className="p-2 rounded-lg bg-[#4e342e]/80 hover:bg-[#5d4037] border border-[#b8860b]/70 text-amber-300 transition-all hover:scale-105"
            title="Return to Welcome / Title Page"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Board size indicator button */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4e342e]/80 hover:bg-[#5d4037] border border-[#b8860b]/70 rounded-lg text-amber-300 text-xs font-semibold shadow transition-all hover:scale-105"
            title="Configure Board Grid"
          >
            <Settings2 className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline font-mono">{alphabetTiles}x{numberTiles} Tiles</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-all ${
              soundMuted
                ? 'bg-red-950/60 border-red-800/80 text-red-400 hover:bg-red-900/60'
                : 'bg-[#4e342e]/80 border-[#b8860b]/70 text-amber-300 hover:bg-[#5d4037]'
            }`}
            title={soundMuted ? 'Unmute SFX' : 'Mute SFX'}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="flex items-center justify-center gap-1.5 sm:gap-3 mt-3 overflow-x-auto py-1 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm tracking-wide transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-700 to-amber-900 text-amber-100 border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-105'
                  : 'bg-[#2b1810]/70 hover:bg-[#3d2417] text-amber-300/80 hover:text-amber-100 border border-amber-900/60'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-amber-500'}`} />
              <span className="font-semibold whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
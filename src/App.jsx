import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Navigation from './components/Navigation';
import CoordinateDial from './components/CoordinateDial';
import ResourceDeck from './components/ResourceDeck';
import SkirmishRoller from './components/SkirmishRoller';
import FleetTracker from './components/FleetTracker';
import BoardSettingsModal from './components/BoardSettingsModal';
import parchmentBg from './assets/parchment_bg.jpg';

import TitlePage from './components/TitlePage';
import BoardSetupPage from './components/BoardSetupPage';

function MainContent() {
  const { activeTab } = useGame();

  return (
    <main className="w-full flex-1 flex flex-col items-center justify-start pb-12">
      {activeTab === 'coordinates' && <CoordinateDial />}
      {activeTab === 'booty' && <ResourceDeck />}
      {activeTab === 'skirmish' && <SkirmishRoller />}
      {activeTab === 'fleet' && <FleetTracker />}
    </main>
  );
}

function AppBody() {
  const { appStage } = useGame();

  if (appStage === 'welcome') {
    return <TitlePage />;
  }

  if (appStage === 'setup') {
    return <BoardSetupPage />;
  }

  return (
    <>
      <Navigation />
      <MainContent />
      <BoardSettingsModal />
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <div className="relative min-h-screen flex flex-col overflow-x-hidden text-amber-950">
        {/* Deep Ocean & Nautical Parchment Backdrop */}
        <div
          className="fixed inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: `url(${parchmentBg})` }}
        />

        <div className="relative z-10 flex flex-col min-h-screen p-3 sm:p-6 max-w-5xl mx-auto w-full">
          <AppBody />

          <footer className="w-full text-center text-xs text-amber-300/50 py-4 font-mono mt-auto">
            Plunder: A Pirate's Life &bull; Created by Jim Dodge
          </footer>
        </div>
      </div>
    </GameProvider>
  );
}
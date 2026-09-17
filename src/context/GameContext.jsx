import React, { createContext, useContext, useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

const GameContext = createContext();

export function GameProvider({ children }) {
  // Board configuration: Default 2 tiles (A-L) x 3 tiles (1-18)
  const [alphabetTiles, setAlphabetTiles] = useState(() => {
    return parseInt(localStorage.getItem('plunder_alpha_tiles') || '2', 10);
  });
  const [numberTiles, setNumberTiles] = useState(() => {
    return parseInt(localStorage.getItem('plunder_num_tiles') || '3', 10);
  });

  const [appStage, setAppStage] = useState('welcome'); // 'welcome' | 'setup' | 'companion'
  const [activeTab, setActiveTab] = useState('coordinates');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // History of coordinates
  const [coordinateHistory, setCoordinateHistory] = useState([]);

  // Resource Booty stats tracker
  const [bootyStats, setBootyStats] = useState(() => {
    const saved = localStorage.getItem('plunder_booty_stats');
    return saved ? JSON.parse(saved) : { Wood: 0, Rum: 0, Iron: 0, Gold: 0, Total: 0 };
  });

  // Skirmish Battle History
  const [battleHistory, setBattleHistory] = useState([]);

  // Captains Fleet Tracker
  const [captains, setCaptains] = useState(() => {
    const saved = localStorage.getItem('plunder_captains');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Blackbeard', ship: 'Queen Anne', doubloons: 5, masts: 2, cannons: 2, points: 2, color: '#ef4444' },
      { id: '2', name: 'Anne Bonny', ship: 'Revenge', doubloons: 5, masts: 2, cannons: 2, points: 2, color: '#3b82f6' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('plunder_alpha_tiles', alphabetTiles.toString());
  }, [alphabetTiles]);

  useEffect(() => {
    localStorage.setItem('plunder_num_tiles', numberTiles.toString());
  }, [numberTiles]);

  useEffect(() => {
    localStorage.setItem('plunder_booty_stats', JSON.stringify(bootyStats));
  }, [bootyStats]);

  useEffect(() => {
    localStorage.setItem('plunder_captains', JSON.stringify(captains));
  }, [captains]);

  const toggleSound = () => {
    const isMuted = sounds.toggleMute();
    setSoundMuted(isMuted);
  };

  const addCoordinateToHistory = (coord) => {
    setCoordinateHistory((prev) => [coord, ...prev].slice(0, 20));
  };

  const addBootyStat = (resourceKey) => {
    setBootyStats((prev) => ({
      ...prev,
      [resourceKey]: (prev[resourceKey] || 0) + 1,
      Total: (prev.Total || 0) + 1
    }));
  };

  const resetBootyStats = () => {
    setBootyStats({ Wood: 0, Rum: 0, Iron: 0, Gold: 0, Total: 0 });
  };

  const addBattleRecord = (record) => {
    setBattleHistory((prev) => [record, ...prev].slice(0, 15));
  };

  return (
    <GameContext.Provider
      value={{
        appStage,
        setAppStage,
        alphabetTiles,
        setAlphabetTiles,
        numberTiles,
        setNumberTiles,
        activeTab,
        setActiveTab,
        settingsOpen,
        setSettingsOpen,
        soundMuted,
        toggleSound,
        coordinateHistory,
        addCoordinateToHistory,
        bootyStats,
        addBootyStat,
        resetBootyStats,
        battleHistory,
        addBattleRecord,
        captains,
        setCaptains,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
}
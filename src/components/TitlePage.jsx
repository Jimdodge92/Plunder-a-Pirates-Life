import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { sounds } from '../utils/soundEffects';
import { APP_VERSION } from '../utils/appVersion';
import compassRoseImg from '../assets/compass_rose.jpg';
import cardBackImg from '../assets/card_back.jpg';
import { Compass, ChevronRight, Smartphone } from 'lucide-react';

export default function TitlePage() {
  const { setAppStage } = useGame();

  const [heading, setHeading] = useState(0);
  const [gyroActive, setGyroActive] = useState(false);
  const [needsPermission, setNeedsPermission] = useState(false);

  const targetHeadingRef = useRef(0);
  const currentHeadingRef = useRef(0);
  const animFrameRef = useRef(null);

  const handleOrientation = (e) => {
    let deg = 0;
    if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
      // iOS webkitCompassHeading is 0-360 degrees from magnetic North
      deg = -e.webkitCompassHeading;
    } else if (e.alpha !== null && e.alpha !== undefined) {
      // Android alpha
      deg = e.alpha;
    } else {
      return;
    }

    setGyroActive(true);
    setNeedsPermission(false);

    // Shortest path around 360-degree circle
    let diff = deg - currentHeadingRef.current;
    while (diff < -180) diff += 360;
    while (diff > 180) diff -= 360;
    targetHeadingRef.current = currentHeadingRef.current + diff;
  };

  useEffect(() => {
    // Check if iOS permission is required
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      setNeedsPermission(true);
    } else if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    // Smooth physical lerp damping loop
    const updateLoop = () => {
      const delta = targetHeadingRef.current - currentHeadingRef.current;
      if (Math.abs(delta) > 0.05) {
        currentHeadingRef.current += delta * 0.14;
        setHeading(currentHeadingRef.current);
      }
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };
    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const enableGyro = async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const res = await DeviceOrientationEvent.requestPermission();
        if (res === 'granted') {
          setNeedsPermission(false);
          setGyroActive(true);
          window.addEventListener('deviceorientation', handleOrientation, true);
        }
      } catch (err) {
        console.warn('Gyro permission rejected:', err);
      }
    } else {
      window.addEventListener('deviceorientation', handleOrientation, true);
      setGyroActive(true);
    }
  };

  const handleBeginSetup = () => {
    sounds.playPageTurn();
    setAppStage('setup');
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8">
      {/* Grand Title Parchment Plaque */}
      <div className="w-full max-w-xl parchment-container rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center gap-5 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Accent */}
        <div className="w-16 h-1 bg-[#8b4513] rounded-full opacity-60 mb-1" />

        {/* Small "tap" text right above the compass */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#8b4513]/75 select-none">
            tap
          </span>

          {/* Central Nautical Compass with Gyroscope Needle */}
          <div
            onClick={enableGyro}
            title={gyroActive ? 'Gyroscope Active' : 'Tap to sync with Phone Gyroscope'}
            className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-[#b8860b] shadow-[0_10px_25px_rgba(0,0,0,0.5)] overflow-hidden bg-[#20110a] flex items-center justify-center cursor-pointer transition-all select-none ${
              gyroActive ? 'ring-4 ring-amber-400/50' : 'group'
            }`}
          >
            {/* Stationary Antique Compass Rose Backdrop */}
            <img
              src={compassRoseImg}
              alt="Compass Rose Dial"
              className="w-full h-full object-cover opacity-75 pointer-events-none"
            />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

            {/* Faceted 3D Compass Needle that spins with the Gyroscope */}
            <svg
              viewBox="0 0 360 360"
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ shapeRendering: 'geometricPrecision' }}
            >
              <defs>
                <filter id="homeNeedleShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.85" />
                </filter>
                <radialGradient id="homeBrassPivot" cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#fff2a8" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#633e08" />
                </radialGradient>
                <linearGradient id="homeNeedleGoldLight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#ffe680" />
                </linearGradient>
                <linearGradient id="homeNeedleGoldDark" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b8860b" />
                  <stop offset="100%" stopColor="#8a6405" />
                </linearGradient>
                <linearGradient id="homeNeedleRedLight" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff4d4d" />
                  <stop offset="100%" stopColor="#e60000" />
                </linearGradient>
                <linearGradient id="homeNeedleRedDark" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#b30000" />
                  <stop offset="100%" stopColor="#800000" />
                </linearGradient>
              </defs>

              <g
                id="homeSpinningNeedle"
                filter="url(#homeNeedleShadow)"
                style={{
                  transform: `rotate(${heading}deg)`,
                  transformOrigin: '180px 180px',
                  transition: gyroActive ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {/* NORTH ARROW (Light / Dark Crimson Facets) */}
                <polygon points="180,50 180,180 168,172" fill="url(#homeNeedleRedLight)" />
                <polygon points="180,50 192,172 180,180" fill="url(#homeNeedleRedDark)" />

                {/* SOUTH ARROW (Dark / Light Gold Facets) */}
                <polygon points="180,250 169,188 180,180" fill="url(#homeNeedleGoldDark)" />
                <polygon points="180,250 180,180 191,188" fill="url(#homeNeedleGoldLight)" />

                {/* Needle Spine & Gold Spear Tip */}
                <line x1="180" y1="52" x2="180" y2="248" stroke="#ffd700" strokeWidth="1" opacity="0.6" />
                <polygon points="180,44 177,56 183,56" fill="#ffd700" stroke="#8a6405" strokeWidth="0.8" />

                {/* Brass Center Pivot Boss */}
                <circle cx="180" cy="180" r="17" fill="url(#homeBrassPivot)" stroke="#4a2e05" strokeWidth="2" />
                <circle cx="180" cy="180" r="10" fill="#2d160c" stroke="#d4af37" strokeWidth="1.5" />
                <circle cx="180" cy="180" r="4" fill="#ffd700" />
              </g>
            </svg>
          </div>

          {/* Gyroscope Sync Hint / Status Badge */}
          {needsPermission && !gyroActive && (
            <button
              onClick={enableGyro}
              className="text-[11px] font-mono font-bold text-amber-300 bg-[#2b1810]/80 hover:bg-[#3d2216] px-3 py-1 rounded-full border border-amber-500/50 shadow-sm flex items-center gap-1.5 transition cursor-pointer mt-1"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Tap to Sync Gyroscope</span>
            </button>
          )}

          {gyroActive && (
            <span className="text-[10px] font-mono text-amber-700/80 font-bold uppercase tracking-wider mt-1">
              🧭 Gyroscope Connected
            </span>
          )}
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h1 className="font-pirata text-4xl sm:text-6xl text-[#3e2723] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">
            Welcome to Plunder: A Pirate's Life
          </h1>
          <p className="font-pirata text-2xl sm:text-3xl text-[#8b4513] tracking-wide mt-1 drop-shadow-sm">
            Created by Jim Dodge
          </p>
        </div>

        {/* Action Button - The Only Button on the Title Screen */}
        <div className="w-full max-w-sm pt-2">
          <button
            onClick={handleBeginSetup}
            className="w-full pirate-btn-gold py-4 sm:py-5 rounded-2xl font-pirata text-2xl sm:text-3xl tracking-wider uppercase font-bold flex items-center justify-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-3 border-amber-300"
          >
            <span>Begin Setup</span>
            <ChevronRight className="w-6 h-6 text-amber-950" />
          </button>
        </div>

        {/* App Revision Number at Very Bottom of Home Screen */}
        <div className="text-[11px] font-mono font-semibold text-[#8b4513]/70 tracking-wider">
          Revision {APP_VERSION}
        </div>

      </div>
    </div>
  );
}
import React from 'react';
import compassRoseImg from '../assets/compass_rose.jpg';

export default function CompassDial({
  items = [],
  needleAngle = 0,
  isSpinning = false,
  spinDuration = 5,
  label = '',
  currentValue = '',
  selectedIndex = 0,
}) {
  const count = Math.max(1, items.length);
  const anglePerItem = 360 / count;
  const center = 180;
  const itemRadius = 135;

  // Dynamic font sizing based on how many tiles/items exist
  const fontSize = count > 36 ? 10 : count > 24 ? 12 : count > 14 ? 14 : count > 8 ? 16 : 19;

  return (
    <div className="flex flex-col items-center select-none">
      {/* Compass Header Label */}
      <div className="text-xs font-bold uppercase tracking-wider text-[#5d4037] mb-2 font-pirata text-base sm:text-lg">
        {label}
      </div>

      {/* Compass Housing Outer Bezel */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-[#20110a] border-4 border-[#b8860b] shadow-[0_12px_28px_rgba(0,0,0,0.65),inset_0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center">
        
        {/* Antique Compass Rose Background Texture */}
        <img
          src={compassRoseImg}
          alt="Compass Rose Background"
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-cover rounded-full opacity-35 pointer-events-none mix-blend-luminosity"
        />

        {/* Glass reflection gradient highlight */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none z-20" />

        {/* Compass SVG Face */}
        <svg
          viewBox="0 0 360 360"
          className="w-full h-full relative z-10"
          style={{ shapeRendering: 'geometricPrecision' }}
        >
          <defs>
            {/* Needle Drop Shadow */}
            <filter id="needleShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.85" />
            </filter>

            {/* Brass Pivot Cap Gradient */}
            <radialGradient id="brassPivot" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fff2a8" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#633e08" />
            </radialGradient>

            {/* Arrow Gold Facet */}
            <linearGradient id="needleGoldLight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#ffe680" />
            </linearGradient>
            <linearGradient id="needleGoldDark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b8860b" />
              <stop offset="100%" stopColor="#8a6405" />
            </linearGradient>

            {/* Arrow Crimson Facet */}
            <linearGradient id="needleRedLight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff4d4d" />
              <stop offset="100%" stopColor="#e60000" />
            </linearGradient>
            <linearGradient id="needleRedDark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#b30000" />
              <stop offset="100%" stopColor="#800000" />
            </linearGradient>
          </defs>

          {/* Outer Compass Degree Track */}
          <circle cx={center} cy={center} r="162" fill="none" stroke="#b8860b" strokeWidth="2.5" opacity="0.85" />
          <circle cx={center} cy={center} r="112" fill="none" stroke="#8b5a2b" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

          {/* Render Letters / Numbers & Ticks along the Circular Compass Rim */}
          {items.map((item, idx) => {
            const angleDeg = idx * anglePerItem;
            const angleRad = ((angleDeg - 90) * Math.PI) / 180;

            const tx = center + itemRadius * Math.cos(angleRad);
            const ty = center + itemRadius * Math.sin(angleRad);

            // Tick mark coordinates on outer edge
            const tickInnerR = 152;
            const tickOuterR = 160;
            const tickX1 = center + tickInnerR * Math.cos(angleRad);
            const tickY1 = center + tickInnerR * Math.sin(angleRad);
            const tickX2 = center + tickOuterR * Math.cos(angleRad);
            const tickY2 = center + tickOuterR * Math.sin(angleRad);

            const isTarget = !isSpinning && idx === selectedIndex;

            return (
              <g key={idx}>
                {/* Tick pip on the rim */}
                <line
                  x1={tickX1}
                  y1={tickY1}
                  x2={tickX2}
                  y2={tickY2}
                  stroke={isTarget ? '#ffd700' : '#d4af37'}
                  strokeWidth={isTarget ? '3' : '1.5'}
                  opacity={isTarget ? 1 : 0.75}
                />

                {/* Target Glow Background when landed */}
                {isTarget && (
                  <circle
                    cx={tx}
                    cy={ty}
                    r={fontSize + 3}
                    fill="#ffd700"
                    fillOpacity="0.25"
                    stroke="#ffd700"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                )}

                {/* Item Label (Letter or Number) */}
                <text
                  x={tx}
                  y={ty}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isTarget ? '#ffffff' : '#ffd700'}
                  fontSize={fontSize}
                  fontWeight="bold"
                  fontFamily="'Pirata One', cursive, serif"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                  style={{
                    filter: isTarget ? 'drop-shadow(0 0 6px #ffd700)' : 'none',
                  }}
                >
                  {item}
                </text>
              </g>
            );
          })}

          {/* THE SPINNING COMPASS NEEDLE */}
          <g
            id="spinningNeedle"
            filter="url(#needleShadow)"
            style={{
              transform: `rotate(${needleAngle}deg)`,
              transformOrigin: '180px 180px',
              transition: isSpinning ? `transform ${spinDuration}s cubic-bezier(0.12, 0.8, 0.18, 1)` : 'none',
            }}
          >
            {/* NORTH ARROW (Pointing UP at 12 o'clock / 0 deg) */}
            {/* Left Facet (Light Crimson) */}
            <polygon
              points="180,60 180,180 168,172"
              fill="url(#needleRedLight)"
            />
            {/* Right Facet (Dark Crimson) */}
            <polygon
              points="180,60 192,172 180,180"
              fill="url(#needleRedDark)"
            />

            {/* SOUTH ARROW (Counter-weight pointing DOWN at 6 o'clock) */}
            {/* Left Facet (Dark Gold) */}
            <polygon
              points="180,242 169,188 180,180"
              fill="url(#needleGoldDark)"
            />
            {/* Right Facet (Light Gold) */}
            <polygon
              points="180,242 180,180 191,188"
              fill="url(#needleGoldLight)"
            />

            {/* Needle Center Ornament & Gold Spear Head Accents */}
            <line x1="180" y1="62" x2="180" y2="240" stroke="#ffd700" strokeWidth="1" opacity="0.6" />
            <polygon points="180,55 177,66 183,66" fill="#ffd700" stroke="#8a6405" strokeWidth="0.8" />

            {/* Brass Center Pivot Boss */}
            <circle cx={center} cy={center} r="17" fill="url(#brassPivot)" stroke="#4a2e05" strokeWidth="2" />
            <circle cx={center} cy={center} r="10" fill="#2d160c" stroke="#d4af37" strokeWidth="1.5" />
            <circle cx={center} cy={center} r="4" fill="#ffd700" />
          </g>
        </svg>

        {/* Small floating pointer compass rim marker at 12 o'clock */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-400 z-20 pointer-events-none" />
      </div>

      {/* Under-compass current reading badge */}
      <div className="mt-3 text-center">
        <span className="text-xs font-mono font-bold text-[#8b4513] bg-[#fdf6e3] px-3 py-1 rounded-full border border-[#8b4513]/50 shadow-sm">
          Pointing to: <strong className="font-pirata text-base text-[#3e2723] ml-1">{currentValue}</strong>
        </span>
      </div>
    </div>
  );
}
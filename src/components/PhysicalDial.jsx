import React from 'react';

export default function PhysicalDial({
  items = [],
  rotation = 0,
  isSpinning = false,
  label = '',
  currentValue = '',
}) {
  const count = Math.max(1, items.length);
  const anglePerItem = 360 / count;
  const radius = 170;
  const center = 180;

  // Dynamically calculate font size based on slice count
  const fontSize = count > 36 ? 10 : count > 24 ? 12 : count > 14 ? 14 : count > 8 ? 17 : 21;

  return (
    <div className="flex flex-col items-center select-none">
      {/* Label */}
      <div className="text-xs font-bold uppercase tracking-wider text-[#5d4037] mb-2 font-pirata text-base sm:text-lg">
        {label}
      </div>

      {/* Wheel Wrapper */}
      <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-2 bg-[#20110a] border-4 border-[#b8860b] shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center justify-center">
        
        {/* Stationary Indicator Needle Mounted at Top 12 o'clock pointing DOWN */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
          {/* Needle Base Pin */}
          <div className="w-5 h-5 rounded-full bg-gradient-to-b from-amber-400 to-amber-700 border-2 border-[#ffd700] shadow-md flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-red-600" />
          </div>
          {/* Needle Arrow Pointing Down */}
          <div className="w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[22px] border-t-red-600 -mt-1 filter drop-shadow" />
        </div>

        {/* Rotating Dial SVG */}
        <div
          className="w-full h-full rounded-full overflow-hidden"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 2.6s cubic-bezier(0.15, 0.95, 0.2, 1)' : 'none',
          }}
        >
          <svg
            viewBox="0 0 360 360"
            className="w-full h-full"
            style={{ shapeRendering: 'geometricPrecision' }}
          >
            <defs>
              <radialGradient id="brassHub" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffec8b" />
                <stop offset="60%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#7a5214" />
              </radialGradient>
              <linearGradient id="goldBorder" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="100%" stopColor="#8b6508" />
              </linearGradient>
            </defs>

            {/* Wheel Background */}
            <circle cx={center} cy={center} r={radius} fill="#23130c" stroke="#8b5a2b" strokeWidth="2" />

            {/* Slices */}
            {items.map((item, idx) => {
              const startAngle = (idx - 0.5) * anglePerItem;
              const endAngle = (idx + 0.5) * anglePerItem;
              const midAngle = idx * anglePerItem;

              const startRad = ((startAngle - 90) * Math.PI) / 180;
              const endRad = ((endAngle - 90) * Math.PI) / 180;

              const x1 = center + radius * Math.cos(startRad);
              const y1 = center + radius * Math.sin(startRad);
              const x2 = center + radius * Math.cos(endRad);
              const y2 = center + radius * Math.sin(endRad);

              const largeArcFlag = anglePerItem > 180 ? 1 : 0;
              const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

              // Alternate between dark mahogany and warm oak colors
              const isEven = idx % 2 === 0;
              const fillColor = isEven ? '#3e2417' : '#4d2e1f';

              return (
                <g key={idx}>
                  {/* Slice Wedge */}
                  <path
                    d={pathData}
                    fill={fillColor}
                    stroke="#b8860b"
                    strokeWidth="1.2"
                    strokeOpacity="0.6"
                  />

                  {/* Slice Text placed radially near outer rim */}
                  <g transform={`rotate(${midAngle}, ${center}, ${center})`}>
                    <text
                      x={center}
                      y={42}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#ffea88"
                      fontSize={fontSize}
                      fontWeight="bold"
                      fontFamily="Pirata One, cursive"
                      className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      style={{ letterSpacing: '0.05em' }}
                    >
                      {item}
                    </text>

                    {/* Small brass outer peg */}
                    <circle cx={center} cy={16} r={2.5} fill="#ffd700" stroke="#7a5214" strokeWidth="0.8" />
                  </g>
                </g>
              );
            })}

            {/* Outer Decorative Brass Rim */}
            <circle
              cx={center}
              cy={center}
              r={radius - 1}
              fill="none"
              stroke="url(#goldBorder)"
              strokeWidth="4"
              opacity="0.8"
            />

            {/* Center Boss / Brass Hub */}
            <circle cx={center} cy={center} r="38" fill="url(#brassHub)" stroke="#523207" strokeWidth="3" className="shadow-lg" />
            <circle cx={center} cy={center} r="26" fill="#2d160c" stroke="#d4af37" strokeWidth="2" />
            <circle cx={center} cy={center} r="8" fill="#ffd700" />
          </svg>
        </div>

        {/* Center Current Value Badge */}
        <div className="absolute z-20 pointer-events-none flex items-center justify-center">
          <span className="font-pirata text-2xl sm:text-3xl text-amber-200 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            {currentValue}
          </span>
        </div>

      </div>

      {/* Under dial status indicator */}
      <div className="mt-2 text-center">
        <span className="text-xs font-mono font-bold text-[#8b4513] bg-[#ebd5b3] px-2.5 py-0.5 rounded-full border border-[#8b4513]/40">
          Target: {currentValue}
        </span>
      </div>
    </div>
  );
}
import React from 'react';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  title?: string;
  onClick?: () => void;
  onIconClick?: (e: React.MouseEvent) => void;
  iconOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
  title,
  onClick,
  onIconClick,
  iconOnly = false,
}) => {
  // Container sizing
  const iconDimensions = {
    sm: 'w-7 h-7 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-md',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 rounded-3xl shadow-lg',
  }[size];

  // Font sizes for brand name
  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl',
  }[size];

  const taglineSize = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-xs sm:text-sm',
    xl: 'text-sm sm:text-base',
  }[size];

  return (
    <div
      onClick={onClick}
      title={title}
      className={`inline-flex flex-col items-center select-none relative ${
        onClick ? 'cursor-pointer hover:opacity-95 transition-all group' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* The CollegeCulture Official Emblem Icon */}
        <div
          onClick={(e) => {
            if (onIconClick) {
              e.stopPropagation();
              onIconClick(e);
            }
          }}
          className={`relative shrink-0 overflow-hidden transition-all duration-300 ${iconDimensions} ${
            onIconClick
              ? 'cursor-pointer hover:scale-105 active:scale-95 hover:shadow-lg hover:ring-2 hover:ring-purple-400/70'
              : onClick
              ? 'group-hover:scale-105'
              : ''
          }`}
          title={title || 'CollegeCulture Logo'}
        >
          {/* Official Emblem: Interlocking CC Monogram with Graduation Mortarboard */}
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full block"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Premium Gradient Background */}
              <linearGradient id={`cc-bg-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="45%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>

              {/* Glass Rim Shimmer */}
              <linearGradient id={`cc-rim-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
              </linearGradient>

              {/* Golden Tassel Gradient */}
              <linearGradient id={`cc-gold-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Soft Drop Shadow on Monogram & Cap */}
              <filter id={`cc-shadow-${size}`} x="-15%" y="-15%" width="130%" height="130%">
                <feDropShadow
                  dx="0"
                  dy="1.5"
                  stdDeviation="1.5"
                  floodColor="#2e1065"
                  floodOpacity="0.4"
                />
              </filter>
            </defs>

            {/* Gradient Base Squircle */}
            <rect
              x="2"
              y="2"
              width="116"
              height="116"
              rx="28"
              fill={`url(#cc-bg-${size})`}
            />

            {/* Subtle Inner Glass Stroke */}
            <rect
              x="3"
              y="3"
              width="114"
              height="114"
              rx="27"
              stroke={`url(#cc-rim-${size})`}
              strokeWidth="2"
              fill="none"
            />

            {/* Ambient Lighting Highlight */}
            <circle cx="35" cy="30" r="40" fill="#FFFFFF" opacity="0.12" />

            {/* Monogram and Cap Group */}
            <g filter={`url(#cc-shadow-${size})`}>
              {/* Interlocking 'C' 1 (Left / Primary) */}
              <path
                d="M 62 55 A 22 22 0 1 0 62 73 L 52 79 A 12 12 0 1 1 52 49 Z"
                fill="#FFFFFF"
              />

              {/* Interlocking 'C' 2 (Right / Secondary Interlaced) */}
              <path
                d="M 86 52 L 76 57 A 12 12 0 0 1 76 77 L 86 82 A 22 22 0 0 0 86 52 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
              <path
                d="M 76 57 A 12 12 0 0 0 63 65 L 54 59 A 22 22 0 0 1 77 46 L 79 55 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />
              <path
                d="M 63 67 A 12 12 0 0 0 76 77 L 74 86 A 22 22 0 0 1 54 73 Z"
                fill="#FFFFFF"
                opacity="0.95"
              />

              {/* Interlock Separation Cutline */}
              <path
                d="M 52 49 L 62 55 A 22 22 0 0 1 62 73 L 52 79"
                stroke="#7C3AED"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />

              {/* GRADUATION CAP atop C1 */}
              {/* Cap Skull Under-band */}
              <path
                d="M 37 31 L 37 36 C 37 40 55 40 55 36 L 55 31 Z"
                fill="#F8FAFC"
              />

              {/* Cap Top Diamond Board */}
              <polygon
                points="46,18 67,25 46,32 25,25"
                fill="#FFFFFF"
              />
              {/* Tilted Diamond Shadow / Highlight */}
              <polygon
                points="46,18 67,25 46,26 25,25"
                fill="#E2E8F0"
                opacity="0.7"
              />

              {/* Center Golden Button */}
              <circle cx="46" cy="25" r="2.5" fill={`url(#cc-gold-${size})`} />

              {/* Hanging Golden Tassel */}
              <path
                d="M 46 25 C 33 27 28 32 27 38 L 27 47"
                fill="none"
                stroke={`url(#cc-gold-${size})`}
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Tassel Knot */}
              <circle cx="27" cy="47" r="1.75" fill="#D97706" />
              {/* Tassel Fringe */}
              <path
                d="M 25 47 H 29 L 30.5 54 H 23.5 Z"
                fill={`url(#cc-gold-${size})`}
              />
            </g>
          </svg>
        </div>

        {/* Text Brand - collegeculture */}
        {!iconOnly && (
          <div className={`font-black tracking-tight leading-none ${textSize}`}>
            <span className="text-slate-900 transition-colors group-hover:text-slate-950">
              college
            </span>
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent ml-0.5">
              culture
            </span>
          </div>
        )}
      </div>

      {/* Subtitle / Tagline: Connect • Learn • Grow */}
      {showTagline && !iconOnly && (
        <div
          className={`mt-1.5 flex items-center gap-2 font-semibold text-slate-500 tracking-wide ${taglineSize}`}
        >
          <span className="hover:text-purple-600 transition-colors">Connect</span>
          <span className="w-1 h-1 rounded-full bg-purple-400"></span>
          <span className="hover:text-purple-600 transition-colors">Learn</span>
          <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
          <span className="hover:text-purple-600 transition-colors">Grow</span>
        </div>
      )}
    </div>
  );
};

import React from 'react';

interface BrandLogoProps {
  isDarkMode?: boolean;
  variant?: 'full' | 'horizontal' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  isDarkMode = true,
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true
}) => {
  // Select theme-adapted asset:
  // dtech_logo_dark.png is optimized for dark backgrounds (transparent BG, white DHARANI, cyan TECH SOLUTIONS)
  // dtech_logo_light.png is optimized for light backgrounds (transparent BG, navy DHARANI, cobalt TECH SOLUTIONS)
  const logoSrc = isDarkMode 
    ? '/assets/aistudio/dtech_logo_dark.png' 
    : '/assets/aistudio/dtech_logo_light.png';

  const markSrc = '/assets/aistudio/dtech_favicon.png';

  if (variant === 'full') {
    const sizeClasses = {
      sm: 'h-10',
      md: 'h-14',
      lg: 'h-20',
      xl: 'h-28'
    };

    return (
      <div className={`flex items-center ${className}`}>
        <img
          src={logoSrc}
          alt="Dharani Tech Solutions - BIM & VDC Solutions"
          className={`${sizeClasses[size]} w-auto object-contain transition-all duration-300 drop-shadow-[0_2px_12px_rgba(6,182,212,0.15)]`}
        />
      </div>
    );
  }

  if (variant === 'mark') {
    const markSizes = {
      sm: 'w-8 h-8',
      md: 'w-11 h-11',
      lg: 'w-14 h-14',
      xl: 'w-20 h-20'
    };

    return (
      <div className={`relative rounded-xl overflow-hidden bg-slate-900/90 border border-cyan-500/30 p-1 shadow-lg shadow-cyan-500/10 ${markSizes[size]} ${className}`}>
        <img
          src={markSrc}
          alt="Dharani Tech Solutions Mark"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  // Default: 'horizontal' (Ideal for Navigation bar and Footer)
  const iconHeight = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-18'
  };

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Brand Icon Emblem */}
      <div className="relative flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-slate-900/90 to-[#0b1220]/95 border border-cyan-500/30 p-1 shadow-md shadow-cyan-500/10 group-hover:border-cyan-400/60 group-hover:shadow-cyan-500/20 transition-all duration-300">
        <img
          src={markSrc}
          alt="DRN Emblem"
          className={`${iconHeight[size]} w-auto object-contain group-hover:scale-105 transition-transform duration-300`}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight transition-colors duration-200 ${
            isDarkMode 
              ? 'text-white group-hover:text-cyan-300' 
              : 'text-slate-950 group-hover:text-cyan-600'
          } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'}`}>
            DHARANI
          </span>
          <span className={`font-bold tracking-tight transition-colors duration-200 ${
            isDarkMode 
              ? 'text-cyan-400 group-hover:text-cyan-300' 
              : 'text-cyan-600 group-hover:text-cyan-500'
          } ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'}`}>
            TECH
          </span>
        </div>
        
        {showSubtitle && (
          <span className={`font-mono tracking-widest uppercase transition-colors duration-200 ${
            isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-600'
          } ${size === 'sm' ? 'text-[9px]' : 'text-[10px] -mt-0.5'}`}>
            SOLUTIONS • BIM & VDC
          </span>
        )}
      </div>
    </div>
  );
};

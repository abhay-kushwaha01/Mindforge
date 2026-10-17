import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  to?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  to = '/',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 20 : size === 'lg' ? 32 : 24;
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';

  const content = (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Precision geometric forge mark: stylized anvil and compass intersection */}
      <div
        className="flex items-center justify-center rounded bg-[#163323] text-[#F7F5F0] shrink-0"
        style={{ width: iconSize + 10, height: iconSize + 10 }}
        aria-hidden="true"
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized forge prism & compass */}
          <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" />
          <polyline points="2 17 12 22 22 17" stroke="#997A3D" />
          <polyline points="2 12 12 17 22 12" stroke="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-tight text-[#163323] leading-none ${textSize}`}
        >
          MindForge
        </span>
        {showTagline && (
          <span className="text-[11px] font-medium text-[#4E7A5D] tracking-wide mt-0.5">
            Forge a Sharper Mind
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};

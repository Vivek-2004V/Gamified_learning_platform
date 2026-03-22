import React from 'react';
import {
  FlaskConical,
  Calculator,
  Laptop,
  Wrench,
  Trophy,
  Gamepad2,
  Brain,
  BarChart,
  Palette,
} from 'lucide-react';

interface AchievementCoinProps extends React.SVGProps<SVGSVGElement> {
  icon: string;
  unlocked: boolean;
}

const iconMap: { [key: string]: React.ElementType } = {
  '🔬': FlaskConical,
  '🧙': Calculator,
  '💻': Laptop,
  '⚙️': Wrench,
  '🏆': Trophy,
  '🎮': Gamepad2,
  '🧠': Brain,
  '📊': BarChart,
  '🎨': Palette,
};

export const AchievementCoin: React.FC<AchievementCoinProps> = ({
  icon,
  unlocked,
  ...props
}) => {
  const IconComponent = iconMap[icon] || FlaskConical;
  const gradientId = `grad-${icon.charCodeAt(0)}`;

  const unlockedColors = {
    gradientStart: '#fde047', // yellow-300
    gradientEnd: '#f59e0b', // amber-500
    iconColor: '#a16207', // yellow-700
    shadowColor: '#facc15', // yellow-400
  };

  const lockedColors = {
    gradientStart: '#d1d5db', // gray-300
    gradientEnd: '#9ca3af', // gray-400
    iconColor: '#4b5563', // gray-600
    shadowColor: '#e5e7eb', // gray-200
  };

  const colors = unlocked ? unlockedColors : lockedColors;

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(60 60) rotate(90) scale(55)"
        >
          <stop stopColor={colors.gradientStart} />
          <stop offset="1" stopColor={colors.gradientEnd} />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="55" fill={`url(#${gradientId})`} />
      <circle
        cx="60"
        cy="60"
        r="52"
        stroke={colors.shadowColor}
        strokeWidth="4"
        strokeDasharray="1 4"
        strokeLinecap="round"
      />
      <foreignObject x="30" y="30" width="60" height="60">
        <IconComponent
          xmlns="http://www.w3.org/1999/xhtml"
          width="60"
          height="60"
          color={colors.iconColor}
        />
      </foreignObject>
    </svg>
  );
};

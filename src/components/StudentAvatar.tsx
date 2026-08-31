import React from 'react';

interface StudentAvatarProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  badgeContent?: React.ReactNode;
}

const AVATAR_COLORS = [
  { bg: 'bg-[#FFCC00]', text: 'text-black' },
  { bg: 'bg-[#007AFF]', text: 'text-white' },
  { bg: 'bg-[#FF3B30]', text: 'text-white' },
  { bg: 'bg-[#34C759]', text: 'text-white' },
  { bg: 'bg-[#AF52DE]', text: 'text-white' },
  { bg: 'bg-[#FF9500]', text: 'text-black' },
  { bg: 'bg-[#5856D6]', text: 'text-white' },
];

export const getStudentInitials = (name: string): string => {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const getStudentColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
};

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  name,
  size = 'md',
  className = '',
  badgeContent,
}) => {
  const initials = getStudentInitials(name);
  const color = getStudentColor(name);

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base sm:text-lg',
    xl: 'w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl',
  }[size];

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`rounded-2xl ${color.bg} ${color.text} font-black flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_#000] select-none uppercase tracking-wider ${sizeClasses} ${className}`}
        title={`Estudiante: ${name} (Iniciales: ${initials})`}
        aria-label={`Avatar de ${name}`}
      >
        {initials}
      </div>
      {badgeContent && (
        <div className="absolute -bottom-1 -right-1">
          {badgeContent}
        </div>
      )}
    </div>
  );
};

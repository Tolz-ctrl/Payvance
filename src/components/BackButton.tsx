import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  className = ''
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back to previous page"
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '6px',
        transition: 'all 0.2s ease',
        backgroundColor: isHovered ? '#F1F5F9' : 'transparent',
        color: isHovered ? '#00C2FF' : '#64748B',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ArrowLeftIcon style={{ width: '16px', height: '16px' }} />
      {label}
    </button>
  );
};

export default BackButton;
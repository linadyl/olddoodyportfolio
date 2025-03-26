import React from 'react';
import '../index.css';

interface FragmentMonoButtonProps {
    text?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }

const FragmentMonoButton: React.FC<FragmentMonoButtonProps> = ({ text = "about me!", onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 rounded-full border-2 font-light transition-colors duration-300 tracking-wide text-sm"
      style={{ 
        fontFamily: "'Fragment Mono', monospace",
        letterSpacing: "0.05em",
        borderColor: "var(--accent-colour)",
        color: "var(--accent-colour)",
        backgroundColor: "var(--background-colour)",
        opacity: 1
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-secondary)";
        e.currentTarget.style.color = "var(--accent-secondary)";

      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-colour)"
        e.currentTarget.style.color = "var(--accent-colour)";
      }}
    >
      {text}
    </button>
  );
};


export default FragmentMonoButton;
import React from 'react';

export const WindowDragHandle: React.FC = () => {
    return (
        <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" className="handle" fill="transparent">
            <line x1="1" y1="10" x2="10" y2="1" strokeWidth="1" stroke="#000" />
            <line x1="0" y1="10" x2="10" y2="0" strokeWidth="1" />
            <line x1="6" y1="10" x2="10" y2="6" strokeWidth="1" stroke="#000" />
            <line x1="5" y1="10" x2="10" y2="5" strokeWidth="1" />
        </svg>
    );
}


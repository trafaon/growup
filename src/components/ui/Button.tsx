import React from 'react';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
};

const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
};

export function Button({ 
    onClick, 
    children, 
    variant = 'primary',
    className = '' 
}: ButtonProps) {
    return (
        <button
            className={`${variants[variant]} px-4 py-2 rounded-lg transition-colors ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
import * as React from 'react';

export interface BubbleTextProps {
    filled?: boolean;
    children: React.ReactNode;
}

const BubbleText: React.FC<BubbleTextProps> = ({ filled, children }) => {
    return (
        <div
            className="text-primary-200 font-bold items-center"
            data-testid="bubble-text"
        >
            <div
                className={`inline-block mr-1 w-2 h-2 rounded-full ${
                    filled ? 'bg-accent' : 'bg-primary-300'
                }`}
            />

            {children}
        </div>
    );
};

export default BubbleText;

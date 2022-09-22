import { useState, useEffect } from 'react';

export function useKeyPress(targetKey: string): boolean {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler(e: KeyboardEvent): void {
        const { key } = e;

        e.stopPropagation();
        e.preventDefault();

        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = (e: KeyboardEvent): void => {
        const { key } = e;

        e.stopPropagation();
        e.preventDefault();

        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);
    return keyPressed;
}

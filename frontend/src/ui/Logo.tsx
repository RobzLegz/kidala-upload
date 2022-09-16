import Image from 'next/image';
import React from 'react';

export interface LogoProps {
    className?: string;
    divider?: number;
}

const Logo: React.FC<LogoProps> = ({ className, divider = 1.5 }) => {
    return (
        <Image
            src="/logo.png"
            width={421 / divider}
            height={50 / divider}
            objectFit="cover"
            className={`${className ? className : ''}`}
        />
    );
};

export default Logo;

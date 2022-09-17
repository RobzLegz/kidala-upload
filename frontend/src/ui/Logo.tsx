import Image from 'next/image';
import React from 'react';

export interface LogoProps {
    className?: string;
    divider?: number;
}

const Logo: React.FC<LogoProps> = ({ className, divider = 3.6 }) => {
    return (
        <Image
            src="/logo.svg"
            width={Math.floor(351 / divider)}
            height={Math.floor(132 / divider)}
            objectFit="cover"
            className={`${className ? className : ''}`}
        />
    );
};

export default Logo;

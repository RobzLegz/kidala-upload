import Link from 'next/link';
import React from 'react';

function FourOhFourContainer() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
            <strong className="text-4xl lg:text-5xl text-white text-center mb-8">
                KEEP CALM AND BE KIDALA 👑
            </strong>

            <Link href="/">
                <p className="link">
                    Return home
                </p>
            </Link>
        </div>
    );
}

export default FourOhFourContainer;

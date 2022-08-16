import Link from 'next/link';
import React from 'react';

function Navigation() {
    return (
        <nav className="w-full py-2 flex items-center justify-start">
            <Link href="/">
                <p className="link mx-2">Home</p>
            </Link>

            <Link href="/gallery">
                <p className="link mx-2">Gallery</p>
            </Link>
        </nav>
    );
}

export default Navigation;

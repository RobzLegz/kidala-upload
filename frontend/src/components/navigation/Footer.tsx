import Link from 'next/link';
import React from 'react';

function Footer() {
    return (
        <footer className="w-full py-8 flex items-center justify-center">
            <Link href="/">
                <p className="link mx-2">Home</p>
            </Link>

            <Link href="/gallery">
                <p className="link mx-2">Gallery</p>
            </Link>
        </footer>
    );
}

export default Footer;

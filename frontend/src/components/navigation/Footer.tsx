import Link from 'next/link';
import React from 'react'

function Footer() {
  return (
    <footer className='absolute w-full py-8 flex items-center justify-center bottom-0 left-0'>
        <Link href="/gallery"><p className='link'>Gallery</p></Link>
    </footer>
  )
}

export default Footer
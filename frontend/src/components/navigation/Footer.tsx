import Link from 'next/link';
import React from 'react'

function Footer() {
  return (
    <footer className='w-full py-8 flex items-center justify-center'>
        <Link href="/gallery"><p className='link'>Gallery</p></Link>
    </footer>
  )
}

export default Footer
import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="container mx-auto p-3">
      <Link href="/" className="font-extrabold text-lg">
        NameGenius.ai
      </Link>
    </nav>
  )
}

export default Nav

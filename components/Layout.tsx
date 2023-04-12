import React, { ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="container mx-auto p-3">
        <Link href="/" className="font-extrabold text-lg">
          NameGenius.ai
        </Link>
      </div>
      <main>{children}</main>
    </>
  )
}

export default Layout

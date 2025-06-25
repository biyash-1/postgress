import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div className='p-2 bg-cyan-200 '>
      <nav className='flex  items-center justify-around'>
        <div>
            <h1 className='text-red-400'>Task@</h1>
        </div>
        <div>
            <ul className='flex gap-2 items-center   '>
                <li className='className="bg-blue-600 hover:text-blue-700 font-semibold py-2 px-4 rounded transition duration-200"
  '>Home</li>
                <li>About</li>
                <li>My tasks</li>
                <li>completed</li>
            </ul>
        </div>
        <div>
          <Link href ="/login">
           <Button>Login</Button>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

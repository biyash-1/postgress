import React from 'react'
import { Button } from './ui/button'
import { SignedIn, SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import { syncUser } from '@/app/actions/useraction'

export async function Navbar() {
  await syncUser();
  return (
    <div className='p-2 bg-cyan-200'>
      <nav className='flex items-center justify-around'>
        <div>
          <h1 className='text-red-400'>Task@</h1>
        </div>
        <div>
          <ul className='flex gap-2 items-center'>
            <li className='bg-blue-600 hover:text-blue-700 font-semibold py-2 px-4 rounded transition duration-200'>Home</li>
            <li>About</li>
            <li>My tasks</li>
            <li>completed</li>
          </ul>
        </div>
        <div>
          <SignedIn >
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode='modal' forceRedirectUrl="/dashboard"  >
              <Button>Login</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
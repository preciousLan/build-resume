"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../_features/authSlice'
const NavBar = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth);

    const logoutUser = () => {
        dispatch(logout())
        router.push("/")
    }


    return (
        <div className='shadow  bg-white'>
            <nav className='flex items-center justify-between  mx-auto px-4 md:px-35 py-3.5 text-slate-800 transition-all'>
                <Link href="/">
                    <Image src="logo.svg" alt='logo' width={100} height={100} className='h-11 w-auto' />
                </Link>
                <div className='flex gap-4 items-center text-sm'>
                    <p>
                        Hi, {user?.name}
                    </p>
                    <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
                </div>
            </nav>
        </div>
    )
}
export default NavBar

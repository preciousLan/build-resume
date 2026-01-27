"use client"
import Link from 'next/link'
import React from 'react'

const Modal = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div>
            <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                    <path d="M4 5h16M4 12h16M4 19h16" />
                </svg>
            </button>
            <div className={`fixed inset-0 z-100 bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                <Link href="#" className="text-white">Home</Link>
                <Link href="#features" className="text-white">Features</Link>
                <Link href="#testimonials" className="text-white">Testimonials</Link>
                <Link href="#contact" className="text-white">Contact</Link>
                <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-green-600 hover:bg-green-700 transition text-white rounded-md flex" >
                    X
                </button>
            </div>

        </div>
    )
}

export default Modal
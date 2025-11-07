'use client'

import Image from "next/image"
import { useState, useRef, useEffect } from "react"

export default function ProfileMenu() {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    function logout() {
        window.location.href = '/api/logout'
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="focus:outline-none"
            >
                <Image
                    src="/profile.png"
                    alt="Profile"
                    width={45}
                    height={45}
                    className="rounded-md border border-gray-300 hover:shadow-lg transition"
                />
            </button>

            {open && (
                <div className="absolute right-0 w-48 bg-white rounded-lg shadow-lg border">

                    <button
                        onClick={logout}
                        className="block bg-white py-2 rounded-md px-4 shadow-xl text-center"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

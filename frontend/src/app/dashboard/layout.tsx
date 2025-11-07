'use client'

import Image from "next/image"
import Link from "next/link"
import { ReactNode, useState } from "react"
import { Menu, X } from "lucide-react"
import ProfileMenu from "../components/ProfileMenu"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className={` fixed md:static min-h-screen top-0 left-0 h-full w-64 bg-blue-500 shadow-xl z-50 transform
        transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"} `}>
        <div className="flex justify-between items-center md:justify-center shadow-xl py-4 px-5">
          <Image src={"/logo.png"} alt="Logo" width={85} height={85} />
          <button className="md:hidden text-white text-2xl" onClick={() => setSidebarOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col items-center mt-7 space-y-5">
          <Link href="/dashboard" onClick={() => setSidebarOpen(false)}
            className="w-48 block bg-white py-2 rounded-md px-4 shadow text-center hover:bg-blue-100"
          >
            Dashboard
          </Link>
          <Link href="/dashboard/tasks" onClick={() => setSidebarOpen(false)}
            className="w-48 block bg-white py-2 rounded-md px-4 shadow text-center hover:bg-blue-100"
          >
            Tasks
          </Link>
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-h-screen bg-gray-50">
        <div className="flex justify-between items-center shadow-md py-3 px-5 md:pr-10 bg-white">
          <button className="md:hidden text-blue-600" onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>

          <div className="flex-1 flex justify-end">
            <ProfileMenu />
          </div>
        </div>

        <main className="p-5 overflow-x-scroll">{children}</main>
      </div>
    </div>
  )
}

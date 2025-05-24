"use client";
import { LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-10 px-6 flex items-center justify-between border-b">
      <h1 className="text-lg font-semibold text-gray-800">Student Portal</h1>
      <button className="text-red-500 hover:text-red-700 flex items-center gap-1">
        <LogOut className="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  );
}

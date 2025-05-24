"use client";

import {
  Users,
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activePage: string;
  onSelectPage: (page: string) => void;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  activePage,
  onSelectPage,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { key: "students", label: "Students", icon: Users },
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "programs", label: "Programs", icon: BookOpen },
    { key: "reports", label: "Reports", icon: BarChart2 },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed z-40 top-0 left-0 min-h-screen bg-white border-r border-gray-200 transition-all duration-300 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:relative
        ${collapsed ? "lg:w-20" : "lg:w-64"} w-64
        flex flex-col`}
      >
        <div className="lg:hidden border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="p-3 flex items-center justify-end w-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="hidden lg:flex items-center justify-end px-2 py-2 border-b border-gray-200">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul>
            {links.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  onClick={() => {
                    onSelectPage(key);
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 focus:outline-none
                    ${activePage === key ? "bg-indigo-100 font-semibold" : ""}
                    ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && <span>{label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

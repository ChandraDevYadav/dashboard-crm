"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { TableOfContents } from "lucide-react";
import StudentPage from "./components/StudentPage";

export default function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState("students");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
        );
      case "programs":
        return <h2 className="text-2xl font-semibold mb-4">Programs</h2>;
      case "reports":
        return <h2 className="text-2xl font-semibold mb-4">Reports</h2>;
      case "settings":
        return <h2 className="text-2xl font-semibold mb-4">Settings</h2>;
      case "students":
      default:
        return (
          <StudentPage
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            programFilter={programFilter}
            setProgramFilter={setProgramFilter}
          />
        );
    }
  };

  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        activePage={activePage}
        onSelectPage={setActivePage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="lg:hidden p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 hover:text-black"
          >
            <TableOfContents className="w-6 h-6" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

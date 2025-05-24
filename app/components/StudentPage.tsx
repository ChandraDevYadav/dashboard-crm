"use client";

import StudentFilters from "./StudentFilters";
import StudentCard from "./StudentCard";
import { students } from "../../app/data/students";
import { useEffect, useState } from "react";

interface StudentPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  programFilter: string;
  setProgramFilter: (program: string) => void;
}

const StudentPage: React.FC<StudentPageProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  programFilter,
  setProgramFilter,
}) => {
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, statusFilter, programFilter]);

  const filterStudents = () => {
    let result = [...students];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.program.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((student) => student.status === statusFilter);
    }

    if (programFilter !== "All Programs") {
      result = result.filter((student) => student.program === programFilter);
    }

    setFilteredStudents(result);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setProgramFilter("All Programs");
  };

  const handleStatusChange = (studentId: string, newStatus: string) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, status: newStatus } : student
    );

    let result = updatedStudents;

    if (statusFilter !== "All") {
      result = result.filter((student) => student.status === statusFilter);
    }

    if (programFilter !== "All Programs") {
      result = result.filter((student) => student.program === programFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.program.toLowerCase().includes(term)
      );
    }

    setFilteredStudents(result);
  };

  return (
    <>
      <h1 className="text-xl lg:text-2xl font-bold text-center md:text-start text-gray-900 mb-6 lg:mb-8">
        Student Applications <br className="block md:hidden" /> Dashboard
      </h1>

      <StudentFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        programFilter={programFilter}
        setSearchTerm={setSearchTerm}
        setStatusFilter={setStatusFilter}
        setProgramFilter={setProgramFilter}
        resetFilters={resetFilters}
        statusOptions={[
          "All",
          "Pending",
          "Approved",
          "Rejected",
          "Interview Scheduled",
          "Documents Required",
        ]}
        programOptions={[
          "All Programs",
          ...Array.from(new Set(students.map((s) => s.program))),
        ]}
      />

      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="text-gray-600 text-sm sm:text-base">
          Showing{" "}
          <span className="font-semibold">{filteredStudents.length}</span> of{" "}
          <span className="font-semibold">{students.length}</span> applications
        </p>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-white p-6 lg:p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-500 text-base lg:text-lg">
            No applications match your search criteria.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              statusOptions={[
                "All",
                "Pending",
                "Approved",
                "Rejected",
                "Interview Scheduled",
                "Documents Required",
              ]}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default StudentPage;

interface Props {
  searchTerm: string;
  statusFilter: string;
  programFilter: string;
  setSearchTerm: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setProgramFilter: (value: string) => void;
  resetFilters: () => void;
  statusOptions: string[];
  programOptions: string[];
}

export default function StudentFilters({
  searchTerm,
  statusFilter,
  programFilter,
  setSearchTerm,
  setStatusFilter,
  setProgramFilter,
  resetFilters,
  statusOptions,
  programOptions,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Students
          </label>
          <input
            type="text"
            placeholder="Search by name or program..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Program
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={programFilter}
            onChange={(e) => setProgramFilter(e.target.value)}
          >
            {programOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}

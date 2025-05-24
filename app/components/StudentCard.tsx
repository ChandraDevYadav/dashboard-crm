interface Student {
  id: string;
  name: string;
  program: string;
  status: string;
  applicationDate: string;
}

interface Props {
  student: Student;
  statusOptions: string[];
  onStatusChange: (id: string, newStatus: string) => void;
}

function getStatusColor(status: string) {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Interview Scheduled":
      return "bg-blue-100 text-blue-800";
    case "Documents Required":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function StudentCard({
  student,
  statusOptions,
  onStatusChange,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {student.name}
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              student.status
            )}`}
          >
            {student.status}
          </span>
        </div>
        <p className="text-gray-600 mt-1">{student.program}</p>

        <div className="mt-4 text-sm text-gray-500">
          <p>
            Applied on: {new Date(student.applicationDate).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor={`status-${student.id}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Update Status
          </label>
          <select
            id={`status-${student.id}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={student.status}
            onChange={(e) => onStatusChange(student.id, e.target.value)}
          >
            {statusOptions
              .filter((opt) => opt !== "All")
              .map((option) => (
                <option key={option}>{option}</option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}

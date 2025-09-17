// src/pages/ProgramOutputs.tsx
import { useState } from "react";

// Courses (from Courses.tsx)
const courses = [
  { id: "c1", code: "CS101", name: "Data Structures", sem: 3 },
  { id: "c2", code: "CS102", name: "Algorithms", sem: 3 },
  { id: "c3", code: "CS201", name: "DBMS", sem: 4 },
  { id: "c4", code: "CS202", name: "Operating Systems", sem: 4 },
  { id: "c5", code: "CS301", name: "Computer Networks", sem: 5 },
  { id: "c6", code: "CS302", name: "Software Engineering", sem: 5 },
];

// COs (could be fetched from CourseOutcomes)
const sampleCOs = [
  { id: "co1", courseId: "c1", code: "CO1", description: "Understand arrays" },
  { id: "co2", courseId: "c1", code: "CO2", description: "Implement linked lists" },
  { id: "co3", courseId: "c2", code: "CO1", description: "Analyze sorting algorithms" },
];

interface ProgramOutput {
  id: string;
  courseId: string;
  coId: string;
  title: string;
  content: string;
}

const uid = () => Math.random().toString(36).slice(2, 9);

export default function ProgramOutputs() {
  const [outputs, setOutputs] = useState<ProgramOutput[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedCO, setSelectedCO] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ courseId: "", coId: "", title: "", content: "" });
  const [editingOutput, setEditingOutput] = useState<ProgramOutput | null>(null);

  const filteredOutputs = outputs.filter(
    (o) =>
      (selectedCourse === "all" || o.courseId === selectedCourse) &&
      (selectedCO === "all" || o.coId === selectedCO)
  );

  const openForm = (output?: ProgramOutput) => {
    if (output) {
      setEditingOutput(output);
      setFormData({
        courseId: output.courseId,
        coId: output.coId,
        title: output.title,
        content: output.content,
      });
    } else {
      setEditingOutput(null);
      setFormData({ courseId: "", coId: "", title: "", content: "" });
    }
    setShowForm(true);
  };

  const saveOutput = () => {
    if (!formData.courseId || !formData.coId || !formData.title || !formData.content) return;

    const newOutput = editingOutput
      ? { ...editingOutput, ...formData }
      : { id: uid(), ...formData };

    setOutputs((prev) =>
      editingOutput ? prev.map((o) => (o.id === editingOutput.id ? newOutput : o)) : [...prev, newOutput]
    );

    setShowForm(false);
    setEditingOutput(null);
  };

  const deleteOutput = (id: string) => {
    if (confirm("Are you sure you want to delete this output?")) {
      setOutputs((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Program Outputs</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <select
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setSelectedCO("all");
          }}
        >
          <option value="all">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} - {c.name}
            </option>
          ))}
        </select>

        <select
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
          value={selectedCO}
          onChange={(e) => setSelectedCO(e.target.value)}
        >
          <option value="all">All COs</option>
          {sampleCOs
            .filter((co) => selectedCourse === "all" || co.courseId === selectedCourse)
            .map((co) => (
              <option key={co.id} value={co.id}>
                {co.code} - {co.description}
              </option>
            ))}
        </select>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => openForm()}
        >
          + Add Output
        </button>
      </div>

      {/* Output Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOutputs.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No Program Outputs Found
          </div>
        )}
        {filteredOutputs.map((o) => {
          const course = courses.find((c) => c.id === o.courseId);
          const co = sampleCOs.find((c) => c.id === o.coId);
          return (
            <div
              key={o.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="mb-3">
                <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {course?.name} - {co?.code}
                </span>
                <h2 className="text-lg font-semibold mt-2">{o.title}</h2>
                <p className="text-gray-700 mt-1 whitespace-pre-line">{o.content}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => openForm(o)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => deleteOutput(o.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingOutput ? "Edit Output" : "Add Output"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Course</label>
                <select
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                >
                  <option value="">Select Course</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">CO</label>
                <select
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  value={formData.coId}
                  onChange={(e) => setFormData({ ...formData, coId: e.target.value })}
                >
                  <option value="">Select CO</option>
                  {sampleCOs
                    .filter((co) => formData.courseId === "" || co.courseId === formData.courseId)
                    .map((co) => (
                      <option key={co.id} value={co.id}>
                        {co.code} - {co.description}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Content / Output</label>
                <textarea
                  rows={4}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 border rounded-lg"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  onClick={saveOutput}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Course {
  code: string;
  name: string;
  department: string;
  semester: number;
}

const departmentColors: { [key: string]: string } = {
  "Computer Engg": "bg-blue-200 text-blue-800",
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([
    { code: "CS101", name: "Data Structures", department: "Computer Engg", semester: 3 },
    { code: "CS102", name: "Algorithms", department: "Computer Engg", semester: 3 },
    { code: "CS201", name: "DBMS", department: "Computer Engg", semester: 4 },
    { code: "CS202", name: "Operating Systems", department: "Computer Engg", semester: 4 },
    { code: "CS301", name: "Computer Networks", department: "Computer Engg", semester: 5 },
    { code: "CS302", name: "Software Engineering", department: "Computer Engg", semester: 5 },
  ]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Course>({ code: "", name: "", department: "Computer Engg", semester: 3 });

  const handleSave = () => {
    if (!form.code || !form.name) return;
    if (editIndex !== null) {
      const updated = [...courses];
      updated[editIndex] = form;
      setCourses(updated);
    } else {
      setCourses([...courses, form]);
    }
    setForm({ code: "", name: "", department: "Computer Engg", semester: 3 });
    setEditIndex(null);
    setModalOpen(false);
  };

  const handleEdit = (index: number) => {
    setForm(courses[index]);
    setEditIndex(index);
    setModalOpen(true);
  };

  const handleDelete = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Courses</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transform transition"
        >
          + Add Course
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by course code or name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((c, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition relative"
          >
            <div className="flex justify-between items-center mb-4">
              <span className={`px-2 py-1 rounded-full text-sm ${departmentColors[c.department]}`}>
                {c.department}
              </span>
              <span className="text-gray-400 text-sm">Sem {c.semester}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{c.name}</h3>
            <p className="text-gray-600 mb-4">{c.code}</p>
            <div className="flex gap-3 absolute top-4 right-4 opacity-0 hover:opacity-100 transition">
              <button onClick={() => handleEdit(idx)} className="text-blue-500 hover:text-blue-700">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(idx)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <p className="text-gray-400 col-span-full text-center">No courses found</p>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg animate-fade-in">
            <h3 className="text-xl font-bold mb-4">{editIndex !== null ? "Edit Course" : "Add Course"}</h3>
            <input
              type="text"
              placeholder="Course Code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full mb-2 border px-3 py-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Course Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mb-2 border px-3 py-2 rounded-lg"
            />
            <input
              type="number"
              placeholder="Semester"
              value={form.semester}
              onChange={(e) => setForm({ ...form, semester: +e.target.value })}
              className="w-full mb-4 border px-3 py-2 rounded-lg"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setModalOpen(false); setEditIndex(null); }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transform transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;

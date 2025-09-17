// src/pages/CourseOutcomes.tsx
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { CourseOutcome } from "../types";

export default function CourseOutcomes() {
  const { courses, courseOutcomes, addCourseOutcome } = useApp();

  const [courseId, setCourseId] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [bloomsLevel, setBloomsLevel] = useState("");
  const [assessments, setAssessments] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !description || !code) return;

    const newCO: CourseOutcome = {
      id: Date.now().toString(),
      courseId,
      description,
      code,
      bloomsLevel,
      assessments,
    };

    addCourseOutcome(newCO);
    setDescription("");
    setCode("");
    setBloomsLevel("");
    setAssessments([]);
  };

  const toggleAssessment = (type: string) => {
    setAssessments((prev) =>
      prev.includes(type) ? prev.filter((a) => a !== type) : [...prev, type]
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Course Outcomes</h1>

      {/* Add CO Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Course
          </label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            CO Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="CO1, CO2..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Enter CO description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bloom’s Level
          </label>
          <input
            type="text"
            value={bloomsLevel}
            onChange={(e) => setBloomsLevel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="e.g. K1, K2, K3..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Map to Assessments
          </label>
          <div className="flex gap-4 mt-2">
            {["Quiz", "Midterm", "Project", "Lab", "Final"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={assessments.includes(type)}
                  onChange={() => toggleAssessment(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Course Outcome
        </button>
      </form>

      {/* CO List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Existing Course Outcomes</h2>
        {courseOutcomes.length === 0 ? (
          <p className="text-gray-500">No course outcomes added yet.</p>
        ) : (
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Code</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Bloom’s Level</th>
                <th className="px-4 py-2 border">Assessments</th>
                <th className="px-4 py-2 border">Course</th>
              </tr>
            </thead>
            <tbody>
              {courseOutcomes.map((co: CourseOutcome) => (
                <tr key={co.id} className="border-t">
                  <td className="px-4 py-2 border">{co.code}</td>
                  <td className="px-4 py-2 border">{co.description}</td>
                  <td className="px-4 py-2 border">{co.bloomsLevel}</td>
                  <td className="px-4 py-2 border">
                    {Array.isArray(co.assessments) && co.assessments.length > 0
                      ? co.assessments.join(", ")
                      : "-"}
                  </td>
                  <td className="px-4 py-2 border">
                    {courses.find((c) => c.id === co.courseId)?.code || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

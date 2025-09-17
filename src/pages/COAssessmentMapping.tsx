// src/pages/COAssessmentMapping.tsx
import React, { useState } from "react";

// Mock Data for Courses and COs
type Course = { id: string; code: string; name: string };
type CO = { id: string; courseId: string; code: string; description: string };

const courses: Course[] = [
  { id: "c1", code: "CS101", name: "Data Structures" },
  { id: "c2", code: "CS102", name: "Algorithms" },
];

const cos: CO[] = [
  { id: "co1", courseId: "c1", code: "CO1", description: "Understand arrays" },
  { id: "co2", courseId: "c1", code: "CO2", description: "Implement linked lists" },
  { id: "co3", courseId: "c2", code: "CO1", description: "Analyze algorithms" },
];

// Assessment Tools
const assessmentTools = ["Exam", "Quiz", "Project", "Lab"];

type COAssessmentMap = {
  [coId: string]: string[]; // CO ID → Selected Assessment Tools
};

const COAssessmentMapping: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>(courses[0].id);
  const [coAssessmentMap, setCoAssessmentMap] = useState<COAssessmentMap>({});

  // Filter COs for selected course
  const filteredCOs = cos.filter((co) => co.courseId === selectedCourse);

  // Handle Assessment Tool Selection
  const toggleAssessmentTool = (coId: string, tool: string) => {
    setCoAssessmentMap((prev) => {
      const current = prev[coId] || [];
      let updated: string[] = [];
      if (current.includes(tool)) {
        updated = current.filter((t) => t !== tool);
      } else {
        updated = [...current, tool];
      }
      return { ...prev, [coId]: updated };
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CO → Assessment Tool Mapping</h1>

      <div className="mb-4">
        <label className="font-semibold mr-2">Select Course:</label>
        <select
          className="border p-2 rounded"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">CO Code</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">Assessment Tools (Select)</th>
          </tr>
        </thead>
        <tbody>
          {filteredCOs.map((co) => (
            <tr key={co.id}>
              <td className="border p-2">{co.code}</td>
              <td className="border p-2">{co.description}</td>
              <td className="border p-2">
                <div className="flex flex-wrap gap-2">
                  {assessmentTools.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => toggleAssessmentTool(co.id, tool)}
                      className={`px-2 py-1 border rounded cursor-pointer text-sm ${
                        coAssessmentMap[co.id]?.includes(tool)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Selected:{" "}
                  {coAssessmentMap[co.id]?.length > 0
                    ? coAssessmentMap[co.id].join(", ")
                    : "None"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default COAssessmentMapping;

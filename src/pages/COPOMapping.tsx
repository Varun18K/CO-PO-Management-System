import { JSX, useEffect, useState } from "react";

type Course = { id: string; code: string; name: string };
type COType = { id: string; courseId: string; code: string; description: string };
type POType = { code: string; name: string };
type Mappings = Record<string, Record<string, number>>; // mappings[coId][po] = 0..3

const STORAGE_KEY = "copo_mappings_v5";

// Courses
const COURSES: Course[] = [
  { id: "c1", code: "CS101", name: "Data Structures" },
  { id: "c2", code: "CS102", name: "Algorithms" },
  { id: "c3", code: "CS201", name: "DBMS" },
];

// COs
const COs: COType[] = [
  { id: "co1", courseId: "c1", code: "CO1", description: "Understand arrays" },
  { id: "co2", courseId: "c1", code: "CO2", description: "Implement linked lists" },
  { id: "co3", courseId: "c1", code: "CO3", description: "Analyze time complexity" },
  { id: "co4", courseId: "c2", code: "CO1", description: "Analyze sorting algorithms" },
  { id: "co5", courseId: "c2", code: "CO2", description: "Design divide-and-conquer solutions" },
  { id: "co6", courseId: "c3", code: "CO1", description: "Design ER models" },
];

// POs
const POs: POType[] = [
  { code: "PO1", name: "Problem Solving" },
  { code: "PO2", name: "Engineering Knowledge" },
  { code: "PO3", name: "Design Skills" },
  { code: "PO4", name: "Teamwork" },
  { code: "PO5", name: "Communication" },
  { code: "PO6", name: "Lifelong Learning" },
];

const LABELS = ["None", "Low", "Medium", "High"];

// Load mappings from localStorage
function loadMappings(): Mappings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const out: Mappings = {};
    for (const coId of Object.keys(parsed || {})) {
      out[coId] = {};
      for (const po of Object.keys(parsed[coId] || {})) {
        const n = Number(parsed[coId][po] ?? 0);
        out[coId][po] = Number.isFinite(n) ? Math.max(0, Math.min(3, Math.trunc(n))) : 0;
      }
    }
    return out;
  } catch { return {}; }
}

// Save mappings to localStorage
function saveMappingsToStorage(m: Mappings) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(m)); } catch { /* empty */ }
}

// Get cell color based on weight
const getCellColor = (val: number) => {
  switch (val) {
    case 1: return "bg-blue-100 hover:bg-blue-200";
    case 2: return "bg-blue-400 text-white hover:bg-blue-500";
    case 3: return "bg-blue-700 text-white hover:bg-blue-800";
    default: return "bg-gray-50 hover:bg-gray-100";
  }
};

export default function CoPoMapping(): JSX.Element {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [mappings, setMappings] = useState<Mappings>({});
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => setMappings(loadMappings()), []);

  const courseCOs = COs.filter((c) => c.courseId === selectedCourse);

  const getValue = (coId: string, po: string) => mappings[coId]?.[po] ?? 0;

  const setValue = (coId: string, po: string, val: number) => {
    setMappings((prev) => {
      const next = { ...prev };
      if (!next[coId]) next[coId] = {};
      next[coId] = { ...next[coId], [po]: Math.max(0, Math.min(3, Math.trunc(val))) };
      return next;
    });
  };

  const handleSave = () => {
    saveMappingsToStorage(mappings);
    const toast = document.createElement("div");
    toast.innerText = "✅ Mappings saved successfully!";
    toast.className =
      "fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  const handleResetCourse = () => {
    if (!selectedCourse) return;
    if (!confirm("Reset mappings for this course? This cannot be undone.")) return;
    const courseCoIds = courseCOs.map((c) => c.id);
    setMappings((prev) => {
      const next: Mappings = {};
      for (const k of Object.keys(prev)) if (!courseCoIds.includes(k)) next[k] = prev[k];
      saveMappingsToStorage(next);
      return next;
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">CO → PO Mapping</h1>

      {/* Instructions toggle */}
      <button
        onClick={() => setShowInstructions((prev) => !prev)}
        className="text-blue-600 underline text-sm"
      >
        {showInstructions ? "Hide Instructions" : "Show Instructions"}
      </button>

      {showInstructions && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded text-sm text-gray-800">
          <strong>Instructions:</strong>
          <ul className="list-disc list-inside mt-2">
            <li>Select a course from the dropdown below.</li>
            <li>For each CO, map it to one or more POs using the dropdown inside the cell.</li>
            <li>Select the strength/weightage: Low, Medium, High.</li>
            <li>The selection will appear directly in the table cell.</li>
            <li>Click <strong>Save All</strong> to store mappings.</li>
            <li>Reset mappings for a course using <strong>Reset Course</strong>.</li>
          </ul>
        </div>
      )}

      {/* Legend */}
      <div className="flex gap-3 justify-center">
        {LABELS.map((lab, idx) => {
          const bg =
            idx === 0
              ? "bg-gray-200"
              : idx === 1
              ? "bg-blue-100"
              : idx === 2
              ? "bg-blue-400 text-white"
              : "bg-blue-700 text-white";
          return (
            <div key={lab} className={`rounded px-3 py-1 font-medium ${bg}`}>
              {lab}
            </div>
          );
        })}
      </div>

      {/* Course selector */}
      <div className="flex justify-center mt-2">
        <label className="mr-3 font-semibold self-center">Select Course:</label>
        <select
          className="border rounded p-2"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- select course --</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} — {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Mapping table */}
      {selectedCourse ? (
        courseCOs.length ? (
          <div className="space-y-4">
            <div className="overflow-x-auto border rounded">
              <table className="min-w-full table-auto">
                <thead className="bg-blue-50 sticky top-0">
                  <tr>
                    <th className="p-2 text-left border">CO</th>
                    <th className="p-2 text-left border">Description</th>
                    {POs.map((po) => (
                      <th key={po.code} className="p-2 text-center border">
                        <div className="text-xs font-medium">{po.code}</div>
                        <div className="text-[10px] text-gray-500">{po.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courseCOs.map((co) => (
                    <tr key={co.id} className="hover:bg-gray-50">
                      <td className="p-2 border font-semibold">{co.code}</td>
                      <td className="p-2 border">{co.description}</td>
                      {POs.map((po) => {
                        const val = getValue(co.id, po.code);
                        return (
                          <td
                            key={po.code}
                            className={`p-2 text-center border ${getCellColor(val)} relative cursor-pointer`}
                          >
                            <div className="pointer-events-none">{LABELS[val]}</div>
                            <select
                              value={val}
                              onChange={(e) => setValue(co.id, po.code, parseInt(e.target.value, 10))}
                              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                              aria-label={`${co.code} - ${po.code}`}
                            >
                              {LABELS.map((label, idx) => (
                                <option key={idx} value={idx}>
                                  {label}
                                </option>
                              ))}
                            </select>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-semibold">
                    <td className="p-2 border text-right" colSpan={2}>
                      Total per PO
                    </td>
                    {POs.map((po) => (
                      <td key={po.code} className="p-2 border text-center">
                        {courseCOs.reduce((sum, co) => sum + getValue(co.id, po.code), 0)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Preview + actions */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div className="bg-white border rounded p-4 flex-1">
                <h3 className="font-semibold mb-2">Preview (live)</h3>
                {courseCOs.map((co) => (
                  <div key={co.id} className="mb-2">
                    <div className="font-medium">{co.code}</div>
                    <div className="text-sm text-gray-700 flex flex-wrap gap-2">
                      {POs.map((po) => {
                        const v = getValue(co.id, po.code);
                        return v > 0 ? (
                          <span
                            key={po.code}
                            className={`px-2 py-1 rounded text-xs ${
                              v === 1
                                ? "bg-blue-100"
                                : v === 2
                                ? "bg-blue-400 text-white"
                                : "bg-blue-700 text-white"
                            }`}
                          >
                            {po.code}: {LABELS[v]}
                          </span>
                        ) : null;
                      })}
                      {!POs.some((po) => getValue(co.id, po.code) > 0) && "No mappings yet"}
                    </div>
                    <div className="text-xs text-gray-500">
                      Total Strength: {POs.reduce((sum, po) => sum + getValue(co.id, po.code), 0)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Save All
                </button>
                <button
                  onClick={handleResetCourse}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Reset Course
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No COs found for selected course.</p>
        )
      ) : (
        <p className="text-center text-gray-500">Select a course to start mapping.</p>
      )}
    </div>
  );
}

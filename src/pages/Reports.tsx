import { JSX, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

type Course = { id: string; code: string; name: string };
type COType = { id: string; courseId: string; code: string; description: string };
type POType = { code: string; name: string };
type Mappings = Record<string, Record<string, number>>;

const STORAGE_KEY = "copo_mappings_v5";

const COURSES: Course[] = [
  { id: "c1", code: "CS101", name: "Data Structures" },
  { id: "c2", code: "CS102", name: "Algorithms" },
  { id: "c3", code: "CS201", name: "DBMS" },
];

const COs: COType[] = [
  { id: "co1", courseId: "c1", code: "CO1", description: "Understand arrays" },
  { id: "co2", courseId: "c1", code: "CO2", description: "Implement linked lists" },
  { id: "co3", courseId: "c1", code: "CO3", description: "Analyze time complexity" },
  { id: "co4", courseId: "c2", code: "CO1", description: "Analyze sorting algorithms" },
  { id: "co5", courseId: "c2", code: "CO2", description: "Design divide-and-conquer solutions" },
  { id: "co6", courseId: "c3", code: "CO1", description: "Design ER models" },
];

const POs: POType[] = [
  { code: "PO1", name: "Problem Solving" },
  { code: "PO2", name: "Engineering Knowledge" },
  { code: "PO3", name: "Design Skills" },
  { code: "PO4", name: "Teamwork" },
  { code: "PO5", name: "Communication" },
  { code: "PO6", name: "Lifelong Learning" },
];

function loadMappings(): Mappings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const out: Mappings = {};
    for (const coId in parsed) {
      out[coId] = {};
      for (const po in parsed[coId]) {
        const n = Number(parsed[coId][po] ?? 0);
        out[coId][po] = Number.isFinite(n) ? Math.max(0, Math.min(3, Math.trunc(n))) : 0;
      }
    }
    return out;
  } catch {
    return {};
  }
}

const MAX_WEIGHT = 3;

export default function Reports(): JSX.Element {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [mappings, setMappings] = useState<Mappings>({});
  const [poData, setPoData] = useState<Array<{ PO: string; Attainment: number }>>([]);

  useEffect(() => {
    setMappings(loadMappings());
  }, []);

  useEffect(() => {
    if (!selectedCourse) {
      setPoData([]);
      return;
    }

    const courseCOs = COs.filter((co) => co.courseId === selectedCourse);
    if (courseCOs.length === 0) {
      setPoData([]);
      return;
    }

    const poTotals: Record<string, number> = {};
    const poMaxTotals: Record<string, number> = {};

    POs.forEach((po) => {
      poTotals[po.code] = 0;
      poMaxTotals[po.code] = 0;
    });

    courseCOs.forEach((co) => {
      POs.forEach((po) => {
        const val = mappings[co.id]?.[po.code] ?? 0;
        poTotals[po.code] += val;
        poMaxTotals[po.code] += MAX_WEIGHT;
      });
    });

    const data = POs.map((po) => ({
      PO: po.code,
      Attainment: poMaxTotals[po.code] > 0 ? Math.round((poTotals[po.code] / poMaxTotals[po.code]) * 100) : 0,
    }));

    setPoData(data);
  }, [selectedCourse, mappings]);

  const handleExportCSV = () => {
    if (poData.length === 0) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["PO,Attainment (%)", ...poData.map((d) => `${d.PO},${d.Attainment}`)].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PO_Attainment_${selectedCourse}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">PO Attainment Report</h1>

      <div className="flex justify-center gap-4">
        <div>
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

        {poData.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 self-center"
          >
            Export CSV
          </button>
        )}
      </div>

      {selectedCourse ? (
        poData.length > 0 ? (
          <div className="border rounded p-4 bg-white shadow-md mt-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={poData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="PO" />
                <YAxis unit="%" />
                <Tooltip formatter={(value: number) => `${value}%`} />
                <Legend />
                <Bar dataKey="Attainment" fill="#4f46e5">
                  <LabelList dataKey="Attainment" position="top" formatter={(val) => `${val}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No CO → PO mappings found for this course.
          </p>
        )
      ) : (
        <p className="text-center text-gray-500 mt-4">Select a course to view the PO attainment report.</p>
      )}
    </div>
  );
}

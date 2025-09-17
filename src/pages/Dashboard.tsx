import { useMemo } from "react";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { state } = useApp();

  // ============================
  // Filter real data only
  // ============================
  const courses = state.courses.filter(c => c.name && c.code);
  const courseOutcomes = state.courseOutcomes.filter(co => co.description && co.courseId);
  const programOutcomes = state.programOutcomes.filter(po => po.code);
  const reports = state.reports.filter(r => r.courseId && Object.keys(r.poAttainment).length);

  // ============================
  // PO Attainment Overview
  // ============================
  const poAttainmentData = useMemo(() => {
    if (!reports.length) return [];
    return programOutcomes.slice(0, 8).map(po => {
      const avgAttainment =
        reports.reduce((sum, report) => sum + (report.poAttainment[po.id] || 0), 0) / reports.length;
      return {
        name: po.code,
        attainment: Number(avgAttainment.toFixed(2)),
        percentage: (avgAttainment / 3) * 100,
      };
    });
  }, [reports, programOutcomes]);

  // Course-wise performance
  const courseWiseData = useMemo(() => {
    return courses.map(course => {
      const courseReport = reports.find(r => r.courseId === course.id);
      const avgAttainment = courseReport
        ? Object.values(courseReport.poAttainment).reduce((sum, val) => sum + val, 0) /
          Object.values(courseReport.poAttainment).length
        : 0;
      return {
        name: course.code,
        attainment: Number(avgAttainment.toFixed(2)),
        percentage: (avgAttainment / 3) * 100,
      };
    });
  }, [courses, reports]);

  // ============================
  // Export CSV
  // ============================
  const handleExportCSV = () => {
    if (!poAttainmentData.length) return;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["PO,Attainment (%)", ...poAttainmentData.map(d => `${d.name},${d.percentage.toFixed(1)}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PO_Attainment_Overview.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // ============================
  // Reusable Components
  // ============================
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const StatCard = ({ title, value, color, trend }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && <p className="text-sm text-green-600 mt-1">{trend}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}></div>
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BarChart = ({ data, title }: { data: any[]; title: string }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button
          onClick={handleExportCSV}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Export CSV
        </button>
      </div>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <div className="w-12 text-sm font-medium text-gray-600">{item.name}</div>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 h-4 rounded-full relative">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{item.attainment}</span>
                </div>
              </div>
            </div>
            <div className="w-16 text-sm text-gray-500 text-right">{item.percentage.toFixed(1)}%</div>
          </div>
        ))}
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LineChart = ({ data, title }: { data: any[]; title: string }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">{item.attainment}</span>
              <span className="text-sm text-gray-500">/ 3.0</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-6">
        <h1 className="text-2xl font-bold">Welcome back, {state.user?.name}!</h1>
        <p className="mt-2 text-blue-100">Here's an overview of your CO-PO management system</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Courses" value={courses.length} color="bg-blue-100" trend="+0" />
        <StatCard title="Course Outcomes" value={courseOutcomes.length} color="bg-green-100" trend="+0" />
        <StatCard title="Program Outcomes" value={programOutcomes.length} color="bg-purple-100" />
        <StatCard title="Reports Generated" value={reports.length} color="bg-orange-100" trend="+0" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart data={poAttainmentData} title="PO Attainment Overview" />
        <LineChart data={courseWiseData} title="Course-wise Performance" />
      </div>
    </div>
  );
}

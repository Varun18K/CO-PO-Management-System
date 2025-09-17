// src/types.ts

// User information
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "faculty";
}

// Course details
export interface Course {
  id: string;
  code: string;
  name: string;
  facultyId: string;
}

// Course Outcomes (COs)
export interface CourseOutcome {
  id: string;
  courseId: string;
  description: string;
  code: string; // e.g., CO1, CO2
  bloomsLevel: string; // e.g., "Remember", "Apply"
  assessments: string[]; // e.g., ["Quiz", "Exam"]
}

// Program Outcomes (POs)
export interface ProgramOutcome {
  id: string;
  description: string;
}

// Mapping between COs and POs
export interface COPOMapping {
  id: string;
  courseId: string;
  coId: string;
  poId: string;
  level: number; // 1 = Low, 2 = Medium, 3 = High
}

// Assessments (like exams, assignments, etc.)
export interface Assessment {
  id: string;
  courseId: string;
  type: string; // e.g. "Quiz", "Midterm", "Final"
  maxMarks: number;
}

// Student scores in assessments
export interface StudentScore {
  id: string;
  studentId: string;
  assessmentId: string;
  marksObtained: number;
}

// Reports (summary of CO-PO attainment etc.)
export interface Report {
  id: string;
  courseId: string;
  summary: string;
  attainmentLevel: number; // 1–3 scale
}

// Global App State
export interface AppState {
  user: User | null;
  courses: Course[];
  courseOutcomes: CourseOutcome[];
  programOutcomes: ProgramOutcome[];
  copoMappings: COPOMapping[];
  assessments: Assessment[];
  studentScores: StudentScore[];
  reports: Report[];
}

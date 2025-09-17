export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'faculty';
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  faculty: string;
}

export interface CourseOutcome {
  id: string;
  courseId: string;
  code: string;
  description: string;
  bloomsLevel: string;
}

export interface ProgramOutcome {
  id: string;
  code: string;
  description: string;
  category: string;
}

export interface COPOMapping {
  id: string;
  coId: string;
  poId: string;
  weightage: number; // 1-3 scale
}

export interface Assessment {
  id: string;
  courseId: string;
  name: string;
  type: 'quiz' | 'exam' | 'project' | 'lab' | 'assignment';
  maxMarks: number;
  coMappings: string[]; // CO IDs
}

export interface StudentScore {
  id: string;
  studentId: string;
  assessmentId: string;
  score: number;
}

export interface Report {
  id: string;
  courseId: string;
  semester: string;
  year: number;
  poAttainment: { [poId: string]: number };
  generatedAt: Date;
}

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
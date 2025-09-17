import { Course, CourseOutcome, ProgramOutcome, COPOMapping, Assessment, Report } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Programming Fundamentals',
    department: 'Computer Science',
    semester: 1,
    credits: 4,
    faculty: 'Dr. Smith'
  },
  {
    id: '2',
    code: 'CS201',
    name: 'Data Structures',
    department: 'Computer Science',
    semester: 3,
    credits: 4,
    faculty: 'Dr. Johnson'
  },
  {
    id: '3',
    code: 'CS301',
    name: 'Database Systems',
    department: 'Computer Science',
    semester: 5,
    credits: 3,
    faculty: 'Dr. Williams'
  }
];

export const mockCourseOutcomes: CourseOutcome[] = [
  {
    id: '1',
    courseId: '1',
    code: 'CO1',
    description: 'Understand basic programming concepts and syntax',
    bloomsLevel: 'Understanding'
  },
  {
    id: '2',
    courseId: '1',
    code: 'CO2',
    description: 'Apply programming constructs to solve problems',
    bloomsLevel: 'Applying'
  },
  {
    id: '3',
    courseId: '2',
    code: 'CO1',
    description: 'Analyze time and space complexity of algorithms',
    bloomsLevel: 'Analyzing'
  },
  {
    id: '4',
    courseId: '2',
    code: 'CO2',
    description: 'Implement various data structures',
    bloomsLevel: 'Applying'
  }
];

export const mockProgramOutcomes: ProgramOutcome[] = [
  {
    id: 'PO1',
    code: 'PO1',
    description: 'Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals',
    category: 'Technical'
  },
  {
    id: 'PO2',
    code: 'PO2',
    description: 'Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems',
    category: 'Technical'
  },
  {
    id: 'PO3',
    code: 'PO3',
    description: 'Design/development of solutions: Design solutions for complex engineering problems',
    category: 'Technical'
  },
  {
    id: 'PO4',
    code: 'PO4',
    description: 'Conduct investigations of complex problems: Use research-based knowledge and research methods',
    category: 'Technical'
  },
  {
    id: 'PO5',
    code: 'PO5',
    description: 'Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering tools',
    category: 'Technical'
  },
  {
    id: 'PO6',
    code: 'PO6',
    description: 'The engineer and society: Apply reasoning informed by the contextual knowledge',
    category: 'Professional'
  },
  {
    id: 'PO7',
    code: 'PO7',
    description: 'Environment and sustainability: Understand the impact of professional engineering solutions',
    category: 'Professional'
  },
  {
    id: 'PO8',
    code: 'PO8',
    description: 'Ethics: Apply ethical principles and commit to professional ethics and responsibilities',
    category: 'Professional'
  },
  {
    id: 'PO9',
    code: 'PO9',
    description: 'Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams',
    category: 'Interpersonal'
  },
  {
    id: 'PO10',
    code: 'PO10',
    description: 'Communication: Communicate effectively on complex engineering activities',
    category: 'Interpersonal'
  },
  {
    id: 'PO11',
    code: 'PO11',
    description: 'Project management and finance: Demonstrate knowledge and understanding of engineering and management principles',
    category: 'Professional'
  },
  {
    id: 'PO12',
    code: 'PO12',
    description: 'Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent learning',
    category: 'Professional'
  }
];

export const mockCOPOMappings: COPOMapping[] = [
  { id: '1', coId: '1', poId: 'PO1', weightage: 3 },
  { id: '2', coId: '1', poId: 'PO2', weightage: 2 },
  { id: '3', coId: '2', poId: 'PO1', weightage: 3 },
  { id: '4', coId: '2', poId: 'PO3', weightage: 2 },
  { id: '5', coId: '3', poId: 'PO1', weightage: 3 },
  { id: '6', coId: '3', poId: 'PO2', weightage: 3 },
  { id: '7', coId: '4', poId: 'PO3', weightage: 3 },
  { id: '8', coId: '4', poId: 'PO5', weightage: 2 }
];

export const mockAssessments: Assessment[] = [
  {
    id: '1',
    courseId: '1',
    name: 'Mid-term Exam',
    type: 'exam',
    maxMarks: 100,
    coMappings: ['1', '2']
  },
  {
    id: '2',
    courseId: '1',
    name: 'Programming Assignment 1',
    type: 'assignment',
    maxMarks: 50,
    coMappings: ['2']
  },
  {
    id: '3',
    courseId: '2',
    name: 'Data Structures Project',
    type: 'project',
    maxMarks: 100,
    coMappings: ['3', '4']
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    courseId: '1',
    semester: 'Fall 2023',
    year: 2023,
    poAttainment: {
      'PO1': 2.8,
      'PO2': 2.5,
      'PO3': 2.7,
      'PO4': 2.3,
      'PO5': 2.6,
      'PO6': 2.4,
      'PO7': 2.2,
      'PO8': 2.5,
      'PO9': 2.7,
      'PO10': 2.4,
      'PO11': 2.3,
      'PO12': 2.6
    },
    generatedAt: new Date('2023-12-15')
  },
  {
    id: '2',
    courseId: '2',
    semester: 'Fall 2023',
    year: 2023,
    poAttainment: {
      'PO1': 2.9,
      'PO2': 2.8,
      'PO3': 2.6,
      'PO4': 2.4,
      'PO5': 2.7,
      'PO6': 2.3,
      'PO7': 2.1,
      'PO8': 2.4,
      'PO9': 2.8,
      'PO10': 2.5,
      'PO11': 2.2,
      'PO12': 2.7
    },
    generatedAt: new Date('2023-12-16')
  }
];
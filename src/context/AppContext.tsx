// src/context/AppContext.tsx
import { createContext, useContext, useReducer, ReactNode } from "react";
import {
  mockCourses,
  mockCourseOutcomes,
  mockProgramOutcomes,
  mockCOPOMappings,
  mockAssessments,
  mockReports,
} from "../data/mockData";
import { AppState, User, CourseOutcome } from "../types";

interface AppContextType {
  state: AppState;
  login: (
    email: string,
    password: string,
    role: "admin" | "faculty"
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  addCourseOutcome: (co: CourseOutcome) => void;

  // Expose these directly for pages like CourseOutcomes.tsx
  courses: AppState["courses"];
  courseOutcomes: AppState["courseOutcomes"];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "ADD_CO"; payload: CourseOutcome };

const initialState: AppState = {
  user: null,
  courses: mockCourses,
  courseOutcomes: mockCourseOutcomes,
  programOutcomes: mockProgramOutcomes,
  copoMappings: mockCOPOMappings,
  assessments: mockAssessments,
  studentScores: [],
  reports: mockReports,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "ADD_CO":
      return { ...state, courseOutcomes: [...state.courseOutcomes, action.payload] };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = async (
    email: string,
    password: string,
    role: "admin" | "faculty"
  ): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // fake delay

    if (email && password) {
      const user: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        role,
      };
      dispatch({ type: "LOGIN", payload: user });
      return true;
    }
    return false;
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  const addCourseOutcome = (co: CourseOutcome) => {
    dispatch({ type: "ADD_CO", payload: co });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        isAuthenticated: !!state.user,
        addCourseOutcome,
        courses: state.courses,
        courseOutcomes: state.courseOutcomes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

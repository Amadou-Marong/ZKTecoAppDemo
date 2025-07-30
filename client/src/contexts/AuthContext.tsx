import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type UserRole = 'admin' | 'hr' | 'employee';

export interface User {
    id: string;
    fullName: string;
    staffId: string;
    email: string;
    role: UserRole;
    department: string;
    shift: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for authentication
const DUMMY_USERS: (User & { password: string })[] = [
  {
    id: '1',
    fullName: 'John Admin',
    staffId: 'ADM001',
    email: 'admin@company.com',
    password: 'admin123',
    role: 'admin',
    department: 'Administration',
    shift: 'Day Shift'
  },
  {
    id: '2',
    fullName: 'Sarah HR',
    staffId: 'HR001',
    email: 'hr@company.com',
    password: 'hr123',
    role: 'hr',
    department: 'Human Resources',
    shift: 'Day Shift'
  },
  {
    id: '3',
    fullName: 'Mike Employee',
    staffId: 'EMP001',
    email: 'employee@company.com',
    password: 'emp123',
    role: 'employee',
    department: 'Operations',
    shift: 'Day Shift'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored authentication on mount
    const storedUser = localStorage.getItem('attendanceUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = DUMMY_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('attendanceUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('attendanceUser');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
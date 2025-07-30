import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import AppSidebar from './components/Layout/AppSidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import Layout from './components/Layout/Layout'
import DashboardPage from './pages/DashboardPage'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import AttendancePage from './pages/AttendancePage'
import EmployeesPage from './pages/EmployeesPage'
import NotFound from './pages/NotFound'
import DevicesPage from './pages/DevicesPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'

const queryClient = new QueryClient()

const AppContent = () => {
  return (
    <Router>
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Layout> <DashboardPage /> </Layout></ProtectedRoute>} />
            <Route path="/employees" element={<ProtectedRoute><Layout> <EmployeesPage /> </Layout></ProtectedRoute>} />
            <Route path="/devices" element={<ProtectedRoute><Layout> <DevicesPage /> </Layout></ProtectedRoute>} />
            <Route path="/attendance" element={<ProtectedRoute><Layout> <AttendancePage /> </Layout></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Layout> <ReportsPage /> </Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout> <SettingsPage /> </Layout></ProtectedRoute>} />

            {/* Catch all Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    
  )
}
function App() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
          <TooltipProvider>
          <Toaster />
          <AppContent />
          </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App

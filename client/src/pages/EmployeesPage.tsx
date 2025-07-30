import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { Edit, Eye, MoreHorizontal, Search, Trash2, UserPlus, Users } from 'lucide-react'
// import { DashboardCard } from '../components/DashboardCard'
import { Input } from '../components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Badge } from '../components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu'
import EmployeeEditDialog from '../components/EmployeeEditDialog'

const dummyEmployees = [
  { id: "EMP001", name: "John Doe", department: "Engineering", position: "Senior Developer", shift: "Morning", status: "Active", enrolledDevices: 3 },
  { id: "EMP002", name: "Jane Smith", department: "HR", position: "HR Manager", shift: "Morning", status: "Active", enrolledDevices: 2 },
  { id: "EMP003", name: "Mike Johnson", department: "Marketing", position: "Marketing Specialist", shift: "Evening", status: "Active", enrolledDevices: 1 },
  { id: "EMP004", name: "Sarah Wilson", department: "Finance", position: "Accountant", shift: "Morning", status: "Inactive", enrolledDevices: 0 },
  { id: "EMP005", name: "David Brown", department: "Operations", position: "Operations Manager", shift: "Night", status: "Active", enrolledDevices: 4 },
]

// const stats = [
//   { title: "Total Employees", value: "156", icon: Users, trend: "+12%" },
//   { title: "Active Employees", value: "142", icon: Users, trend: "+5%" },
//   { title: "New This Month", value: "8", icon: UserPlus, trend: "+25%" },
//   { title: "Enrolled Devices", value: "89%", icon: Users, trend: "+3%" },
// ]


const EmployeesPage = () => {
    const [searchTerm, setSearchTerm] = useState("")
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'view';
    employee?: any;
  }>({ isOpen: false, mode: 'add' })

  const handleEmployeeAction = (mode: 'add' | 'edit' | 'view', employee?: any) => {
    setDialogState({ isOpen: true, mode, employee })
  }

  const handleSaveEmployee = (employeeData: any) => {
    console.log('Saving employee:', employeeData)
    // Here you would typically save to your backend
  }

  const filteredEmployees = dummyEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
            <p className="text-muted-foreground">Manage employee profiles and biometric enrollment</p>
          </div>
          
          <Button className="gap-2" onClick={() => handleEmployeeAction('add')}>
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <DashboardCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div> */}

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Employee Directory</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Staff ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled Devices</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.shift}</TableCell>
                  <TableCell>
                    <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{employee.enrolledDevices}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEmployeeAction('view', employee)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEmployeeAction('edit', employee)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Employee
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Employee
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <EmployeeEditDialog
          employee={dialogState.employee}
          isOpen={dialogState.isOpen}
          onClose={() => setDialogState({ isOpen: false, mode: 'add' })}
          onSave={handleSaveEmployee}
          mode={dialogState.mode}
        />
      </div>
  )
}

export default EmployeesPage
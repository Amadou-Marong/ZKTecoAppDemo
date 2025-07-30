// import { Layout } from "@/components/Layout"
// import { DashboardCard } from "@/components/DashboardCard"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FileText, Download, Calendar as CalendarIcon, TrendingUp, Clock, UserX, AlertTriangle } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import { Button } from "../components/ui/button"
import { DashboardCard } from "../components/DashboardCard"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Calendar } from "../components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"

const dummyReports = [
  { employee: "John Doe", id: "EMP001", date: "2024-01-15", checkIn: "09:02", checkOut: "17:45", totalHours: "8h 43m", status: "Present", overtime: "43m" },
  { employee: "Jane Smith", id: "EMP002", date: "2024-01-15", checkIn: "08:55", checkOut: "17:30", totalHours: "8h 35m", status: "Present", overtime: "35m" },
  { employee: "Mike Johnson", id: "EMP003", date: "2024-01-15", checkIn: "09:15", checkOut: "18:00", totalHours: "8h 45m", status: "Late", overtime: "45m" },
  { employee: "Sarah Wilson", id: "EMP004", date: "2024-01-15", checkIn: "-", checkOut: "-", totalHours: "0h 0m", status: "Absent", overtime: "0m" },
  { employee: "David Brown", id: "EMP005", date: "2024-01-15", checkIn: "09:00", checkOut: "16:30", totalHours: "7h 30m", status: "Early Leave", overtime: "0m" },
]

const stats = [
  { title: "Present Today", value: "142", icon: TrendingUp, trend: "89%" },
  { title: "Late Arrivals", value: "8", icon: Clock, trend: "5%" },
  { title: "Absent", value: "6", icon: UserX, trend: "4%" },
  { title: "Early Leaves", value: "3", icon: AlertTriangle, trend: "2%" },
]

const ReportsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reportType, setReportType] = useState("daily")

  const handleExportPDF = () => {
    // Simulate PDF export
    const reportData = {
      type: reportType,
      date: date?.toLocaleDateString(),
      data: dummyReports
    };
    
    // In a real app, you would send this to your backend or use a PDF library
    console.log('Exporting PDF:', reportData);
    
    // Create a download link simulation
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `attendance-report-${date?.toISOString().split('T')[0]}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportExcel = () => {
    // Simulate Excel export
    const csvContent = [
      ['Employee', 'Staff ID', 'Date', 'Check In', 'Check Out', 'Total Hours', 'Status', 'Overtime'],
      ...dummyReports.map(record => [
        record.employee,
        record.id,
        record.date,
        record.checkIn,
        record.checkOut,
        record.totalHours,
        record.status,
        record.overtime
      ])
    ].map(row => row.join(',')).join('\n');

    const element = document.createElement('a');
    const file = new Blob([csvContent], { type: 'text/csv' });
    element.href = URL.createObjectURL(file);
    element.download = `attendance-report-${date?.toISOString().split('T')[0]}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Attendance Reports</h1>
            <p className="text-muted-foreground">Generate and analyze attendance reports and analytics</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={handleExportPDF}>
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleExportExcel}>
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <DashboardCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold">Attendance Report</h2>
              
              <div className="flex items-center gap-3">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Report</SelectItem>
                    <SelectItem value="weekly">Weekly Report</SelectItem>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button className="gap-2">
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Staff ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Overtime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyReports.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.employee}</TableCell>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.checkIn}</TableCell>
                  <TableCell>{record.checkOut}</TableCell>
                  <TableCell>{record.totalHours}</TableCell>
                  <TableCell>
                    <Badge variant={
                      record.status === "Present" ? "default" :
                      record.status === "Late" ? "secondary" :
                      record.status === "Absent" ? "destructive" :
                      "outline"
                    }>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.overtime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Department Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Engineering</span>
                <div className="flex gap-2">
                  <Badge variant="default">45 Present</Badge>
                  <Badge variant="secondary">3 Late</Badge>
                  <Badge variant="destructive">2 Absent</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>HR</span>
                <div className="flex gap-2">
                  <Badge variant="default">12 Present</Badge>
                  <Badge variant="secondary">0 Late</Badge>
                  <Badge variant="destructive">0 Absent</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Marketing</span>
                <div className="flex gap-2">
                  <Badge variant="default">18 Present</Badge>
                  <Badge variant="secondary">2 Late</Badge>
                  <Badge variant="destructive">1 Absent</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Shift Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Morning Shift</span>
                <div className="flex gap-2">
                  <Badge variant="default">98 Present</Badge>
                  <Badge variant="secondary">5 Late</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Evening Shift</span>
                <div className="flex gap-2">
                  <Badge variant="default">32 Present</Badge>
                  <Badge variant="secondary">2 Late</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Night Shift</span>
                <div className="flex gap-2">
                  <Badge variant="default">12 Present</Badge>
                  <Badge variant="secondary">1 Late</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ReportsPage;
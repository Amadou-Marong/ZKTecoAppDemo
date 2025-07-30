import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Clock, MapPin } from "lucide-react"


interface AttendanceRecord {
  id: string
  employeeName: string
  employeeId: string
  avatar?: string
  checkIn: string
  checkOut?: string
  device: string
  location: string
  status: "present" | "late" | "absent" | "partial"
  totalHours?: string
}

const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    employeeName: "John Doe",
    employeeId: "EMP001",
    checkIn: "09:00 AM",
    checkOut: "05:30 PM",
    device: "UFace 800 - Main",
    location: "Main Office",
    status: "present",
    totalHours: "8.5h"
  },
  {
    id: "2",
    employeeName: "Sarah Wilson",
    employeeId: "EMP002",
    checkIn: "09:15 AM",
    checkOut: "05:45 PM",
    device: "UFace 800 - Gate",
    location: "Service Station A",
    status: "late",
    totalHours: "8.5h"
  },
  {
    id: "3",
    employeeName: "Mike Johnson",
    employeeId: "EMP003",
    checkIn: "08:45 AM",
    device: "UFace 800 - Main",
    location: "Main Office",
    status: "partial",
    totalHours: "4.2h"
  },
  {
    id: "4",
    employeeName: "Emily Brown",
    employeeId: "EMP004",
    checkIn: "-",
    device: "-",
    location: "-",
    status: "absent"
  }
]

export function AttendanceTable() {
  const getStatusBadge = (status: AttendanceRecord['status']) => {
    const variants = {
      present: "bg-success/10 text-success border-success/20",
      late: "bg-warning/10 text-warning border-warning/20", 
      absent: "bg-destructive/10 text-destructive border-destructive/20",
      partial: "bg-blue-500/10 text-blue-600 border-blue-500/20"
    }
    
    const labels = {
      present: "Present",
      late: "Late",
      absent: "Absent", 
      partial: "Partial"
    }
    
    return (
      <Badge variant="outline" className={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  return (
    <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Today's Attendance
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead>Employee</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Device & Location</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {mockAttendanceData.map((record) => (
              <TableRow key={record.id} className="border-border/50 hover:bg-muted/30">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={record.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {record.employeeName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{record.employeeName}</div>
                      <div className="text-xs text-muted-foreground">{record.employeeId}</div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className={record.checkIn === "-" ? "text-muted-foreground" : "text-foreground"}>
                    {record.checkIn}
                  </span>
                </TableCell>
                
                <TableCell>
                  <span className={!record.checkOut ? "text-muted-foreground" : "text-foreground"}>
                    {record.checkOut || "In Progress"}
                  </span>
                </TableCell>
                
                <TableCell>
                  {record.device !== "-" ? (
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-xs">{record.device}</div>
                        <div className="text-xs text-muted-foreground">{record.location}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                
                <TableCell>
                  <span className={!record.totalHours ? "text-muted-foreground" : "font-medium"}>
                    {record.totalHours || "-"}
                  </span>
                </TableCell>
                
                <TableCell>
                  {getStatusBadge(record.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
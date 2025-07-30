import { Clock, Monitor, Timer, TrendingUp, UserCheck, Users } from "lucide-react"
import { DashboardCard } from "../components/DashboardCard"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { AttendanceTable } from "../components/AttendanceTable"

const DashboardPage = () => {
  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your attendance overview for today.
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Today</p>
            <p className="text-lg font-semibold text-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Employees"
            value={156}
            description="Active employees in system"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          
          <DashboardCard
            title="Present Today"
            value={142}
            description="91% attendance rate"
            icon={UserCheck}
            trend={{ value: 5, isPositive: true }}
          />
          
          <DashboardCard
            title="Late Arrivals"
            value={8}
            description="5% of total employees"
            icon={Timer}
            trend={{ value: 2, isPositive: false }}
          />
          
          <DashboardCard
            title="Active Devices"
            value={12}
            description="All devices online"
            icon={Monitor}
            trend={{ value: 0, isPositive: true }}
          />
        </div>

        {/* Quick Actions & Live Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AttendanceTable />
          </div>
          
          <div className="space-y-6">
            {/* Live Attendance */}
            <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Live Attendance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
                      <div>
                        <p className="font-medium text-sm">Alex Chen</p>
                        <p className="text-xs text-muted-foreground">Just checked in</p>
                      </div>
                    </div>
                    <span className="text-xs text-success font-medium">09:02 AM</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 bg-warning rounded-full animate-pulse" />
                      <div>
                        <p className="font-medium text-sm">Maria Garcia</p>
                        <p className="text-xs text-muted-foreground">Checked out</p>
                      </div>
                    </div>
                    <span className="text-xs text-warning font-medium">05:30 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-sm bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Hours</span>
                  <span className="font-semibold">8.2h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Late Arrivals</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Early Leaves</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Absentees</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}

export default DashboardPage
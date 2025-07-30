import { useState } from "react";
import { AttendanceTable } from "../components/AttendanceTable";
import { DashboardCard } from "../components/DashboardCard";
import { Button } from "../components/ui/button";
import { AlertTriangle, Clock, Filter, Search, TrendingUp, Users } from "lucide-react";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// const stats = [
//   { title: "Present Today", value: "142", icon: Users, trend: "+2%" },
//   {
//     title: "Average Check-in",
//     value: "8:54 AM",
//     icon: Clock,
//     trend: "On time",
//   },
//   { title: "Late Arrivals", value: "8", icon: AlertTriangle, trend: "-3%" },
//   {
//     title: "Attendance Rate",
//     value: "94.7%",
//     icon: TrendingUp,
//     trend: "+1.2%",
//   },
// ];

const AttendancePage = () => {
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);

  const handleManualEntry = (entryData: any) => {
    console.log("Manual entry saved:", entryData);
    // Here you would typically save to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Attendance</h1>
          <p className="text-muted-foreground">
            Real-time attendance monitoring and tracking
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="gap-2" onClick={() => setIsManualEntryOpen(true)}>
            <Clock className="h-4 w-4" />
            Manual Entry
          </Button>
        </div>
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-lg font-semibold">Today's Attendance</h2>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  className="pl-10 w-80"
                />
              </div>

              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all-departments">
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-departments">
                    All Departments
                  </SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <AttendanceTable />
      </div>

      {/* <ManualEntryDialog
        isOpen={isManualEntryOpen}
        onClose={() => setIsManualEntryOpen(false)}
        onSave={handleManualEntry}
      /> */}
    </div>
  );
};

export default AttendancePage;

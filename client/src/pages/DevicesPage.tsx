// import { Layout } from "@/components/Layout"
// import { DashboardCard } from "@/components/DashboardCard"
// import { DeviceConfigDialog } from "@/components/DeviceConfigDialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Monitor, Plus, Search, MoreHorizontal, Edit, Trash2, Settings, Wifi, WifiOff } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { DashboardCard } from "../components/DashboardCard"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { DeviceConfigDialog } from "../components/DeviceConfigDialog"

const dummyDevices = [
  { id: "DEV001", name: "Main Office Entrance", location: "Main Office - Floor 1", model: "UFace 800", ip: "192.168.1.100", status: "Online", lastSync: "2 minutes ago", employees: 45 },
  { id: "DEV002", name: "HR Department", location: "Main Office - Floor 2", model: "UFace 800", ip: "192.168.1.101", status: "Online", lastSync: "5 minutes ago", employees: 12 },
  { id: "DEV003", name: "Service Station A", location: "Downtown Branch", model: "UFace 800", ip: "192.168.2.100", status: "Offline", lastSync: "2 hours ago", employees: 28 },
  { id: "DEV004", name: "Service Station B", location: "Uptown Branch", model: "UFace 800", ip: "192.168.3.100", status: "Online", lastSync: "1 minute ago", employees: 18 },
  { id: "DEV005", name: "Warehouse Gate", location: "Warehouse Complex", model: "UFace 800", ip: "192.168.4.100", status: "Online", lastSync: "3 minutes ago", employees: 35 },
]

const stats = [
  { title: "Total Devices", value: "12", icon: Monitor, trend: "+2" },
  { title: "Online Devices", value: "10", icon: Wifi, trend: "83%" },
  { title: "Offline Devices", value: "2", icon: WifiOff, trend: "-1" },
  { title: "Enrolled Users", value: "138", icon: Monitor, trend: "+15" },
]

const DevicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    mode: 'add' | 'edit' | 'configure';
    device?: any;
  }>({ isOpen: false, mode: 'add' })

  const handleDeviceAction = (mode: 'add' | 'edit' | 'configure', device?: any) => {
    setDialogState({ isOpen: true, mode, device })
  }

  const handleSaveDevice = (deviceData: any) => {
    console.log('Saving device:', deviceData)
    // Here you would typically save to your backend
  }

  const filteredDevices = dummyDevices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ip.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
    <div className="flex justify-between items-center">
        <div>
        <h1 className="text-3xl font-bold tracking-tight">Device Management</h1>
        <p className="text-muted-foreground">Monitor and manage biometric devices across all locations</p>
        </div>
        
        <Button className="gap-2" onClick={() => handleDeviceAction('add')}>
        <Plus className="h-4 w-4" />
        Add Device
        </Button>
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
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Device Status</h2>
            <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search devices..."
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
            <TableHead>Device ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead className="w-[50px]"></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {filteredDevices.map((device) => (
            <TableRow key={device.id}>
                <TableCell className="font-medium">{device.id}</TableCell>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>{device.model}</TableCell>
                <TableCell className="font-mono text-sm">{device.ip}</TableCell>
                <TableCell>
                <Badge variant={device.status === "Online" ? "default" : "destructive"}>
                    {device.status}
                </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{device.lastSync}</TableCell>
                <TableCell>{device.employees}</TableCell>
                <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDeviceAction('configure', device)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeviceAction('edit', device)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Device
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Device
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
    
    <DeviceConfigDialog
        device={dialogState.device}
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ isOpen: false, mode: 'add' })}
        onSave={handleSaveDevice}
        mode={dialogState.mode}
    />
    </div>
  )
}

export default DevicesPage;
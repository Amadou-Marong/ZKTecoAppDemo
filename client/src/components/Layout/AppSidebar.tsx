import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Monitor, 
  Calendar, 
  BarChart3,
  Settings,
  Fingerprint
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Devices", url: "/devices", icon: Monitor },
  { title: "Attendance", url: "/attendance", icon: Clock },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

const getNavCls = ({ isActive }: { isActive: boolean }) => {
//   console.log("Active?", isActive) // TEMP: remove later
  return `flex items-center gap-3 py-2 rounded-lg transition-all duration-200 ${
    isActive
      ? "bg-blue-500 text-white"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  }`
}

return (
    <Sidebar className={collapsed ? "w-32" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Fingerprint className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold">ZKTeco System</h2>
              <p className="text-xs text-muted-foreground">Attendance Management</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-3">
            {!collapsed && "MAIN MENU"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) => getNavCls({ isActive })}
                    >
                        <SidebarMenuButton asChild>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200">
                            <item.icon className="h-8 w-8 flex-shrink-0" />
                            {!collapsed && <span className="font-medium">{item.title}</span>}
                        </div>
                        </SidebarMenuButton>
                    </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
export default AppSidebar
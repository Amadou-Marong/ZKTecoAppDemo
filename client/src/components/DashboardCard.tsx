import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { cn } from "@/lib/utils"


interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: string | {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function DashboardCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  className 
}: DashboardCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-200 hover:shadow-lg border bg-white shadow-sm",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          {trend && (
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              typeof trend === 'string'
                ? "text-primary bg-primary/10"
                : trend.isPositive 
                ? "text-success bg-success/10" 
                : "text-destructive bg-destructive/10"
            )}>
              {typeof trend === 'string' ? trend : `${trend.isPositive ? "+" : ""}${trend.value}%`}
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 pointer-events-none" />
    </Card>
  )
}
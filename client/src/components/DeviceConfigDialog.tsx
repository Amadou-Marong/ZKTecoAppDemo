import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface Device {
  id: string;
  name: string;
  location: string;
  model: string;
  ip: string;
  status: string;
  lastSync: string;
  employees: number;
  port?: string;
  enabled?: boolean;
  autoSync?: boolean;
  syncInterval?: number;
  maxUsers?: number;
  voicePrompts?: boolean;
  fingerprintQuality?: string;
}

interface DeviceConfigDialogProps {
  device?: Device;
  isOpen: boolean;
  onClose: () => void;
  onSave: (device: any) => void;
  mode: 'add' | 'edit' | 'configure';
}

export function DeviceConfigDialog({ device, isOpen, onClose, onSave, mode }: DeviceConfigDialogProps) {
  const [formData, setFormData] = useState(device || {
    name: '',
    location: '',
    model: 'uface800',
    ip: '',
    port: '4370',
    enabled: true,
    autoSync: true,
    syncInterval: 5,
    maxUsers: 1000,
    // voicePrompts: true,
    // fingerprintQuality: 'high'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const getTitle = () => {
    switch (mode) {
      case 'add': return 'Add New Device';
      case 'edit': return 'Edit Device';
      case 'configure': return 'Configure Device';
      default: return 'Device Settings';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Device Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter device name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="model">Device Model</Label>
                <Select value={formData.model} onValueChange={(value) => setFormData({ ...formData, model: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uface800">ZKTeco UFace 800</SelectItem>
                    <SelectItem value="uface900">ZKTeco UFace 900</SelectItem>
                    <SelectItem value="speedface-v5l">SpeedFace-V5L</SelectItem>
                    <SelectItem value="f18">ZKTeco F18</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxUsers">Maximum Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  value={formData.maxUsers}
                  onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) })}
                  placeholder="1000"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="network" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ip">IP Address</Label>
                  <Input
                    id="ip"
                    value={formData.ip}
                    onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                    placeholder="192.168.1.100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                    placeholder="4370"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync attendance data
                    </p>
                  </div>
                  <Switch
                    checked={formData.autoSync}
                    onCheckedChange={(checked) => setFormData({ ...formData, autoSync: checked })}
                  />
                </div>
                
                {formData.autoSync && (
                  <div className="space-y-2">
                    <Label htmlFor="syncInterval">Sync Interval (minutes)</Label>
                    <Select 
                      value={formData.syncInterval?.toString()} 
                      onValueChange={(value) => setFormData({ ...formData, syncInterval: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Device Enabled</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable this device
                    </p>
                  </div>
                  <Switch
                    checked={formData.enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
                  />
                </div>
                
                {/* <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Voice Prompts</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable voice guidance on device
                    </p>
                  </div>
                  <Switch
                    checked={formData.voicePrompts}
                    onCheckedChange={(checked) => setFormData({ ...formData, voicePrompts: checked })}
                  />
                </div> */}
                
                {/* <div className="space-y-2">
                  <Label>Fingerprint Quality</Label>
                  <Select 
                    value={formData.fingerprintQuality} 
                    onValueChange={(value) => setFormData({ ...formData, fingerprintQuality: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
              
              {device && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Device Status</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={device.status === 'Online' ? 'default' : 'destructive'} className="ml-2">
                        {device.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Sync:</span>
                      <span className="ml-2">{device.lastSync}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Enrolled Users:</span>
                      <span className="ml-2">{device.employees}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Device ID:</span>
                      <span className="ml-2 font-mono">{device.id}</span>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'add' ? 'Add Device' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
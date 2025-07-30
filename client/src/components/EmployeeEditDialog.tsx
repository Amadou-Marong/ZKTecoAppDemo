import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Switch } from './ui/switch';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// import { Textarea } from './ui/textarea';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  shift: string;
  status: string;
  enrolledDevices: number;
  staffId?: string;
  email?: string;
  phone?: string;
  joiningDate?: string;
  address?: string;
  emergencyContact?: string;
  notes?: string;
  fingerprintEnrolled?: boolean;
  faceEnrolled?: boolean;
}

interface EmployeeEditDialogProps {
  employee?: Employee;
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: any) => void;
  mode: 'add' | 'edit' | 'view';
}

export function EmployeeEditDialog({ employee, isOpen, onClose, onSave, mode }: EmployeeEditDialogProps) {
  const [formData, setFormData] = useState(employee || {
    name: '',
    staffId: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    shift: 'morning',
    status: 'Active',
    joiningDate: '',
    address: '',
    emergencyContact: '',
    notes: '',
    fingerprintEnrolled: false,
    faceEnrolled: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const getTitle = () => {
    switch (mode) {
      case 'add': return 'Add New Employee';
      case 'edit': return 'Edit Employee';
      case 'view': return 'Employee Details';
      default: return 'Employee Information';
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="work">Work Details</TabsTrigger>
              <TabsTrigger value="biometric">Biometric</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staffId">Staff ID</Label>
                  <Input
                    id="staffId"
                    value={formData.staffId}
                    onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                    placeholder="Enter staff ID"
                    required
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter email address"
                    readOnly={isReadOnly}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter phone number"
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter full address"
                  readOnly={isReadOnly}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="work" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Enter job position"
                    readOnly={isReadOnly}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shift">Work Shift</Label>
                  <Select 
                    value={formData.shift} 
                    onValueChange={(value) => setFormData({ ...formData, shift: value })}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9:00 AM - 5:00 PM)</SelectItem>
                      <SelectItem value="evening">Evening (2:00 PM - 10:00 PM)</SelectItem>
                      <SelectItem value="night">Night (10:00 PM - 6:00 AM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Employment Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="joiningDate">Joining Date</Label>
                <Input
                  id="joiningDate"
                  type="date"
                  value={formData.joiningDate}
                  onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                  readOnly={isReadOnly}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes or comments"
                  readOnly={isReadOnly}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="biometric" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Fingerprint Enrolled</Label>
                    <p className="text-sm text-muted-foreground">
                      Fingerprint biometric data enrolled
                    </p>
                  </div>
                  <Switch
                    checked={formData.fingerprintEnrolled}
                    onCheckedChange={(checked) => setFormData({ ...formData, fingerprintEnrolled: checked })}
                    disabled={isReadOnly}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Face Recognition Enrolled</Label>
                    <p className="text-sm text-muted-foreground">
                      Face recognition data enrolled
                    </p>
                  </div>
                  <Switch
                    checked={formData.faceEnrolled}
                    onCheckedChange={(checked) => setFormData({ ...formData, faceEnrolled: checked })}
                    disabled={isReadOnly}
                  />
                </div>
              </div>
              
              {employee && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Enrollment Status</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Enrolled Devices:</span>
                        <Badge variant="secondary">{employee.enrolledDevices}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Access Level:</span>
                        <Badge variant="default">Standard</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Update:</span>
                        <span>2 hours ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sync Status:</span>
                        <Badge variant="default">Synced</Badge>
                      </div>
                    </div>
                  </div>
                  
                  {!isReadOnly && (
                    <div className="mt-4 flex gap-2">
                      <Button type="button" variant="outline" size="sm">
                        Enroll Fingerprint
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Enroll Face
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Sync to Devices
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Textarea
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  placeholder="Emergency contact name, relationship, and phone number"
                  readOnly={isReadOnly}
                />
              </div>
              
              {employee && (
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Contact History</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span>Email sent: Welcome package</span>
                      <span className="text-muted-foreground">2 days ago</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/50 rounded">
                      <span>SMS sent: Shift reminder</span>
                      <span className="text-muted-foreground">1 week ago</span>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              {isReadOnly ? 'Close' : 'Cancel'}
            </Button>
            {!isReadOnly && (
              <Button type="submit">
                {mode === 'add' ? 'Add Employee' : 'Save Changes'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeEditDialog
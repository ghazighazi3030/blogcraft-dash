import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Shield,
  Mail,
  Calendar,
  User
} from "lucide-react";

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-08-15",
    lastLogin: "2024-01-15",
    postsCount: 24,
    avatar: null
  },
  {
    id: 2,
    name: "Mike Chen", 
    email: "mike.chen@example.com",
    role: "editor",
    status: "active", 
    joinDate: "2023-09-20",
    lastLogin: "2024-01-14",
    postsCount: 18,
    avatar: null
  },
  {
    id: 3,
    name: "Alex Kumar",
    email: "alex.kumar@example.com", 
    role: "author",
    status: "active",
    joinDate: "2023-10-05",
    lastLogin: "2024-01-13",
    postsCount: 12,
    avatar: null
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    role: "reader",
    status: "inactive",
    joinDate: "2023-11-12",
    lastLogin: "2023-12-20",
    postsCount: 0,
    avatar: null
  }
];

const roleColors = {
  admin: "bg-destructive/10 text-destructive",
  editor: "bg-primary/10 text-primary", 
  author: "bg-accent/10 text-accent",
  reader: "bg-muted text-muted-foreground"
};

const statusColors = {
  active: "bg-success/10 text-success",
  inactive: "bg-warning/10 text-warning",
  suspended: "bg-destructive/10 text-destructive"
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="mt-2 text-muted-foreground">Manage user accounts, roles, and permissions.</p>
        </div>
        <Button className="mt-4 sm:mt-0" size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-foreground">{users.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-success/10 rounded-lg">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold text-foreground">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Edit className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Authors</p>
              <p className="text-2xl font-bold text-foreground">
                {users.filter(u => u.role === 'author' || u.role === 'editor' || u.role === 'admin').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Mail className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
              <option value="reader">Reader</option>
            </select>
            
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30 border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-foreground">User</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Role</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Join Date</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Posts</th>
                <th className="text-right py-4 px-6 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-secondary/20 transition-custom">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={roleColors[user.role as keyof typeof roleColors]}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={statusColors[user.status as keyof typeof statusColors]}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {user.joinDate}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm font-medium text-foreground">{user.postsCount}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
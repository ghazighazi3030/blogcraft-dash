import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Plus,
  ArrowUpRight,
  Calendar,
  Clock
} from "lucide-react";

const statsCards = [
  {
    title: "Total Posts",
    value: "247",
    change: "+12%",
    changeType: "positive" as const,
    icon: FileText,
    href: "/posts"
  },
  {
    title: "Total Users",
    value: "1,429",
    change: "+5%",
    changeType: "positive" as const,
    icon: Users,
    href: "/users"
  },
  {
    title: "Comments",
    value: "2,847",
    change: "-2%",
    changeType: "negative" as const,
    icon: MessageSquare,
    href: "/comments"
  },
  {
    title: "Total Views",
    value: "89,429",
    change: "+18%",
    changeType: "positive" as const,
    icon: Eye,
    href: "/analytics"
  }
];

const recentPosts = [
  {
    title: "Getting Started with React 18",
    status: "published",
    author: "Sarah Johnson",
    date: "2 hours ago",
    views: 1249
  },
  {
    title: "Advanced TypeScript Techniques",
    status: "draft",
    author: "Mike Chen",
    date: "5 hours ago",
    views: 0
  },
  {
    title: "Building Modern Web Apps",
    status: "published",
    author: "Alex Kumar", 
    date: "1 day ago",
    views: 2847
  },
  {
    title: "CSS Grid Layout Guide",
    status: "scheduled",
    author: "Emma Wilson",
    date: "Tomorrow",
    views: 0
  }
];

const quickActions = [
  { title: "New Post", icon: FileText, href: "/posts/new", color: "primary" },
  { title: "Add User", icon: Users, href: "/users/new", color: "secondary" },
  { title: "View Analytics", icon: TrendingUp, href: "/analytics", color: "accent" }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome back! Here's what's happening with your blog.</p>
        </div>
        <Button className="mt-4 sm:mt-0" size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 hover-lift cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-custom" />
              </div>
              <div className="mt-4 flex items-center">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">from last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Posts */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Recent Posts</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-custom">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground hover:text-primary cursor-pointer transition-custom">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <span>by {post.author}</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.date}
                      </div>
                      {post.views > 0 && (
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {post.views.toLocaleString()} views
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    post.status === 'published' 
                      ? 'bg-success/10 text-success' 
                      : post.status === 'draft'
                      ? 'bg-warning/10 text-warning'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button 
                    key={action.title}
                    variant={action.color === 'primary' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    size="lg"
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {action.title}
                  </Button>
                );
              })}
            </div>
          </Card>

          {/* Activity Summary */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Today's Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New comments</span>
                <span className="text-sm font-medium text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Page views</span>
                <span className="text-sm font-medium text-foreground">2,847</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New users</span>
                <span className="text-sm font-medium text-foreground">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Published posts</span>
                <span className="text-sm font-medium text-foreground">3</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
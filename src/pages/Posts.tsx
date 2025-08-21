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
  Eye,
  Calendar,
  User
} from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Getting Started with React 18",
    slug: "getting-started-react-18",
    author: "Sarah Johnson",
    status: "published",
    category: "Development",
    tags: ["React", "JavaScript", "Frontend"],
    publishDate: "2024-01-15",
    views: 1249,
    comments: 23
  },
  {
    id: 2,
    title: "Advanced TypeScript Techniques",
    slug: "advanced-typescript-techniques",
    author: "Mike Chen",
    status: "draft",
    category: "Programming",
    tags: ["TypeScript", "JavaScript"],
    publishDate: null,
    views: 0,
    comments: 0
  },
  {
    id: 3,
    title: "Building Modern Web Apps",
    slug: "building-modern-web-apps",
    author: "Alex Kumar",
    status: "published", 
    category: "Development",
    tags: ["Web Development", "Modern", "Apps"],
    publishDate: "2024-01-14",
    views: 2847,
    comments: 45
  },
  {
    id: 4,
    title: "CSS Grid Layout Guide",
    slug: "css-grid-layout-guide",
    author: "Emma Wilson",
    status: "scheduled",
    category: "Design",
    tags: ["CSS", "Layout", "Grid"],
    publishDate: "2024-01-20",
    views: 0,
    comments: 0
  }
];

const statusColors = {
  published: "bg-success/10 text-success",
  draft: "bg-warning/10 text-warning",
  scheduled: "bg-accent/10 text-accent",
  archived: "bg-muted text-muted-foreground"
};

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Posts</h1>
          <p className="mt-2 text-muted-foreground">Manage your blog posts and content.</p>
        </div>
        <Button className="mt-4 sm:mt-0" size="lg">
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search posts, authors, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Status
            </Button>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-custom"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Posts Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/30 border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-foreground">Title</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Author</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Category</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Date</th>
                <th className="text-left py-4 px-6 font-medium text-foreground">Performance</th>
                <th className="text-right py-4 px-6 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-b-0 hover:bg-secondary/20 transition-custom">
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-medium text-foreground hover:text-primary cursor-pointer transition-custom">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">/{post.slug}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-foreground">{post.author}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge className={statusColors[post.status as keyof typeof statusColors]}>
                      {post.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted-foreground">{post.category}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.publishDate || "Not scheduled"}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Eye className="h-4 w-4 mr-2" />
                        {post.views.toLocaleString()} views
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {post.comments} comments
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
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
          Showing {filteredPosts.length} of {posts.length} posts
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
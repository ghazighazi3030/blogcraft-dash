import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Eye, MessageSquare, Tag } from "lucide-react";
import { getAllPosts } from "@/lib/mockData";

export default function BlogTagPage() {
  const { slug } = useParams();
  const allPosts = getAllPosts();
  
  // Filter posts by tag
  const tagPosts = allPosts.filter(post => 
    post.tags.some(tag => tag.slug === slug)
  );

  // Get tag name from first post that has this tag
  const tagName = tagPosts.length > 0 
    ? tagPosts[0].tags.find(tag => tag.slug === slug)?.name 
    : slug?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (tagPosts.length === 0) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Tag Not Found</h1>
        <p className="text-muted-foreground">No posts found with the tag "{tagName}".</p>
        <Link to="/blog">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link to="/blog">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </Link>

      {/* Tag Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Tag className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">#{tagName}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Posts tagged with "{tagName}"
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm">
          {tagPosts.length} post{tagPosts.length !== 1 ? 's' : ''} found
        </Badge>
      </div>

      {/* Posts Grid */}
      <div className="space-y-6">
        {tagPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover-lift">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="relative h-48 md:h-full">
                <img
                  src={post.featuredImageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:col-span-2 p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{post.category.name}</Badge>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors">
                    <Link to={`/blog/post/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {/* All Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link key={tag.slug} to={`/blog/tag/${tag.slug}`}>
                        <Badge 
                          variant={tag.slug === slug ? "default" : "outline"} 
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {tag.name}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.commentsCount}</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/post/${post.slug}`}>
                      <Button>
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Related Tags */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-accent/10">
        <h3 className="text-lg font-semibold text-foreground mb-4">Related Tags</h3>
        <div className="flex flex-wrap gap-2">
          {["Championship", "Victory", "Transfer", "Training", "Youth Academy", "Match Report"].map((tag) => (
            <Link key={tag} to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
              <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
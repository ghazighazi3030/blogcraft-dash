import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Eye, MessageSquare, FileText } from "lucide-react";
import { getAllPosts } from "@/lib/mockData";

export default function BlogSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const allPosts = getAllPosts();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = allPosts.filter(post => {
        const searchTerm = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.category.name.toLowerCase().includes(searchTerm) ||
          post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm)) ||
          post.author.name.toLowerCase().includes(searchTerm)
        );
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      performSearch(searchQuery.trim());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Search Posts</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find articles, match reports, and stories from the ASA Sports blog.
        </p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for posts, categories, tags, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg"
            />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2"
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Search Results for "{searchQuery}"
            </h2>
            <Badge variant="secondary">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </Badge>
          </div>

          {isSearching ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid gap-6">
              {searchResults.map((post) => (
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
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <Badge variant="secondary">{post.category.name}</Badge>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                          <Link to={`/blog/post/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        
                        <p className="text-muted-foreground">
                          {post.excerpt}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag.slug} variant="outline" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{post.author.name}</span>
                            </div>
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
                            <Button variant="ghost" size="sm">
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
          ) : (
            <Card className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                No posts match your search for "{searchQuery}". Try different keywords or browse our categories.
              </p>
              <Link to="/blog/categories">
                <Button variant="outline">
                  Browse Categories
                </Button>
              </Link>
            </Card>
          )}
        </div>
      )}

      {/* Popular Searches */}
      {!searchQuery && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {["Championship", "Transfer", "Training", "Youth Academy", "Match Report", "Victory"].map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery(term);
                  setSearchParams({ q: term });
                  performSearch(term);
                }}
              >
                {term}
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
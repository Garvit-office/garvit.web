import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, ArrowRight, Code, Zap, Lightbulb, Heart, MessageCircle, Share2, X, Send, ImagePlus, Trash2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Typewriter } from "@/components/Typewriter";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { useSound } from "@/hooks/useSound";

interface Post {
  id: string;
  content: string;
  images: string[];
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  comments_list?: Array<{ id: string; visitorName: string; text: string; timestamp: string }>;
  likes_by?: string[];
}

const API_URL = "http://localhost:3001/api";

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  const { playSound } = useSound();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [newImages, setNewImages] = useState<string[]>([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cgpa, setCgpa] = useState(() => {
    const saved = localStorage.getItem("userCgpa");
    return saved ? parseFloat(saved) : 8.66;
  });

  // Projects count
  const projectsCount = 3;

  // Poems count (from Poetry.tsx data)
  const poemsCount = 3;

  // Save CGPA to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userCgpa", cgpa.toString());
  }, [cgpa]);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setNewImages(prev => [...prev, event.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPost = async () => {
    if (!newPost.trim() && newImages.length === 0) {
      toast.error("Please write something or add an image");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newPost,
          images: newImages
        })
      });

      const data = await response.json();
      if (data.success) {
        playSound('success');
        setPosts([data.post, ...posts]);
        setNewPost("");
        setNewImages([]);
        setShowPostForm(false);
        toast.success("Post published!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to publish post");
    }
  };

  const handleLike = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => 
          post.id === id ? data.post : post
        ));
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  const handleVisitorLike = async (id: string, visitorName: string) => {
    try {
      playSound('like');
      const response = await fetch(`${API_URL}/posts/${id}/visitor-like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorName })
      });

      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => 
          post.id === id ? { ...post, likes: data.likes } : post
        ));
        toast.success(`Thanks for liking, ${visitorName}!`);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  const handleVisitorComment = async (id: string, visitorName: string, commentText: string) => {
    try {
      playSound('comment');
      const response = await fetch(`${API_URL}/posts/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorName, commentText })
      });

      const data = await response.json();
      if (data.success) {
        setPosts(posts.map(post => 
          post.id === id ? { ...post, comments: post.comments + 1 } : post
        ));
        toast.success(`Thanks for commenting, ${visitorName}!`);
      }
    } catch (error) {
      console.error("Error commenting on post:", error);
      toast.error("Failed to post comment");
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (data.success) {
        setPosts(posts.filter(post => post.id !== id));
        toast.success("Post deleted!");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="min-h-screen md:min-h-[70vh] flex items-center justify-center px-3 md:px-4 py-12 md:py-20 border-b border-border">
        <div className="container mx-auto w-full max-w-full md:max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Badge className="mb-3 md:mb-4 gradient-primary text-white border-0 rounded-full px-3 md:px-4 text-xs md:text-sm">
                Open to Opportunities
              </Badge>
              
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
                Hi, I'm
                <br />
                <span className="inline-block" style={{ background: 'linear-gradient(135deg, hsl(280 100% 60%) 0%, hsl(270 100% 60%) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <Typewriter text="Garvit Chawla" speed={100} />
                </span>
              </h1>
              
              <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-xl">
                A Developer Under Development 🚀
              </p>
              
              <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-8">
                <Link to="/projects" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto gradient-primary text-white rounded-full neon-glow text-sm md:text-base">
                    View Projects
                    <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </Link>
                <Link to="/poetry" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-2 text-sm md:text-base">
                    Read Poetry
                  </Button>
                </Link>
              </div>
              
              <div className="flex gap-2 md:gap-3">
                <a href="https://github.com/garvit0080" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12">
                    <Github className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
                <a href="https://linkedin.com/in/garvit-chawla" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12">
                    <Linkedin className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
                <a href="mailto:garvitchawla.office@gmail.com">
                  <Button size="icon" variant="outline" className="rounded-full h-10 w-10 md:h-12 md:w-12">
                    <Mail className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="flex flex-col gap-3 md:gap-6">
                {/* Card 1 - Development */}
                <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-accent/30 hover:border-accent/60 transition-all w-full cursor-pointer">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-primary to-accent rounded-lg md:rounded-2xl flex-shrink-0">
                      <Code className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base md:text-lg mb-1">Full Stack Developer</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">MERN Stack Expert</p>
                    </div>
                  </div>
                </Card>

                {/* Card 2 - Innovation */}
                <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-accent/30 hover:border-accent/60 transition-all w-full cursor-pointer">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-accent to-primary rounded-lg md:rounded-2xl flex-shrink-0">
                      <Lightbulb className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base md:text-lg mb-1">Innovation Focused</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Creative Problem Solver</p>
                    </div>
                  </div>
                </Card>

                {/* Card 3 - Performance */}
                <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 border-accent/30 hover:border-accent/60 transition-all w-full cursor-pointer">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gradient-to-br from-secondary to-accent rounded-lg md:rounded-2xl flex-shrink-0">
                      <Zap className="h-5 md:h-6 w-5 md:w-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base md:text-lg mb-1">Performance Driven</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Optimized & Scalable Code</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="py-8 md:py-12 px-3 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-2xl px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
              My <span className="inline-block text-gradient">Feed</span>
            </h2>

            {/* Post Creation Card */}
            <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl mb-6 md:mb-8">
              {!showPostForm ? (
                <div
                  className="flex items-center gap-3 cursor-pointer hover:bg-muted/20 p-2 md:p-3 rounded-2xl transition-colors"
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginModal(true);
                    } else {
                      setShowPostForm(true);
                    }
                  }}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-full flex-shrink-0" />
                  <input
                    type="text"
                    placeholder={isAuthenticated ? "What's on your mind?" : "Login to post..."}
                    className="flex-1 bg-transparent text-xs md:text-base text-muted-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                    readOnly
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full bg-muted/30 rounded-2xl p-3 md:p-4 focus:outline-none border border-border/50 focus:border-primary resize-none min-h-20 md:min-h-24 text-sm md:text-base"
                  />

                  {/* Image Preview */}
                  {newImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                      {newImages.map((img, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden group">
                          <img
                            src={img}
                            alt={`Preview ${idx}`}
                            className="w-full h-24 md:h-32 object-cover"
                          />
                          <button
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Trash2 className="h-4 md:h-5 w-4 md:w-5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Area */}
                  <label className="flex items-center justify-center w-full p-3 md:p-4 border-2 border-dashed border-border/50 rounded-2xl cursor-pointer hover:bg-muted/20 transition-colors group">
                    <div className="flex flex-col items-center gap-2">
                      <ImagePlus className="h-5 md:h-6 w-5 md:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="text-xs md:text-sm text-muted-foreground">Click to add photos</span>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="rounded-full text-xs md:text-sm"
                      onClick={() => {
                        setShowPostForm(false);
                        setNewPost("");
                        setNewImages([]);
                      }}
                    >
                      <X className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                      Cancel
                    </Button>
                    <Button
                      className="gradient-primary text-white rounded-full text-xs md:text-sm"
                      onClick={handleAddPost}
                      disabled={!newPost.trim() && newImages.length === 0}
                    >
                      <Send className="h-3 md:h-4 w-3 md:w-4 mr-1 md:mr-2" />
                      Post
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Posts Feed */}
            <div className="space-y-4 md:space-y-6">
              {posts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="glass p-4 md:p-6 rounded-2xl md:rounded-3xl hover:shadow-lg transition-all">
                    <div className="flex gap-3 md:gap-4 mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary to-accent rounded-full flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm md:text-base">Garvit Chawla</h4>
                            <p className="text-xs text-muted-foreground">@garvit_dev • {post.timestamp}</p>
                          </div>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                            title="Delete post"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                      {post.content}
                    </p>

                    {/* Images Grid */}
                    {post.images.length > 0 && (
                      <div className={`grid gap-2 md:gap-3 mb-4 md:mb-6 ${
                        post.images.length === 1 ? 'grid-cols-1' :
                        post.images.length === 2 ? 'grid-cols-2' :
                        post.images.length === 3 ? 'grid-cols-3' :
                        post.images.length === 4 ? 'grid-cols-2' : 'grid-cols-2'
                      }`}>
                        {post.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Post image ${idx}`}
                            className="w-full h-auto rounded-xl object-cover max-h-80"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between text-muted-foreground border-t border-border/30 pt-3 md:pt-4 text-sm gap-2">
                      <button
                        onClick={() => {
                          if (isAuthenticated) {
                            handleLike(post.id);
                          } else {
                            const visitorName = prompt("Enter your name to like this post:");
                            if (visitorName) handleVisitorLike(post.id, visitorName);
                          }
                        }}
                        className={`flex items-center gap-1 md:gap-2 hover:text-primary transition-colors group flex-1 justify-center`}
                      >
                        <Heart className={`h-4 md:h-5 w-4 md:w-5 transition-all`} />
                        <span className="text-xs md:text-sm">{post.likes}</span>
                      </button>
                      <button
                        onClick={() => {
                          const visitorName = prompt("Enter your name to leave a comment:");
                          if (visitorName) {
                            const commentText = prompt("Your comment:");
                            if (commentText) handleVisitorComment(post.id, visitorName, commentText);
                          }
                        }}
                        className="flex items-center gap-1 md:gap-2 hover:text-primary transition-colors group flex-1 justify-center"
                      >
                        <MessageCircle className="h-4 md:h-5 w-4 md:w-5" />
                        <span className="text-xs md:text-sm">{post.comments}</span>
                      </button>
                      <div className="flex items-center gap-1 md:gap-2 hover:text-primary transition-colors cursor-pointer group flex-1 justify-center">
                        <Share2 className="h-4 md:h-5 w-4 md:w-5" />
                      </div>
                    </div>

                    {/* Comments Section */}
                    {post.comments_list && post.comments_list.length > 0 && (
                      <div className="mt-4 md:mt-6 border-t border-border/30 pt-4 space-y-3">
                        <h4 className="text-sm font-semibold text-muted-foreground">Comments ({post.comments})</h4>
                        {post.comments_list.map((comment) => (
                          <div key={comment.id} className="bg-muted/30 rounded-lg p-3 text-sm">
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <p className="font-semibold text-primary">{comment.visitorName}</p>
                                <p className="text-muted-foreground mt-1">{comment.text}</p>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground/70 mt-2">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Visitor Likes Display */}
                    {post.likes_by && post.likes_by.length > 0 && (
                      <div className="mt-3 md:mt-4 pt-3 border-t border-border/30">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">{post.likes_by.slice(0, 2).join(', ')}</span>
                          {post.likes_by.length > 2 && ` and ${post.likes_by.length - 2} others`} liked this
                        </p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 px-3 md:px-4 border-t border-border">
        <div className="container mx-auto w-full max-w-full md:max-w-4xl px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-6 text-center">
              About <span className="inline-block text-gradient">Me</span>
            </h2>
            
            <Card className="glass p-4 md:p-8 rounded-2xl md:rounded-3xl">
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 md:mb-6">
                I'm a passionate computer science student at Chitkara University with a deep interest in 
                artificial intelligence and full-stack development. When I'm not coding, I express myself 
                through poetry and creative writing.
              </p>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {/* CGPA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-muted/30 rounded-xl md:rounded-2xl"
                >
                  <p className="text-xl md:text-3xl font-bold inline-block text-gradient mb-1 md:mb-2">
                    {cgpa.toFixed(2)}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">CGPA</p>
                </motion.div>

                {/* Projects Count */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-muted/30 rounded-xl md:rounded-2xl"
                >
                  <p className="text-xl md:text-3xl font-bold inline-block text-gradient mb-1 md:mb-2">
                    {projectsCount}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">Projects</p>
                </motion.div>

                {/* Poems Count */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-3 md:p-4 bg-muted/30 rounded-xl md:rounded-2xl"
                >
                  <p className="text-xl md:text-3xl font-bold inline-block text-gradient mb-1 md:mb-2">
                    {poemsCount}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">Poems</p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Auth Status & Logout */}
      {isAuthenticated && (
        <div className="fixed bottom-6 right-6 z-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-primary to-accent p-1 rounded-full"
          >
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="bg-background rounded-full flex items-center gap-2"
            >
              <span className="text-xs md:text-sm">Logout</span>
              <LogOut className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Home;
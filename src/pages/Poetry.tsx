import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, MessageCircle, Share2, Trash2, Plus, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { useSound } from "@/hooks/useSound";

interface Poem {
  id: string;
  title: string;
  category: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  comments_list?: Array<{ id: string; visitorName: string; text: string; timestamp: string }>;
  likes_by?: string[];
}

const API_URL = "http://localhost:3001/api";

const getVisitorName = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/ip');
    const data = await response.json();
    return `Visitor_${data.ip.split('.').slice(-2).join('_')}`;
  } catch {
    return `Visitor_${Math.random().toString(36).substring(7)}`;
  }
};

const Poetry = () => {
  const { isAuthenticated, logout } = useAuth();
  const { playSound } = useSound();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [newPoem, setNewPoem] = useState("");
  const [newCategory, setNewCategory] = useState("Life");
  const [newTitle, setNewTitle] = useState("");
  const [showPoemForm, setShowPoemForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch poems on mount
  useEffect(() => {
    fetchPoems();
  }, []);

  const fetchPoems = async () => {
    try {
      const response = await fetch(`${API_URL}/poems`);
      if (response.ok) {
        const data = await response.json();
        setPoems(data);
      }
    } catch (error) {
      console.error("Error fetching poems:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPoem = async () => {
    if (!newPoem.trim() || !newTitle.trim()) {
      toast.error("Please enter both title and poem content");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/poems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          category: newCategory,
          content: newPoem
        })
      });

      const data = await response.json();
      if (data.success) {
        playSound('success');
        setPoems([data.poem, ...poems]);
        setNewPoem("");
        setNewTitle("");
        setNewCategory("Life");
        setShowPoemForm(false);
        toast.success("Poem posted successfully!");
      }
    } catch (error) {
      console.error("Error posting poem:", error);
      toast.error("Failed to post poem");
    }
  };

  const handleDeletePoem = async (id: string) => {
    try {
      playSound('click');
      const response = await fetch(`${API_URL}/poems/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (data.success) {
        setPoems(poems.filter(poem => poem.id !== id));
        toast.success("Poem deleted!");
      }
    } catch (error) {
      console.error("Error deleting poem:", error);
      toast.error("Failed to delete poem");
    }
  };

  const handleVisitorLike = async (id: string, visitorName: string) => {
    try {
      playSound('like');
      const response = await fetch(`${API_URL}/poems/${id}/visitor-like`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorName })
      });

      const data = await response.json();
      if (data.success) {
        setPoems(poems.map(poem => 
          poem.id === id ? { ...poem, likes: data.likes } : poem
        ));
        toast.success(`Thanks for liking, ${visitorName}!`);
      }
    } catch (error) {
      console.error("Error liking poem:", error);
      toast.error("Failed to like poem");
    }
  };

  const handleVisitorComment = async (id: string, visitorName: string, commentText: string) => {
    try {
      playSound('comment');
      const response = await fetch(`${API_URL}/poems/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorName, commentText })
      });

      const data = await response.json();
      if (data.success) {
        setPoems(poems.map(poem => 
          poem.id === id ? { ...poem, comments: poem.comments + 1 } : poem
        ));
        toast.success(`Thanks for commenting, ${visitorName}!`);
      }
    } catch (error) {
      console.error("Error commenting on poem:", error);
      toast.error("Failed to post comment");
    }
  };

  const defaultPoems: Poem[] = [
    {
      id: "1",
      title: "Digital Dreams",
      category: "Technology",
      content: `In circuits deep and code so bright,
Where algorithms dance through the night,
I find my voice in binary streams,
A poet lost in digital dreams.

The cursor blinks, a heartbeat's pace,
As words emerge from cyberspace,
Each keystroke echoes thoughts untold,
In languages both new and old.`,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      likes: 42,
      comments: 3
    },
    {
      id: "2",
      title: "Midnight Musings",
      category: "Life",
      content: `The moon hangs low, a silver thread,
Weaving tales that must be said,
In silence deep, the world asleep,
My thoughts run wild, emotions deep.

Stars whisper secrets to the night,
Painting dreams in pale moonlight,
And in this hour, quiet and still,
I find the strength to climb each hill.`,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      likes: 38,
      comments: 2
    },
    {
      id: "3",
      title: "Code and Coffee",
      category: "Student Life",
      content: `Morning breaks with coffee's steam,
Debugging last night's broken dream,
Lines of code and syntax errors,
Fighting bugs like modern warriors.

Deadlines loom, assignments wait,
But caffeine keeps me up 'til late,
Between the semicolons lost,
I calculate success's cost.`,
      timestamp: new Date(Date.now() - 259200000).toISOString(),
      likes: 56,
      comments: 5
    }
  ];

  const displayPoems = poems.length > 0 ? poems : defaultPoems;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-center flex-1">
              My <span className="inline-block text-gradient">Poetry</span>
            </h1>
            {isAuthenticated && (
              <button
                onClick={() => setShowLoginModal(false)}
                className="fixed bottom-6 right-6 p-3 rounded-full bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary transition-all shadow-lg z-40"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-white" />
              </button>
            )}
          </div>
          
          <p className="text-muted-foreground text-center mb-12 text-lg">
            Where code meets verse, and logic meets emotion
          </p>

          {/* Poem Form - Admin Only */}
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Card className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl">
                {!showPoemForm ? (
                  <button
                    onClick={() => setShowPoemForm(true)}
                    className="w-full flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Plus className="h-5 w-5 group-hover:text-primary transition-colors" />
                    <span>Share a new poem...</span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Poem title..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-transparent border-b border-border/30 pb-2 text-lg focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground"
                    />
                    
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-muted/30 border border-border/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option>Technology</option>
                      <option>Life</option>
                      <option>Student Life</option>
                      <option>Love</option>
                      <option>Nature</option>
                      <option>Other</option>
                    </select>

                    <textarea
                      placeholder="Write your poem..."
                      value={newPoem}
                      onChange={(e) => setNewPoem(e.target.value)}
                      className="w-full h-40 bg-transparent border border-border/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none placeholder:text-muted-foreground"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddPoem}
                        className="flex-1 bg-primary text-primary-foreground rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors font-medium"
                      >
                        Post Poem
                      </button>
                      <button
                        onClick={() => setShowPoemForm(false)}
                        className="flex-1 bg-muted/30 hover:bg-muted/50 rounded-lg px-4 py-2 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {/* Poems Display */}
          <div className="space-y-8">
            {displayPoems.map((poem, idx) => (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl hover:shadow-xl transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-2">{poem.title}</h2>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(poem.timestamp).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long' 
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-accent" />
                          {poem.likes}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="rounded-full">{poem.category}</Badge>
                      {isAuthenticated && (
                        <button
                          onClick={() => handleDeletePoem(poem.id)}
                          className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none mb-6">
                    <pre className="whitespace-pre-wrap font-serif text-foreground/90 leading-relaxed bg-muted/30 p-6 rounded-2xl">
{poem.content}
                    </pre>
                  </div>

                  {/* Like and Comment Section */}
                  <div className="flex justify-between text-muted-foreground border-t border-border/30 pt-3 md:pt-4 text-sm gap-2">
                    <button
                      onClick={async () => {
                        const visitorName = await getVisitorName();
                        handleVisitorLike(poem.id, visitorName);
                      }}
                      className="flex items-center gap-1 md:gap-2 hover:text-primary transition-colors group flex-1 justify-center"
                    >
                      <Heart className="h-4 md:h-5 w-4 md:w-5 transition-all" />
                      <span className="text-xs md:text-sm">{poem.likes}</span>
                    </button>
                    <button
                      onClick={async () => {
                        const commentText = prompt("Your comment:");
                        if (commentText) {
                          const visitorName = await getVisitorName();
                          handleVisitorComment(poem.id, visitorName, commentText);
                        }
                      }}
                      className="flex items-center gap-1 md:gap-2 hover:text-primary transition-colors group flex-1 justify-center"
                    >
                      <MessageCircle className="h-4 md:h-5 w-4 md:w-5" />
                      <span className="text-xs md:text-sm">{poem.comments}</span>
                    </button>
                    <div className="flex items-center gap-1 md:gap-2 hover:text-primary transition-colors cursor-pointer group flex-1 justify-center">
                      <Share2 className="h-4 md:h-5 w-4 md:w-5" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Card className="glass p-8 rounded-3xl">
              <p className="text-muted-foreground mb-4">
                {isAuthenticated ? "Share your verses with the world!" : "Want to share your poetry?"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isAuthenticated ? "Click the 'Share a new poem' button above to post" : "Follow me on social media for daily verses and creative musings"}
              </p>
            </Card>
          </motion.div>

          <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </motion.div>
      </div>
    </div>
  );
};

export default Poetry;
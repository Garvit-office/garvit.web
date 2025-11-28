import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, Trash2, Download, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { useSound } from "@/hooks/useSound";

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  category: string;
  rotation?: number;
}

const API_URL = "http://localhost:3001/api";

const Gallery = () => {
  // Generate random rotation between -3 and 3 degrees
  const getRandomRotation = () => Math.random() * 6 - 3;
  const { isAuthenticated, logout } = useAuth();
  const { playSound } = useSound();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=500&fit=crop",
      title: "Code & Coffee",
      category: "Development",
      rotation: getRandomRotation()
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
      title: "Tech Setup",
      category: "Workspace",
      rotation: getRandomRotation()
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
      title: "Team Collaboration",
      category: "Team",
      rotation: getRandomRotation()
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
      title: "Meeting Room",
      category: "Workspace",
      rotation: getRandomRotation()
    },
    {
      id: "5",
      src: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=500&fit=crop",
      title: "Project Launch",
      category: "Development",
      rotation: getRandomRotation()
    },
    {
      id: "6",
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
      title: "Team Success",
      category: "Team",
      rotation: getRandomRotation()
    }
  ]);

  const [newImage, setNewImage] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Other");
  const [showUploadForm, setShowUploadForm] = useState(false);

  const categories = ["All", "Development", "Workspace", "Team", "Other"];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (!newImage || !newTitle.trim()) {
      toast.error("Please add image and title");
      return;
    }

    playSound('success');
    const image: GalleryImage = {
      id: Date.now().toString(),
      src: newImage,
      title: newTitle,
      category: newCategory,
      rotation: getRandomRotation()
    };

    setImages([image, ...images]);
    setNewImage("");
    setNewTitle("");
    setNewCategory("Other");
    setShowUploadForm(false);
    toast.success("Image added to gallery!");
  };

  const handleDeleteImage = (id: string) => {
    playSound('click');
    setImages(images.filter(img => img.id !== id));
    toast.success("Image removed!");
  };

  const handleDownload = (src: string, title: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = `${title}.png`;
    link.click();
    toast.success("Image downloaded!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <section className="py-12 md:py-20 px-3 md:px-4 border-b border-border">
        <div className="container mx-auto w-full max-w-full md:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Gallery
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              A beautiful collection of my work, projects, and inspirations
            </p>
            <Button
              onClick={() => {
                if (!isAuthenticated) {
                  setShowLoginModal(true);
                } else {
                  setShowUploadForm(!showUploadForm);
                }
              }}
              className="gradient-primary text-white rounded-full"
            >
              <ImagePlus className="mr-2 h-5 w-5" />
              {isAuthenticated ? "Add Image" : "Login to Add"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Upload Form */}
      {showUploadForm && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="py-8 px-3 md:px-4 border-b border-border bg-muted/50"
        >
          <div className="container mx-auto w-full max-w-full md:max-w-2xl">
            <Card className="glass p-6 rounded-2xl md:rounded-3xl">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter image title..."
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Development">Development</option>
                    <option value="Workspace">Workspace</option>
                    <option value="Team">Team</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image
                  </label>
                  <label className="w-full flex items-center justify-center px-4 py-6 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer bg-muted/30 hover:bg-muted/50">
                    <div className="text-center">
                      <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload image
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {newImage && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <img
                      src={newImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddImage}
                    className="flex-1 gradient-primary text-white rounded-full"
                  >
                    Add to Gallery
                  </Button>
                  <Button
                    onClick={() => {
                      setShowUploadForm(false);
                      setNewImage("");
                      setNewTitle("");
                    }}
                    variant="outline"
                    className="flex-1 rounded-full"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </motion.section>
      )}

      {/* Gallery Grid */}
      <section className="py-12 md:py-20 px-3 md:px-4">
        <div className="container mx-auto w-full max-w-full md:max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Sticky Notes Layout */}
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
              {images.map((image, idx) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: (image.rotation || 0) }}
                  animate={{ opacity: 1, scale: 1, rotate: image.rotation || 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  className="w-full sm:w-64 md:w-72 cursor-pointer"
                >
                  <div className="relative group rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white p-3 md:p-4">
                    {/* Sticky note texture background */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                      backgroundImage: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 2px,
                        rgba(0,0,0,.03) 2px,
                        rgba(0,0,0,.03) 4px
                      ),
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(0,0,0,.03) 2px,
                        rgba(0,0,0,.03) 4px
                      )`
                    }} />

                    {/* Image Container */}
                    <div className="relative mb-3 rounded-sm overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <Button
                          onClick={() => handleDownload(image.src, image.title)}
                          size="sm"
                          variant="outline"
                          className="rounded-full h-9 w-9 p-0 bg-white/90 hover:bg-white"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteImage(image.id)}
                          size="sm"
                          variant="destructive"
                          className="rounded-full h-9 w-9 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="font-bold text-sm md:text-base text-foreground mb-2 line-clamp-2">
                        {image.title}
                      </h3>
                      <Badge className="text-xs gradient-primary text-white border-0">
                        {image.category}
                      </Badge>
                    </div>

                    {/* Sticky note fold */}
                    <div className="absolute top-0 right-0 w-8 h-8 md:w-10 md:h-10">
                      <div className="absolute top-0 right-0 w-0 h-0 border-l-8 md:border-l-10 border-r-0 border-t-8 md:border-t-10 border-b-0 border-l-transparent border-t-yellow-300/30" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {images.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">
                  No images yet. Add your first sticky note!
                </p>
                <Button
                  onClick={() => setShowUploadForm(true)}
                  className="gradient-primary text-white rounded-full"
                >
                  <ImagePlus className="mr-2 h-5 w-5" />
                  Add Image
                </Button>
              </div>
            )}
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

export default Gallery;

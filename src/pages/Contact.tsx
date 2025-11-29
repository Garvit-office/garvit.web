import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://garvit-web-3.onrender.com/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Network error. Make sure the backend server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "garvitchawla.office@gmail.com",
      link: "mailto:garvitchawla.office@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9660665666",
      link: "tel:+919660665666",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Sri Ganganagar, Rajasthan",
      link: "https://maps.google.com/?q=Sri+Ganganagar,+Rajasthan",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            Let's <span className="inline-block text-gradient">Connect</span>
          </h1>

          <p className="text-muted-foreground text-center mb-16 text-lg max-w-2xl mx-auto">
            Have a project in mind? Want to collaborate? Feel free to reach out!
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass p-8 rounded-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-2xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-2xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-2xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me more..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-2xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none transition resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-primary text-white rounded-full py-3 font-semibold hover:shadow-lg transition-all"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <p className="text-muted-foreground mb-8">
                  Whether you have a question, project proposal, or just want to say hi, 
                  I'd love to hear from you. Reach out using any of the methods below.
                </p>
              </div>

              {contactInfo.map((info, idx) => (
                <motion.a
                  key={idx}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Card className="glass p-6 rounded-2xl hover:border-accent/60 border-2 border-accent/30 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl group-hover:scale-110 transition-transform">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{info.title}</h4>
                        <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              ))}

              <Card className="glass p-6 rounded-2xl border-2 border-accent/30 mt-4">
                <Badge className="mb-4 gradient-primary text-white border-0 rounded-full">
                  Response Time
                </Badge>
                <p className="text-sm text-muted-foreground">
                  I typically respond to messages within 24 hours. For urgent matters, 
                  please call or email directly.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;

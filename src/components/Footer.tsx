import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Alex Johnson. Made with{" "}
            <Heart className="inline h-4 w-4 text-accent" /> and React
          </p>

          <div className="flex gap-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" className="hover:text-primary rounded-full">
                <Github className="h-5 w-5" />
              </Button>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Button size="icon" variant="ghost" className="hover:text-primary rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
            </a>
            <a href="mailto:alex@example.com">
              <Button size="icon" variant="ghost" className="hover:text-primary rounded-full">
                <Mail className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
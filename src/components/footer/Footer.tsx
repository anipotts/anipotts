import { Github, Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import SuitIcon from "@/components/shared/SuitIcon";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/anipotts", icon: Github },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/anipotts",
    icon: Linkedin,
  },
  { name: "Twitter", href: "https://twitter.com/anipotts", icon: Twitter },
  {
    name: "Instagram",
    href: "https://instagram.com/anipotts",
    icon: Instagram,
  },
  { name: "YouTube", href: "https://youtube.com/@anipotts", icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm mt-32">
      {/* Decorative suit icons */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2 bg-background px-4">
          <SuitIcon suit="hearts" size={12} />
          <SuitIcon suit="diamonds" size={12} />
          <SuitIcon suit="clubs" size={12} />
          <SuitIcon suit="spades" size={12} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Social Links */}
        <div className="flex justify-center items-center gap-6 mb-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} Ani Potts
        </p>
      </div>
    </footer>
  );
}

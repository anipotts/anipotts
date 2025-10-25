import Link from "next/link";
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Download,
} from "lucide-react";

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
    <footer className="border-t border-border bg-background mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold">Ani Potts</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Building fast, reliable products that turn ideas into reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/hire"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  Hire Me
                </Link>
              </li>
              <li>
                <Link
                  href="/assets/ani.pottammal_nyu_2026_resume.pdf"
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  Resume <Download className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-4">
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
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Ani Potts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

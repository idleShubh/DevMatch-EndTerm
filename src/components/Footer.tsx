
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 border-t border-indigo-800/30 bg-indigo-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-1 text-indigo-300 text-sm">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
          <span>by idleShubh</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

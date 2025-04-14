
import { Code2, Heart, Stars } from "lucide-react";

const DevMatchHeader = () => {
  return (
    <header className="text-center py-4">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="relative">
          <Code2 className="h-12 w-12 text-indigo-400" />
          <Heart className="h-5 w-5 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          DevMatch
        </h1>
        <Stars className="h-6 w-6 text-amber-300" />
      </div>
      <div className="max-w-2xl mx-auto">
        <p className="text-indigo-200 text-xl">
          Find your perfect coding partner based on GitHub compatibility
        </p>
      </div>
    </header>
  );
};

export default DevMatchHeader;

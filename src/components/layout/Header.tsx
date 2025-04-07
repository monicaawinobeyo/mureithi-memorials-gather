
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Photos", path: "/gallery" },
    { name: "Memories", path: "/memories" },
    { name: "Timeline", path: "/timeline" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="memorial-container py-2 sm:py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
          <img 
            src="/public/3-removebg-preview.png" 
            alt="Memorial Logo" 
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
          />
          <h1 className="text-base sm:text-2xl font-serif font-bold text-memorial-darkblue truncate">
            In Memory of Stephen Mureithi
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className="text-sm lg:text-base text-gray-700 hover:text-memorial-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button 
                className="p-2 text-gray-700 hover:text-memorial-blue"
                aria-label="Menu"
              >
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <h2 className="font-serif font-bold text-memorial-darkblue text-lg">
                    Stephen Mureithi
                  </h2>
                </div>
                <nav className="flex flex-col py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="px-6 py-3 text-gray-700 hover:bg-gray-100 hover:text-memorial-blue transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

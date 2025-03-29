
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="memorial-container py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <h1 className="text-2xl font-serif font-bold text-memorial-darkblue">
            In Memory of Stephen Mureithi
          </h1>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-memorial-blue transition-colors">
            Home
          </Link>
          <Link to="/gallery" className="text-gray-700 hover:text-memorial-blue transition-colors">
            Photos
          </Link>
          <Link to="/memories" className="text-gray-700 hover:text-memorial-blue transition-colors">
            Memories
          </Link>
          <Link to="/timeline" className="text-gray-700 hover:text-memorial-blue transition-colors">
            Timeline
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-memorial-blue transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

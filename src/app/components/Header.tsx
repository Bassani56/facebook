import { Link, useLocation } from "react-router";
import { Home, User } from "lucide-react";
import mockData from "../../data/mock-data.json";

export function Header() {
  const location = useLocation();
  const currentUserId = mockData.currentUserId;

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl">
          FaceLivro
        </Link>
        
        {/* <nav className="flex gap-6">
          <Link 
            to="/" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/" 
                ? "bg-blue-700" 
                : "hover:bg-blue-500"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Início</span>
          </Link>
          
          <Link 
            to={`/profile/${currentUserId}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname.startsWith("/profile")
                ? "bg-blue-700" 
                : "hover:bg-blue-500"
            }`}
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
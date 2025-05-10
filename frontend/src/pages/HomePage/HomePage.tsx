import { Link } from "lucide-react";
import UrlShortner from "../../Components/UrlShortner";
import UrlHistory from "../../Components/UrlHistory";
import { useAuth } from "../../Context/auth.context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { logout, user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div
              className="flex
            "
            >
              <Link className="text-indigo-400 h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold text-white">MinifyIt</h1>
            </div>
            <div>
              <button className="text-red-500 " onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* URL Shortener Card */}
          <UrlShortner />
          {/* URL History */}
          <UrlHistory />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            © 2025 MinifyIt - Make your URLs shorter in seconds
          </p>
        </div>
      </footer>
    </div>
  );
}

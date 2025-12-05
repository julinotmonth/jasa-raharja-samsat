import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, LayoutDashboard, Shield, FileSearch } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Beranda' },
    { path: '/about', label: 'Tentang' },
    { path: '/services', label: 'Layanan' },
    { path: '/verification-status', label: 'Status Verifikasi' },
    { path: '/contact', label: 'Kontak' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-800">Jasa Raharja</span>
              <span className="text-xs text-gray-500">SAMSAT Sidoarjo</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                    {isAdmin() && (
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    <Link
                      to="/claim/status"
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Status Klaim</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition-colors w-full text-left text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  Masuk
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Daftar
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 hover:text-blue-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 px-4 ${
                  isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin() && (
                  <Link
                    to="/dashboard"
                    className="block py-2 px-4 text-gray-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  to="/claim/status"
                  className="block py-2 px-4 text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Status Klaim
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 px-4 text-red-600 hover:bg-gray-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 px-4 text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="block py-2 px-4 text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-bold text-white">Jasa Raharja</h3>
                <p className="text-sm">SAMSAT Sidoarjo</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Melayani masyarakat dengan sepenuh hati untuk memberikan perlindungan dan jaminan sosial.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Beranda</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Layanan</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Kontak</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li><Link to="/claim/new" className="hover:text-blue-400 transition-colors">Pengajuan Klaim</Link></li>
              <li><Link to="/claim/status" className="hover:text-blue-400 transition-colors">Cek Status Klaim</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Informasi Layanan</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Jl. Raya SAMSAT No. 123, Sidoarjo, Jawa Timur</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-500" />
                <span className="text-sm">(031) 1234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-sm">info@jasaraharja-sidoarjo.id</span>
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Jasa Raharja SAMSAT Sidoarjo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
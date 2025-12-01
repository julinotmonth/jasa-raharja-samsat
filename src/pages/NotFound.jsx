import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan atau dihapus.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" icon={ArrowLeft} onClick={() => navigate(-1)}>
            Kembali
          </Button>
          <Button icon={Home} onClick={() => navigate('/')}>
            Ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
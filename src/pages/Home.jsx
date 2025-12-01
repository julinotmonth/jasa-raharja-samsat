import { Link } from 'react-router-dom';
import { Shield, FileText, CheckCircle, Users, TrendingUp, Clock, ArrowRight, Award, Phone } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

const Home = () => {
  const { user } = useAuth();
  const [counters, setCounters] = useState({ claims: 0, users: 0, processed: 0 });

  useEffect(() => {
    // Animate counters
    const targets = { claims: 15420, users: 8750, processed: 14890 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounters({
        claims: Math.floor(targets.claims * progress),
        users: Math.floor(targets.users * progress),
        processed: Math.floor(targets.processed * progress)
      });

      if (step >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sistem Informasi Layanan Jasa Raharja
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Melayani pengajuan klaim kecelakaan lalu lintas dengan cepat, mudah, dan transparan untuk masyarakat Sidoarjo.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Link to="/claim/new">
                    <Button variant="secondary" size="lg">
                      Ajukan Klaim Sekarang
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button variant="secondary" size="lg">
                        Daftar Sekarang
                      </Button>
                    </Link>
                    <Link to="/services">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                      >
                        Lihat Layanan
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Shield className="w-32 h-32 mx-auto text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{counters.claims.toLocaleString()}</h3>
              <p className="text-gray-600">Total Klaim Diajukan</p>
            </Card>
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{counters.users.toLocaleString()}</h3>
              <p className="text-gray-600">Pengguna Terdaftar</p>
            </Card>
            <Card className="p-8 text-center">
              <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{counters.processed.toLocaleString()}</h3>
              <p className="text-gray-600">Klaim Diproses</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Tentang Jasa Raharja</h2>
            <p className="text-gray-600 text-lg">
              PT Jasa Raharja (Persero) adalah Badan Usaha Milik Negara yang memberikan perlindungan dasar 
              kepada masyarakat atas risiko kecelakaan lalu lintas jalan dan kecelakaan penumpang.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6" hover>
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Terpercaya</h3>
              <p className="text-gray-600">
                Lebih dari 40 tahun melayani masyarakat Indonesia dengan profesional dan amanah.
              </p>
            </Card>
            <Card className="p-6" hover>
              <Clock className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Cepat & Mudah</h3>
              <p className="text-gray-600">
                Proses klaim yang efisien dengan sistem digital untuk kemudahan masyarakat.
              </p>
            </Card>
            <Card className="p-6" hover>
              <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Transparan</h3>
              <p className="text-gray-600">
                Pantau status klaim Anda secara real-time dengan sistem tracking yang akurat.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Layanan Kami</h2>
            <p className="text-gray-600 text-lg">
              Berbagai layanan untuk memudahkan Anda dalam mengajukan dan memantau klaim
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center" hover clickable>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Pengajuan Klaim</h3>
              <p className="text-gray-600 text-sm mb-4">
                Ajukan klaim kecelakaan secara online dengan mudah
              </p>
              <Link to="/claim/new" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
                Mulai <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>

            <Card className="p-6 text-center" hover clickable>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Cek Status</h3>
              <p className="text-gray-600 text-sm mb-4">
                Pantau progress klaim Anda secara real-time
              </p>
              <Link to="/claim/status" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
                Cek Sekarang <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>

            <Card className="p-6 text-center" hover clickable>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Info Layanan</h3>
              <p className="text-gray-600 text-sm mb-4">
                Informasi lengkap tentang layanan kami
              </p>
              <Link to="/services" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
                Selengkapnya <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>

            <Card className="p-6 text-center" hover clickable>
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Hubungi Kami</h3>
              <p className="text-gray-600 text-sm mb-4">
                Butuh bantuan? Hubungi customer service kami
              </p>
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center">
                Kontak <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Mengajukan Klaim?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Proses pengajuan klaim Anda hanya membutuhkan beberapa menit
          </p>
          {user ? (
            <Link to="/claim/new">
              <Button variant="secondary" size="lg">
                Ajukan Klaim Sekarang
              </Button>
            </Link>
          ) : (
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Daftar dan Ajukan Klaim
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
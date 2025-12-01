import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle, Search, Phone, Download, Upload, Clock, Shield, Users, FileCheck } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Services = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      icon: FileText,
      title: 'Pengajuan Klaim Kecelakaan',
      description: 'Ajukan klaim santunan kecelakaan lalu lintas secara online dengan proses yang mudah dan cepat',
      features: ['Form online mudah', 'Upload dokumen digital', 'Tracking real-time'],
      action: '/claim/new',
      color: 'blue'
    },
    {
      icon: CheckCircle,
      title: 'Cek Status Klaim',
      description: 'Pantau progress pengajuan klaim Anda kapan saja dan dimana saja secara real-time',
      features: ['Status real-time', 'Riwayat lengkap', 'Notifikasi otomatis'],
      action: '/claim/status',
      color: 'green'
    },
    {
      icon: Download,
      title: 'Download Formulir',
      description: 'Download formulir dan dokumen pendukung yang diperlukan untuk pengajuan klaim',
      features: ['Formulir standar', 'Panduan lengkap', 'Format digital'],
      action: '#',
      color: 'purple'
    },
    {
      icon: Phone,
      title: 'Konsultasi Online',
      description: 'Konsultasi dengan customer service kami untuk pertanyaan seputar klaim dan layanan',
      features: ['Chat langsung', 'Email support', 'Telepon bantuan'],
      action: '/contact',
      color: 'orange'
    },
    {
      icon: FileCheck,
      title: 'Verifikasi Dokumen',
      description: 'Layanan verifikasi kelengkapan dokumen sebelum pengajuan klaim resmi',
      features: ['Pre-check dokumen', 'Feedback cepat', 'Panduan perbaikan'],
      action: '#',
      color: 'indigo'
    },
    {
      icon: Users,
      title: 'Informasi Layanan',
      description: 'Informasi lengkap tentang jenis layanan, persyaratan, dan prosedur klaim',
      features: ['FAQ lengkap', 'Video tutorial', 'Panduan step-by-step'],
      action: '#',
      color: 'pink'
    }
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    pink: 'bg-pink-100 text-pink-600'
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Layanan Kami</h1>
            <p className="text-xl text-blue-100 mb-8">
              Berbagai layanan untuk memudahkan Anda dalam mengajukan dan memantau klaim
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari layanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <Card key={index} className="p-6" hover>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${colorClasses[service.color]}`}>
                  <service.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => service.action.startsWith('/') ? navigate(service.action) : null}
                >
                  Akses Layanan
                </Button>
              </Card>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Layanan tidak ditemukan</p>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              Cara Mengajukan Klaim
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Daftar/Login</h3>
                <p className="text-sm text-gray-600">Buat akun atau login ke sistem</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Isi Formulir</h3>
                <p className="text-sm text-gray-600">Lengkapi data pengajuan klaim</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Upload Dokumen</h3>
                <p className="text-sm text-gray-600">Unggah dokumen pendukung</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Tracking</h3>
                <p className="text-sm text-gray-600">Pantau status klaim Anda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-blue-700 to-blue-500 text-white p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Butuh Bantuan?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Tim customer service kami siap membantu Anda
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Hubungi Kami
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Services;
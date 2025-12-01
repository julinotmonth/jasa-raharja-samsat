import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix untuk icon marker default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Card Component
const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-lg shadow-md ${hover ? 'hover:shadow-lg transition-shadow' : ''} ${className}`}>
    {children}
  </div>
);

// Input Component
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  </div>
);

// Button Component
const Button = ({ children, icon: Icon, loading = false, onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 w-full"
    disabled={loading}
  >
    {loading ? (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    ) : (
      Icon && <Icon className="w-5 h-5" />
    )}
    {children}
  </button>
);

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Pesan Anda berhasil dikirim!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      alert('Gagal mengirim pesan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat',
      content: 'Jl. Raya SAMSAT No. 123, Sidoarjo, Jawa Timur 61200',
      color: 'blue'
    },
    {
      icon: Phone,
      title: 'Telepon',
      content: '(031) 1234-5678 / 0800-1-JASA-RAHARJA',
      color: 'green'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@jasaraharja-sidoarjo.id',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 08:00 - 16:00 WIB\nSabtu: 08:00 - 12:00 WIB',
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  // Koordinat kantor Jasa Raharja Sidoarjo (contoh)
  const position = [-7.443716594782816, 112.68814482137195];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
            <p className="text-xl text-blue-100">
              Kami siap membantu Anda. Jangan ragu untuk menghubungi kami
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[info.color]}`}>
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">{info.content}</p>
              </Card>
            ))}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>
              <div className="space-y-4">
                <Input
                  label="Nama Lengkap"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />

                <Input
                  label="Subjek"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Perihal pesan Anda"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tulis pesan Anda di sini..."
                    required
                  ></textarea>
                </div>

                <Button icon={Send} loading={loading} onClick={handleSubmit}>
                  Kirim Pesan
                </Button>
              </div>
            </Card>

            {/* Map */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Lokasi Kami</h2>
              <div className="rounded-lg overflow-hidden h-96 border border-gray-200">
                <MapContainer 
                  center={position} 
                  zoom={15} 
                  className="w-full h-full"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <div className="text-center">
                        <strong>Jasa Raharja Sidoarjo</strong>
                        <p className="text-sm mt-1">Jl. Raya SAMSAT No. 123</p>
                        <p className="text-sm">Sidoarjo, Jawa Timur</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-bold text-gray-800 mb-4">Ikuti Kami</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-100 text-blue-600 p-3 rounded-full hover:bg-blue-200 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="bg-pink-100 text-pink-600 p-3 rounded-full hover:bg-pink-200 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="bg-blue-100 text-blue-500 p-3 rounded-full hover:bg-blue-200 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Pertanyaan yang Sering Diajukan
            </h2>

            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">Berapa lama proses klaim?</h3>
                <p className="text-gray-600">
                  Proses verifikasi memakan waktu 3-7 hari kerja. Setelah disetujui, pencairan 
                  dilakukan dalam 14 hari kerja.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">Dokumen apa saja yang diperlukan?</h3>
                <p className="text-gray-600">
                  KTP, STNK, Surat Keterangan Kecelakaan dari Polisi, dan dokumen pendukung lainnya 
                  sesuai jenis klaim.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">Apakah bisa mengajukan klaim secara offline?</h3>
                <p className="text-gray-600">
                  Ya, Anda dapat mengajukan klaim langsung ke kantor kami dengan membawa dokumen lengkap.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-gray-800 mb-2">Bagaimana cara tracking status klaim?</h3>
                <p className="text-gray-600">
                  Login ke akun Anda dan akses menu "Cek Status Klaim" untuk melihat progress real-time.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
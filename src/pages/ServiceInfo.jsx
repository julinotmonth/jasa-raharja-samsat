import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Video, FileText, Phone, Mail, MapPin } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const ServiceInfo = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [openFAQ, setOpenFAQ] = useState(null);

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'guide', label: 'Panduan', icon: BookOpen },
    { id: 'videos', label: 'Video Tutorial', icon: Video },
    { id: 'contact', label: 'Kontak', icon: Phone }
  ];

  const faqs = [
    {
      category: 'Umum',
      questions: [
        {
          q: 'Apa itu Jasa Raharja?',
          a: 'Jasa Raharja adalah BUMN yang memberikan perlindungan dasar (santunan) kepada masyarakat atas kecelakaan lalu lintas dan kecelakaan penumpang.'
        },
        {
          q: 'Siapa yang berhak mendapat santunan?',
          a: 'Setiap korban kecelakaan lalu lintas jalan di Indonesia berhak mendapat santunan, termasuk pengemudi, penumpang, dan pejalan kaki.'
        },
        {
          q: 'Berapa besaran santunan yang diberikan?',
          a: 'Santunan meninggal dunia: Rp 50 juta, Cacat tetap: Maksimal Rp 50 juta, Biaya perawatan medis: Maksimal Rp 20 juta, Biaya penguburan: Rp 10 juta.'
        }
      ]
    },
    {
      category: 'Pengajuan Klaim',
      questions: [
        {
          q: 'Bagaimana cara mengajukan klaim?',
          a: 'Klaim dapat diajukan secara online melalui website ini atau datang langsung ke kantor cabang Jasa Raharja terdekat dengan membawa dokumen lengkap.'
        },
        {
          q: 'Dokumen apa saja yang diperlukan?',
          a: 'Dokumen wajib: KTP korban, Surat Keterangan Polisi, dan STNK kendaraan. Dokumen tambahan: Surat keterangan medis (untuk luka-luka) atau surat kematian (untuk kasus meninggal).'
        },
        {
          q: 'Berapa lama proses klaim?',
          a: 'Proses klaim umumnya memakan waktu 14 hari kerja sejak dokumen lengkap diterima, tergantung kompleksitas kasus.'
        },
        {
          q: 'Apakah ada biaya untuk mengajukan klaim?',
          a: 'Tidak ada biaya apapun. Semua layanan Jasa Raharja GRATIS.'
        }
      ]
    },
    {
      category: 'Verifikasi & Pencairan',
      questions: [
        {
          q: 'Bagaimana cara mengecek status klaim saya?',
          a: 'Anda dapat mengecek status klaim melalui menu "Cek Status Klaim" di website ini dengan memasukkan nomor klaim atau NIK.'
        },
        {
          q: 'Bagaimana cara pencairan santunan?',
          a: 'Setelah klaim disetujui, dana akan ditransfer ke rekening bank yang Anda daftarkan atau dapat diambil di kantor cabang Jasa Raharja.'
        },
        {
          q: 'Apa yang harus dilakukan jika klaim ditolak?',
          a: 'Anda dapat mengajukan keberatan dengan menyertakan dokumen tambahan atau klarifikasi. Hubungi customer service untuk informasi lebih lanjut.'
        }
      ]
    }
  ];

  const guides = [
    {
      title: 'Panduan Lengkap Pengajuan Klaim',
      description: 'Langkah-langkah detail untuk mengajukan klaim dari awal hingga pencairan',
      icon: FileText,
      color: 'blue',
      steps: [
        'Kumpulkan semua dokumen yang diperlukan',
        'Akses website dan buat akun',
        'Isi formulir pengajuan dengan lengkap',
        'Upload semua dokumen pendukung',
        'Submit dan dapatkan nomor klaim',
        'Pantau status melalui website',
        'Tunggu proses verifikasi dan pencairan'
      ]
    },
    {
      title: 'Panduan Verifikasi Dokumen',
      description: 'Cara memastikan dokumen Anda lengkap dan valid',
      icon: FileText,
      color: 'green',
      steps: [
        'Pastikan semua dokumen asli masih berlaku',
        'Scan atau foto dokumen dengan jelas',
        'Format file: JPG, PNG, atau PDF',
        'Ukuran file maksimal 5MB per dokumen',
        'Gunakan fitur verifikasi dokumen untuk pre-check',
        'Perbaiki dokumen yang ditandai bermasalah'
      ]
    },
    {
      title: 'Panduan Cek Status Klaim',
      description: 'Cara memantau progress klaim Anda',
      icon: FileText,
      color: 'purple',
      steps: [
        'Buka halaman "Cek Status Klaim"',
        'Masukkan nomor klaim atau NIK',
        'Lihat detail status dan timeline',
        'Cek notifikasi update secara berkala',
        'Download bukti klaim jika diperlukan'
      ]
    }
  ];

  const videos = [
    {
      title: 'Cara Mengajukan Klaim Online',
      duration: '5:30',
      thumbnail: 'https://via.placeholder.com/400x225?text=Tutorial+Klaim+Online',
      description: 'Tutorial lengkap mengajukan klaim melalui website'
    },
    {
      title: 'Dokumen yang Diperlukan',
      duration: '3:45',
      thumbnail: 'https://via.placeholder.com/400x225?text=Dokumen+Persyaratan',
      description: 'Penjelasan detail tentang dokumen-dokumen yang diperlukan'
    },
    {
      title: 'Cara Mengecek Status Klaim',
      duration: '2:15',
      thumbnail: 'https://via.placeholder.com/400x225?text=Cek+Status+Klaim',
      description: 'Tutorial singkat mengecek status pengajuan klaim'
    }
  ];

  const contacts = [
    {
      type: 'Telepon',
      icon: Phone,
      value: '1500-888',
      description: 'Layanan 24/7',
      color: 'blue'
    },
    {
      type: 'Email',
      icon: Mail,
      value: 'cs@jasaraharja.co.id',
      description: 'Respon dalam 1x24 jam',
      color: 'green'
    },
    {
      type: 'Kantor Pusat',
      icon: MapPin,
      value: 'Jl. Medan Merdeka Selatan No. 17A, Jakarta',
      description: 'Senin - Jumat: 08:00 - 16:00',
      color: 'purple'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Informasi Layanan</h1>
            <p className="text-gray-600">
              Temukan jawaban atas pertanyaan Anda dan panduan lengkap layanan kami
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              {faqs.map((category, catIndex) => (
                <Card key={catIndex} className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">{category.category}</h2>
                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const index = `${catIndex}-${faqIndex}`;
                      const isOpen = openFAQ === index;

                      return (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-800 pr-4">{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 text-gray-600 border-t border-gray-200 pt-3">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Guide Tab */}
          {activeTab === 'guide' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <Card key={index} className="p-6">
                  <div className={`w-12 h-12 rounded-full bg-${guide.color}-100 flex items-center justify-center mb-4`}>
                    <guide.icon className={`w-6 h-6 text-${guide.color}-600`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                  <div className="space-y-2">
                    {guide.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start text-sm">
                        <span className="text-blue-600 font-bold mr-2">{idx + 1}.</span>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Videos Tab */}
          {activeTab === 'videos' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <Video className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-2">{video.title}</h3>
                    <p className="text-sm text-gray-600">{video.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="grid md:grid-cols-3 gap-6">
              {contacts.map((contact, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full bg-${contact.color}-100 flex items-center justify-center mx-auto mb-4`}>
                    <contact.icon className={`w-8 h-8 text-${contact.color}-600`} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">{contact.type}</h3>
                  <p className="text-lg font-medium text-blue-600 mb-2">{contact.value}</p>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                </Card>
              ))}

              <Card className="md:col-span-3 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                  Butuh Bantuan Lebih Lanjut?
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  Tim customer service kami siap membantu Anda dengan pertanyaan apapun
                </p>
                <div className="flex justify-center">
                  <Button
                    onClick={() => window.location.href = '/contact'}
                    size="lg"
                  >
                    Hubungi Kami Sekarang
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;

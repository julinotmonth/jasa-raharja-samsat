import { useState, useEffect } from 'react';
import { Search, Download, Eye, Calendar, MapPin, User } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import StatusBadge from '../components/common/StatusBadge';
import toast from 'react-hot-toast';
import { getClaimByNumberOrNIK, initializeMockData } from '../utils/claimStorage';
import { generateClaimPDF } from '../utils/pdfGenerator';

const ClaimStatus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize mock data on component mount
  useEffect(() => {
    initializeMockData();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Masukkan nomor klaim atau NIK');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get claim from localStorage
      const result = getClaimByNumberOrNIK(searchQuery.trim());

      if (result) {
        setSearchResult(result);
        toast.success('Data klaim ditemukan');
      } else {
        setSearchResult(null);
        toast.error('Data klaim tidak ditemukan. Periksa kembali nomor klaim atau NIK Anda.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Coba lagi.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!searchResult) {
      toast.error('Tidak ada data untuk diunduh');
      return;
    }

    try {
      console.log('Generating PDF for claim:', searchResult.id);
      console.log('Claim data:', searchResult);
      generateClaimPDF(searchResult);
      toast.success('PDF berhasil diunduh!');
    } catch (error) {
      console.error('PDF generation error:', error);
      console.error('Error details:', error.message, error.stack);
      toast.error(`Gagal mengunduh PDF: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Cek Status Klaim</h1>
            <p className="text-gray-600">Pantau progress pengajuan klaim Anda secara real-time</p>
          </div>

          {/* Search Card */}
          <Card className="p-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Masukkan Nomor Klaim (contoh: KLM-2024-1234)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button icon={Search} onClick={handleSearch} loading={loading}>
                Cari
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Masukkan nomor klaim atau NIK untuk mencari status klaim Anda
            </p>
          </Card>

          {/* Search Result */}
          {searchResult && (
            <div className="space-y-6">
              {/* Claim Info Card */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {searchResult.id}
                    </h2>
                    <StatusBadge status={searchResult.status} />
                  </div>
                  <Button variant="outline" icon={Download} size="sm" onClick={handleDownloadPDF}>
                    Download
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <User className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Nama Pemohon</p>
                      <p className="font-medium text-gray-800">{searchResult.fullName}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Tanggal Kejadian</p>
                      <p className="font-medium text-gray-800">{searchResult.incidentDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Lokasi Kejadian</p>
                      <p className="font-medium text-gray-800">{searchResult.incidentLocation}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Nomor HP</p>
                      <p className="font-medium text-gray-800">{searchResult.phone}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Timeline Card */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Riwayat Status</h3>
                
                <div className="relative">
                  {searchResult.timeline.map((item, index) => (
                    <div key={index} className="flex pb-8 last:pb-0">
                      <div className="flex flex-col items-center mr-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.date
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        {index < searchResult.timeline.length - 1 && (
                          <div className={`w-0.5 h-full mt-2 ${
                            item.date ? 'bg-blue-600' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-bold ${
                            item.date ? 'text-gray-800' : 'text-gray-400'
                          }`}>
                            {item.status}
                          </h4>
                          {item.date && (
                            <span className="text-sm text-gray-500">{item.date}</span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          item.date ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Actions Card */}
              <Card className="p-6 bg-blue-50 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2">Informasi</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Jika Anda memiliki pertanyaan atau butuh bantuan terkait klaim ini, 
                  silakan hubungi customer service kami.
                </p>
                <Button variant="outline" size="sm" onClick={() => window.location.href = '/contact'}>
                  Hubungi Customer Service
                </Button>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {!searchResult && (
            <Card className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Cari Status Klaim Anda
              </h3>
              <p className="text-gray-600">
                Masukkan nomor klaim atau NIK untuk melihat status pengajuan klaim
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimStatus;
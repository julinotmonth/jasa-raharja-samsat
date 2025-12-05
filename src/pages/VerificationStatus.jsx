import { useState } from 'react';
import { Search, CheckCircle, XCircle, Clock, AlertCircle, Download, Eye, File } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import StatusBadge from '../components/common/StatusBadge';
import toast from 'react-hot-toast';
import { getVerificationById, getVerificationsByNIK } from '../utils/verificationStorage';
import { formatFileSize, isImageFile, isPDFFile } from '../utils/fileHelper';

const VerificationStatus = () => {
  const [searchType, setSearchType] = useState('id'); // 'id' or 'nik'
  const [searchQuery, setSearchQuery] = useState('');
  const [verifications, setVerifications] = useState([]);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error(`Masukkan ${searchType === 'id' ? 'ID Verifikasi' : 'NIK'}`);
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      let results = [];
      if (searchType === 'id') {
        const verification = getVerificationById(searchQuery.trim());
        if (verification) {
          results = [verification];
        }
      } else {
        results = getVerificationsByNIK(searchQuery.trim());
      }

      if (results.length > 0) {
        setVerifications(results);
        toast.success(`Ditemukan ${results.length} verifikasi`);
      } else {
        setVerifications([]);
        toast.error('Verifikasi tidak ditemukan. Periksa kembali ID atau NIK Anda.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan. Coba lagi.');
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (verification) => {
    setSelectedVerification(verification);
    setShowDetailModal(true);
  };

  const handleViewFile = (fileData, fileName) => {
    if (!fileData) {
      toast.error('File tidak tersedia');
      return;
    }
    setSelectedFile({ ...fileData, displayName: fileName });
    setShowFileModal(true);
  };

  const handleDownloadFile = (fileData, fileName) => {
    if (!fileData || !fileData.data) {
      toast.error('File tidak tersedia');
      return;
    }

    const link = document.createElement('a');
    link.href = fileData.data;
    link.download = fileData.name || fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('File berhasil diunduh');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-12 h-12 text-red-500" />;
      default:
        return <Clock className="w-12 h-12 text-yellow-500" />;
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'approved':
        return 'Dokumen Anda telah diverifikasi dan disetujui oleh admin';
      case 'rejected':
        return 'Dokumen Anda ditolak. Lihat catatan admin untuk detail';
      default:
        return 'Dokumen Anda sedang menunggu verifikasi oleh admin';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Cek Status Verifikasi Dokumen</h1>
            <p className="text-gray-600">
              Lacak status verifikasi dokumen yang telah Anda kirim
            </p>
          </div>

          {/* Search Card */}
          <Card className="p-6 mb-8">
            <div className="space-y-4">
              {/* Search Type Toggle */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setSearchType('id');
                    setSearchQuery('');
                    setVerifications([]);
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    searchType === 'id'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cari dengan ID Verifikasi
                </button>
                <button
                  onClick={() => {
                    setSearchType('nik');
                    setSearchQuery('');
                    setVerifications([]);
                  }}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    searchType === 'nik'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cari dengan NIK
                </button>
              </div>

              {/* Search Input */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={
                      searchType === 'id'
                        ? 'Masukkan ID Verifikasi (contoh: VER-1234567890-123)'
                        : 'Masukkan NIK (16 digit)'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    maxLength={searchType === 'nik' ? '16' : undefined}
                  />
                </div>
                <Button onClick={handleSearch} loading={loading}>
                  <Search className="w-4 h-4 mr-2" />
                  Cari
                </Button>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-gray-700">
                    {searchType === 'id' ? (
                      <>
                        <p className="font-medium mb-1">ID Verifikasi Anda</p>
                        <p>
                          ID Verifikasi diberikan saat Anda mengirim dokumen untuk verifikasi.
                          Pastikan Anda menyimpan ID tersebut.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium mb-1">Cari dengan NIK</p>
                        <p>
                          Masukkan NIK yang Anda gunakan saat mengirim dokumen.
                          Sistem akan menampilkan semua verifikasi yang terkait dengan NIK tersebut.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Results */}
          {verifications.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800">
                Hasil Pencarian ({verifications.length} verifikasi)
              </h2>

              {verifications.map((verification) => (
                <Card key={verification.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Status Icon & Message */}
                      <div className="flex items-start mb-4">
                        <div className="mr-4">{getStatusIcon(verification.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-gray-800">
                              {verification.id}
                            </h3>
                            <StatusBadge status={verification.status} />
                          </div>
                          <p className="text-gray-600 mb-2">{getStatusMessage(verification.status)}</p>
                          <p className="text-sm text-gray-500">
                            Dikirim: {new Date(verification.submittedAt).toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>

                      {/* Verification Info */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Nama</p>
                          <p className="font-medium text-gray-800">{verification.fullName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">NIK</p>
                          <p className="font-medium text-gray-800">{verification.nik}</p>
                        </div>
                      </div>

                      {/* Review Info */}
                      {verification.reviewedBy && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <p className="text-sm font-medium text-gray-800 mb-2">
                            Ditinjau oleh: {verification.reviewedBy}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            Tanggal: {new Date(verification.reviewedAt).toLocaleString('id-ID')}
                          </p>
                          {verification.adminNotes && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-sm font-medium text-gray-800 mb-1">
                                Catatan Admin:
                              </p>
                              <p className="text-sm text-gray-700">{verification.adminNotes}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        variant="outline"
                        onClick={() => handleViewDetail(verification)}
                        className="w-full md:w-auto"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail & Dokumen
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedVerification && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedVerification(null);
          }}
          title="Detail Verifikasi Dokumen"
        >
          <div className="space-y-6">
            {/* Status */}
            <div className="text-center pb-4 border-b">
              <div className="flex justify-center mb-3">
                {getStatusIcon(selectedVerification.status)}
              </div>
              <StatusBadge status={selectedVerification.status} />
              <p className="text-gray-600 mt-2">{getStatusMessage(selectedVerification.status)}</p>
            </div>

            {/* User Info */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Informasi Pemohon</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nama Lengkap</p>
                  <p className="font-medium text-gray-800">{selectedVerification.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">NIK</p>
                  <p className="font-medium text-gray-800">{selectedVerification.nik}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">No. Telepon</p>
                  <p className="font-medium text-gray-800">{selectedVerification.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800">{selectedVerification.email || '-'}</p>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Dokumen yang Dikirim</h3>
              <div className="space-y-2">
                {selectedVerification.ktpFile && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm">
                      <File className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="font-medium">KTP</p>
                        <p className="text-xs text-gray-500">
                          {selectedVerification.ktpFile.name} • {formatFileSize(selectedVerification.ktpFile.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewFile(selectedVerification.ktpFile, 'KTP')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Lihat"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadFile(selectedVerification.ktpFile, 'KTP')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Unduh"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                {selectedVerification.policeReportFile && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm">
                      <File className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="font-medium">Surat Keterangan Polisi</p>
                        <p className="text-xs text-gray-500">
                          {selectedVerification.policeReportFile.name} • {formatFileSize(selectedVerification.policeReportFile.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewFile(selectedVerification.policeReportFile, 'Surat Polisi')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Lihat"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadFile(selectedVerification.policeReportFile, 'Surat Polisi')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Unduh"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                {selectedVerification.stnkFile && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm">
                      <File className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="font-medium">STNK</p>
                        <p className="text-xs text-gray-500">
                          {selectedVerification.stnkFile.name} • {formatFileSize(selectedVerification.stnkFile.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewFile(selectedVerification.stnkFile, 'STNK')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Lihat"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadFile(selectedVerification.stnkFile, 'STNK')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Unduh"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                {selectedVerification.medicalReportFile && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-sm">
                      <File className="w-4 h-4 text-blue-500 mr-2" />
                      <div>
                        <p className="font-medium">Laporan Medis</p>
                        <p className="text-xs text-gray-500">
                          {selectedVerification.medicalReportFile.name} • {formatFileSize(selectedVerification.medicalReportFile.size)}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewFile(selectedVerification.medicalReportFile, 'Laporan Medis')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Lihat"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownloadFile(selectedVerification.medicalReportFile, 'Laporan Medis')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Unduh"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedVerification(null);
                }}
              >
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* File Preview Modal */}
      {selectedFile && (
        <Modal
          isOpen={showFileModal}
          onClose={() => {
            setShowFileModal(false);
            setSelectedFile(null);
          }}
          title={`Preview: ${selectedFile.displayName}`}
        >
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              <p><strong>Nama File:</strong> {selectedFile.name}</p>
              <p><strong>Ukuran:</strong> {formatFileSize(selectedFile.size)}</p>
              <p><strong>Tipe:</strong> {selectedFile.type}</p>
            </div>

            <div className="border rounded-lg overflow-hidden bg-gray-50">
              {isImageFile(selectedFile.name) ? (
                <div className="max-h-[500px] overflow-auto flex items-center justify-center p-4">
                  <img
                    src={selectedFile.data}
                    alt={selectedFile.displayName}
                    className="max-w-full h-auto"
                  />
                </div>
              ) : isPDFFile(selectedFile.name) ? (
                <div className="h-[500px]">
                  <iframe
                    src={selectedFile.data}
                    className="w-full h-full"
                    title={selectedFile.displayName}
                  />
                </div>
              ) : (
                <div className="p-8 text-center">
                  <File className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Preview tidak tersedia untuk tipe file ini</p>
                  <Button
                    variant="primary"
                    onClick={() => handleDownloadFile(selectedFile, selectedFile.displayName)}
                  >
                    <Download className="w-4 h-4 mr-2 inline" />
                    Unduh File
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => handleDownloadFile(selectedFile, selectedFile.displayName)}
              >
                <Download className="w-4 h-4 mr-2 inline" />
                Unduh
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowFileModal(false);
                  setSelectedFile(null);
                }}
              >
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VerificationStatus;

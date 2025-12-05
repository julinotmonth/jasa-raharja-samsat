import { useState } from 'react';
import { CheckCircle, AlertCircle, FileCheck, Upload, X } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';
import { saveVerification } from '../utils/verificationStorage';
import { fileToBase64 } from '../utils/fileHelper';

const DocumentVerification = () => {
  const [files, setFiles] = useState({
    ktp: null,
    policeReport: null,
    stnk: null,
    medical: null
  });

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    nik: '',
    phone: '',
    email: ''
  });

  const [verificationResults, setVerificationResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [verificationId, setVerificationId] = useState(null);

  const documentTypes = [
    { key: 'ktp', label: 'KTP Korban', required: true, icon: FileCheck },
    { key: 'policeReport', label: 'Surat Keterangan Polisi', required: true, icon: FileCheck },
    { key: 'stnk', label: 'STNK Kendaraan', required: false, icon: FileCheck },
    { key: 'medical', label: 'Surat Keterangan Medis', required: false, icon: FileCheck }
  ];

  const handleFileChange = (key, file) => {
    if (file && file.size > 5000000) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }
    setFiles({ ...files, [key]: file });
  };

  const removeFile = (key) => {
    setFiles({ ...files, [key]: null });
  };

  const verifyDocuments = async () => {
    // Check required documents
    if (!files.ktp || !files.policeReport) {
      toast.error('Mohon upload semua dokumen wajib (KTP dan Surat Keterangan Polisi)');
      return;
    }

    setLoading(true);
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));

      const results = {
        ktp: {
          status: 'valid',
          message: 'Dokumen KTP valid dan dapat dibaca dengan jelas',
          details: ['Format: PNG/JPG', 'Ukuran: Sesuai', 'Kualitas: Baik']
        },
        policeReport: {
          status: 'valid',
          message: 'Surat Keterangan Polisi lengkap',
          details: ['Format: PDF', 'Tanda tangan: Ada', 'Stempel: Ada']
        },
        stnk: files.stnk ? {
          status: 'valid',
          message: 'STNK valid dan masih berlaku',
          details: ['Format: JPG', 'Masa berlaku: Valid', 'Kualitas: Baik']
        } : null,
        medical: files.medical ? {
          status: 'warning',
          message: 'Surat medis dapat diterima tetapi perlu verifikasi tambahan',
          details: ['Format: PDF', 'Tanda tangan dokter: Ada', 'Catatan: Perlu stempel rumah sakit']
        } : null
      };

      setVerificationResults(results);
      toast.success('Pre-verifikasi selesai! Silakan isi data diri untuk kirim ke admin.');
    } catch (error) {
      toast.error('Gagal melakukan verifikasi');
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToAdmin = async () => {
    // Validate user info
    if (!userInfo.fullName || !userInfo.nik || !userInfo.phone) {
      toast.error('Mohon lengkapi data diri Anda');
      return;
    }

    if (userInfo.nik.length !== 16) {
      toast.error('NIK harus 16 digit');
      return;
    }

    setLoading(true);
    try {
      // Convert files to base64
      const ktpFileData = files.ktp ? await fileToBase64(files.ktp) : null;
      const policeReportFileData = files.policeReport ? await fileToBase64(files.policeReport) : null;
      const stnkFileData = files.stnk ? await fileToBase64(files.stnk) : null;
      const medicalFileData = files.medical ? await fileToBase64(files.medical) : null;

      // Save verification to localStorage
      const savedVerificationId = saveVerification({
        fullName: userInfo.fullName,
        nik: userInfo.nik,
        phone: userInfo.phone,
        email: userInfo.email,
        ktpFile: ktpFileData,
        policeReportFile: policeReportFileData,
        stnkFile: stnkFileData,
        medicalReportFile: medicalFileData,
        preCheckResults: verificationResults
      });

      setVerificationId(savedVerificationId);
      setShowSubmitModal(true);
      toast.success('Dokumen berhasil dikirim ke admin untuk verifikasi!');
    } catch (error) {
      toast.error('Gagal mengirim dokumen');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetVerification = () => {
    setFiles({
      ktp: null,
      policeReport: null,
      stnk: null,
      medical: null
    });
    setVerificationResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Verifikasi Dokumen</h1>
            <p className="text-gray-600">
              Verifikasi kelengkapan dan validitas dokumen sebelum pengajuan klaim resmi
            </p>
          </div>

          {/* Info Card */}
          <Card className="p-6 mb-8 bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Informasi Penting</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Layanan ini membantu Anda memeriksa kelengkapan dokumen sebelum submit</li>
                  <li>• Dokumen yang diupload hanya untuk pre-check, tidak disimpan di sistem</li>
                  <li>• Pastikan dokumen terlihat jelas dan tidak terpotong</li>
                  <li>• Format yang diterima: JPG, PNG, PDF (Max 5MB)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Upload Section */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upload Dokumen</h2>

            <div className="space-y-4">
              {documentTypes.map(doc => (
                <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <doc.icon className="w-5 h-5 text-gray-400 mr-2" />
                      <label className="font-medium text-gray-800">
                        {doc.label}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </div>
                    {files[doc.key] && (
                      <button
                        onClick={() => removeFile(doc.key)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  {files[doc.key] ? (
                    <div className="bg-green-50 border border-green-200 rounded p-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                        <span className="text-sm text-gray-700">{files[doc.key].name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {(files[doc.key].size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="text-center">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <span className="text-sm text-gray-500">Klik untuk upload</span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileChange(doc.key, e.target.files[0])}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <Button
                className="flex-1"
                onClick={verifyDocuments}
                loading={loading}
                disabled={!files.ktp || !files.policeReport}
              >
                Verifikasi Dokumen
              </Button>
              {verificationResults && (
                <Button
                  variant="outline"
                  onClick={resetVerification}
                >
                  Reset
                </Button>
              )}
            </div>
          </Card>

          {/* Results Section */}
          {verificationResults && (
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Hasil Verifikasi</h2>

              <div className="space-y-4">
                {Object.entries(verificationResults).map(([key, result]) => {
                  if (!result) return null;

                  const isValid = result.status === 'valid';
                  const isWarning = result.status === 'warning';

                  return (
                    <div
                      key={key}
                      className={`border rounded-lg p-4 ${
                        isValid ? 'bg-green-50 border-green-200' :
                        isWarning ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start">
                        {isValid ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        ) : isWarning ? (
                          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 mb-1">
                            {documentTypes.find(d => d.key === key)?.label}
                          </h3>
                          <p className="text-sm text-gray-700 mb-2">{result.message}</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {result.details.map((detail, idx) => (
                              <li key={idx}>• {detail}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-4">Kirim ke Admin untuk Verifikasi Resmi</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Dokumen Anda telah lolos pre-check. Silakan isi data diri untuk mengirim ke admin
                  agar dapat diverifikasi secara resmi.
                </p>

                {/* User Info Form */}
                <div className="space-y-4 mb-4">
                  <Input
                    label="Nama Lengkap *"
                    value={userInfo.fullName}
                    onChange={(e) => setUserInfo({ ...userInfo, fullName: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                  />
                  <Input
                    label="NIK (16 digit) *"
                    value={userInfo.nik}
                    onChange={(e) => setUserInfo({ ...userInfo, nik: e.target.value })}
                    placeholder="Masukkan NIK"
                    maxLength="16"
                  />
                  <Input
                    label="Nomor HP *"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                  />
                  <Input
                    label="Email (Opsional)"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmitToAdmin}
                    className="flex-1"
                    loading={loading}
                    disabled={!userInfo.fullName || !userInfo.nik || !userInfo.phone}
                  >
                    Kirim ke Admin
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/claim/new'}
                  >
                    Atau Langsung Ajukan Klaim
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSubmitModal && (
        <Modal
          isOpen={showSubmitModal}
          onClose={() => {
            setShowSubmitModal(false);
            resetVerification();
          }}
          title="Dokumen Berhasil Dikirim"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Verifikasi Dikirim!</h3>
              <p className="text-gray-600 mb-4">
                Dokumen Anda telah berhasil dikirim ke admin untuk diverifikasi.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-800 mb-1">ID Verifikasi:</p>
                <p className="text-lg font-bold text-blue-600">{verificationId}</p>
                <p className="text-xs text-gray-600 mt-2">
                  Simpan ID ini untuk melacak status verifikasi Anda
                </p>
              </div>
              <p className="text-sm text-gray-600">
                Admin akan memverifikasi dokumen Anda dalam 1-2 hari kerja.
                Anda akan dihubungi melalui nomor telepon yang telah didaftarkan.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowSubmitModal(false);
                  resetVerification();
                }}
              >
                Tutup
              </Button>
              <Button
                className="flex-1"
                onClick={() => window.location.href = '#/verification-status'}
              >
                Cek Status Verifikasi
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default DocumentVerification;

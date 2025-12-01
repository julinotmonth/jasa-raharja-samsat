import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Upload, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import toast from 'react-hot-toast';

const ClaimForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Personal Data
    fullName: '',
    nik: '',
    phone: '',
    address: '',
    
    // Step 2: Incident Data
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    incidentDescription: '',
    vehicleType: '',
    vehicleNumber: '',
    
    // Step 3: Documents
    ktpFile: null,
    policeReportFile: null,
    stnkFile: null,
    medicalReportFile: null
  });

  const steps = [
    { number: 1, title: 'Data Diri', icon: User },
    { number: 2, title: 'Data Kejadian', icon: FileText },
    { number: 3, title: 'Upload Dokumen', icon: Upload },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5000000) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }
    setFormData({ ...formData, [e.target.name]: file });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.nik && formData.phone && formData.address;
      case 2:
        return formData.incidentDate && formData.incidentLocation && formData.incidentDescription;
      case 3:
        return formData.ktpFile && formData.policeReportFile;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowModal(true);
    } catch (error) {
      toast.error('Gagal mengajukan klaim. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Data Diri Korban</h3>
            <Input
              label="Nama Lengkap *"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
            />
            <Input
              label="NIK (Nomor Induk Kependudukan) *"
              name="nik"
              value={formData.nik}
              onChange={handleChange}
              placeholder="16 digit NIK"
              maxLength="16"
            />
            <Input
              label="Nomor HP *"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08xxxxxxxxxx"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat Lengkap *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan alamat lengkap"
              ></textarea>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Data Kejadian</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Tanggal Kejadian *"
                name="incidentDate"
                type="date"
                value={formData.incidentDate}
                onChange={handleChange}
              />
              <Input
                label="Waktu Kejadian"
                name="incidentTime"
                type="time"
                value={formData.incidentTime}
                onChange={handleChange}
              />
            </div>
            <Input
              label="Lokasi Kejadian *"
              name="incidentLocation"
              value={formData.incidentLocation}
              onChange={handleChange}
              placeholder="Contoh: Jl. Raya Surabaya-Mojokerto KM 15"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jenis Kendaraan
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih jenis kendaraan</option>
                  <option value="motor">Sepeda Motor</option>
                  <option value="mobil">Mobil</option>
                  <option value="truk">Truk</option>
                  <option value="bus">Bus</option>
                </select>
              </div>
              <Input
                label="Nomor Polisi"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                placeholder="Contoh: L 1234 AB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kronologi Kejadian *
              </label>
              <textarea
                name="incidentDescription"
                value={formData.incidentDescription}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jelaskan detail kejadian kecelakaan..."
              ></textarea>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Upload Dokumen Pendukung</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KTP Korban * <span className="text-gray-500 text-xs">(Max 5MB)</span>
                </label>
                <input
                  type="file"
                  name="ktpFile"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {formData.ktpFile && (
                  <p className="text-sm text-green-600 mt-1">✓ {formData.ktpFile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surat Keterangan Polisi * <span className="text-gray-500 text-xs">(Max 5MB)</span>
                </label>
                <input
                  type="file"
                  name="policeReportFile"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {formData.policeReportFile && (
                  <p className="text-sm text-green-600 mt-1">✓ {formData.policeReportFile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  STNK Kendaraan <span className="text-gray-500 text-xs">(Max 5MB)</span>
                </label>
                <input
                  type="file"
                  name="stnkFile"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {formData.stnkFile && (
                  <p className="text-sm text-green-600 mt-1">✓ {formData.stnkFile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surat Keterangan Medis <span className="text-gray-500 text-xs">(Max 5MB)</span>
                </label>
                <input
                  type="file"
                  name="medicalReportFile"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                {formData.medicalReportFile && (
                  <p className="text-sm text-green-600 mt-1">✓ {formData.medicalReportFile.name}</p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Catatan:</strong> Dokumen yang bertanda * wajib diupload. 
                Format yang diterima: JPG, PNG, PDF (Max 5MB per file)
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Review Data Pengajuan</h3>
            
            <Card className="p-6 bg-gray-50">
              <h4 className="font-bold text-gray-800 mb-3">Data Diri</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Nama:</span> <strong>{formData.fullName}</strong></p>
                <p><span className="text-gray-600">NIK:</span> <strong>{formData.nik}</strong></p>
                <p><span className="text-gray-600">No HP:</span> <strong>{formData.phone}</strong></p>
                <p><span className="text-gray-600">Alamat:</span> <strong>{formData.address}</strong></p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-50">
              <h4 className="font-bold text-gray-800 mb-3">Data Kejadian</h4>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-600">Tanggal:</span> <strong>{formData.incidentDate}</strong></p>
                <p><span className="text-gray-600">Waktu:</span> <strong>{formData.incidentTime || '-'}</strong></p>
                <p><span className="text-gray-600">Lokasi:</span> <strong>{formData.incidentLocation}</strong></p>
                <p><span className="text-gray-600">Jenis Kendaraan:</span> <strong>{formData.vehicleType || '-'}</strong></p>
                <p><span className="text-gray-600">Nomor Polisi:</span> <strong>{formData.vehicleNumber || '-'}</strong></p>
                <p><span className="text-gray-600">Kronologi:</span> <strong>{formData.incidentDescription}</strong></p>
              </div>
            </Card>

            <Card className="p-6 bg-gray-50">
              <h4 className="font-bold text-gray-800 mb-3">Dokumen Terupload</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  KTP: {formData.ktpFile?.name}
                </p>
                <p className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Surat Polisi: {formData.policeReportFile?.name}
                </p>
                {formData.stnkFile && (
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    STNK: {formData.stnkFile.name}
                  </p>
                )}
                {formData.medicalReportFile && (
                  <p className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Surat Medis: {formData.medicalReportFile.name}
                  </p>
                )}
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Pengajuan Klaim</h1>
            <p className="text-gray-600">Lengkapi formulir berikut dengan data yang valid</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.number} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep >= step.number
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <p className={`text-sm mt-2 font-medium ${
                      currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 ${
                      currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card className="p-8 mb-6">
            {renderStep()}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              icon={ChevronLeft}
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Kembali
            </Button>

            {currentStep < 4 ? (
              <Button icon={ChevronRight} onClick={handleNext}>
                Selanjutnya
              </Button>
            ) : (
              <Button icon={CheckCircle} onClick={handleSubmit} loading={loading}>
                Submit Pengajuan
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Pengajuan Berhasil!">
        <div className="text-center py-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Klaim Berhasil Diajukan!</h3>
          <p className="text-gray-600 mb-2">Nomor Klaim Anda:</p>
          <p className="text-2xl font-bold text-blue-600 mb-6">KLM-2024-{Math.floor(Math.random() * 10000)}</p>
          <p className="text-gray-600 mb-6">
            Pengajuan klaim Anda sedang diproses. Anda dapat memantau status klaim melalui menu "Cek Status Klaim"
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
              Kembali ke Beranda
            </Button>
            <Button onClick={() => navigate('/claim/status')} className="flex-1">
              Cek Status
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ClaimForm;
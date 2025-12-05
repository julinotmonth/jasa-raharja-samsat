import jsPDF from 'jspdf';

/**
 * Generate Form Pengajuan Klaim PDF
 */
export const generateFormPengajuanKlaim = () => {
  try {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('JASA RAHARJA', 105, 15, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Formulir Pengajuan Klaim Kecelakaan Lalu Lintas', 105, 25, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Form Title
    let yPos = 50;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('FORMULIR PENGAJUAN KLAIM', 105, yPos, { align: 'center' });

    // Section 1: Data Pemohon
    yPos = 65;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('A. DATA PEMOHON', 14, yPos);

    yPos += 2;
    doc.setLineWidth(0.5);
    doc.setDrawColor(37, 99, 235);
    doc.line(14, yPos, 196, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const formFields1 = [
      'Nama Lengkap',
      'NIK (Nomor Induk Kependudukan)',
      'Nomor HP',
      'Email',
      'Alamat Lengkap'
    ];

    formFields1.forEach(field => {
      doc.text(`${field}:`, 14, yPos);
      doc.setDrawColor(200, 200, 200);
      doc.line(14, yPos + 2, 196, yPos + 2);
      yPos += 12;
    });

    // Section 2: Data Kejadian
    yPos += 5;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('B. DATA KEJADIAN', 14, yPos);

    yPos += 2;
    doc.setDrawColor(37, 99, 235);
    doc.line(14, yPos, 196, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const formFields2 = [
      'Tanggal Kejadian',
      'Waktu Kejadian',
      'Lokasi Kejadian',
      'Jenis Kendaraan',
      'Nomor Polisi Kendaraan'
    ];

    formFields2.forEach(field => {
      doc.text(`${field}:`, 14, yPos);
      doc.setDrawColor(200, 200, 200);
      doc.line(14, yPos + 2, 196, yPos + 2);
      yPos += 12;
    });

    // Add new page for chronology
    doc.addPage();

    yPos = 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('C. KRONOLOGI KEJADIAN', 14, yPos);

    yPos += 2;
    doc.setDrawColor(37, 99, 235);
    doc.line(14, yPos, 196, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Jelaskan secara detail kronologi kejadian kecelakaan:', 14, yPos);

    // Add lines for writing
    yPos += 10;
    for (let i = 0; i < 15; i++) {
      doc.setDrawColor(200, 200, 200);
      doc.line(14, yPos, 196, yPos);
      yPos += 8;
    }

    // Section: Required Documents
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('D. DOKUMEN YANG DILAMPIRKAN', 14, yPos);

    yPos += 2;
    doc.setDrawColor(37, 99, 235);
    doc.line(14, yPos, 196, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const documents = [
      '☐ Fotokopi KTP Korban',
      '☐ Surat Keterangan Polisi',
      '☐ Fotokopi STNK Kendaraan',
      '☐ Surat Keterangan Medis (jika ada)',
      '☐ Foto-foto Kejadian (jika ada)'
    ];

    documents.forEach(doc_item => {
      doc.text(doc_item, 20, yPos);
      yPos += 8;
    });

    // Signature section
    yPos += 10;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, yPos, 196, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Left side - Place and Date
    doc.text('Tempat, Tanggal:', 14, yPos);
    doc.line(50, yPos + 2, 100, yPos + 2);

    // Right side - Signature
    doc.text('Pemohon,', 140, yPos);

    yPos += 25;
    doc.text('(', 130, yPos);
    doc.line(140, yPos + 2, 190, yPos + 2);
    doc.text(')', 191, yPos);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Formulir ini dapat diisi secara manual atau melalui sistem online di website Jasa Raharja', 105, 285, { align: 'center' });

    // Save PDF
    doc.save('Formulir_Pengajuan_Klaim_Jasa_Raharja.pdf');
    return true;
  } catch (error) {
    console.error('Error generating form:', error);
    throw new Error('Gagal membuat formulir');
  }
};

/**
 * Generate Panduan Pengajuan Klaim PDF
 */
export const generatePanduanPengajuan = () => {
  try {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('JASA RAHARJA', 105, 15, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Panduan Pengajuan Klaim', 105, 25, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    let yPos = 50;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('PANDUAN PENGAJUAN KLAIM', 105, yPos, { align: 'center' });

    // Introduction
    yPos = 65;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const intro = 'Panduan ini membantu Anda dalam proses pengajuan klaim santunan kecelakaan lalu lintas di Jasa Raharja.';
    const splitIntro = doc.splitTextToSize(intro, 180);
    doc.text(splitIntro, 14, yPos);

    // Step 1
    yPos = 85;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('1. PERSYARATAN DOKUMEN', 14, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const requirements = [
      '• Fotokopi KTP korban yang masih berlaku',
      '• Surat Keterangan Polisi (asli)',
      '• Fotokopi STNK kendaraan yang terlibat',
      '• Surat Keterangan Medis dari rumah sakit (untuk kasus luka-luka)',
      '• Foto-foto lokasi kejadian (jika ada)',
      '• Surat Kematian (untuk kasus meninggal dunia)'
    ];

    requirements.forEach(req => {
      doc.text(req, 20, yPos);
      yPos += 7;
    });

    // Step 2
    yPos += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('2. CARA PENGAJUAN', 14, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const steps = [
      '• Akses website Jasa Raharja atau datang ke kantor cabang terdekat',
      '• Isi formulir pengajuan klaim dengan lengkap dan benar',
      '• Upload atau serahkan semua dokumen persyaratan',
      '• Tunggu proses verifikasi dokumen (2-3 hari kerja)',
      '• Pantau status klaim melalui website atau customer service',
      '• Santunan akan dicairkan setelah klaim disetujui'
    ];

    steps.forEach(step => {
      const splitStep = doc.splitTextToSize(step, 170);
      doc.text(splitStep, 20, yPos);
      yPos += splitStep.length * 7;
    });

    // Step 3
    yPos += 8;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('3. JENIS SANTUNAN', 14, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const santunan = [
      '• Meninggal dunia: Rp 50.000.000,-',
      '• Cacat tetap: Maksimal Rp 50.000.000,-',
      '• Biaya perawatan medis: Maksimal Rp 20.000.000,-',
      '• Biaya penguburan: Rp 10.000.000,-'
    ];

    santunan.forEach(item => {
      doc.text(item, 20, yPos);
      yPos += 7;
    });

    // Add new page
    doc.addPage();

    yPos = 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('4. TIMELINE PROSES', 14, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const timeline = [
      '• Hari 1-2: Pengajuan dan penerimaan dokumen',
      '• Hari 3-5: Verifikasi kelengkapan dokumen',
      '• Hari 6-10: Proses analisa dan investigasi',
      '• Hari 11-14: Persetujuan dan pencairan dana'
    ];

    timeline.forEach(time => {
      doc.text(time, 20, yPos);
      yPos += 7;
    });

    // Contact Info
    yPos += 15;
    doc.setFillColor(240, 240, 240);
    doc.rect(14, yPos - 5, 182, 40, 'F');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('HUBUNGI KAMI', 14, yPos + 5);

    yPos += 12;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Telepon: 1500-888 (24/7)', 20, yPos);
    yPos += 7;
    doc.text('Email: cs@jasaraharja.co.id', 20, yPos);
    yPos += 7;
    doc.text('Website: www.jasaraharja.co.id', 20, yPos);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Dokumen ini adalah panduan resmi dari Jasa Raharja', 105, 285, { align: 'center' });

    // Save PDF
    doc.save('Panduan_Pengajuan_Klaim_Jasa_Raharja.pdf');
    return true;
  } catch (error) {
    console.error('Error generating guide:', error);
    throw new Error('Gagal membuat panduan');
  }
};

/**
 * Generate Daftar Dokumen Persyaratan PDF
 */
export const generateDaftarDokumen = () => {
  try {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('JASA RAHARJA', 105, 15, { align: 'center' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Daftar Dokumen Persyaratan Klaim', 105, 25, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    let yPos = 50;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('CHECKLIST DOKUMEN', 105, yPos, { align: 'center' });

    // Instructions
    yPos = 65;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Centang (✓) dokumen yang telah Anda siapkan', 14, yPos);

    // Required Documents
    yPos = 80;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DOKUMEN WAJIB:', 14, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const requiredDocs = [
      { name: 'Fotokopi KTP Korban', note: 'KTP harus masih berlaku' },
      { name: 'Surat Keterangan Polisi', note: 'Asli dari kepolisian' },
      { name: 'Fotokopi STNK Kendaraan', note: 'Kendaraan yang terlibat' }
    ];

    requiredDocs.forEach(doc_item => {
      doc.rect(14, yPos - 3, 4, 4);
      doc.text(doc_item.name, 22, yPos);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.text(`(${doc_item.note})`, 22, yPos + 4);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      yPos += 12;
    });

    // Optional Documents
    yPos += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('DOKUMEN TAMBAHAN (Sesuai Kasus):', 14, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    const optionalDocs = [
      { name: 'Surat Keterangan Medis', note: 'Untuk kasus luka-luka' },
      { name: 'Surat Kematian', note: 'Untuk kasus meninggal dunia' },
      { name: 'Foto Kejadian', note: 'Jika tersedia' },
      { name: 'Visum et Repertum', note: 'Untuk kasus tertentu' },
      { name: 'Kartu Keluarga', note: 'Untuk ahli waris' }
    ];

    optionalDocs.forEach(doc_item => {
      doc.rect(14, yPos - 3, 4, 4);
      doc.text(doc_item.name, 22, yPos);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.text(`(${doc_item.note})`, 22, yPos + 4);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      yPos += 12;
    });

    // Notes
    yPos += 15;
    doc.setFillColor(255, 243, 205);
    doc.rect(14, yPos - 5, 182, 35, 'F');

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('CATATAN PENTING:', 18, yPos + 3);

    yPos += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const notes = [
      '• Semua dokumen harus jelas dan terbaca',
      '• Dokumen asli dibawa saat verifikasi',
      '• Dokumen yang tidak lengkap akan memperlambat proses'
    ];

    notes.forEach(note => {
      doc.text(note, 20, yPos);
      yPos += 6;
    });

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Checklist ini membantu Anda mempersiapkan dokumen sebelum pengajuan klaim', 105, 285, { align: 'center' });

    // Save PDF
    doc.save('Daftar_Dokumen_Persyaratan_Jasa_Raharja.pdf');
    return true;
  } catch (error) {
    console.error('Error generating document list:', error);
    throw new Error('Gagal membuat daftar dokumen');
  }
};

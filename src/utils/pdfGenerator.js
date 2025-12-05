import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Format date to Indonesian format
 */
const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Format vehicle type to Indonesian
 */
const formatVehicleType = (type) => {
  const types = {
    motor: 'Sepeda Motor',
    mobil: 'Mobil',
    truk: 'Truk',
    bus: 'Bus'
  };
  return types[type] || type || '-';
};

/**
 * Format status to Indonesian
 */
const formatStatus = (status) => {
  const statuses = {
    pending: 'Menunggu Verifikasi',
    processing: 'Dalam Proses',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  };
  return statuses[status] || status || '-';
};

/**
 * Generate PDF document for claim details
 */
export const generateClaimPDF = (claimData) => {
  try {
    console.log('Starting PDF generation...');

    // Validate input
    if (!claimData || !claimData.id) {
      throw new Error('Data klaim tidak valid');
    }

    // Create new PDF document
    const doc = new jsPDF();
    console.log('PDF document created');
    console.log('autoTable available:', typeof autoTable);

    // Set document properties
    doc.setProperties({
      title: `Klaim ${claimData.id}`,
      subject: 'Detail Klaim Jasa Raharja',
      author: 'Jasa Raharja',
      keywords: 'klaim, jasa raharja, asuransi',
      creator: 'Jasa Raharja System'
    });

    // Add header
    doc.setFillColor(37, 99, 235); // Blue color
    doc.rect(0, 0, 210, 40, 'F');

    // Add logo/title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('JASA RAHARJA', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Detail Klaim Asuransi', 105, 30, { align: 'center' });

    // Reset text color
    doc.setTextColor(0, 0, 0);

    // Add claim number and date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    doc.text(`Dicetak: ${currentDate}`, 14, 50);

    // Claim number section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Nomor Klaim:', 14, 60);
    doc.setTextColor(37, 99, 235);
    doc.text(claimData.id || '-', 60, 60);
    doc.setTextColor(0, 0, 0);

    // Status badge
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Status:', 14, 70);

    // Status color based on status
    const statusColors = {
      pending: [251, 191, 36],
      processing: [59, 130, 246],
      approved: [34, 197, 94],
      rejected: [239, 68, 68]
    };
    const statusColor = statusColors[claimData.status] || [156, 163, 175];

    doc.setFillColor(...statusColor);
    doc.roundedRect(43, 66, 50, 7, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(formatStatus(claimData.status), 68, 71, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    console.log('Header added');

    // Personal Data Section
    let yPos = 85;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Data Pemohon', 14, yPos);

    yPos += 3;
    doc.setLineWidth(0.5);
    doc.setDrawColor(37, 99, 235);
    doc.line(14, yPos, 196, yPos);

    yPos += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const personalData = [
      ['Nama Lengkap', claimData.fullName || '-'],
      ['NIK', claimData.nik || '-'],
      ['Nomor HP', claimData.phone || '-'],
      ['Alamat', claimData.address || '-']
    ];

    autoTable(doc, {
      startY: yPos,
      head: [],
      body: personalData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 40 },
        1: { cellWidth: 140 }
      },
      margin: { left: 14 }
    });

    console.log('Personal data added');

    // Incident Data Section
    yPos = doc.lastAutoTable.finalY + 12;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Data Kejadian', 14, yPos);

    yPos += 3;
    doc.setLineWidth(0.5);
    doc.setDrawColor(37, 99, 235);
    doc.line(14, yPos, 196, yPos);

    yPos += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const incidentData = [
      ['Tanggal Kejadian', formatDate(claimData.incidentDate)],
      ['Waktu Kejadian', claimData.incidentTime || '-'],
      ['Lokasi Kejadian', claimData.incidentLocation || '-'],
      ['Jenis Kendaraan', formatVehicleType(claimData.vehicleType)],
      ['Nomor Polisi', claimData.vehicleNumber || '-'],
      ['Kronologi', claimData.incidentDescription || '-']
    ];

    autoTable(doc, {
      startY: yPos,
      head: [],
      body: incidentData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 40 },
        1: { cellWidth: 140 }
      },
      margin: { left: 14 }
    });

    console.log('Incident data added');

    // Document Status Section
    yPos = doc.lastAutoTable.finalY + 12;

    // Check if we need a new page
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Dokumen Pendukung', 14, yPos);

    yPos += 3;
    doc.setLineWidth(0.5);
    doc.setDrawColor(37, 99, 235);
    doc.line(14, yPos, 196, yPos);

    yPos += 8;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const documents = [];
    if (claimData.ktpFile) documents.push(['✓ KTP Korban', claimData.ktpFile.name]);
    if (claimData.policeReportFile) documents.push(['✓ Surat Keterangan Polisi', claimData.policeReportFile.name]);
    if (claimData.stnkFile) documents.push(['✓ STNK Kendaraan', claimData.stnkFile.name]);
    if (claimData.medicalReportFile) documents.push(['✓ Surat Keterangan Medis', claimData.medicalReportFile.name]);

    if (documents.length > 0) {
      autoTable(doc, {
        startY: yPos,
        head: [],
        body: documents,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 60, textColor: [34, 197, 94] },
          1: { cellWidth: 120 }
        },
        margin: { left: 14 }
      });
      yPos = doc.lastAutoTable.finalY + 12;
    } else {
      doc.text('Belum ada dokumen yang diupload', 14, yPos);
      yPos += 12;
    }

    console.log('Documents section added');

    // Timeline Section
    if (claimData.timeline && claimData.timeline.length > 0) {
      // Check if we need a new page
      if (yPos > 230) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Riwayat Status', 14, yPos);

      yPos += 3;
      doc.setLineWidth(0.5);
      doc.setDrawColor(37, 99, 235);
      doc.line(14, yPos, 196, yPos);

      yPos += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');

      const timelineData = claimData.timeline.map((item, index) => [
        `${index + 1}`,
        item.status || '-',
        formatDate(item.date),
        item.description || '-'
      ]);

      autoTable(doc, {
        startY: yPos,
        head: [['#', 'Status', 'Tanggal', 'Keterangan']],
        body: timelineData,
        theme: 'striped',
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: { fontSize: 9, cellPadding: 3 },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 45, fontStyle: 'bold' },
          2: { cellWidth: 35, halign: 'center' },
          3: { cellWidth: 92 }
        },
        margin: { left: 14 }
      });

      console.log('Timeline added');
    }

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Halaman ${i} dari ${pageCount}`,
        105,
        287,
        { align: 'center' }
      );
      doc.text(
        'Dokumen ini dicetak dari sistem Jasa Raharja',
        105,
        292,
        { align: 'center' }
      );
    }

    console.log('Footer added, saving PDF...');

    // Save the PDF
    const fileName = `Klaim_${claimData.id}_${new Date().getTime()}.pdf`;
    doc.save(fileName);

    console.log('PDF saved successfully:', fileName);
    return true;
  } catch (error) {
    console.error('Error in generateClaimPDF:', error);
    console.error('Error stack:', error.stack);
    throw new Error(error.message || 'Gagal membuat PDF. Silakan coba lagi.');
  }
};

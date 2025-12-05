// Utility functions for managing claim data in localStorage

const STORAGE_KEY = 'jasaraharja_claims';

/**
 * Generate unique claim number
 */
export const generateClaimNumber = () => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `KLM-${year}-${randomNum}`;
};

/**
 * Save a new claim to localStorage
 */
export const saveClaim = (claimData) => {
  try {
    const claims = getAllClaims();
    const claimNumber = generateClaimNumber();
    const timestamp = new Date().toISOString();

    const newClaim = {
      id: claimNumber,
      ...claimData,
      status: 'pending',
      submittedAt: timestamp,
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          status: 'Pengajuan diterima',
          description: 'Klaim berhasil diajukan dan menunggu verifikasi dokumen'
        },
        {
          date: null,
          status: 'Verifikasi dokumen',
          description: 'Menunggu verifikasi dokumen'
        },
        {
          date: null,
          status: 'Dalam proses',
          description: 'Menunggu proses klaim'
        },
        {
          date: null,
          status: 'Selesai',
          description: 'Menunggu approval final'
        }
      ]
    };

    claims[claimNumber] = newClaim;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));

    return claimNumber;
  } catch (error) {
    console.error('Error saving claim:', error);
    throw new Error('Gagal menyimpan data klaim');
  }
};

/**
 * Get all claims from localStorage
 */
export const getAllClaims = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting claims:', error);
    return {};
  }
};

/**
 * Get a specific claim by claim number or NIK
 */
export const getClaimByNumberOrNIK = (searchQuery) => {
  try {
    const claims = getAllClaims();

    // First, try to find by claim number (exact match)
    if (claims[searchQuery]) {
      return claims[searchQuery];
    }

    // If not found, search by NIK
    const claimsByNIK = Object.values(claims).filter(
      claim => claim.nik === searchQuery
    );

    if (claimsByNIK.length > 0) {
      // Return the most recent claim for this NIK
      return claimsByNIK.sort((a, b) =>
        new Date(b.submittedAt) - new Date(a.submittedAt)
      )[0];
    }

    return null;
  } catch (error) {
    console.error('Error getting claim:', error);
    return null;
  }
};

/**
 * Update claim status (for testing/demo purposes)
 */
export const updateClaimStatus = (claimNumber, newStatus) => {
  try {
    const claims = getAllClaims();

    if (!claims[claimNumber]) {
      throw new Error('Klaim tidak ditemukan');
    }

    claims[claimNumber].status = newStatus;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));

    return true;
  } catch (error) {
    console.error('Error updating claim status:', error);
    return false;
  }
};

/**
 * Initialize with mock data for testing (call this once)
 */
export const initializeMockData = () => {
  const existingData = getAllClaims();

  // Only initialize if empty
  if (Object.keys(existingData).length === 0) {
    const mockClaims = {
      'KLM-2024-1234': {
        id: 'KLM-2024-1234',
        fullName: 'Ahmad Fauzi',
        nik: '3578901234567890',
        phone: '081234567890',
        address: 'Jl. Merdeka No. 123, Surabaya',
        incidentDate: '2024-11-15',
        incidentTime: '14:30',
        incidentLocation: 'Jl. Raya Surabaya KM 10',
        incidentDescription: 'Kecelakaan lalu lintas melibatkan sepeda motor',
        vehicleType: 'motor',
        vehicleNumber: 'L 1234 AB',
        status: 'processing',
        submittedAt: '2024-11-15T10:00:00.000Z',
        timeline: [
          { date: '2024-11-15', status: 'Pengajuan diterima', description: 'Klaim berhasil diajukan' },
          { date: '2024-11-17', status: 'Verifikasi dokumen', description: 'Dokumen sedang diverifikasi' },
          { date: '2024-11-20', status: 'Dalam proses', description: 'Klaim sedang diproses tim' },
          { date: null, status: 'Selesai', description: 'Menunggu approval' }
        ]
      },
      'KLM-2024-5678': {
        id: 'KLM-2024-5678',
        fullName: 'Siti Aminah',
        nik: '3578901234567891',
        phone: '081234567891',
        address: 'Jl. Ahmad Yani No. 45, Malang',
        incidentDate: '2024-10-20',
        incidentTime: '09:15',
        incidentLocation: 'Jl. Ahmad Yani No. 45',
        incidentDescription: 'Tabrakan dengan kendaraan lain',
        vehicleType: 'mobil',
        vehicleNumber: 'N 5678 CD',
        status: 'approved',
        submittedAt: '2024-10-20T08:00:00.000Z',
        timeline: [
          { date: '2024-10-20', status: 'Pengajuan diterima', description: 'Klaim berhasil diajukan' },
          { date: '2024-10-22', status: 'Verifikasi dokumen', description: 'Dokumen telah diverifikasi' },
          { date: '2024-10-25', status: 'Dalam proses', description: 'Klaim telah diproses' },
          { date: '2024-10-28', status: 'Disetujui', description: 'Klaim disetujui untuk pencairan' }
        ]
      }
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockClaims));
  }
};

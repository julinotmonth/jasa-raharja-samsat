// Utility functions for managing document verification submissions in localStorage

const STORAGE_KEY = 'jasaraharja_verifications';

/**
 * Generate unique verification ID
 */
export const generateVerificationId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `VER-${timestamp}-${randomNum}`;
};

/**
 * Save a new verification submission to localStorage
 */
export const saveVerification = (verificationData) => {
  try {
    const verifications = getAllVerifications();
    const verificationId = generateVerificationId();
    const timestamp = new Date().toISOString();

    const newVerification = {
      id: verificationId,
      ...verificationData,
      status: 'pending', // pending, approved, rejected
      submittedAt: timestamp,
      reviewedAt: null,
      reviewedBy: null,
      adminNotes: null
    };

    verifications[verificationId] = newVerification;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifications));

    return verificationId;
  } catch (error) {
    console.error('Error saving verification:', error);
    throw new Error('Gagal menyimpan data verifikasi');
  }
};

/**
 * Get all verifications from localStorage
 */
export const getAllVerifications = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting verifications:', error);
    return {};
  }
};

/**
 * Get a specific verification by ID
 */
export const getVerificationById = (verificationId) => {
  try {
    const verifications = getAllVerifications();
    return verifications[verificationId] || null;
  } catch (error) {
    console.error('Error getting verification:', error);
    return null;
  }
};

/**
 * Update verification status (for admin)
 */
export const updateVerificationStatus = (verificationId, status, adminNotes = null, adminName = 'Admin') => {
  try {
    const verifications = getAllVerifications();

    if (!verifications[verificationId]) {
      throw new Error('Verifikasi tidak ditemukan');
    }

    verifications[verificationId].status = status;
    verifications[verificationId].reviewedAt = new Date().toISOString();
    verifications[verificationId].reviewedBy = adminName;
    verifications[verificationId].adminNotes = adminNotes;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifications));

    return true;
  } catch (error) {
    console.error('Error updating verification status:', error);
    return false;
  }
};

/**
 * Delete a verification
 */
export const deleteVerification = (verificationId) => {
  try {
    const verifications = getAllVerifications();

    if (!verifications[verificationId]) {
      throw new Error('Verifikasi tidak ditemukan');
    }

    delete verifications[verificationId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifications));

    return true;
  } catch (error) {
    console.error('Error deleting verification:', error);
    return false;
  }
};

/**
 * Get verifications by status
 */
export const getVerificationsByStatus = (status) => {
  try {
    const verifications = getAllVerifications();
    return Object.values(verifications).filter(v => v.status === status);
  } catch (error) {
    console.error('Error getting verifications by status:', error);
    return [];
  }
};

/**
 * Get verifications by NIK
 */
export const getVerificationsByNIK = (nik) => {
  try {
    const verifications = getAllVerifications();
    return Object.values(verifications).filter(v => v.nik === nik);
  } catch (error) {
    console.error('Error getting verifications by NIK:', error);
    return [];
  }
};

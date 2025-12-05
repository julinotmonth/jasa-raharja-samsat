// Utility functions for handling file uploads

/**
 * Convert file to base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve(null);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result // base64 string
      });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Convert multiple files to base64
 */
export const filesToBase64 = async (files) => {
  const promises = Object.entries(files).map(async ([key, file]) => {
    const base64Data = await fileToBase64(file);
    return [key, base64Data];
  });

  const results = await Promise.all(promises);
  return Object.fromEntries(results);
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

/**
 * Check if file is an image
 */
export const isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const ext = getFileExtension(filename);
  return imageExtensions.includes(ext);
};

/**
 * Check if file is a PDF
 */
export const isPDFFile = (filename) => {
  return getFileExtension(filename) === 'pdf';
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

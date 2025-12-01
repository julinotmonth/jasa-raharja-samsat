const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { label: 'Diajukan', color: 'bg-yellow-100 text-yellow-800' },
    verified: { label: 'Diverifikasi', color: 'bg-blue-100 text-blue-800' },
    processing: { label: 'Diproses', color: 'bg-purple-100 text-purple-800' },
    approved: { label: 'Disetujui', color: 'bg-green-100 text-green-800' },
    rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-800' },
    completed: { label: 'Selesai', color: 'bg-gray-100 text-gray-800' },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FileText, Users, CheckCircle, Clock, Search, Edit, Trash2, Eye } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import StatusBadge from '../components/common/StatusBadge';
import Input from '../components/common/Input';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock statistics data
  const stats = [
    { icon: FileText, label: 'Total Klaim', value: '1,247', color: 'blue', change: '+12%' },
    { icon: Clock, label: 'Menunggu Verifikasi', value: '89', color: 'yellow', change: '-5%' },
    { icon: CheckCircle, label: 'Disetujui', value: '1,089', color: 'green', change: '+8%' },
    { icon: Users, label: 'Total Pengguna', value: '3,456', color: 'purple', change: '+15%' }
  ];

  // Mock chart data
  const chartData = [
    { name: 'Jan', klaim: 65, disetujui: 58 },
    { name: 'Feb', klaim: 78, disetujui: 70 },
    { name: 'Mar', klaim: 90, disetujui: 85 },
    { name: 'Apr', klaim: 105, disetujui: 98 },
    { name: 'May', klaim: 120, disetujui: 110 },
    { name: 'Jun', klaim: 98, disetujui: 92 }
  ];

  // Mock claims data
  const mockClaims = [
    { id: 'KLM-2024-1234', name: 'Ahmad Fauzi', date: '2024-11-15', status: 'pending', amount: 'Rp 15.000.000' },
    { id: 'KLM-2024-1235', name: 'Siti Aminah', date: '2024-11-14', status: 'verified', amount: 'Rp 20.000.000' },
    { id: 'KLM-2024-1236', name: 'Budi Santoso', date: '2024-11-13', status: 'processing', amount: 'Rp 18.000.000' },
    { id: 'KLM-2024-1237', name: 'Dewi Kusuma', date: '2024-11-12', status: 'approved', amount: 'Rp 25.000.000' },
    { id: 'KLM-2024-1238', name: 'Eko Prasetyo', date: '2024-11-11', status: 'rejected', amount: 'Rp 12.000.000' },
    { id: 'KLM-2024-1239', name: 'Fitri Handayani', date: '2024-11-10', status: 'completed', amount: 'Rp 22.000.000' },
    { id: 'KLM-2024-1240', name: 'Hendra Wijaya', date: '2024-11-09', status: 'pending', amount: 'Rp 16.000.000' },
    { id: 'KLM-2024-1241', name: 'Indah Permata', date: '2024-11-08', status: 'verified', amount: 'Rp 19.000.000' },
    { id: 'KLM-2024-1242', name: 'Joko Susanto', date: '2024-11-07', status: 'processing', amount: 'Rp 21.000.000' },
    { id: 'KLM-2024-1243', name: 'Kartika Sari', date: '2024-11-06', status: 'approved', amount: 'Rp 23.000.000' }
  ];

  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || claim.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const paginatedClaims = filteredClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Admin</h1>
          <p className="text-gray-600">Kelola dan pantau semua pengajuan klaim</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6" hover>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Statistik Klaim Bulanan</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="klaim" fill="#3b82f6" name="Total Klaim" />
                <Bar dataKey="disetujui" fill="#10b981" name="Disetujui" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Tren Pengajuan</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="klaim" stroke="#3b82f6" strokeWidth={2} name="Klaim" />
                <Line type="monotone" dataKey="disetujui" stroke="#10b981" strokeWidth={2} name="Disetujui" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Claims Table */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-gray-800">Daftar Pengajuan Klaim</h3>
            
            <div className="flex gap-2 w-full md:w-auto">
              <div className="flex-1 md:w-64">
                <Input
                  placeholder="Cari nomor klaim atau nama..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={Search}
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Semua Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="processing">Processing</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">No. Klaim</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nama</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Tanggal</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Jumlah</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClaims.map((claim, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{claim.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{claim.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{claim.date}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={claim.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{claim.amount}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Menampilkan {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredClaims.length)} dari {filteredClaims.length} data
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={i}
                      variant={currentPage === pageNum ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
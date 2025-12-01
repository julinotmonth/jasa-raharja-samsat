import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Shield } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      toast.error('Registrasi gagal! Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Jasa Raharja</h1>
          <p className="text-gray-600">SAMSAT Sidoarjo</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Buat Akun Baru</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              icon={User}
              placeholder="John Doe"
              error={errors.name?.message}
              {...register('name', { 
                required: 'Nama lengkap wajib diisi',
                minLength: {
                  value: 3,
                  message: 'Nama minimal 3 karakter'
                }
              })}
            />

            <Input
              label="Email"
              type="email"
              icon={Mail}
              placeholder="email@example.com"
              error={errors.email?.message}
              {...register('email', { 
                required: 'Email wajib diisi',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Format email tidak valid'
                }
              })}
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password', { 
                required: 'Password wajib diisi',
                minLength: {
                  value: 6,
                  message: 'Password minimal 6 karakter'
                }
              })}
            />

            <Input
              label="Konfirmasi Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', { 
                required: 'Konfirmasi password wajib diisi',
                validate: value => value === password || 'Password tidak cocok'
              })}
            />

            <div className="flex items-start">
              <input 
                type="checkbox" 
                className="rounded text-blue-600 focus:ring-blue-500 mt-1"
                {...register('terms', { required: true })}
              />
              <label className="ml-2 text-sm text-gray-600">
                Saya setuju dengan{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  syarat dan ketentuan
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500">Anda harus menyetujui syarat dan ketentuan</p>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              Daftar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
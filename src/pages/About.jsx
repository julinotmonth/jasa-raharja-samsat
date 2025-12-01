import { Shield, Target, Eye, Award, Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import Card from '../components/common/Card';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Perlindungan Menyeluruh',
      description: 'Memberikan jaminan sosial kepada korban kecelakaan lalu lintas di seluruh Indonesia'
    },
    {
      icon: Clock,
      title: 'Proses Cepat',
      description: 'Sistem digital yang mempercepat proses pengajuan dan verifikasi klaim'
    },
    {
      icon: Users,
      title: 'Layanan Professional',
      description: 'Tim berpengalaman yang siap membantu masyarakat dengan sepenuh hati'
    },
    {
      icon: TrendingUp,
      title: 'Terus Berkembang',
      description: 'Inovasi berkelanjutan untuk meningkatkan kualitas layanan'
    }
  ];

  const timeline = [
    { year: '1964', event: 'Pendirian PT Jasa Raharja (Persero)' },
    { year: '1992', event: 'Perluasan layanan ke seluruh Indonesia' },
    { year: '2010', event: 'Implementasi sistem digital pertama' },
    { year: '2020', event: 'Transformasi digital menyeluruh' },
    { year: '2024', event: 'Peluncuran sistem online SAMSAT Sidoarjo' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Jasa Raharja</h1>
            <p className="text-xl text-blue-100">
              Melindungi dan melayani masyarakat Indonesia sejak 1964
            </p>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Latar Belakang</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                PT Jasa Raharja (Persero) adalah Badan Usaha Milik Negara (BUMN) yang bergerak di bidang 
                asuransi sosial. Didirikan berdasarkan Undang-Undang Nomor 33 Tahun 1964 dan Nomor 34 Tahun 1964, 
                Jasa Raharja memiliki misi mulia untuk memberikan perlindungan dasar kepada masyarakat.
              </p>
              <p>
                Dengan komitmen melayani seluruh lapisan masyarakat, Jasa Raharja telah membantu jutaan korban 
                kecelakaan lalu lintas dan penumpang mendapatkan santunan yang menjadi hak mereka. Kami terus 
                berinovasi untuk memberikan pelayanan terbaik melalui transformasi digital.
              </p>
              <p>
                Kantor SAMSAT Sidoarjo merupakan bagian integral dari upaya kami memberikan layanan yang mudah 
                diakses oleh masyarakat. Dengan sistem informasi digital ini, proses pengajuan klaim menjadi 
                lebih cepat, transparan, dan efisien.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <Eye className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visi</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi penyelenggara asuransi sosial dan komersial terkemuka yang memberikan 
                perlindungan dan nilai tambah optimal kepada stakeholder.
              </p>
            </Card>

            <Card className="p-8">
              <Target className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Misi</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Memberikan perlindungan asuransi sosial yang optimal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Meningkatkan kesadaran masyarakat akan pentingnya asuransi</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Memberikan layanan prima dengan SDM professional</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Keunggulan Digital</h2>
            <p className="text-gray-600 text-lg">
              Sistem informasi modern untuk pelayanan yang lebih baik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center" hover>
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Sejarah & Milestone</h2>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold">
                      {item.year}
                    </div>
                  </div>
                  <div className="ml-6 flex-grow">
                    <Card className="p-6">
                      <p className="text-gray-700 font-medium">{item.event}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Activity } from 'lucide-react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-6 tracking-tight">
          Smarter Complaint <br /> Management.
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mb-12">
          Leverage AI to automatically categorize, route, and resolve complaints faster than ever before.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]">
            Get Started Free
          </Link>
          <Link to="/login" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors border border-slate-700">
            Login
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
          <div className="glass-panel p-8 rounded-2xl text-left border border-slate-800/50">
            <Zap className="text-yellow-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Analysis</h3>
            <p className="text-slate-400">Instantly detects urgency and automatically routes complaints to the right department.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl text-left border border-slate-800/50">
            <Activity className="text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Real-time Tracking</h3>
            <p className="text-slate-400">Keep users updated with real-time status tracking and transparent history.</p>
          </div>
          <div className="glass-panel p-8 rounded-2xl text-left border border-slate-800/50">
            <ShieldCheck className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-bold text-white mb-2">Secure & Reliable</h3>
            <p className="text-slate-400">Enterprise-grade security ensuring all user data and complaints are kept safe.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

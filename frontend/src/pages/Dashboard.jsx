import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${apiUrl}/api/complaints`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        
        const complaints = res.data;
        
        setStats({
          total: complaints.length,
          pending: complaints.filter(c => c.status === 'Pending').length,
          inProgress: complaints.filter(c => c.status === 'In Progress').length,
          resolved: complaints.filter(c => c.status === 'Resolved').length
        });
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchComplaints();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Complaints', value: stats.total, icon: <FileText size={24} />, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { title: 'Pending', value: stats.pending, icon: <Clock size={24} />, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    { title: 'In Progress', value: stats.inProgress, icon: <AlertTriangle size={24} />, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
    { title: 'Resolved', value: stats.resolved, icon: <CheckCircle size={24} />, color: 'bg-green-500/10 text-green-400 border-green-500/20' }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-slate-400">Here's an overview of the complaint system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div key={idx} className={`glass-panel rounded-xl p-6 border ${card.color}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium opacity-80 mb-1">{card.title}</p>
                <h3 className="text-3xl font-bold">{card.value}</h3>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-xl border border-slate-800 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Need to register an issue?</h2>
          <p className="text-slate-400 mb-6">Our AI will automatically categorize and prioritize your complaint for faster resolution.</p>
          <Link to="/complaints/new" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">
            Create New Complaint
          </Link>
        </div>
        
        <div className="glass-panel p-6 rounded-xl border border-slate-800 text-center">
          <h2 className="text-xl font-bold text-white mb-4">Track existing complaints</h2>
          <p className="text-slate-400 mb-6">View the status of your reported issues and see AI-generated insights and summaries.</p>
          <Link to="/complaints" className="inline-block bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-slate-700">
            View Complaints
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ComplaintCard from '../components/ComplaintCard';
import { toast } from 'react-toastify';
import { Search, Filter } from 'lucide-react';

const ComplaintList = () => {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchLocation, setSearchLocation] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      let url = `${apiUrl}/api/complaints`;
      const params = new URLSearchParams();
      if (searchLocation) params.append('location', searchLocation);
      if (filterCategory) params.append('category', filterCategory);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setComplaints(res.data);
    } catch (error) {
      toast.error('Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchComplaints();
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchComplaints();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.put(
        `${apiUrl}/api/complaints/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success('Status updated successfully');
      setComplaints(complaints.map(c => c._id === id ? { ...c, status: newStatus } : c));
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${apiUrl}/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Complaint deleted successfully');
      setComplaints(complaints.filter(c => c._id !== id));
    } catch (error) {
      toast.error('Failed to delete complaint');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Complaints</h1>
          <p className="text-slate-400">Manage and track all registered complaints.</p>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          
          <div className="relative flex-1 sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Filter size={16} />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                // In a real app we'd trigger fetch here too, or have a submit button
              }}
              className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
            >
              <option value="">All Categories</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Electricity">Electricity</option>
              <option value="Sanitation & Garbage">Sanitation</option>
              <option value="Road & Transport">Roads</option>
              <option value="Public Safety">Public Safety</option>
            </select>
          </div>
          
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : complaints.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 mb-4">
            <Filter size={24} className="text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No complaints found</h3>
          <p className="text-slate-400">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map(complaint => (
            <ComplaintCard 
              key={complaint._id} 
              complaint={complaint} 
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;

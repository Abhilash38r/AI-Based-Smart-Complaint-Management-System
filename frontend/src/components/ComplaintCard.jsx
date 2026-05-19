import { MapPin, Calendar, Tag, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const ComplaintCard = ({ complaint, onStatusChange, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'In Progress': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'Resolved': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    if (!priority) return 'hidden';
    const p = priority.toLowerCase();
    if (p.includes('critical')) return 'bg-red-500/10 text-red-500 border-red-500/20';
    if (p.includes('high')) return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    if (p.includes('medium')) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all shadow-sm hover:shadow-md flex flex-col h-full relative overflow-hidden">
      {complaint.aiAnalysis && (
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl"></div>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-white line-clamp-1 flex-1 pr-2">{complaint.title}</h3>
        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border whitespace-nowrap ${getStatusBadgeClass(complaint.status)}`}>
          {complaint.status}
        </span>
      </div>
      
      <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-1">
        {complaint.description}
      </p>
      
      <div className="flex flex-col gap-2 mb-4 text-xs font-medium text-slate-500">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-slate-600" />
          {complaint.category}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-slate-600" />
          {complaint.location}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-600" />
          {formatDate(complaint.createdAt)}
        </div>
      </div>

      {complaint.aiAnalysis && (
        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-3 mb-4 mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <Bot size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300">AI Insights</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded border ${getPriorityBadgeClass(complaint.aiAnalysis.priority)}`}>
              {complaint.aiAnalysis.priority || 'Unknown'} Priority
            </span>
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded border bg-slate-800 border-slate-700 text-slate-300">
              {complaint.aiAnalysis.department || 'General'} Dept
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
        <div className="flex gap-2">
          <select 
            value={complaint.status} 
            onChange={(e) => onStatusChange(complaint._id, e.target.value)}
            className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-indigo-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onDelete(complaint._id)}
            className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;

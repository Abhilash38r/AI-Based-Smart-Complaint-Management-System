import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, PlusCircle, BarChart2 } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const links = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/complaints', label: 'Complaints', icon: <FileText size={20} /> },
    { path: '/complaints/new', label: 'New Complaint', icon: <PlusCircle size={20} /> },
    { path: '/analysis', label: 'AI Analysis', icon: <BarChart2 size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col min-h-[calc(100vh-73px)] p-4">
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
              isActive(link.path)
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.15)]'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

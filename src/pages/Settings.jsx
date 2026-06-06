import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEmployees } from '../context/EmployeeContext';
import {
  Settings, LogOut, RefreshCw, Users, History,
  ChevronRight, AlertTriangle, X, Clock, User
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Settings.css';

const SettingsPage = () => {
  const { logout, user } = useAuth();
  const { employees } = useEmployees();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null); // 'restart' | 'logout'

  // Mock history log
  const [history] = useState([
    { id: 1, action: 'Employee Added', detail: 'John Doe (EMP001) was added', time: '2026-06-06 10:30 AM' },
    { id: 2, action: 'Employee Updated', detail: 'Jane Smith (EMP002) salary updated', time: '2026-06-06 11:00 AM' },
    { id: 3, action: 'Employee Deleted', detail: 'Mark Lee (EMP003) was removed', time: '2026-06-06 11:45 AM' },
    { id: 4, action: 'Admin Login', detail: 'hari27@gmail.com logged in', time: '2026-06-06 09:00 AM' },
    { id: 5, action: 'Employee Added', detail: 'Priya Kumar (EMP004) was added', time: '2026-06-05 03:15 PM' },
    { id: 6, action: 'Employee Updated', detail: 'Ravi Shankar (EMP005) position changed', time: '2026-06-05 04:00 PM' },
  ]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleRestart = () => {
    setShowConfirm(null);
    toast.success('Application restarting...');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const settingsItems = [
    {
      key: 'employees',
      icon: <Users size={22} />,
      title: 'Employees',
      description: 'View and manage all employee records',
      color: '#3b82f6',
      bg: '#eff6ff',
      action: () => navigate('/dashboard/employees'),
    },
    {
      key: 'history',
      icon: <History size={22} />,
      title: 'History',
      description: 'View all recent activity and action logs',
      color: '#8b5cf6',
      bg: '#faf5ff',
      action: () => setActiveSection('history'),
    },
    {
      key: 'restart',
      icon: <RefreshCw size={22} />,
      title: 'Restart',
      description: 'Reload and restart the application',
      color: '#f59e0b',
      bg: '#fffbeb',
      action: () => setShowConfirm('restart'),
    },
    {
      key: 'logout',
      icon: <LogOut size={22} />,
      title: 'Log Out',
      description: 'Sign out from the admin dashboard',
      color: '#ef4444',
      bg: '#fef2f2',
      action: () => setShowConfirm('logout'),
    },
  ];

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <div className="settings-header-icon">
          <Settings size={28} />
        </div>
        <div>
          <h1>Settings</h1>
          <p>Manage your application preferences and account</p>
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="admin-info-card">
        <div className="admin-avatar">
          <User size={28} />
        </div>
        <div className="admin-details">
          <h3>Administrator</h3>
          <p>{user?.email}</p>
          <span className="admin-role-badge">Admin</span>
        </div>
        <div className="admin-stats">
          <div className="stat">
            <strong>{employees?.length || 0}</strong>
            <span>Employees</span>
          </div>
          <div className="stat">
            <strong>{history.length}</strong>
            <span>Activities</span>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="settings-grid">
        {settingsItems.map((item) => (
          <button
            key={item.key}
            className="settings-card"
            onClick={item.action}
            id={`settings-${item.key}`}
          >
            <div className="settings-card-icon" style={{ background: item.bg, color: item.color }}>
              {item.icon}
            </div>
            <div className="settings-card-text">
              <h3 style={{ color: item.color }}>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <ChevronRight size={18} className="settings-chevron" />
          </button>
        ))}
      </div>

      {/* History Panel */}
      {activeSection === 'history' && (
        <div className="history-panel">
          <div className="history-panel-header">
            <h2><History size={20} /> Activity History</h2>
            <button className="close-panel-btn" onClick={() => setActiveSection(null)}>
              <X size={18} />
            </button>
          </div>
          <div className="history-list">
            {history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-dot" />
                <div className="history-info">
                  <strong>{item.action}</strong>
                  <p>{item.detail}</p>
                  <span><Clock size={12} /> {item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="confirm-dialog">
            <div className="confirm-icon" style={{ background: showConfirm === 'logout' ? '#fef2f2' : '#fffbeb' }}>
              <AlertTriangle size={32} style={{ color: showConfirm === 'logout' ? '#ef4444' : '#f59e0b' }} />
            </div>
            <h3>{showConfirm === 'logout' ? 'Log Out?' : 'Restart Application?'}</h3>
            <p>
              {showConfirm === 'logout'
                ? 'Are you sure you want to log out from the admin dashboard?'
                : 'This will reload the entire application. Any unsaved changes may be lost.'}
            </p>
            <div className="confirm-actions">
              <button className="btn-secondary" onClick={() => setShowConfirm(null)}>Cancel</button>
              <button
                className={showConfirm === 'logout' ? 'btn-danger' : 'btn-warning'}
                onClick={showConfirm === 'logout' ? handleLogout : handleRestart}
              >
                {showConfirm === 'logout' ? 'Yes, Log Out' : 'Yes, Restart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;

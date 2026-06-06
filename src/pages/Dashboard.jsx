import { useState, useMemo } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import { Users, Briefcase, DollarSign, Search, Plus } from 'lucide-react';
import EmployeeTable from '../components/Employee/EmployeeTable';
import EmployeeModal from '../components/Employee/EmployeeModal';
import './Dashboard.css';

const Dashboard = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Statistics
  const totalEmployees = employees.length;
  const uniqueDepartments = new Set(employees.map(e => e.department)).size;
  const totalSalary = employees.reduce((sum, emp) => sum + Number(emp.salary), 0);

  // Filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  // Handlers
  const handleAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data);
    } else {
      addEmployee(data);
    }
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);
    }
  };

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <div className="card-icon blue"><Users size={24} /></div>
          <div className="card-info">
            <h3>Total Employees</h3>
            <p>{totalEmployees}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon green"><Briefcase size={24} /></div>
          <div className="card-info">
            <h3>Active Departments</h3>
            <p>{uniqueDepartments}</p>
          </div>
        </div>
        <div className="card">
          <div className="card-icon purple"><DollarSign size={24} /></div>
          <div className="card-info">
            <h3>Total Payroll</h3>
            <p>${totalSalary.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-content">
        <div className="content-header">
          <h2>Employee Directory</h2>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by name or department..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={handleAdd}>
              <Plus size={18} />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        <EmployeeTable 
          employees={filteredEmployees} 
          onEdit={handleEdit} 
          onDelete={setEmployeeToDelete} 
        />
      </div>

      {/* Modals */}
      <EmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        employee={editingEmployee}
        onSave={handleSave}
      />

      {/* Delete Confirmation Modal */}
      {employeeToDelete && (
        <div className="modal-overlay">
          <div className="modal-content delete-confirm">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete the record for <strong>{employeeToDelete.name}</strong>? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setEmployeeToDelete(null)}>Cancel</button>
              <button className="btn-danger" onClick={handleDeleteConfirm}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

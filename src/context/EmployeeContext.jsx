import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 'EMP001', name: 'John Doe', email: 'john@company.com', department: 'Engineering', position: 'Senior Developer', salary: 120000, joinDate: '2023-01-15' },
      { id: 'EMP002', name: 'Jane Smith', email: 'jane@company.com', department: 'Design', position: 'UI/UX Designer', salary: 95000, joinDate: '2023-03-22' },
      { id: 'EMP003', name: 'Robert Johnson', email: 'robert@company.com', department: 'HR', position: 'HR Manager', salary: 85000, joinDate: '2022-11-10' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    const newEmployee = { ...employee, id: `EMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}` };
    setEmployees([...employees, newEmployee]);
    toast.success('Employee added successfully!');
  };

  const updateEmployee = (id, updatedData) => {
    setEmployees(employees.map(emp => (emp.id === id ? { ...emp, ...updatedData } : emp)));
    toast.success('Employee updated successfully!');
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    toast.success('Employee deleted successfully!');
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);

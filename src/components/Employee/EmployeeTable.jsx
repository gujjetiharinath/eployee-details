import { Edit2, Trash2 } from 'lucide-react';


const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No employees found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>ID</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Join Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>
                <div className="employee-info">
                  <div className="avatar-small">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <div className="emp-name">{emp.name}</div>
                    <div className="emp-email">{emp.email}</div>
                  </div>
                </div>
              </td>
              <td><span className="badge-id">{emp.id}</span></td>
              <td><span className={`dept-badge ${emp.department.toLowerCase()}`}>{emp.department}</span></td>
              <td>{emp.position}</td>
              <td>${Number(emp.salary).toLocaleString()}</td>
              <td>{new Date(emp.joinDate).toLocaleDateString()}</td>
              <td>
                <div className="action-buttons">
                  <button className="btn-icon edit" onClick={() => onEdit(emp)} title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button className="btn-icon delete" onClick={() => onDelete(emp)} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

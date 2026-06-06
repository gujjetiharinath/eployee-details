import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

const EmployeeModal = ({ isOpen, onClose, employee, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (employee) {
      reset(employee);
    } else {
      reset({
        name: '',
        email: '',
        department: '',
        position: '',
        salary: '',
        joinDate: ''
      });
    }
  }, [employee, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                {...register('name', { required: 'Name is required' })} 
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>
            
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email"
                  }
                })} 
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select 
                {...register('department', { required: 'Department is required' })}
                className={errors.department ? 'error' : ''}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="HR">HR</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
              {errors.department && <span className="error-message">{errors.department.message}</span>}
            </div>

            <div className="form-group">
              <label>Position</label>
              <input 
                {...register('position', { required: 'Position is required' })} 
                className={errors.position ? 'error' : ''}
              />
              {errors.position && <span className="error-message">{errors.position.message}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Salary ($)</label>
              <input 
                type="number"
                {...register('salary', { 
                  required: 'Salary is required',
                  min: { value: 1, message: 'Salary must be positive' }
                })} 
                className={errors.salary ? 'error' : ''}
              />
              {errors.salary && <span className="error-message">{errors.salary.message}</span>}
            </div>

            <div className="form-group">
              <label>Date of Joining</label>
              <input 
                type="date"
                {...register('joinDate', { required: 'Date of joining is required' })} 
                className={errors.joinDate ? 'error' : ''}
              />
              {errors.joinDate && <span className="error-message">{errors.joinDate.message}</span>}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;

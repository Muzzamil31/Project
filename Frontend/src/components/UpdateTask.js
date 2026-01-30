import React, { useState, useEffect } from 'react';
import './UpdateTask.css'; 

//for updating the existing task
const UpdateTask = ({ selectedTask, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [photoName, setPhotoName] = useState('');

  // load selected task into form when editing 
  useEffect(() => {
    if (selectedTask) {
      setFormData({
        name: selectedTask.name || '',
        position: selectedTask.position || '',
        department: selectedTask.department || '',
        email: selectedTask.email || '',
        photo: selectedTask.photo || null,
      });

      //file name display 
      if (selectedTask.photo) {
        if (selectedTask.photo instanceof File) {
          setPreview(URL.createObjectURL(selectedTask.photo));
          setPhotoName(selectedTask.photo.name);
        } else if (typeof selectedTask.photo === 'string') {
          setPreview(selectedTask.photo);
          const parts = selectedTask.photo.split('/');
          setPhotoName(parts[parts.length - 1]);
        }
      }
    }
  }, [selectedTask]);
   
  // handles text input changes 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file));
      setPhotoName(file.name);
    }
  };

  //handles for submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Name and Email are required.');
      return;
    }
    onUpdate({ ...selectedTask, ...formData });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Employee</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Position</label>
            <input name="position" value={formData.position} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input name="department" value={formData.department} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Photo</label>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {photoName && (
              <p style={{ marginTop: '8px', color: '#555' }}>
                Selected file: <strong>{photoName}</strong>
              </p>
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                width="60"
                style={{ borderRadius: '50%', marginTop: '10px' }}
              />
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-success">Update</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
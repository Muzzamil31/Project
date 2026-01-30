import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // generates unique id for each tasks

//AddTask
const AddTask = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]); // saves selected files to states
  };

  const handleSubmit = () => {
    if (!name || !email) {
      alert('Name and Email are required.');
      return;
    }
    // creates new object with unique id
    const formData = {
      id: uuidv4(),
      name,
      position,
      department,
      email,
      photo,
    };
    
    //resets the form fields
    console.log('Form submitted:', formData);
    onAdd(formData); // Send to parent
    // Optionally reset form
    setName('');
    setPosition('');
    setDepartment('');
    setEmail('');
    setPhoto(null);
  };

  return (
    <div className="box">
      <div className="Demo">
        <h2>Employee Management</h2>

        <label>Name</label><br />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />

        <label>Position</label><br />
        <input
          type="text"
          placeholder="Enter your position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        /><br />

        <label>Department</label><br />
        <input
          type="text"
          placeholder="Enter your department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        /><br />

        <label>Email</label><br />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <label>Upload photo</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        /><br />

        <button type="button" className="submit" onClick={handleSubmit}>
          Add Data
        </button>
      </div>
    </div>
  );
};

export default AddTask;
export const BASE_URL = 'http://192.168.0.137:5000'; 
//! Login
export const loginUser = async ({ email, password }) => {
  // Send POST request to login endpoint with email and password
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json(); //parse response to json
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
};

//! Sign UP
// Function to register a new user
export const signupUser = async ({ name, email, password }) => {
  // Send POST request to register endpoint
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  //reads raw response text
  const text = await response.text();
  console.log('Raw response:', text);

  try {
    const data = JSON.parse(text);
    if (!response.ok) throw new Error(data.message || 'Signup failed');
    return data;
  } catch (err) {
    throw new Error('Invalid response from server');
  }
};


//!  EMPLOYEE CRUD
//Read
export const fetchEmployees = async () => {
  const response = await fetch(`${BASE_URL}/api/employees`);
  const data = await response.json();
  // If response is not OK, throw error
  if (!response.ok) throw new Error(data.message || 'Failed to fetch employees');
  return data;
};

//Create
export const addEmployee = async (formData) => {
  const response = await fetch(`${BASE_URL}/api/employees`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  // If response is not OK, throw error
  if (!response.ok) throw new Error(data.message || 'Failed to add employee');
  return data;
};

//Update
export const updateEmployee = async (id, formData) => {
  const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
    method: 'PUT',
    body: formData,
  });
  const data = await response.json();
  // If response is not OK, throw error
  if (!response.ok) throw new Error(data.message || 'Failed to update employee');
  return data;
};

//Delete
export const deleteEmployee = async (id) => {
  // Send DELETE request to remove employee
  const response = await fetch(`${BASE_URL}/api/employees/${id}`, {
    method: 'DELETE',
  });
  const data = await response.json();
  // If response is not OK, throw error
  if (!response.ok) throw new Error(data.message || 'Failed to delete employee');
  return data;
};
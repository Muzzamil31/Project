const express = require('express'); // Import Express framework
const multer = require('multer'); // Import Multer for handling file uploads
const { v4: uuidv4 } = require('uuid'); // Import UUID generator for unique employee IDs
const Employee = require('../models/Employee'); // Import Mongoose model for Employee

const router = express.Router(); // Create a new Express router instance

// Multer config
const storage = multer.diskStorage({
  // Set upload destination folder
  destination: (req, file, cb) => cb(null, 'uploads/'),
  // Generate unique filename using UUID
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
});

// Create Multer instance with custom storage
const upload = multer({ storage });

/** CREATE */
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    // Extract form fields from request body
    const { name, position, department, email } = req.body;
    // Get uploaded photo filename if available
    const photo = req.file ? req.file.filename : null;
    // Create new employee document
    const newEmployee = new Employee({
      id: uuidv4(),
      name,
      position,
      department,
      email,
      photo,
    });
    // Save to database
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Failed to add employee' });
  }
});

/** READ */
router.get('/', async (req, res) => {
  try {
    // Fetch all employee documents
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

/** UPDATE */
// Route to update an employee by ID
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    // Extract updated fields from request body
    const { name, position, department, email } = req.body;

    // Get new photo filename if uploaded
    const photo = req.file ? req.file.filename : undefined;

    // Update employee using dynamic field merging
    const updated = await Employee.findOneAndUpdate(
      { id: req.params.id }, // Match by custom ID
      {
        ...(name && { name }),
        ...(position && { position }),
        ...(department && { department }),
        ...(email && { email }),
        ...(photo && { photo }),
      },
      { new: true } // Return updated document
    );

    // If employee not found, return 404
    if (!updated) return res.status(404).json({ error: 'Employee not found' });

    // Respond with updated employee data
    res.json(updated);
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Failed to update employee' });
  }
});

/** DELETE */
// Route to delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete employee document by custom ID
    const deleted = await Employee.findOneAndDelete({ id: req.params.id });

    // If employee not found return 404
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });

    // Respond with confirmation and deleted data
    res.json({ message: 'Employee deleted', deleted });
  } catch (err) {
    // Handle server error
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

module.exports = router;
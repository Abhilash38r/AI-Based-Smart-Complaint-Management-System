const Complaint = require('../models/Complaint');

// @desc    Get all complaints (with optional location filter)
// @route   GET /api/complaints
// @access  Private
exports.getComplaints = async (req, res) => {
  try {
    let query = {};
    if (req.query.location) {
      query.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.category) {
      query.category = { $regex: req.query.category, $options: 'i' };
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search complaints by location (Explicit route)
// @route   GET /api/complaints/search?location=Ghaziabad
// @access  Private
exports.searchComplaints = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location query parameter is required' });
    }
    const complaints = await Complaint.find({ location: { $regex: location, $options: 'i' } });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new complaint
// @route   POST /api/complaints
// @access  Private
exports.addComplaint = async (req, res) => {
  try {
    const { name, email, title, description, category, location } = req.body;

    if (!name || !email || !title || !description || !category || !location) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    if (description.length < 10) {
      return res.status(400).json({ message: 'Description must be at least 10 characters long' });
    }

    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
    });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = status;
    const updatedComplaint = await complaint.save();

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a complaint
// @route   DELETE /api/complaints/:id
// @access  Private
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    await complaint.deleteOne();
    res.json({ message: 'Complaint removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

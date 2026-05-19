const express = require('express');
const router = express.Router();
const {
  getComplaints,
  addComplaint,
  updateComplaintStatus,
  deleteComplaint,
  searchComplaints
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getComplaints)
  .post(protect, addComplaint);

router.get('/search', protect, searchComplaints);

router.route('/:id')
  .put(protect, updateComplaintStatus)
  .delete(protect, deleteComplaint);

module.exports = router;

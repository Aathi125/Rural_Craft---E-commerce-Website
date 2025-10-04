import express from 'express';
import {
  createAppointment,
  getAppointmentsByUser,
  getAppointmentsBySeller,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  getAllAppointments,
  getAnalytics
} from '../controller/appointmentController.js';

const router = express.Router();

// 📌 Create new appointment (Buyer)
router.post('/', createAppointment);

// 📌 Get all appointments (Admin)
router.get('/', getAllAppointments);

// 📌 Get appointments for a specific Buyer
router.get('/user/:userId', getAppointmentsByUser);

// 📌 Get appointments for a specific Seller
router.get('/seller/:sellerId', getAppointmentsBySeller);

// 📌 Update appointment details (date, time, notes, location, etc.)
router.put('/:id', updateAppointment);

// 📌 Delete appointment
router.delete('/:id', deleteAppointment);

// 📌 Update only appointment status (pending, confirmed, cancelled)
router.patch('/:id/status', updateAppointmentStatus);

// 📌 Get analytics (Admin Dashboard)
router.get('/analytics/data', getAnalytics);
export default router;
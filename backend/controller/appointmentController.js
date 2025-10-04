import Appointment from '../models/Appointment.js';

// 📌 Create Appointment
export const createAppointment = async (req, res) => {
  try { console.log("📨 Incoming data:", req.body);
    const appointment = new Appointment(req.body);
    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create appointment', details: err });
  }
};

// 📌 Get Appointments by User
export const getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.userId }).populate('productId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user appointments' });
  }
};

// 📌 Get Appointments by Seller
export const getAppointmentsBySeller = async (req, res) => {
  try {
    const appointments = await Appointment.find({ sellerId: req.params.sellerId }).populate('productId userId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch seller appointments' });
  }
};
/**
 * 📌 Get all appointments (Admin)
 */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('productId');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Update Appointment (user, only if pending)
export const updateAppointment = async (req, res) => {
  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Only allow updating if the appointment status is 'pending'
    if (appointment.status !== 'pending') {
      return res.status(403).json({ error: 'Only pending appointments can be updated' });
    }

    // Extract fields from the request body, only update fields that are provided
    const { name, email, phone, date, time, notes } = req.body;

    // Conditionally update only provided fields
    if (name) appointment.name = name;
    if (email) appointment.email = email;
    if (phone) appointment.phone = phone;
    if (date) appointment.date = date;
    if (time) appointment.time = time;
    if (notes !== undefined) appointment.notes = notes;  // Notes may be an empty string, hence checking with !== undefined

    // Save the updated appointment
    const updatedAppointment = await appointment.save();

    // Return the updated appointment as a response
    res.json({ message: 'Appointment updated successfully', appointment: updatedAppointment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment', details: err });
  }
};

// 📌 Delete Appointment (user, only if pending)
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    if (appointment.status !== 'pending') return res.status(403).json({ error: 'Only pending appointments can be deleted' });

    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};

// 📌 Confirm or Cancel Appointment (seller)
export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;
  if (!['confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('userId');

    const message = `📢 Dear ${appointment.userId.name}, your appointment has been ${status}.`;

    console.log(message); // Simulated notification

    res.json({ message, appointment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment status' });
  }
};
/**
 * 📌 Analytics (Admin Dashboard)
 */
export const getAnalytics = async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: "pending" });
    const confirmed = await Appointment.countDocuments({ status: "confirmed" });
    const cancelled = await Appointment.countDocuments({ status: "cancelled" });

    res.json({ total, pending, confirmed, cancelled });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
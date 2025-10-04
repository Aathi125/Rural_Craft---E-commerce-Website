import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: 'Users',
    required: true,
  },
  sellerId: {
    type:String, // have to change this
    //  mongoose.Schema.Types.ObjectId,
    // ref: 'Sellers',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  nationality: {
    type: String,
    enum: ['Sri Lankan', 'Foreigner'], // restrict choices
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: '',
    trim: true,
  },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
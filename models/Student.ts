import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rollNumber: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  sectionId: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
  guardianName: { type: String },
  guardianContact: { type: String },
  admissionDate: { type: Date, default: Date.now },
  bloodGroup: { type: String },
  age: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  authorInformation: { type: String },
  photo: { type: String },
}, { timestamps: true });

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);

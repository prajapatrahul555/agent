import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeId: { type: String, required: true },
  subjects: [{ type: String }],
  qualification: { type: String },
  experience: { type: String },
  salary: { type: Number },
  joiningDate: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);

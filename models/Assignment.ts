import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subject: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  dueDate: { type: Date, required: true },
  attachmentUrl: { type: String },
}, { timestamps: true });

export default mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);

import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  subjects: [{ type: String }],
  examDate: { type: Date, required: true },
  term: { type: String },
  academicYear: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Exam || mongoose.model('Exam', ExamSchema);

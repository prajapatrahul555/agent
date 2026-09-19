import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fileUrl: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  grade: { type: Number },
  feedback: { type: String },
}, { timestamps: true });

export default mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);

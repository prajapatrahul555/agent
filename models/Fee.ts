import mongoose from 'mongoose';

const FeeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
  paidDate: { type: Date },
  receiptNo: { type: String },
}, { timestamps: true });

export default mongoose.models.Fee || mongoose.model('Fee', FeeSchema);

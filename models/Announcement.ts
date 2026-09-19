import mongoose from 'mongoose';

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  targetRole: { type: String, enum: ['Admin', 'Teacher', 'Student', 'Parent', 'All'], required: true },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);

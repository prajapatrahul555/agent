import mongoose from 'mongoose';

const TimetableSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  section: { type: String, required: true },
  dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
  periods: [{
    subject: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  }],
}, { timestamps: true });

export default mongoose.models.Timetable || mongoose.model('Timetable', TimetableSchema);

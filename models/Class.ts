import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sections: [{ type: String }],
  classTeacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  subjects: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Class || mongoose.model('Class', ClassSchema);

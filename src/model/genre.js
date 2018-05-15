import mongoose from 'mongoose';

const { Schema } = mongoose;

const GenreSchema = new Schema({
  id: Number,
  name: String,
});

export default mongoose.model('Genre', GenreSchema);

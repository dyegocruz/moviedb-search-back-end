import mongoose from 'mongoose';

const { Schema } = mongoose;

const CollectionSchema = new Schema({
  id: Number,
  name: String,
  poster_path: String,
  backdrop_path: String,
});

export const collectionSchema = CollectionSchema;
export default mongoose.model('Collection', CollectionSchema);

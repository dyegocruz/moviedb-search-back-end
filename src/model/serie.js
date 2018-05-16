import mongoose from 'mongoose';

const { Schema } = mongoose;

const SerieSchema = new Schema({
  original_name: String,
  id: Number,
  name: String,
  vote_count: Number,
  vote_average: Number,
  poster_path: String,
  first_air_date: Date,
  popularity: Number,
  genre_ids: [Number],
  original_language: String,
  backdrop_path: String,
  overview: String,
  origin_country: String,
});

export default mongoose.model('Serie', SerieSchema);

import mongoose from 'mongoose';

const { Schema } = mongoose;

const MovieSchema = new Schema({
  vote_count: Number,
  id: Number,
  video: Boolean,
  vote_average: Number,
  title: String,
  popularity: Number,
  poster_path: String,
  original_language: String,
  original_title: String,
  genres: [],
  production_companies: {},
  production_countries: {},
  belongs_to_collection: {},
  spoken_languages: [],
  backdrop_path: String,
  adult: Boolean,
  overview: String,
  release_date: Date,
});

export default mongoose.model('Movie', MovieSchema);

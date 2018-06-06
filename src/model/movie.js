import mongoose from 'mongoose';
import { genreSchema } from './genre';
import { collectionSchema } from './collection';
import { productionCompanySchema } from './productionCompany';
import { productionCountrySchema } from './productionCountry';
import { spokenLanguageSchema } from './spokenLanguage';

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
  genres: { type: [genreSchema] },
  genre_ids: [Number],
  production_companies: { type: [productionCompanySchema] },
  production_countries: { type: [productionCountrySchema] },
  belongs_to_collection: { type: collectionSchema },
  spoken_languages: { type: [spokenLanguageSchema] },
  backdrop_path: String,
  adult: Boolean,
  overview: String,
  release_date: Date,
  revenue: Number,
  runtime: Number,
  tagline: String,
  status: String,
  homepage: String,
});

export default mongoose.model('Movie', MovieSchema);

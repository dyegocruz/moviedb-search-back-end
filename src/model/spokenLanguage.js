import mongoose from 'mongoose';

const { Schema } = mongoose;

const SpokenLanguageSchema = new Schema({
  iso_639_1: String,
  name: String,
});

export const spokenLanguageSchema = SpokenLanguageSchema;
export default mongoose.model('SpokenLanguage', SpokenLanguageSchema);

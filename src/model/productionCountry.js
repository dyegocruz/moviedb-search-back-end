import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductionCountrySchema = new Schema({
  iso_3166_1: String,
  name: String,
});

export const productionCountrySchema = ProductionCountrySchema;
export default mongoose.model('ProductionCountry', ProductionCountrySchema);

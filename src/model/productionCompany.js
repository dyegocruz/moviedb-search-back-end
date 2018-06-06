import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductionCompanySchema = new Schema({
  id: Number,
  name: String,
  logo_path: String,
  origin_country: String,
});

export const productionCompanySchema = ProductionCompanySchema;
export default mongoose.model('ProductionCompany', ProductionCompanySchema);

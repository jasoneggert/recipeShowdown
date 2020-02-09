import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    ingredients: [],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);
const Ingedient = new mongoose.Schema({
  value: Number,
  measurement: String,
  name: String,
});
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

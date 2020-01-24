import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

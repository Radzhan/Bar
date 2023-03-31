import mongoose, { Types } from "mongoose";
import User from './User';
import {Ingredient} from '../types';
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		validate: {
			validator: async (value: Types.ObjectId) => User.findById(value),
			message: "User does not exist",
		},
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	recept: {
		type: String,
		required: true,
	},
	isPublished: {
		type: Boolean,
		required: true,
		default: false,
	},
	ingredients: {
		type:<Ingredient[]> [],
		required: true,
	}

});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);
export default Ingredient;

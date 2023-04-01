import * as express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import Ingredient from '../model/Ingridient';

const IngredientRouter = express.Router();

IngredientRouter.get("/", auth, async (req, res, next) => {
	try {
		const object = (req as RequestWithUser).user;

		if (object.role === 'admin') {
			const result = await Ingredient.find();

			return res.send(result);
		} else {
			const result = await Ingredient.find({isPublished: true});

			return res.send(result);
		}

	} catch (e) {
		return next(e);
	}
});

IngredientRouter.get("/coctails", auth, async (req, res, next) => {
	try {
		const object = (req as RequestWithUser).user;

		const result = await Ingredient.find({user: object._id});

		return res.send(result);

	} catch (e) {
		return next(e);
	}
});

IngredientRouter.get("/:id", async (req, res) => {
	try {
		const result = await Ingredient.findById(req.params.id);

		if (!result) {
			return res.sendStatus(404);
		}

		return res.send(result);
	} catch {
		res.sendStatus(500);
	}
});

IngredientRouter.patch("/:id", auth, permit('admin'), async (req, res) => {
	try {
		const request = await Ingredient.findById({_id: req.params.id});

		if (!request) {
			return res.status(403).send({error: 'no Coctail'});
		}

		await Ingredient.updateOne({_id: request._id}, {isPublished: !request.isPublished});
		res.send({message: "item was updated"});
	} catch (e) {
		res.status(400).send(e);
	}
});

IngredientRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
	try {
		const ingredientData = {
			user: req.body.user,
			name: req.body.name,
			recept: req.body.recept,
			image: req.file ? req.file.filename : null,
			ingredients: req.body.ingredients,
		};

		console.log(ingredientData);

		await Ingredient.create(ingredientData);

		return res.send(ingredientData);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.sendStatus(400).send(e);
		} else {
			return next(e);
		}
	}
});

IngredientRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
	try {
		const request = await Ingredient.findById({_id: req.params.id});

		if (!request) {
			return res.status(403).send({error: 'no artists'});
		}

		await Ingredient.deleteOne({_id: req.params.id});
		res.send({message: "item was deleted"});
	} catch (e) {
		res.status(400).send(e);
	}
});

export default IngredientRouter;

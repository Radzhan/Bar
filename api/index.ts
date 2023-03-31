import mongoose from 'mongoose';
import config from './config';
import cors from 'cors';
import express from 'express';
import userRouter from './router/user';
import IngredientRouter from './router/ingredient';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/ingredients", IngredientRouter);

const run = async () => {
	mongoose.set("strictQuery", false);
	app.use(express.static("public"));
	await mongoose.connect(config.db);

	app.listen(port, () => {
		console.log("we are live on " + port);
	});

	process.on("exit", () => {
		mongoose.disconnect();
	});
};

run().catch(console.error);


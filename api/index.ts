import * as mongoose from 'mongoose';
import config from './config';
import * as cors from 'cors';
import * as express from 'express';
import userRouter from './router/user';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

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


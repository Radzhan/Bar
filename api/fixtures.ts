import mongoose from "mongoose";
import config from "./config";
import User from "./model/User";
import * as crypto from 'crypto';
import Ingredient from './model/Ingridient';

const run = async () => {
	await mongoose.connect(config.db);
	const db = mongoose.connection;

	try {
		await db.dropCollection("ingredients");
		await db.dropCollection('users');
	} catch (e) {
		console.log("Collections were not present, skipping drop...");
	}

	const [user1, user2] = await User.create(
		{
			username: 'Sasha',
			password: '12345',
			role: 'user',
			token: crypto.randomUUID(),
			displayName: 'Sany',
			avatar: 'fixtures/user1.png'
		},
		{
			username: 'Bermet',
			password: 'qwerty',
			role: 'admin',
			token: crypto.randomUUID(),
			displayName: 'Beka',
			avatar: 'fixtures/user2.jpeg'
		}
	)

	await Ingredient.create(
		{
			user: user1._id,
			name: "1 name",
			image: "fixtures/wine.jpeg",
			isPublished: true,
			recept: '1 resept',
			ingredients: [{name: '1 ing', col: '1'}, {name: '2 ing', col: '2'}]
		},
		{
			user: user2._id,
			name: "2 name",
			image: "fixtures/tequila.jpeg",
			isPublished: true,
			recept: '2 resept',
			ingredients: [{name: '1 ing', col: '1'}, {name: '2 ing', col: '2'}]
		},
		{
			user: user1._id,
			name: "3 name",
			image: "fixtures/whiski.jpeg",
			isPublished: false,
			recept: '3 resept',
			ingredients: [{name: '1 ing', col: '1'}, {name: '2 ing', col: '2'}]
		},
	);

	await db.close();
};

run().catch(console.error);

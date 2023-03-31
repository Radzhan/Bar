import multer from 'multer';
import path from 'path';
import config from './config';
import { promises as fs } from "fs";
import {randomUUID} from 'crypto';

const imageStorage = multer.diskStorage({
	destination: async (_req, _file, cb) => {
		const destDir = path.join(config.publicPath, "images");
		await fs.mkdir(destDir, { recursive: true });
		cb(null, config.publicPath);
	},

	filename: (_req, file, cb) => {
		const extension = path.extname(file.originalname);
		cb(null, "images/" + randomUUID() + extension);
	},
});

export const imagesUpload = multer({ storage: imageStorage });

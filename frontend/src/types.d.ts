export interface ArrayIng {
	name: string;
	col: string;
}

export interface RegisterMutation {
	username: string;
	password: string;
	displayName: string;
	avatar: File | null;
}

export interface Ingredient{
	user: string;
	name: string;
	image: string;
	recept: string;
	_id: string;
	isPublished: boolean;
	ingredients: ArrayIng[];
}

export interface IngreMutation {
	user: string;
	name: string;
	image: File | null;
	recept: string;
	ingredients: ArrayIng[];
}

export interface User {
	_id: string;
	password: string;
	username: string;
	token: string;
	role: string;
	displayName: string;
	googleId: string | null;
	avatar: string;
}

export interface RegisterResponse {
	message: string;
	user: User;
}

export interface ValidationError {
	errors: {
		[key: string]: {
			name: string;
			message: string;
		}
	},
	message: string;
	name: string;
	_name: string;
}

export interface LoginMutation {
	username: string;
	password: string;
}

export interface GlobalError {
	error: string;
}
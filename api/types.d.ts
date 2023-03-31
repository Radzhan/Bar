export interface IUser {
	username: string;
	password: string;
	token: string;
	role: string;
	displayName: string;
	googleId?: string;
	avatar: string;
}

export interface Ingredient {
	name: string;
	col: string;
}

import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import axiosApi from "../axiosApi";
import {Ingredient, IngreMutation} from '../types';

interface menuInterface {
	allIngredients: Ingredient[]
	ingredient: Ingredient;
	myCocktails: Ingredient[];
}

const initialState: menuInterface = {
	allIngredients: [],
	ingredient: {
		user: '',
		name:'',
		image: '',
		recept: '',
		_id: '',
		isPublished: false,
		ingredients: [],
	},
	myCocktails: [],
};

export const getAll = createAsyncThunk<Ingredient[]>('menu/getAll', async () => {
	const response = await axiosApi.get('ingredients');

	return response.data;
});

export const getOne = createAsyncThunk<Ingredient, string>('menu/getOne', async  (arg) => {
	const response = await axiosApi.get('ingredients/'+ arg);

	return response.data
});

export const deleteOne = createAsyncThunk<void, string>('menu/deleteOne', async (arg) => {
	await axiosApi.delete('/ingredients/' + arg);
});

export const isPublicate = createAsyncThunk<void, string>('menu/menu/Publicate',async (arg) => {
	await axiosApi.patch('/ingredients/'+ arg);
});

export const getCocktails = createAsyncThunk<Ingredient[]>('menu/Coctails',  async () => {
	const response = await axiosApi.get('/ingredients/coctails');

	return response.data;
});

export const postCocktail = createAsyncThunk<void, IngreMutation>('menu/Post/Cocktail', async (arg) => {
	await axiosApi.post('/ingredients' , arg);
});

export const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.allIngredients = action.payload;
		});
		builder.addCase(getOne.fulfilled, (state,action) => {
			state.ingredient = action.payload;
		});
		builder.addCase(getCocktails.fulfilled, (state,action) => {
			state.myCocktails = action.payload;
		});
	},
});

export const menuReducer = menuSlice.reducer;

export const ArrayIngredients = (state: RootState) => state.menu.allIngredients;
export const OneIngredient = (state: RootState) => state.menu.ingredient;
export const MyCocktails = (state: RootState) => state.menu.myCocktails;

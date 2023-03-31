import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store";
import axiosApi from "../axiosApi";
import {Ingredient} from '../types';

interface menuInterface {
	allIngredients: Ingredient[]
}

const initialState: menuInterface = {
	allIngredients: []
};

export const getAll = createAsyncThunk<Ingredient[]>('menu/getAll', async () => {
	const response = await axiosApi.get('ingredients');

	return response.data;
});



export const menuSlice = createSlice({
	name: "Menu",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAll.fulfilled, (state, action) => {
			state.allIngredients = action.payload;
		});
	},
});

export const menuReducer = menuSlice.reducer;

export const ArrayIngredients = (state: RootState) => state.menu.allIngredients;

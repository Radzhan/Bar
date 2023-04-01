import React, {useState} from "react";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector,} from "../../app/hooks";
import InputBtn from "../../components/InputBtn/InputBtn";
import {useNavigate} from "react-router-dom";
import {postCocktail} from '../../store/menuSlice';
import {selectUser} from '../../features/user/userSlice';

const AddNew = () => {
	const user = useAppSelector(selectUser)!;
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [state, setState] = useState({
		name: "",
		recept: "",
		ingredients: [{name: '', col: ''}],
		image: null,
	});

	const submitFormHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		await dispatch(postCocktail({
			user: user?._id,
			name: state.name,
			recept: state.recept,
			ingredients: state.ingredients,
			image: state.image,
		}));
		navigate('/');
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setState((prevState) => {
			return {...prevState, [name]: value};
		});
	};

	const inputHandlerName = (arg: {name: string, index: number}) => {
		setState(prev => ({...prev, ...prev.ingredients = [ prev.ingredients[arg.index] = {name: arg.name, col: prev.ingredients[arg.index].col}]}))
	};

	const inputHandlerCol = (arg: { col: string, index: number}) => {

		setState(prev => ({...prev, ...prev.ingredients = [ prev.ingredients[arg.index] = {name: prev.ingredients[arg.index].name, col: arg.col}]}))
	};
	const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, files} = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: files && files[0] ? files[0] : null,
		}));
	};

	const addNewIngredient = () => {
		setState(prev => ({
			name: prev.name,
			recept: prev.recept,
			ingredients: [...prev.ingredients, {name: '', col: ''}],
			image: prev.image,
		}))
	}


	const removeIngredient = (index: number) => {
		let array = [...state.ingredients];
		array.splice(index,1)
		setState(prev => ({
			...prev,
			ingredients: array,
		}))
	}

	const createInput = state.ingredients.map((element, index) => {
		return <div style={{display: 'flex'}} key={index}>
			<Grid item xs>
				<TextField
					id={index + '1'}
					label="Ingredient name"
					value={state.ingredients[index].name}
					onChange={(e) => inputHandlerName({name: e.target.value, index})}
					name={element.name}
					required
				/>
			</Grid>
			<Grid item xs>
				<TextField
					id={index + '2'}
					label="Amount"
					value={state.ingredients[index].col}
					onChange={(e) => inputHandlerCol({col: e.target.value, index})}
					name={element.col}
					required
				/>
				<Button type="button" color="primary" variant="contained" onClick={() => removeIngredient(index)}>
					Delete
				</Button>
			</Grid>
		</div>
	})

	return (
		<Container maxWidth="xl">
			<form autoComplete="off" onSubmit={submitFormHandler}>
				<Grid container direction="column" spacing={2}>
					<Grid item xs>
						<TextField
							id="title"
							label="Name"
							value={state.name}
							onChange={inputChangeHandler}
							name="name"
							required
						/>
					</Grid>
					<div>
						{createInput}
						<Button type="button" color="primary" variant="contained" onClick={addNewIngredient}>
							Add Ingredient
						</Button>
					</div>

					<Grid item xs>
						<TextField
							id="recept"
							label="Recept"
							value={state.recept}
							onChange={inputChangeHandler}
							name="recept"
							required
						/>
					</Grid>

					<Grid item xs>
						<InputBtn
							label="Image"
							onChange={fileInputChangeHandler}
							name="image"
						/>
					</Grid>

					<Grid item xs>
						<Button type="submit" color="primary" variant="contained">
							Create
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default AddNew;

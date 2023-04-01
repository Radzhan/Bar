import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getOne, OneIngredient} from '../../store/menuSlice';
import {useParams} from 'react-router-dom';
import {apiURL} from '../../constants';

const Ingredient = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const ingredient = useAppSelector(OneIngredient);

	const getIngredient = useCallback(async () => {
		await dispatch(getOne(id!))
	}, [dispatch])

	useEffect(() => {
		getIngredient().catch(console.error)
	}, [getIngredient])

	return (
		<div>
			<div style={{display: 'flex'}}>
				<img alt='img' src={apiURL + '/' + ingredient.image} style={{height: '350px', width: '250px',margin: '0 50px 50px 15px'}}/>
				<div>
					<h2>{ingredient.name}</h2>
					<b>Ingredients: </b>
					<ul style={{padding: '15px', margin:0}}>
						{ingredient.ingredients.map((element,idx) => {
							return <li key={idx}>{element.name} - {element.col}</li>
						})}
					</ul>
				</div>
			</div>
			<div style={{marginLeft: '15px'}}>
				<b>Recipe</b>
				<p>{ingredient.recept}</p>
			</div>
		</div>
	);
};

export default Ingredient;
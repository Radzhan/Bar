import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getCocktails, MyCocktails} from '../../store/menuSlice';
import CardForMenu from '../../components/CardForMenu/CardForMenu';

const MyCoctails = () => {
	const arrayWithCocktails = useAppSelector(MyCocktails);
	const dispatch = useAppDispatch();

	const requestArtist = useCallback(async () => {
		await dispatch(getCocktails());
	}, [dispatch]);

	useEffect(() => {
		requestArtist().catch(console.error);
	}, [requestArtist]);

	const createCard = arrayWithCocktails.map((element) => {
		return (
			<CardForMenu
				role={'user'}
				name={element.name}
				image={element.image}
				key={element._id}
				id={element._id}
				isPublished={element.isPublished}
			/>
		);
	});
	return (
		<div>
			{createCard}
		</div>
	);
};

export default MyCoctails;
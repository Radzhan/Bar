import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser} from "../../features/user/userSlice";
import {ArrayIngredients, getAll} from '../../store/menuSlice';
import CardForMenu from '../../components/CardForMenu/CardForMenu';

const Main = () => {
	const arrayWithIngre = useAppSelector(ArrayIngredients);
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	const requestArtist = useCallback(async () => {
		await dispatch(getAll());
	}, [dispatch]);

	useEffect(() => {
		requestArtist().catch(console.error);
	}, [requestArtist]);

	// const onDelete = async (num: string) => {
	// 	await dispatch(deleteArtist(num));
	// 	await dispatch(getArtists());
	// };


	const createCard = arrayWithIngre.map((element) => {
		if (user?.role === 'user' || user === null) {
			if (element.isPublished) {
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
			}
		} else {
			return (
				<div key={element._id}>
					<CardForMenu
						role={'admin'}
						name={element.name}
						image={element.image}
						id={element._id}
						isPublished={element.isPublished}
					/>
				</div>
			);
		}
	});

	return <div>{createCard}</div>;
};

export default Main;

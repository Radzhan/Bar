import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import React from 'react';
import {apiURL} from '../../constants';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {deleteOne, getAll, isPublicate} from '../../store/menuSlice';

interface Props {
	image: string;
	name: string;
	role: string;
	id: string;
	isPublished: boolean;
}

const CardForMenu: React.FC<Props> = ({image, name, role, isPublished, id}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onCardClick =  () => {
		navigate('/ingredient/' + id);
	};

	const Publicate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		await dispatch(isPublicate(id))
		await dispatch(getAll());
	}

	const onDelete = async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		await dispatch(deleteOne(id));
		await dispatch(getAll());
	};

	const cardImage = apiURL + '/' + image;

	return (
		<Card sx={{maxWidth: 345, mb: 3}} onClick={onCardClick}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image={cardImage}
					alt="green iguana"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
					{!isPublished ?
						<Typography variant="body2" color="text.secondary">
							Не опубликованo
						</Typography> : null
					}
				</CardContent>
			</CardActionArea>
			{role === 'admin' ?
				<CardActions>
					<Button size="small" color="primary" onClick={(e) => {onDelete(e)}}>
						Delete
					</Button>
					{!isPublished ?
						<Button size="small" color="primary" onClick={(e) => {
							Publicate(e)
						}}>
							Publicate
						</Button> : null
					}
				</CardActions>
				: null
			}
		</Card>
	);
};

export default CardForMenu;
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import React from 'react';
import {apiURL} from '../../constants';

interface Props {
	image: string;
	name: string;
	role: string;
	id: string;
	isPublished: boolean;
}

const CardForMenu: React.FC<Props> = ({image, name, role, isPublished}) => {

	const cardImage = apiURL + '/' + image;
	return (
		<Card sx={{maxWidth: 345, mb: 3}}>
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
				{role === 'admin' ?
					<CardActions>
						<Button size="small" color="primary">
							Share
						</Button>
					</CardActions>
					: null
				}
			</CardActionArea>
		</Card>
	);
};

export default CardForMenu;
import React, { useState } from "react";
import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User } from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {logout} from "../user/userThunks";
import {apiURL} from "../../constants";

interface Props {
	user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigateClick = () => {
		navigate("/trackHistory");
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	const navigateToCreate = (arg: string) => {
		navigate('/add' + arg)
	}

	let cardImage =
		"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";

	if (user.googleId && user.avatar) {
		cardImage = user.avatar;
	} else if (!user.googleId) {
		cardImage = apiURL + '/' + user.avatar;
	}

	return (
		<>
			<Button onClick={handleClick} color="inherit">
				<Avatar sx={{mx: 1}} alt={user.displayName} src={cardImage} />{user.displayName}
			</Button>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={navigateClick}>Track History</MenuItem>
				<MenuItem onClick={handleLogout}> Logout </MenuItem>
				<MenuItem onClick={() => navigateToCreate('Album')}> Add Album </MenuItem>
				<MenuItem onClick={() => navigateToCreate('Artist')}> Add Artist </MenuItem>
				<MenuItem onClick={() => navigateToCreate('Track')}> Add Track </MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;

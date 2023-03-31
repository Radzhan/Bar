import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { LoginMutation } from "../../types";
import {
	Alert,
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoginError } from "./userSlice";
import {googleLogin, login} from "./userThunks";
import {GoogleLogin} from "@react-oauth/google";

const Login = () => {
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectLoginError);
	const navigate = useNavigate();

	const [state, setState] = useState<LoginMutation>({
		username: "",
		password: "",
	});

	const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setState((prev: any) => ({ ...prev, [name]: value }));
	};

	const submitFormHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		await dispatch(login(state)).unwrap();
		navigate("/");
	};

	const googleLoginHandler = async (credentials: string) => {
		await dispatch(googleLogin(credentials)).unwrap();
		navigate('/');
	};


	return (
		<Container component="main" maxWidth="xs">
			<Box
				style={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
					<LockOpenIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box sx={{pt: 2}}>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							if (credentialResponse.credential) {
								void googleLoginHandler(credentialResponse.credential);
							}
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</Box>
				{error && (
					<Alert severity="error" sx={{ mt: 3, width: "100%" }}>
						{error.error}
					</Alert>
				)}
				<Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="Username"
								name="username"
								autoComplete="current-username"
								value={state.username}
								onChange={inputChangeHandler}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Password"
								name="password"
								type="password"
								autoComplete="current-password"
								value={state.password}
								onChange={inputChangeHandler}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Sign In
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link component={RouterLink} to="/register" variant="body2">
								Or sign up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};

export default Login;

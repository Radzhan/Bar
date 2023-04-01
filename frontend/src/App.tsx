import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './features/user/Login';
import Register from './features/user/Registr';
import Navbar from './features/Navbar/Navbar'
import Main from './container/Main/Main';
import Ingredient from './container/Ingredient/Ingredient';
import {useAppSelector} from './app/hooks';
import {selectUser} from './features/user/userSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MyCoctails from './container/MyCoctails/MyCoctails';
import AddNew from './container/addNew/addNew';

const App = () => {
	const user = useAppSelector(selectUser);

	return (
		<div className="App">

			<Navbar/>
			<Routes>

				<Route path="/" element={
					<ProtectedRoute isAllowed={!!user}>
						<Main/>
					</ProtectedRoute>
				}/>
				<Route path="/coctails" element={
					<ProtectedRoute isAllowed={!!user}>
						<MyCoctails/>
					</ProtectedRoute>
				}/>
				<Route path="/addNew" element={
					<ProtectedRoute isAllowed={!!user}>
						<AddNew/>
					</ProtectedRoute>
				}/>
				<Route path="/ingredient/:id" element={
					<ProtectedRoute isAllowed={!!user}>
						<Ingredient/>
					</ProtectedRoute>
				}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="*" element={<h2>Not Found !</h2>}/>
			</Routes>
		</div>
	);
}

export default App;

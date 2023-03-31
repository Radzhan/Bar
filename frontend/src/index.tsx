import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import App from "./App";
import {persistor, store} from "./app/store";
import {addInterceptors} from "./axiosApi";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "./constants";

addInterceptors(store);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<ThemeProvider theme={theme}>
						<App/>
					</ThemeProvider>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</GoogleOAuthProvider>
);
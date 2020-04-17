import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Dashboard } from "./layout/Dashboard";
import { store } from "./store";
import { Guild } from "~/layout/Guild/index";

const App = (): JSX.Element => (
	<BrowserRouter>
		<Provider store={store}>
			<Dashboard>
				<Guild name="Nyawesome Support"></Guild>
			</Dashboard>
		</Provider>
	</BrowserRouter>
);

export const AppHMR = hot(App);

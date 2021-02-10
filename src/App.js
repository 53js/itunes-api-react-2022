import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Itunes } from './pages/Itunes';
import { Error404 } from './pages/Error404';

import './App.scss';

const App = () => (
	<Router>
		<Switch>
			<Route path="/itunes">
				<Itunes />
			</Route>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="*">
				<Error404 />
			</Route>
		</Switch>
	</Router>
);

export default App;

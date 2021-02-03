import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import { Home } from './pages/Home';
import { Itunes } from './pages/Itunes';
import { Error404 } from './pages/Error404';

import './App.scss';

const App = () => (
	<Router>
		<Container className="App">
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
		</Container>
	</Router>
);

export default App;

import React, { useCallback, useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Itunes } from './pages/Itunes';
import { Error404 } from './pages/Error404';
import useLocalStorage from './lib/useLocalStorage';
import { ThemeContext } from './components/ThemeContext';
import './App.scss';

const App = () => {
	const [theme, setTheme] = useState();
	const [storageMode, setStorageMode] = useLocalStorage('darkmode');

	const changeThemeContext = useCallback((newTheme) => {
		setTheme(newTheme);
		setStorageMode(newTheme);
	}, [setStorageMode]);

	useEffect(() => {
		setTheme(storageMode);
	}, [storageMode]);

	return (
		<Router>
			<Switch>
				<ThemeContext.Provider value={{ theme, changeThemeContext }}>
					<Route path={[
						'/itunes/:search',
						'/itunes',
					]}
					>
						<Itunes />
					</Route>
				</ThemeContext.Provider>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="*">
					<Error404 />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;

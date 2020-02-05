import React, { useState, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';

import fetchItunesSongs from '../lib/fetchItunesSongs';
import useLocalStorage from '../lib/useLocalStorage';

import AudioPlayer from '../components/AudioPlayer';
import TrackDetails from '../components/Track/Details';
import ToggleMode from '../components/ToggleMode';
import SearchHistory from '../components/SearchHistory';
import SongList from '../components/Track/List';
import SongSearch from '../components/Track/Search';

import './Itunes.scss';

const App = () => {
	const [currentTrack, setCurrentTrack] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [noResult, setNoResult] = useState(false);
	const [tracks, setTracks] = useState([]);
	const [searchs, setSearchs] = useState([]);

	const [storageMode, setStorageMode] = useLocalStorage('darkmode');

	const handleChangeMode = useCallback(
		(e) => {
			const modeValue = !!e.target.checked;
			//setDarkMode(modeValue);
			setStorageMode(modeValue);
		},
		[setStorageMode],
	);

	// useEffect(() => {
	// 	console.log('useeffect', storageMode);
	// 	setDarkMode(storageMode);
	// }, [setDarkMode, storageMode]);


	const handleSearchClick = async (term) => {
		setLoading(true);
		setError(false);
		setSearchs((prev) => [...prev, term]);
		try {
			const response = await fetchItunesSongs(term);
			if (response.resultCount === 0) {
				setNoResult(true);
			}
			if (response.resultCount) {
				setNoResult(false);
				const tracksFromResponse = response.results.filter(
					(r) => r.kind === 'song',
				);

				setTracks(tracksFromResponse);
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	const handleClickTrack = (track) => {
		setCurrentTrack(track);
	};

	return (
		<div className={`Itunes ${storageMode ? 'dark' : 'light'}`}>
			<div className="container">
				<section className="track-section">
					<ToggleMode
						onChange={handleChangeMode}
						mode={storageMode}
					/>
					<header className="Itunes-header">
						<h1>ITUNES API</h1>
					</header>
					<SongSearch onClick={handleSearchClick} />
					{noResult && <p>Pas de résultat</p>}
					{error && <p>Une erreur est survenue</p>}
					<Switch>
						<Route exact path="/itunes">
							<SongList
								tracks={tracks}
								onClickTrack={handleClickTrack}
								loading={loading}
							/>
						</Route>
						<Route path="/itunes/track/:trackname">
							<TrackDetails track={currentTrack} />
						</Route>
					</Switch>
				</section>
				<SearchHistory searchs={searchs} />
			</div>
			<AudioPlayer track={currentTrack} />
		</div>
	);
};

export default App;

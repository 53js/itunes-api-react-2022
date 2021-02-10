import { useState, useEffect, useContext } from 'react';
import {
	Route, Switch, useHistory, useRouteMatch,
} from 'react-router-dom';
import { Container } from 'reactstrap';

import { fetchItunesSongs } from '../lib/fetchItunesSongs';

import { AudioPlayer } from '../components/AudioPlayer';
import { ToggleModeNight } from '../components/ToggleModeNight';
import { SearchHistory } from '../components/SearchHistory';
import { TrackList } from '../components/Track/List';
import { TrackSearch } from '../components/Track/Search';
import { TrackDetails } from '../components/Track/Details';
import { ThemeContext } from '../components/ThemeContext';

import './Itunes.scss';

export const Itunes = () => {
	const match = useRouteMatch();
	const history = useHistory();
	const { theme } = useContext(ThemeContext);
	const [currentTrack, setCurrentTrack] = useState();
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [noResult, setNoResult] = useState(false);
	const [tracks, setTracks] = useState([]);
	const [searchs, setSearchs] = useState([]);

	const handleSearchClick = async (term) => {
		history.push(`./${term}`);
	};

	const searchRequest = async (term) => {
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

	useEffect(() => {
		const { params: { search } } = match;
		if (search) {
			searchRequest(search);
		}
	}, [match]);

	const handleClickTrack = (track) => {
		setCurrentTrack(track);
	};

	return (
		<div className={`Itunes ${theme}`}>
			<Container>
				<section className="track-section">
					<ToggleModeNight />
					<header className="App-header">
						<h1>ITUNES API</h1>
					</header>
					<TrackSearch onClick={handleSearchClick} />
					{noResult && <p>Pas de résultat</p>}
					{error && <p>Une erreur est survenue</p>}

					<Switch>
						<Route exact path="/itunes/track/:trackname">
							<TrackDetails track={currentTrack} />
						</Route>
						<Route path="/itunes">
							<TrackList
								tracks={tracks}
								onClickTrack={handleClickTrack}
								loading={loading}
							/>
						</Route>
					</Switch>
				</section>
				<SearchHistory searchs={searchs} />
			</Container>
			<AudioPlayer track={currentTrack} />
		</div>
	);
};

const API = 'https://itunes.apple.com/search';

const fetchItunesSongs = async (term) => {
	try {
		const url = `${API}?term=${term}`;
		const response = await fetch(url);
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		throw err;
	}
};


export default fetchItunesSongs;

const API = 'https://itunes.apple.com/search';

export const fetchItunesSongs = async (term) => {
	try {
		const url = `${API}?term=${term}`;
		const response = await fetch(url);
		const responseJson = await response.json();
		res.setHeader('Access-Control-Allow-Origin', '*')
  		res.setHeader('Content-Type', 'application/json')
		return responseJson;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		throw err;
	}
};

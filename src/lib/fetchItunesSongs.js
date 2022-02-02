const API = 'https://itunes.apple.com/search';

export const fetchItunesSongs = async (term) => {
	try {
		const url = `${API}?term=${term}&enitity=music`;
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
			},
			mode: 'cors',
		});
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log(err);
		throw err;
	}
};

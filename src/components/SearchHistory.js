import PropTypes from 'prop-types';

import './SearchHistory.scss';

export const SearchHistory = ({ searchs }) => (
	<aside className="SearchHistory">
		{!!searchs.length && <h2>History</h2> }
		<ul>
			{(searchs || []).map((s) => (
				<li>{s}</li>
			))}
		</ul>
	</aside>
);

SearchHistory.propTypes = {
	searchs: PropTypes.arrayOf(PropTypes.string),
};
SearchHistory.defaultProps = {
	searchs: [],
};

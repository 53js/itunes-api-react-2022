import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'react-toggle';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import 'react-toggle/style.css';
import './ToggleMode.scss';

const ToggleMode = ({ mode, onChange }) => (
	<div className="ToggleMode">
		<Toggle
			id="mode"
			icons={{
				checked: (
					<FontAwesomeIcon icon={faMoon} className="fa faMoon" />
				),
				unchecked: (
					<FontAwesomeIcon icon={faSun} className="fa faSun" />
				),
			}}
			defaultChecked={mode}
			onChange={onChange}
		/>

		{/* <label htmlFor="mode">Dark mode</label> */}
	</div>
);

ToggleMode.propTypes = {
	mode: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default ToggleMode;

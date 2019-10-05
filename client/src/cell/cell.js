import React from 'react';
import PropTypes from 'prop-types';
import './cell.css';

export default function Cell(props) {
	return (
		<div className={'cell-wrapper'}>
				{props.data}
		</div>
	);
};

Cell.propTypes = {
	data: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired
};

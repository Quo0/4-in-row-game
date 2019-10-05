import React from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell/cell.js';
import './column.css';

export default function Column(props) {
	return (
		<div className={`column column-${props.columnId}`} onClick={()=> props.onColumnPress(props.columnId)}>
			{props.data.map((item,index) => (
				<Cell	data={item}	key={index} />
			))}
		</div>
	);
};

Column.propTypes = {
	columnId: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	onColumnPress: PropTypes.func.isRequired
};
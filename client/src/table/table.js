import React from 'react';
import PropTypes from 'prop-types';
import Column from '.././column/column.js';
import './table.css';

function Table(props) {
	return (
		<div className={'columns-wrapper'}>
			{props.field.map((_, index) => (
				<Column
					columnId={index}
					key={index}
					onColumnPress={props.onColumnPress}
					data={props.field[index]}
				/>
			))}
		</div>
	);
}

Table.propTypes = {
	field: PropTypes.array.isRequired,
	onColumnPress: PropTypes.func.isRequired
};

Table.defaultProps = {
	onColumnPress: () => console.log('Haha! You failed!')
};

export default Table;
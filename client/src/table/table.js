import React from 'react';
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

export default Table;
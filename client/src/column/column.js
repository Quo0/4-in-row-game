import React from 'react';
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
import React from 'react';
import './cell.css';

export default function Cell(props) {
	return (
		<div className={'cell-wrapper'}>
				{props.data}
		</div>
	);
};

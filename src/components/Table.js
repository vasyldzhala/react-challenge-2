import React from 'react';

const Table = (props) => {

	const header = props.dataStructure
		.map( item =>  <th key = {item.key}>{item.title}</th>);

	const body = props.data
		.map( item => {
			const row = props.dataStructure
				.map(property => <td key = {property.name}>{item[property.name]}</td>);
        	return  (
        		<tr key = {item.key}>
					<td>
						<input type="checkbox" defaultChecked={false} name={item.Title} />
					</td>
					{ row }
				</tr>
			);
		});

	return (
		<div>
			<table className="table table-striped">
				<thead>
					<tr>
						<th></th>
						{header}
					</tr>
				</thead>
				<tbody>
					{body}
				</tbody>
			</table>
		</div>
	)

};

export default Table;

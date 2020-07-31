import React from 'react';

const Pagination = ({ currentPage, itemsPerPage, totalItems, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className='pagination'>
				{pageNumbers.map((number) => {
					const className = `page-item ${
						currentPage === number ? 'active' : ''
					}`;

					return (
						<li key={number} className={className}>
							<a onClick={() => paginate(number)} className='page-link'>
								{number}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Pagination;

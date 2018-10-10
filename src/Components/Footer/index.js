import React from 'react';
import PropTypes from 'prop-types';

import { observer } from 'mobx-react';

import ItemCount from './ItemCount';

const filters = {
	all: '/',
	active: '/active',
	completed: '/completed',
};

const FilterLink = observer(({ store, filter }) => {
	const { name, url } = filter;
	const currentFilter = store.filter;
	const active = filter.name === currentFilter;
	const selectedClass = active ? 'selected' : '';
	return (
		<li>
			<a
				className={selectedClass}
				href={`#${url}`}
				onClick={() => store.filterBy(name)}
			>
				{name}
			</a>
		</li>
	);
});

FilterLink.propTypes = {
	store: PropTypes.object.isRequired,
	filter: PropTypes.object.isRequired
};

const Footer = ({ store }) => (
  <footer className="footer">
    <ItemCount store={store} />
			<ul className="filters">
				{Object.keys(filters).map(key => (
					<FilterLink
						filter={{ name: key, url: filters[key] }}
						store={store}
						key={key}
					/>
				))}
			</ul>
		<button className="clear-completed">Clear completed</button>
  </footer>
);

Footer.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Footer;

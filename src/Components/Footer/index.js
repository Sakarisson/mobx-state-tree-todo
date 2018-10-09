import React from 'react';
import PropTypes from 'prop-types';

import ItemCount from './ItemCount';

const Footer = ({ store }) => (
  <footer className="footer">
    <ItemCount store={store} />
				<ul className="filters">
					<li>
						<a className="selected" href="#/">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
      <button className="clear-completed">Clear completed</button>
  </footer>
);

Footer.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Footer;

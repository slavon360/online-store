import React from 'react';
import classnames from 'classnames';

function ItemsTableCell ({ className, ...props }) {
	const { recentData, data } = props;
	if (recentData && recentData.id === data.id) {
		window.setTimeout(() => {
			props.scrollToRecentItem();
		}, 500);
	}
	props.className = classnames('ItemList__col', className);
	return <td {...props} />;
};

module.exports = ItemsTableCell;

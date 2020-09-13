import React from 'react';
import classnames from 'classnames';
import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

var TextColumn = React.createClass({
	displayName: 'TextColumn',
	propTypes: {
		col: React.PropTypes.object,
		data: React.PropTypes.object,
		linkTo: React.PropTypes.string,
	},
	getValue () {
		// cropping text is important for textarea, which uses this column
		const value = this.props.data.fields[this.props.col.path];
		return value ? value.substr(0, 100) : null;
	},
	render () {
		const value = this.getValue();
		const empty = !value && this.props.linkTo ? true : false;
		const className = this.props.col.field.monospace ? 'ItemList__value--monospace' : undefined;
		const recentlyVisited = this.props.recentData && this.props.recentData.name === value;
		return (
			<ItemsTableCell>
				<ItemsTableValue
					className={classnames(className, { 'ItemList__value--recently-visited': recentlyVisited })}
					to={this.props.linkTo}
					empty={empty}
					padded
					interior
					field={this.props.col.type}
				>
					{value}
				</ItemsTableValue>
			</ItemsTableCell>
		);
	},
});

module.exports = TextColumn;

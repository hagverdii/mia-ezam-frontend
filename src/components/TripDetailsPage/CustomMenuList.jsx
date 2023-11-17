import React, { Component } from 'react'
import { FixedSizeList as List } from 'react-window'

const height = 30

class CustomMenuList extends Component {
	render() {
		const { options, children, maxHeight, getValue } = this.props
		const [value] = getValue()
		const initialOffset = options.indexOf(value) * height

		return (
			<List
				height={180}
				itemCount={children.length}
				itemSize={height}
				initialScrollOffset={initialOffset}
			>
				{({ index, style }) => <div style={style}>{children[index]}</div>}
			</List>
		)
	}
}
export default CustomMenuList

import React from 'react'
import { components } from 'react-select'

const customMultiValueLabel = ({ children, ...props }) => {
	const parts = children.split(' ')
	return (
		<components.MultiValueLabel {...props}>
			{parts[0] + ' ' + parts[1] + ' ' + parts[2]}
		</components.MultiValueLabel>
	)
}

export default customMultiValueLabel

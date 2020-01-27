import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View } from 'react-native'

import styles from './styles'

// eslint-disable-next-line react/prefer-stateless-function
class Container extends Component {
	render() {
		const {
			offsets,
			scroll,
			greedy,
			children,
			contentContainerStyle,
			style,
			containerRef,
			...rest
		} = this.props

		if (scroll) {
			return (
				<ScrollView
					contentContainerStyle={[
						offsets && styles.wrapWithOffsets,
						greedy && styles.contentContainerGreedy,
						contentContainerStyle,
					]}
					style={[greedy && styles.wrapGreedy, style]}
					ref={containerRef}
					{...rest}
				>
					{children}
				</ScrollView>
			)
		}
		return (
			<View style={[offsets && styles.wrapWithOffsets, greedy && styles.wrapGreedy, style]} {...rest}>
				{children}
			</View>
		)
	}
}
Container.propTypes = {
	offsets: PropTypes.bool,
	scroll: PropTypes.bool,
	greedy: PropTypes.bool,
	children: PropTypes.any,
	style: PropTypes.any,
	contentContainerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
Container.defaultProps = {
	offsets: true,
	scroll: false,
	greedy: true,
	children: null,
	style: {},
	contentContainerStyle: {},
}

export default Container

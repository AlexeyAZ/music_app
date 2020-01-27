import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Dimensions } from 'react-native'
import WalkthroughTooltip from 'react-native-walkthrough-tooltip'
import isNil from 'lodash/isNil'
import noop from 'lodash/noop'

import TouchableOpacity from '../TouchableOpacity'
import { MainText } from '../Typography'

import styles from './styles'

class Tooltip extends Component {
	constructor(props) {
		super(props)
		this.controlled = !isNil(props.visible)
		this.state = {
			isVisible: props.defaultVisible || false,
		}
	}

	handleOpen = () => {
		const { onPress } = this.props
		if (this.controlled) {
			return onPress()
		}
		return this.setState({ isVisible: true }, () => onPress())
	}

	handleClose = () => {
		const { onClose } = this.props
		if (this.controlled) {
			return onClose()
		}
		return this.setState({ isVisible: false }, () => onClose())
	}

	renderChildren = () => {
		const { renderTouchableView, children } = this.props
		if (renderTouchableView) {
			return <TouchableOpacity onPress={this.handleOpen}>{children}</TouchableOpacity>
		}
		return children
	}

	renderContent = () => {
		const { content } = this.props
		if (typeof content === 'string') {
			return <MainText color="white.main">{content}</MainText>
		}
		return content
	}

	render() {
		const { isVisible } = this.state
		const { visible } = this.props
		const tooltipVisible = this.controlled ? visible : isVisible
		return (
			<WalkthroughTooltip
				contentStyle={[styles.tooltipContent, { maxWidth: Dimensions.get('window').width - 50 }]}
				isVisible={tooltipVisible}
				content={this.renderContent()}
				onClose={this.handleClose}
				placement="top"
				showChildInTooltip={false}
				arrowStyle={styles.arrow}
			>
				{this.renderChildren()}
			</WalkthroughTooltip>
		)
	}
}

Tooltip.propTypes = {
	renderTouchableView: PropTypes.bool,
	defaultVisible: PropTypes.bool,
	visible: PropTypes.bool,
	content: PropTypes.any,
	children: PropTypes.any,
	onPress: PropTypes.func,
	onClose: PropTypes.func,
}
Tooltip.defaultProps = {
	renderTouchableView: true,
	defaultVisible: null,
	visible: null,
	content: <View />,
	children: null,
	onPress: noop,
	onClose: noop,
}

export default Tooltip

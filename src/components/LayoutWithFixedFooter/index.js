import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Keyboard } from 'react-native'

import { Container } from '../Grid'
import Spacer from '../Spacer'

import styles from './styles'

class LayoutWithFixedFooter extends Component {
	state = {
		footerHeight: 0,
		isKeyboardActive: false,
	}

	componentDidMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}

	measureView = event => {
		this.setState({ footerHeight: event.nativeEvent.layout.height })
	}

	keyboardDidShow = () => {
		this.setState({ isKeyboardActive: true })
	}

	keyboardDidHide = () => {
		this.setState({ isKeyboardActive: false })
	}

	render() {
		const { footerHeight, isKeyboardActive } = this.state
		const { style, children, renderFooter, scrollContainerRef } = this.props
		const bottomOffset = 20

		return (
			<Container offsets={false}>
				<Container scroll contentContainerStyle={style} containerRef={scrollContainerRef}>
					{children}
					{!isKeyboardActive && <Spacer size={footerHeight + 10} />}
					{isKeyboardActive && renderFooter()}
					{isKeyboardActive && <Spacer size={bottomOffset} />}
				</Container>
				{!isKeyboardActive && (
					<Container style={styles.footer} greedy={false} onLayout={this.measureView}>
						{renderFooter()}
						<Spacer size={bottomOffset} />
					</Container>
				)}
			</Container>
		)
	}
}
LayoutWithFixedFooter.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.any,
	renderFooter: PropTypes.any,
}
LayoutWithFixedFooter.defaultProps = {
	style: {},
	children: null,
	renderFooter: null,
}

export default LayoutWithFixedFooter

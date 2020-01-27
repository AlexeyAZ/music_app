import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StatusBar, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'

import { withPlayer } from 'hocs'

import { fontFamilies } from 'styles'
import styles from './styles'

import * as PlaybackModule from 'modules/playback'

const loadResourcesAsync = async () => {
	await Promise.all([
		// Asset.loadAsync([
		// 	require('./assets/images/icon/car-mazda.png'),
		// ]),
		Font.loadAsync({
			[`${fontFamilies.gotham}-Regular`]: require('../../assets/fonts/GothamPro-Regular.ttf'),
			[`${fontFamilies.gotham}-Bold`]: require('../../assets/fonts/GothamPro-Bold.ttf'),
			[`${fontFamilies.gotham}-Italic`]: require('../../assets/fonts/GothamPro-Italic.ttf'),
			[`${fontFamilies.gotham}-Medium`]: require('../../assets/fonts/GothamPro-Medium.ttf'),
			[`${fontFamilies.montserrat}-Regular`]: require('../../assets/fonts/Montserrat-Regular.ttf'),
			[`${fontFamilies.montserrat}-Bold`]: require('../../assets/fonts/Montserrat-Bold.ttf'),
			[`${fontFamilies.montserrat}-Medium`]: require('../../assets/fonts/Montserrat-Medium.ttf'),
			[`${fontFamilies.roboto}-Medium`]: require('../../assets/fonts/Roboto-Medium.ttf'),
		}),
	])
}

const handleLoadingError = error => {
	console.warn(`AppContent -> loadResourcesAsync: ${error}`)
}

class AppContent extends Component {
	state = {
		isLoadingResourcesComplete: false,
		isLoadingPlaybackInstanceComplete: false,
	}

	componentDidMount() {
		const { createPlaybackInstance, updatePlaybackInstance } = this.props
		createPlaybackInstance()
			.then(res => updatePlaybackInstance(res))
			.then(() => this.setState({ isLoadingPlaybackInstanceComplete: true }))
	}

	renderLoadingScreen = () => {
		return (
			<AppLoading
				startAsync={loadResourcesAsync}
				onError={handleLoadingError}
				onFinish={() => this.setState({ isLoadingResourcesComplete: true })}
			/>
		)
	}

	renderContent = () => {
		const { children } = this.props
		return (
			<SafeAreaProvider>
				<View style={styles.container}>
					<View style={styles.statusBar}>
						<StatusBar translucent barStyle="dark-content" />
					</View>
					{children}
				</View>
			</SafeAreaProvider>
		)
	}

	render() {
		const { isLoadingResourcesComplete, isLoadingPlaybackInstanceComplete } = this.state
		if (isLoadingResourcesComplete && isLoadingPlaybackInstanceComplete) {
			return this.renderContent()
		}
		return this.renderLoadingScreen()
	}
}

AppContent.propTypes = {
	children: PropTypes.any,
	createPlaybackInstance: PropTypes.func.isRequired,
	updatePlaybackInstance: PropTypes.func.isRequired,
}
AppContent.defaultProps = {
	children: null,
}

const mapStateToProps = ({ songs, playbackStatus, playbackInstance }) => ({
	songs,
	playbackStatus,
	playbackInstance,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
	updatePlaybackInstance: bindActionCreators(PlaybackModule.updatePlaybackInstance, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(AppContent)

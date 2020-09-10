import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'
import { axiosInstance } from 'helpers'

import { MainText, Container, TouchableOpacity, Button } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'
import * as GenresModule from 'modules/genres'
import * as ModalModule from 'modules/modal'
import * as FavoritesModule from 'modules/favorites'

// eslint-disable-next-line react/prefer-stateless-function
class Test extends Component {
	state = {
		player: '',
	}
	// componentDidMount() {
	// 	const { getAllGenres } = this.props
	// 	getAllGenres()
	// }

	// openTopArtists = genre => {
	// 	const { navigation } = this.props
	// 	navigation.navigate('TopArtists', {
	// 		genre,
	// 	})
	// }

	handleButtonOnePress = () => {
		axiosInstance({
			url: '/me/personalized/tracks/new?limit=10',
		})
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}

	getPlayerButtonPress = () => {
		axios.get('https://app.napster.com/sdk/streaming-player-1.0.1.js')
			.then(res => console.log(res))
	}

	render() {
		const { allGenres, getMyFavorites, checkFavorites, dispatch } = this.props
		const allGenresData = get(allGenres, 'data.genres', [])
		// FavoritesModule.checkTracksFavorites(dispatch)
		return (
			<Container scroll>
				<Button onPress={this.handleButtonOnePress}>
					Button one
				</Button>
				<Button onPress={this.getPlayerButtonPress}>
					Button two
				</Button>
			</Container>
		)
	}
}

Test.propTypes = {
	allGenres: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	getAllGenres: PropTypes.func.isRequired,
}

const mapStateToProps = ({ playbackStatus, allGenres }) => ({
	playbackStatus,
	allGenres,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
	getAllGenres: bindActionCreators(GenresModule.getAllGenres, dispatch),
	openModal: bindActionCreators(ModalModule.openModal, dispatch),
	getMyFavorites: bindActionCreators(FavoritesModule.getMyFavorites, dispatch),
	checkFavorites: () => dispatch({ type: 'CHECK_FAVORITES', payload: ['tra.2011092'] }),
	getFavorites: () => dispatch({ type: 'GET_FAVORITES' }),
	dispatch,
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(Test)

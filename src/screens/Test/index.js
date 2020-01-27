import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'

import { MainText, Container, TouchableOpacity } from 'components'

import { withPlayer } from 'hocs'

import * as PlaybackModule from 'modules/playback'
import * as SongsModule from 'modules/songs'
import * as GenresModule from 'modules/genres'
import * as ModalModule from 'modules/modal'

// eslint-disable-next-line react/prefer-stateless-function
class Test extends Component {
	componentDidMount() {
		const { getAllGenres } = this.props
		getAllGenres()
	}

	openTopArtists = genre => {
		const { navigation } = this.props
		navigation.navigate('TopArtists', {
			genre,
		})
	}

	render() {
		const { allGenres } = this.props
		const allGenresData = get(allGenres, 'data.genres', [])
		return (
			<Container scroll>
				<View
					style={{
						flexWrap: 'wrap',
						flexDirection: 'row',
						justifyContent: 'flex-start',
						borderWidth: 1,
					}}
				>
					{allGenresData.map(genre => {
						return (
							<TouchableOpacity
								onPress={() => this.openTopArtists(genre.id)}
								key={genre.id}
								style={{
									flexGrow: 1,
									flexBasis: '33%',
									width: '33%',
									paddingBottom: '33%',
									borderWidth: 1,
								}}
							>
								<View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
									<MainText>{genre.name}</MainText>
								</View>
							</TouchableOpacity>
						)
					})}
				</View>
			</Container>
		)
	}
}

Test.propTypes = {
	allGenres: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	getAllGenres: PropTypes.func.isRequired,
}

const mapStateToProps = ({ songs, playbackStatus, allGenres }) => ({
	songs,
	playbackStatus,
	allGenres,
})

const mapDispatchToProps = dispatch => ({
	updatePlaybackStatus: bindActionCreators(PlaybackModule.updatePlaybackStatus, dispatch),
	getSongs: bindActionCreators(SongsModule.getSongs, dispatch),
	getAllGenres: bindActionCreators(GenresModule.getAllGenres, dispatch),
	openModal: bindActionCreators(ModalModule.openModal, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withPlayer)(Test)

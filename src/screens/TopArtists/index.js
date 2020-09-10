import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'

import * as GenresModule from 'modules/genres'
import * as PlaylistsModule from 'modules/playlists'
import * as ArtistsModule from 'modules/artists'

import { MainText, Container, TouchableOpacity } from 'components'

class TopArtists extends Component {
	componentDidMount() {
		const { navigation, getTopArtistsByGenre } = this.props
		const genre = get(navigation, 'state.params.genre')
		if (genre) getTopArtistsByGenre({ data: genre })
	}

	handleArtistPress = async artistId => {
		const { navigation } = this.props
		navigation.navigate('Playlist', { artistId })
	}

	render() {
		const { topArtistsByGenre } = this.props
		const topArtists = get(topArtistsByGenre, 'data.artists', [])
		const loading = get(topArtistsByGenre, 'loading', true)
		return (
			<Container scroll>
				{loading ? (
					<MainText>Loading...</MainText>
				) : (
					topArtists.map(artist => {
						return (
							<TouchableOpacity key={artist.id} onPress={() => this.handleArtistPress(artist.id)}>
								<MainText>{artist.name}</MainText>
							</TouchableOpacity>
						)
					})
				)}
			</Container>
		)
	}
}

TopArtists.propTypes = {
	topArtistsByGenre: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	getTopArtistsByGenre: PropTypes.func.isRequired,
}

const mapStateToProps = ({ topArtistsByGenre }) => ({ topArtistsByGenre })

const mapDispatchToProps = dispatch => ({
	getTopArtistsByGenre: bindActionCreators(GenresModule.getTopArtistsByGenre, dispatch),
	getTopArtistTracks: bindActionCreators(ArtistsModule.getTopArtistTracks, dispatch),
	setActivePlaylist: bindActionCreators(PlaylistsModule.setActivePlaylist, dispatch),
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation)(TopArtists)

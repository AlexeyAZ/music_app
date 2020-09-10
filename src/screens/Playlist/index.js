import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import get from 'lodash/get'

import * as PlaylistsModule from 'modules/playlists'
import * as ArtistsModule from 'modules/artists'
import * as FavoritesModule from 'modules/favorites'

import { withPlayer } from 'hocs'
import { MainText, TouchableOpacity, Container, FavoriteButton } from 'components'
import { PlayButton, CurrentTrackWidget } from 'containers'

import styles from './styles'

class Playlist extends Component {
	async componentDidMount() {
		const { navigation, getTopArtistTracks, setActivePlaylist } = this.props
		const artistId = get(navigation, 'state.params.artistId')
		const topArtistTracksResponse = await getTopArtistTracks({ data: artistId })
		const topTracks = get(topArtistTracksResponse, 'data.tracks', [])

		await setActivePlaylist({
			tracks: topTracks,
		})

		this.checkTracksFavorites(topTracks.map(track => track.id))
	}

	openPlayer = async (uri, id) => {
		const {
			onPlay,
			navigation,
			playbackStatus: {
				meta: { id: playbackId },
			},
		} = this.props
		if (id === playbackId) {
			navigation.navigate('Player')
		} else {
			await onPlay(uri, id)
			navigation.navigate('Player')
		}
	}

	handleFavoriteButtonPress = (id, isFavorite) => {
		if (isFavorite) {
			return this.removeTrackFromFavorites(id)
		}
		return this.addTrackToFavorites(id)
	}

	checkTracksFavorites = async idsArray => {
		const { getFavoriteStatus, addToActiveFavorites } = this.props
		const favoritesTracksResponse = await getFavoriteStatus({
			data: idsArray,
		})
		const favoritesTracks = get(favoritesTracksResponse, 'data.status', [])
		await addToActiveFavorites({
			data: favoritesTracks.filter(track => track.favorite === true).map(track => track.id),
		})
	}

	addTrackToFavorites = async id => {
		const { addToFavoritesRequest, addToActiveFavorites } = this.props
		const addTrackToFavoritResponse = await addToFavoritesRequest({
			reqData: { favorites: [{ id }] },
		})

		const newFavorites = get(addTrackToFavoritResponse, 'data.favorites')

		await addToActiveFavorites({
			data: newFavorites.filter(track => track.acknowledged === true).map(track => track.id),
		})
	}

	removeTrackFromFavorites = async id => {
		const { removeFromFavoritesRequest, removeFromActiveFavorites } = this.props
		const removeFromFavoritesResponse = await removeFromFavoritesRequest({
			data: id,
		})

		const newFavorites = get(removeFromFavoritesResponse, 'data.favorites')

		await removeFromActiveFavorites({
			data: newFavorites.filter(track => track.acknowledged === true).map(track => track.id),
		})
	}

	renderListItem = ({ item: { name, previewURL, id } }) => {
		const {
			activeFavorites: { data: activeFavoritesData },
		} = this.props

		const isFavorite = activeFavoritesData.includes(id)

		return (
			<View style={styles.listRow}>
				<PlayButton style={styles.listPlayIcon} iconSize="xs" id={id} uri={previewURL} />
				<TouchableOpacity style={styles.listContent} onPress={() => this.openPlayer(previewURL, id)}>
					<MainText numberOfLines={1}>{name}</MainText>
				</TouchableOpacity>
				<FavoriteButton
					iconSize="xs"
					active={isFavorite}
					onPress={() => this.handleFavoriteButtonPress(id, isFavorite)}
				/>
			</View>
		)
	}

	render() {
		console.log('render Playlist')
		const {
			topArtistTracks: { loading },
			activePlaylist: { tracks },
		} = this.props
		return (
			<Container>
				{loading ? (
					<MainText>Loading...</MainText>
				) : (
					<>
						<FlatList data={tracks} renderItem={this.renderListItem} keyExtractor={item => item.id} />
						<CurrentTrackWidget />
					</>
				)}
			</Container>
		)
	}
}

Playlist.propTypes = {
	activeFavorites: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	topArtistTracks: PropTypes.object.isRequired,
	activePlaylist: PropTypes.object.isRequired,
	playbackStatus: PropTypes.object.isRequired,
	onPlay: PropTypes.func.isRequired,
	getTopArtistTracks: PropTypes.func.isRequired,
	setActivePlaylist: PropTypes.func.isRequired,
	getFavoriteStatus: PropTypes.func.isRequired,
	addToActiveFavorites: PropTypes.func.isRequired,
	removeFromFavoritesRequest: PropTypes.func.isRequired,
	removeFromActiveFavorites: PropTypes.func.isRequired,
	addToFavoritesRequest: PropTypes.func.isRequired,
}

const mapStateToProps = ({
	topArtistTracks,
	activePlaylist,
	myFavoriteStatus,
	activeFavorites,
}) => ({
	myFavoriteStatus,
	topArtistTracks,
	activePlaylist,
	activeFavorites,
})

const mapDispatchToProps = dispatch => ({
	setActivePlaylist: bindActionCreators(PlaylistsModule.setActivePlaylist, dispatch),
	getTopArtistTracks: bindActionCreators(ArtistsModule.getTopArtistTracks, dispatch),
	getFavoriteStatus: bindActionCreators(FavoritesModule.getFavoriteStatus, dispatch),
	addToFavoritesRequest: bindActionCreators(FavoritesModule.addToFavoritesRequest, dispatch),
	removeFromFavoritesRequest: bindActionCreators(FavoritesModule.removeFromFavoritesRequest, dispatch),
	addToActiveFavorites: bindActionCreators(FavoritesModule.addToActiveFavorites, dispatch),
	removeFromActiveFavorites: bindActionCreators(FavoritesModule.removeFromActiveFavorites, dispatch),
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withNavigation,
	withPlayer
)(Playlist)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, FlatList } from 'react-native'
import { Audio } from 'expo-av'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { withNavigation } from 'react-navigation'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import get from 'lodash/get'

import * as SongsModule from 'modules/songs'

import { withPlayer } from 'hocs'
import { MainText, TouchableOpacity, Container } from 'components'
import { PlayButton, CurrentTrackWidget } from 'containers'

import styles from './styles'

// const moment = momentDurationFormatSetup(momentLib)

class Playlist extends Component {
	state = {
		durations: [],
	}

	componentDidMount() {
		const { getSongs } = this.props
		getSongs()
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	const {
	// 		songs: { data },
	// 	} = this.props
	// 	const {
	// 		songs: { data: prevData },
	// 	} = prevProps
	// 	if (data.length > 0 && data.length !== prevData.length) {
	// 		const dataPromise = data.map(item => this.getAudioDuration(item.uri))
	// 		Promise.all(dataPromise)
	// 			.then(res => {
	// 				const durations = res.map(({ status: { uri, durationMillis } }) => ({
	// 					uri,
	// 					duration: moment.duration(durationMillis, 'milliseconds').format('mm:ss'),
	// 				}))
	// 				this.setState({ durations })
	// 			})
	// 			.catch(err => console.log(err))
	// 	}
	// }

	getAudioDuration = async uri => {
		const playbackObject = await Audio.Sound.createAsync({ uri }, { shouldPlay: false })
		return playbackObject
	}

	openPlayer = async (uri, id) => {
		const {
			onPlay,
			navigation,
			playbackStatus: {
				track: { id: playbackId },
			},
		} = this.props
		if (id === playbackId) {
			navigation.navigate('Player')
		} else {
			await onPlay(uri, id)
			navigation.navigate('Player')
		}
	}

	renderListItem = ({ item: { name, uri, id } }) => {
		return (
			<View style={styles.listRow}>
				<PlayButton style={styles.listPlayIcon} size="xs" id={id} uri={uri} />
				<TouchableOpacity style={styles.listContent} onPress={() => this.openPlayer(uri, id)}>
					<MainText numberOfLines={1}>{name}</MainText>
				</TouchableOpacity>
				<MainText style={{marginLeft: 'auto'}}>{id}</MainText>
			</View>
		)
	}

	render() {
		const {
			songs: { data },
		} = this.props
		return (
			<Container>
				<FlatList data={data} renderItem={this.renderListItem} keyExtractor={item => item.id} />
				<CurrentTrackWidget />
			</Container>
		)
	}
}

Playlist.propTypes = {
	navigation: PropTypes.object.isRequired,
	songs: PropTypes.object.isRequired,
	playbackStatus: PropTypes.object.isRequired,
	onPlay: PropTypes.func.isRequired,
	getSongs: PropTypes.func.isRequired,
}

const mapStateToProps = ({ songs, playbackStatus }) => ({
	songs,
	playbackStatus,
})

const mapDispatchToProps = dispatch => ({
	getSongs: bindActionCreators(SongsModule.getSongs, dispatch),
})

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withNavigation,
	withPlayer
)(Playlist)

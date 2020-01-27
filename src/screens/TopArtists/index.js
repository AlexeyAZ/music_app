import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import get from 'lodash/get'

import * as GenresModule from 'modules/genres'

import { MainText, Container, TouchableOpacity } from 'components'

class TopArtists extends Component {
	componentDidMount() {
		const { navigation, getTopArtistsByGenre } = this.props
		const genre = get(navigation, 'state.params.genre')
		if (genre) getTopArtistsByGenre({ data: genre })
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
						return <MainText>{artist.name}</MainText>
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
})

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation)(TopArtists)

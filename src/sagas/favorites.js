import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import get from 'lodash/get'
import axios from 'axios'

import { axiosInstance } from 'helpers'

import * as PlaylistsModule from 'modules/playlists'
import * as ArtistsModule from 'modules/artists'
import * as FavoritesModule from 'modules/favorites'

const Api = {}

const checkFavoritesAction = () => {}
const addToActiveFavoritesAction = () => {}

function* checkFavorites() {
	try {
		yield put({ type: checkFavoritesAction.start })
		const favoriteStatusData = yield call(Api.checkFavoriteStatus)
		yield put({ type: checkFavoritesAction.success, payload: favoriteStatusData })
	} catch (error) {
		yield put(checkFavoritesAction.error)
	}
}

function* addToActiveFavorites(data) {
	try {
		yield put({ type: addToActiveFavoritesAction.start, payload: data })
	} catch (error) {
		yield put(checkFavoritesAction.error)
	}
}

function* checkAndAddFavorites() {
	const data = yield call(checkFavorites)
	yield call(addToActiveFavorites, data)
}

const checkTracksFavorites1 = async idsArray => {
	const { checkFavoriteStatus, addToActiveFavorites } = this.props
	const favoritesTracksResponse = await checkFavoriteStatus({
		data: idsArray,
	})
	const favoritesTracks = get(favoritesTracksResponse, 'data.status', [])
	await addToActiveFavorites({
		data: favoritesTracks.filter(track => track.favorite === true).map(track => track.id),
	})
}

function* getMyFavorites() {
	try {
		const data = yield axiosInstance({ url: `/me/favorites?limit=20` })
		console.log('my favorites', data)
	} catch (error) {
		console.log('error', error)
	}
}

function* checkTracksFavorites(action) {
	console.log('action', action)
	const idsAsString = action.payload.join()
	try {
		const { data: { status } } = yield axiosInstance({ url: `/me/favorites/status?ids=${idsAsString}` })
		yield put({ type: 'ADD_TO_ACTIVE_FAVORITES', payload: { data: status } })
	} catch (error) {
		console.log('error', error)
	}

	// yield put({ type: '', json: json.articles })
}

function* checkTracksFavoritesWatcher() {
	yield takeEvery('CHECK_FAVORITES', checkTracksFavorites)
}

function* getMyFavoritesWatcher() {
	yield takeEvery('GET_FAVORITES', getMyFavorites)
}

export { checkTracksFavoritesWatcher, getMyFavoritesWatcher }

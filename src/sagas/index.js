import { all } from 'redux-saga/effects'

import { checkTracksFavoritesWatcher, getMyFavoritesWatcher } from './favorites'

export default function* rootSaga() {
	yield all([checkTracksFavoritesWatcher(), getMyFavoritesWatcher()])
}

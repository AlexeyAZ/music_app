import { combineReducers } from 'redux'

import modalModule from './modal'
import authModule from './auth'
import playbackModule from './playback'
import genresModule from './genres'
import artistsModule from './artists'
import playlistsModule from './playlists'
import favoritesModule from './favorites'

const rootReducer = combineReducers({
	...modalModule,
	...authModule,
	...playbackModule,
	...genresModule,
	...artistsModule,
	...playlistsModule,
	...favoritesModule,
})

export default rootReducer

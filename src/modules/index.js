import { combineReducers } from 'redux'

import modalModule from './modal'
import authModule from './auth'
import playbackModule from './playback'
import songsModule from './songs'
import genresModule from './genres'

const rootReducer = combineReducers({
	...modalModule,
	...authModule,
	...playbackModule,
	...songsModule,
	...genresModule,
})

export default rootReducer

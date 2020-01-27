import { createAction, createReducer } from 'helpers'

const initialState = {
	data: [],
}

const rawSongsPayload = [
	{
		name: 'Comfort Fit - Sorry',
		uri:
			'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
	},
	{
		name: 'Mildred Bailey – All Of Me',
		uri:
			'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
	},
	{
		name: 'Podington Bear - Rubber Robot',
		uri:
			'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
	},
]

const songsPayload = Array.from({ length: 5 })
	.map(() => [...rawSongsPayload])
	.flat()
	.map((item, index) => ({ ...item, id: String(index + 1) }))

export const getSongs = createAction('GET_SONGS')

const songsModule = {
	songs: createReducer(getSongs, {
		initialState,
		customTypes: {
			[getSongs.start]: (state, payload) => {
				return {
					...state,
					data: songsPayload,
				}
			},
		},
	}),
}

export default songsModule

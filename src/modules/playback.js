import { createAction, createReducer } from 'helpers'

const playbackInstanceInitialState = {
	instance: null,
}

const playbackStatusInitialState = {
	status: {
		uri: null,
		isMuted: false,
		positionMillis: null,
		durationMillis: null,
		shouldPlay: false,
		isPlaying: false,
		isBuffering: false,
		isLoaded: null,
		shouldCorrectPitch: true,
		progressUpdateIntervalMillis: 1000,
		volume: 1.0,
		rate: 1.0,
	},
	track: {
		id: null,
	},
}

const playbackInstancesQueueInitilaState = {
	queue: [],
}

export const updatePlaybackInstance = createAction('UPDATE_PLAYBACK_INSTANCE')
export const updatePlaybackStatus = createAction('UPDATE_PLAYBACK_STATUS')
export const updatePlaybackInstancesQueue = createAction('UPDATE_PLAYBACK_INSTANCES_QUEUE')
export const clearPlaybackInstancesQueue = createAction('CLEAR_PLAYBACK_INSTANCES_QUEUE')

const playerModule = {
	playbackInstance: createReducer(updatePlaybackInstance, {
		initialState: playbackInstanceInitialState,
		customTypes: {
			[updatePlaybackInstance.start]: (state, payload) => {
				return {
					...state,
					instance: payload,
				}
			},
		},
	}),
	playbackStatus: createReducer(updatePlaybackStatus, {
		initialState: playbackStatusInitialState,
		customTypes: {
			[updatePlaybackStatus.start]: (state, payload) => {
				return {
					...state,
					status: { ...payload.status },
					track: { ...payload.track },
				}
			},
		},
	}),
	playbackInstancesQueue: createReducer(updatePlaybackInstancesQueue, {
		initialState: playbackInstancesQueueInitilaState,
		customTypes: {
			[updatePlaybackInstancesQueue.start]: (state, payload) => {
				return {
					...state,
					queue: [...state.queue, payload],
				}
			},
			[clearPlaybackInstancesQueue.start]: state => {
				return {
					...state,
					queue: [],
				}
			},
		},
	}),
}

export default playerModule

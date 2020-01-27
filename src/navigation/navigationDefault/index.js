import React from 'react'

import { BackButton } from 'components'

import defaultOptions from '../defaultOptions'

const navigationDefault = ({ backButtonTitle = 'Обратно', backButtonScreen = null } = {}) => ({
	...defaultOptions,
	headerLeft: <BackButton title={backButtonTitle} screen={backButtonScreen} />,
})

export default navigationDefault

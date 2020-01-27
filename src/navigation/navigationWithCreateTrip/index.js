import React from 'react'
import { Image, SvgIcon, TouchableOpacity, ActiveLogo } from 'components'

import hamburgerIcon from 'assets/images/icon/hamburger.svg'
import plusInCircleIcon from 'assets/images/icon/plus-in-circle.png'

import defaultOptions from '../defaultOptions'

const navigationWithCreateTrip = ({ navigation, customOptions }) => ({
	...defaultOptions,
	headerTitle: <ActiveLogo />,
	headerLeft: (
		<TouchableOpacity onPress={() => navigation.openDrawer()}>
			<SvgIcon source={hamburgerIcon} height={18} width={25} />
		</TouchableOpacity>
	),
	headerRight: (
		<TouchableOpacity onPress={() => navigation.navigate('CreateTrip')}>
			<Image source={plusInCircleIcon} style={{ height: 30, width: 30 }} />
		</TouchableOpacity>
	),
	// headerStyle: {borderColor: 'red', borderWidth: 1},
	headerTitleContainerStyle: { justifyContent: 'center' },
	...customOptions,
})

export default navigationWithCreateTrip

import React from 'react'
import { View } from 'react-native'
import { ActiveLogo, SvgIcon, TouchableOpacity } from 'components'

import hamburgerIcon from 'assets/images/icon/hamburger.svg'

import defaultOptions from '../defaultOptions'

const navigationWithNavbar = ({ navigation, customOptions }) => ({
	...defaultOptions,
	headerTitle: <ActiveLogo />,
	headerLeft: (
		<TouchableOpacity onPress={() => navigation.openDrawer()}>
			<SvgIcon source={hamburgerIcon} height={18} width={25} />
		</TouchableOpacity>
	),
	headerRight: <View width={25} />,
	headerTitleContainerStyle: { justifyContent: 'center' },
	...customOptions,
})

export default navigationWithNavbar

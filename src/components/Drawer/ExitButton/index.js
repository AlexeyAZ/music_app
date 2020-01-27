import React from 'react'

import arrowWithCircle from 'assets/images/icon/arrow-with-circle.png'

import { MainText } from '../../Typography'
import TouchableOpacity from '../../TouchableOpacity'
import Image from '../../Image'

import styles from './styles'

const ExitButton = () => (
	<TouchableOpacity style={styles.wrap}>
		<MainText size="m" weight="medium">Выход</MainText>
		<Image source={arrowWithCircle} style={styles.icon} />
	</TouchableOpacity>
)

export default ExitButton

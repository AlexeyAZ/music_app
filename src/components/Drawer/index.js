import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

import drawerImage from 'assets/images/drawer-image.png'

import Avatar from '../Avatar'
import Dash from '../Dash'
import { MainText } from '../Typography'
import TouchableOpacity from '../TouchableOpacity'
import { Container } from '../Grid'
import FlexImage from '../FlexImage'

import ExitButton from './ExitButton'
import Count from './Count'

import styles from './styles'

const Drawer = ({ navigation, menuItems, name, avatar }) => {
	return (
		<Container offsets={false} style={styles.wrap}>
			<Container offsets={false} style={styles.content}>
				<View>
					<Container greedy={false}>
						<View style={styles.userInfo}>
							<Avatar source={avatar} style={styles.avatar} />
							<MainText weight="bold" family="montserrat" align="center" mb={16}>
								{name}
							</MainText>
						</View>
						<Dash style={styles.dash} />
						{menuItems.map(item => (
							<TouchableOpacity
								style={styles.menuItem}
								key={item.key}
								onPress={() => navigation.navigate(item.screen)}
							>
								<MainText size="m">{item.text}</MainText>
								{item.screen === 'MyTrips' && <Count value={1} />}
							</TouchableOpacity>
						))}
					</Container>
					<FlexImage source={drawerImage} style={styles.image} />
				</View>
			</Container>
			<View style={styles.exitButtonWrap}>
				<ExitButton />
			</View>
		</Container>
	)
}

Drawer.propTypes = {
	navigation: PropTypes.object.isRequired,
	menuItems: PropTypes.array,
	name: PropTypes.string,
	avatar: PropTypes.string,
}
Drawer.defaultProps = {
	menuItems: [
		{
			text: 'Профиль',
			screen: 'Profile',
			key: 'profile',
		},
		{
			text: 'Мои поездки',
			screen: 'MyTrips',
			key: 'myTrips',
		},
		{
			text: 'Оплата',
			screen: 'PaymentMethods',
			key: 'payment',
		},
		{
			text: 'Поддержка',
			screen: '',
			key: 'support',
		},
	],
	name: 'Ягодников Эммануил Дмитриевич',
	avatar: null,
}

export default Drawer

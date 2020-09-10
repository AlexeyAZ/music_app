import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { store } from 'store'
import { AppContent } from 'containers'
import { Drawer } from 'components'
import { Test, Login, Registration, Profile, Player, Playlist, TopArtists, Genres } from 'screens'
import { navigationDefault } from 'navigation'

const AuthNavigator = createStackNavigator(
	{
		Login,
		Registration,
	},
	{
		initialRouteName: 'Login',
		defaultNavigationOptions: navigationDefault(),
	}
)

const AppNavigator = createStackNavigator(
	{
		Test,
		Profile,
		Player,
		Playlist,
		TopArtists,
		Genres,
	},
	{
		initialRouteName: 'Genres',
		defaultNavigationOptions: navigationDefault(),
	}
)

const DrawerNavigator = createDrawerNavigator(
	{
		Drawer: AppNavigator,
	},
	{
		contentComponent: Drawer,
	}
)

const AppContainer = createAppContainer(
	createSwitchNavigator(
		{
			App: DrawerNavigator,
			Auth: AuthNavigator,
		},
		{
			initialRouteName: 'Auth',
		}
	)
)

const App = () => {
	return (
		<Provider store={store}>
			<AppContent>
				<AppContainer />
			</AppContent>
		</Provider>
	)
}

App.propTypes = {}
App.defaultProps = {}

export default App

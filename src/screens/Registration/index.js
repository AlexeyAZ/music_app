import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import * as Yup from 'yup'
import { withNavigation } from 'react-navigation'

import {
	Button,
	Container,
	Form,
	Input,
	FieldItem,
	FieldContainer,
	Heading,
	RegistrationImage,
	ScreenWrap,
} from 'components'

import { rules } from 'helpers'

import styles from './styles'

const { REQUIRED_FIELD } = rules

// eslint-disable-next-line react/prefer-stateless-function
class Registration extends Component {
	render() {
		const { navigation } = this.props
		return (
			<ScreenWrap>
				<Container style={styles.container}>
					<View style={styles.content}>
						<Heading mb={25} align="center">
							Регистрация
						</Heading>
						<Form
							initialValues={{ login: '', password: '' }}
							onSubmit={(values, other) => {
								navigation.navigate('EmailConfirmed')
							}}
							validationSchema={Yup.object({
								// TODO return validation
								login: Yup.string(), //Yup.string().required(REQUIRED_FIELD),
								password: Yup.string(), //Yup.string().required(REQUIRED_FIELD),
							})}
						>
							{({ errors, handleChange, handleBlur, handleSubmit, values }) => (
								<>
									<FieldItem error={errors.login}>
										<Input
											onChangeText={handleChange('login')}
											onBlur={handleBlur('login')}
											value={values.login}
											placeholder="Ваш никнейм или ФИО"
										/>
									</FieldItem>
									<FieldItem error={errors.password}>
										<Input
											secureTextEntry
											onChangeText={handleChange('password')}
											onBlur={handleBlur('password')}
											value={values.password}
											placeholder="E-mail"
										/>
									</FieldItem>
									<FieldContainer>
										<Button bordered shadow={false} onPress={handleSubmit}>
											Подтвердить Email
										</Button>
									</FieldContainer>
								</>
							)}
						</Form>
					</View>
					<RegistrationImage />
				</Container>
			</ScreenWrap>
		)
	}
}
Registration.propTypes = {
	navigation: PropTypes.object.isRequired,
}

export default withNavigation(Registration)

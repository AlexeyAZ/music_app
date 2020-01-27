import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import * as Yup from 'yup'
import get from 'lodash/get'

import { withNavigation } from 'react-navigation'

import {
	Button,
	Form,
	InputMask,
	FieldItem,
	Heading,
	MainText,
	Avatar,
	Switcher,
	Select,
	CarImage,
	LayoutWithFixedFooter,
	SvgIcon,
	ScreenWrap,
	Spacer,
	Tooltip,
} from 'components'

import { navigationDefault } from 'navigation'

import jeepImage from 'assets/images/car-jeep-big.png'
import dropIcon from 'assets/images/icon/drop.svg'
import checkInCircleIcon from 'assets/images/icon/check-in-circle.svg'
import checkInCircleActiveIcon from 'assets/images/icon/check-in-circle-active.svg'

import { rules } from 'helpers'

import styles from './styles'

const { REQUIRED_FIELD } = rules

const { maskOptions } = InputMask

const mockUser = {
	avatarSource: null,
	name: 'User Name',
	email: 'scarrydigital@sberbank.ru',
	emailChecked: false,
	carImage: jeepImage,
}

const carExistOptions = [
	{
		title: 'Нет авто',
		value: 0,
	},
	{
		title: 'Есть авто',
		value: 1,
	},
]

const carBrandMock = [
	{
		label: 'Lada',
		value: 'lada',
	},
	{
		label: 'Kia',
		value: 'kia',
	},
	{
		label: 'Mercedes Benz',
		value: 'mercedesBenz',
	},
]

const carModelMock = {
	kia: [
		{
			label: 'Rio',
			value: 'rio',
		},
		{
			label: 'Ceed',
			value: 'ceed',
		},
	],
	lada: [
		{
			label: 'Kalina',
			value: 'kalina',
		},
		{
			label: 'Vesta',
			value: 'vesta',
		},
	],
	mercedesBenz: [
		{
			label: 'S 350d',
			value: 's350d',
		},
		{
			label: 'G 350 d',
			value: 'g350d',
		},
	],
}

const carColorsMock = [
	{
		label: 'Красный',
		value: 'red',
	},
	{
		label: 'Зеленый',
		value: 'green',
	},
]

const defaultColors = [
	{
		value: 'red',
		color: 'red',
	},
	{
		value: 'green',
		color: 'green',
	},
]

const validationPhone = Yup.string() //.required(REQUIRED_FIELD)
const validationSchemaWithAuto = Yup.object({
	phone: validationPhone,
	carBrand: Yup.string()
		// .required(REQUIRED_FIELD)
		.nullable(),
	carModel: Yup.string()
		// .required(REQUIRED_FIELD)
		.nullable(),
	carRegNumber: Yup.string(), //.required(REQUIRED_FIELD),
	carColor: Yup.string()
		// .required(REQUIRED_FIELD)
		.nullable(),
})
const validationSchemaWithoutAuto = Yup.object({
	phone: validationPhone,
})

class Profile extends Component {
	validationSchema = null

	constructor(props) {
		super(props)

		const activeCarExistValue = carExistOptions[0].value

		this.getValidationSchema = isCarExist => {
			if (isCarExist) {
				return validationSchemaWithAuto
			}
			return validationSchemaWithoutAuto
		}

		this.validationSchema = this.getValidationSchema(activeCarExistValue)
		this.state = {
			activeCarExistOption: activeCarExistValue,
		}
	}

	handleSwitcherButtonPress = option => {
		this.validationSchema = this.getValidationSchema(option.value)
		this.setState({ activeCarExistOption: option.value })
	}

	static navigationOptions = navigationDefault({
		backButtonTitle: 'На главную',
		backButtonScreen: 'Main',
	})

	render() {
		const { activeCarExistOption } = this.state
		return (
			<ScreenWrap keyboardOffset>
				<Form
					initialValues={{
						phone: '',
						carBrand: null,
						carModel: null,
						carColor: null,
						carRegNumber: '',
					}}
					onSubmit={(values, other) => {
						this.scrollContainer.scrollTo({ y: 0 })
					}}
					validationSchema={this.validationSchema}
				>
					{({ errors, handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
						const carColor =
							get(
								defaultColors.find(item => item.value === values.carColor),
								'color'
							) || styles.carColorDefault.color
						return (
							<LayoutWithFixedFooter
								scrollContainerRef={el => {
									this.scrollContainer = el
								}}
								renderFooter={() => <Button onPress={handleSubmit}>Сохранить изменения</Button>}
							>
								<Heading align="center" mb={20}>
									Мой профиль
								</Heading>
								<View style={styles.avatarWrap}>
									<Avatar source={mockUser.avatarSource} style={styles.avatar} />
									<MainText family="montserrat" weight="medium" mb={20}>
										{mockUser.name}
									</MainText>
								</View>
								<View>
									<FieldItem error={errors.phone}>
										<InputMask
											options={maskOptions.mobilePhone}
											onChangeText={handleChange('phone')}
											onBlur={handleBlur('phone')}
											value={values.phone}
											placeholder="Телефон"
										/>
										<Tooltip content="Подтвердив свой телефон, вы получите больше возможностей в виде уведомлений WhatsApp и Telegram, а также доступ к технической поддержке.">
											<SvgIcon
												source={mockUser.emailChecked ? checkInCircleActiveIcon : checkInCircleIcon}
												height={31}
												width={31}
											/>
										</Tooltip>
									</FieldItem>
									<MainText fontStyle="italic" color="gray.n82" align="center" mb={28}>
										{mockUser.email}
									</MainText>
									<View style={styles.switcherWrap}>
										<Switcher
											options={carExistOptions}
											activeValue={activeCarExistOption}
											onButtonPress={this.handleSwitcherButtonPress}
										/>
									</View>
									{Boolean(activeCarExistOption) && (
										<>
											<CarImage source={mockUser.carImage} />
											<Spacer size={20} />
											<FieldItem error={errors.carBrand}>
												<Select
													placeholder={{ label: 'Выберите марку автомобиля' }}
													value={values.carBrand}
													items={carBrandMock}
													onValueChange={value => {
														setFieldValue('carBrand', value)
													}}
												/>
											</FieldItem>
											<FieldItem error={errors.carModel}>
												<Select
													disabled={!values.carBrand}
													placeholder={{ label: 'Выберите модель автомобиля' }}
													value={values.carModel}
													items={values.carBrand ? carModelMock[values.carBrand] : []}
													onValueChange={value => {
														setFieldValue('carModel', value)
													}}
												/>
											</FieldItem>
											<FieldItem error={errors.carColor}>
												<SvgIcon
													height="22"
													width="16"
													source={dropIcon}
													fill={carColor}
													style={styles.dropIcon}
												/>
												<Select
													placeholder={{ label: 'Выберите цвет автомобиля' }}
													value={values.carColor}
													items={carColorsMock}
													onValueChange={value => setFieldValue('carColor', value)}
												/>
											</FieldItem>
											<FieldItem error={errors.carRegNumber}>
												<InputMask
													options={maskOptions.carNumber}
													onChangeText={handleChange('carRegNumber')}
													onBlur={handleBlur('carRegNumber')}
													value={values.carRegNumber}
													placeholder="Номер"
												/>
											</FieldItem>
										</>
									)}
								</View>
							</LayoutWithFixedFooter>
						)
					}}
				</Form>
			</ScreenWrap>
		)
	}
}
Profile.propTypes = {
	
}
export default withNavigation(Profile)

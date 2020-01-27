const maskOptions = {
	mobilePhone: {
		mask: '+7 (999) 999 99 99',
		getRawValue: value => value.replace(/\D/g, ''),
	},
	carNumber: {
		mask: 'R 999 RR 999',
		getRawValue: value => value.replace(/\s/g, ''),
		translation: {
			R: value => value.match(/[а-яА-ЯЁё]/),
		},
	},
	creditCardDate: {
		mask: '99 / 99',
	},
	creditCardCvv: {
		mask: '999',
	},
}

export default maskOptions

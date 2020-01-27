import React from 'react'
import PropTypes from 'prop-types'
import SvgUri from 'react-native-svg-uri'

const SvgIcon = ({ showWebviewLoader, ...rest }) => (
	<SvgUri showWebviewLoader={showWebviewLoader} {...rest} />
)
SvgIcon.propTypes = {
	showWebviewLoader: PropTypes.bool,
}
SvgIcon.defaultProps = {
	showWebviewLoader: false,
}
export default SvgIcon

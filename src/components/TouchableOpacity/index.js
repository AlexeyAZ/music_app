import React from 'react'
import { TouchableOpacity as NativeTouchableOpacity } from 'react-native'

const TouchableOpacity = ({ ...rest }) => <NativeTouchableOpacity activeOpacity={0.5} {...rest} />

export default TouchableOpacity

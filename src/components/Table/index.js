import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight, ScrollView } from 'react-native'
import noop from 'lodash/noop'

import { MainText } from '../Typography'
import Dash from '../Dash'

import styles from './styles'

const headDefaultKey = -1

class Table extends Component {
	getRowUnderlayColor = key => {
		const { rowUnderlayColor } = this.props
		if (key === headDefaultKey) return styles.underlayHead.color
		if (rowUnderlayColor) return rowUnderlayColor
		return styles.underlay.color
	}

	renderRow = row => {
		const { columns, onRowPress } = this.props
		const underlayColor = this.getRowUnderlayColor(row.key)
		const rowStyle = row.key === headDefaultKey ? styles.headRow : styles.row
		return (
			<TouchableHighlight
				key={row.key}
				underlayColor={underlayColor}
				activeOpacity={1}
				onPress={row.key === headDefaultKey ? noop : onRowPress}
			>
				<View>
					<View style={rowStyle}>{columns.map(column => this.renderColumn(row, column))}</View>
					<Dash />
				</View>
			</TouchableHighlight>
		)
	}

	renderColumn = (row, column) => {
		const dataIndex = column.dataIndex || column.key
		const columnContent = row[dataIndex]
		const style = column.style || {}
		const render = row.key === headDefaultKey ? column.renderTitle : column.render
		const width = column.width
			? { width: column.width, maxWidth: column.width, flexBasis: column.width, flexShrink: 0 }
			: {}
		return (
			<View key={`${row.key}_${column.key}`} style={[styles.column, style, width]}>
				{render ? render(columnContent, row) : <MainText>{columnContent}</MainText>}
			</View>
		)
	}

	generateHeadData = () => {
		const { columns } = this.props
		const headData = columns.reduce(
			(acc, column) => {
				const dataIndex = column.dataIndex || column.key
				const title = column.title || ''
				return { ...acc, [dataIndex]: title }
			},
			{ key: headDefaultKey }
		)
		return headData
	}

	render() {
		const { data: rawData, showHead, fixedHead } = this.props
		const headData = showHead ? [this.generateHeadData()] : []
		const data = [...headData, ...rawData]
		if (fixedHead) {
			return (
				<View style={styles.tableWithFixedHeadWrap}>
					{headData.length > 0 && <View>{headData.map(row => this.renderRow(row))}</View>}
					<ScrollView style={styles.tableWithFixedHeadBody}>
						<View>{rawData.map(row => this.renderRow(row))}</View>
					</ScrollView>
				</View>
			)
		}
		return <View>{data.map(row => this.renderRow(row))}</View>
	}
}

Table.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
	showHead: PropTypes.bool,
	fixedHead: PropTypes.bool,
	rowUnderlayColor: PropTypes.string,
	onRowPress: PropTypes.func,
}
Table.defaultProps = {
	showHead: false,
	fixedHead: false,
	rowUnderlayColor: null,
	onRowPress: noop,
}

export default Table

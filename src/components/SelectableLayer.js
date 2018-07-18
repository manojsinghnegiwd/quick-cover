import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { defaultPosition } from '../utils/constants'

import { position } from '../types'

export default class SelectableLayer extends Component {

    render () {

        const {
            position,
            width,
            height,
            selectedElementType
        } = this.props

        const selectedStyle = {
            fill: "transparent",
            strokeWidth: 2,
            stroke: "black"
        }

        let selectBorderPosition = {
            x: position.x - 5,
            y: position.y - 5
        }

        // because text x y position start from baseline
        if (selectedElementType == 'text') {
            selectBorderPosition = {
                x: position.x - 5,
                y: position.y - height
            }
        }

        return <g transform={`translate(${selectBorderPosition.x}, ${selectBorderPosition.y })`}>
            <rect
                width={width + 10}
                height={height + 10}
                style={selectedStyle}
            />
        </g>

    }

}

SelectableLayer.defaultProps = {
    position: defaultPosition,
    width: 0,
    height: 0,
    selectedElementType: ''
}

SelectableLayer.propTypes = {
    position: position,
    width: PropTypes.number,
    height: PropTypes.number,
    selectedElementType: PropTypes.string
}
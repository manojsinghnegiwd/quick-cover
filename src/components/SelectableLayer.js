import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { defaultPosition } from '../utils/constants'

import { position } from '../types'

export default class SelectableLayer extends Component {

    render () {

        const {
            position,
            width,
            height
        } = this.props

        const selectedStyle = {
            fill: "transparent",
            strokeWidth: 2,
            stroke: "black"
        }

        return <g transform={`translate(${position.x - 5}, ${position.y - 5})`}>
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
    height: 0
}

SelectableLayer.propTypes = {
    position: position,
    width: PropTypes.number,
    height: PropTypes.number
}
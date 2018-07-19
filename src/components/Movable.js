import React, { Component } from 'react'

import { findDimensions } from '../utils/elements';

const MovableHOC = WrappedComponent =>
    class Movable extends Component {

        onMovableDown = e => {

            const {
                onMovableDown,
                onMovableActive
            } = this.props;

            const {
                target
            } = e;

            const dim = findDimensions(e.target);
            const x = e.clientX - dim.left;
            const y = e.clientY - dim.top;

            onMovableDown({x, y}, dim)
            onMovableActive(e)

        }

        render () {

            const {
                position = {
                    x: 0,
                    y: 0
                },
                onMovableDown,
                onMovableActive,
                ...restProps
            } = this.props

            return <WrappedComponent
                onMovableActive={onMovableActive}
                onMovableDown={this.onMovableDown}
                position={position}
                {...restProps}
            />

        }

    }

export const MovableMarkup = WrappedComponent => MovableHOC(({
    position,
    onMovableActive,
    onMovableDown,
    ...restProps
}) => <g transform={`translate(${position.x}, ${position.y})`} onClick={onMovableActive} onMouseDown={onMovableDown} dangerouslySetInnerHTML={{ __html: WrappedComponent}}></g>)

export const MovableSvgElement = WrappedComponent => MovableHOC(({
    position,
    onMovableActive,
    onMovableDown,
    ...restProps
}) => <g transform={`translate(${position.x}, ${position.y})`} onClick={onMovableActive} onMouseDown={onMovableDown}>
    <WrappedComponent
        {...restProps}
    />
</g>)
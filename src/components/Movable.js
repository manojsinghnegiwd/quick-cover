import React, { Component } from 'react'

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

            const dim = target.getBoundingClientRect();
            const x = e.clientX - dim.left;
            const y = e.clientY - dim.top;


            onMovableDown({x, y})
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

            return (

                <g transform={`translate(${position.x}, ${position.y})`} onClick={onMovableActive} onMouseDown={this.onMovableDown}>
                    <WrappedComponent
                        {...restProps}
                    />
                </g>

            )

        }

    }

export default MovableHOC
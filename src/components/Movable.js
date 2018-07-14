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

            // let renderedHtml =  null
            
            // console.log({ __html: <WrappedComponent
            //     {...restProps}
            // />})

            // if(setInnerHtml) {
            //     renderedHtml = <g transform={`translate(${position.x}, ${position.y})`} onClick={onMovableActive} onMouseDown={this.onMovableDown} dangerouslySetInnerHTML={{ __html: WrappedComponent}}></g>
            // } else {
            //     renderedHtml = <g transform={`translate(${position.x}, ${position.y})`} onClick={onMovableActive} onMouseDown={this.onMovableDown}>
            //         <WrappedComponent
            //             {...restProps}
            //         />
            //     </g>
            // }

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
import React, { Component } from 'react'

// import MovableHOC from './components/Movable'
import ImageUploader from './components/ImageUploader';


// utils
import { createElement } from './utils/elements';

class App extends Component {

    previousMouseCoords = {
        x: 0,
        y: 0
    }

    state = {
        height: 500,
        width: 500,
        isMouseDown: false,
        activeElementIndex: null,
        offset: {
            x: 0,
            y: 0
        },
        elements: []
    }

    updatePosition = (index, position) => {

        this.previousMouseCoords.x = position.x;
        this.previousMouseCoords.y = position.y;

        const positionInSVG = this.previousMouseCoords.matrixTransform(this.mainSVG.getScreenCTM().inverse())

        const { elements } = this.state
        const copiedElements = [...elements]

        copiedElements[index] = {
            ...copiedElements[index],
            position: positionInSVG
        }

        this.setState({
            elements: copiedElements
        })

    }

    onMouseMove = e => {

        const {isMouseDown, activeElementIndex, offset } = this.state

        if (isMouseDown && activeElementIndex !== null) {

            this.updatePosition(activeElementIndex, {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            })
        }

    }

    onMouseDown = e => {
        this.setState({
            isMouseDown: true
        })
    }

    onMouseUp = e => {
        this.setState({
            isMouseDown: false,
            activeElementIndex: null,
            offset: {
                x: 0,
                y: 0
            }
        })
    }

    onMovableActive = index => e => this.setState({
        activeElementIndex: index
    })
    
    onMovableDown = offset => this.setState({
        offset
    })

    addElement = (element) => {
        const { elements } = this.state

        this.setState({
            elements: [...elements, element]
        })

    }

    removeElement = () => {
        const { elements, activeElementIndex } = this.state

        const copiedElements = [...elements]

        copiedElements.splice(activeElementIndex, 1)

        this.setState({
            elements: copiedElements
        })

    }

    onImageUpload = uploadedImage => {
        
        const { element } = uploadedImage

        this.addElement(element)

    }

    componentDidMount () {
        this.previousMouseCoords = this.mainSVG.createSVGPoint()
    }

    render() {

        const {
            height,
            width,
            elements,
            activeElementIndex
        } = this.state;

        return (
            <div className="App">
                <svg
                    ref={c => this.mainSVG = c}
                    width={width}
                    height={height}
                    onMouseMove={this.onMouseMove}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                >
                    {
                        elements.map(
                            (element, index) => {
                                const { component, props, position} = element
                                const { onMovableActive, onMovableDown } = this;
                                const ComponentToRender = component
                                const ComponentProps = {
                                    ...props,
                                    position
                                }

                                return (
                                    <ComponentToRender
                                        key={index}
                                        onMovableActive={onMovableActive(index)}
                                        onMovableDown={onMovableDown}
                                        {...ComponentProps}
                                    />
                                )
                            }
                        )
                    }
                </svg>
                <ImageUploader
                    onImageUpload={this.onImageUpload}
                />
                { activeElementIndex !== null ? <button onClick={this.removeElement}> Remove Circle </button> : null}
            </div>
        );
    }
}

export default App;

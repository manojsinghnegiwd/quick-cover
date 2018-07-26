import React, { Component } from 'react'
import { ChromePicker } from 'react-color'

// utils
import { partial } from './utils/functions';
import { updateOrder, createElement, findDimensions } from './utils/elements';

import ImageUploader from './components/ImageUploader';
import SelectableLayer from './components/SelectableLayer';
import { MovableSvgElement } from './components/Movable';
import ElementList from './components/ElementList';

class App extends Component {

    previousMouseCoords = {
        x: 0,
        y: 0
    }

    state = {
        height: 600,
        width: 1000,
        isMouseDown: false,
        activeElementIndex: null,
        activeElementDims: {
            width: 0,
            height: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        elements: [],
        svgBackgroundColor:{
            r: '255',
            g: '255', 
            b: '255', 
            a: '1'
        }
    }

    updatePosition = (index, position) => {

        this.previousMouseCoords.x = position.x
        this.previousMouseCoords.y = position.y

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

    updateOrder = (direction, index) => {

        const { elements } = this.state

        const { updatedELements, updatedIndex } = updateOrder(elements, direction, index)

        this.setState({
            elements: updatedELements,
            activeElementIndex: updatedIndex
        })

    }

    moveFront = partial(this.updateOrder, 'front')
    moveBack = partial(this.updateOrder, 'back')

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
            // activeElementIndex: null,
            offset: {
                x: 0,
                y: 0
            }
        })
    }

    onMovableActive = index => e => {

        const dims = findDimensions(e.target)

        this.setState({
            activeElementIndex: index,
            activeElementDims: dims
        })
    }
    
    editOnchange = index => e => {
      const {elements} = this.state
      const newElements = [...elements]
      newElements[index] = {
        ...newElements[index],
        props:{
            ...newElements[index].props,
            children: e.target.value
        }
      }
      this.setState({
        elements: newElements
      })
    }
 
    onMovableDown = (offset, dims) => {
        this.setState({
            offset,
            dims
        })
    }

    addElement = (element) => {
        const { elements } = this.state

        this.setState({
            elements: [...elements, element],
            activeElementIndex: elements.length
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

    addText = () => {

        const MovableText = MovableSvgElement('text')

        const element = createElement(MovableText, { children: 'Text' }, {x: 200, y: 200}, 'text')

        this.addElement(element)

    }

    changeSvgBackgroundColor = color => {
        
        this.setState({ svgBackgroundColor: color.rgb });

    };

    componentDidMount () {
        this.previousMouseCoords = this.mainSVG.createSVGPoint()
    }

    render() {

        const {
            height,
            width,
            elements,
            activeElementIndex,
            activeElementDims,
            svgBackgroundColor
        } = this.state;

        const selectedElement = elements[activeElementIndex] || {};
        return (
            <div className="App">
                <svg
                    ref={c => this.mainSVG = c}
                    width={width}
                    className='pointer'
                    height={height}
                    onMouseMove={this.onMouseMove}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    style={{background: `rgba(${ svgBackgroundColor.r }, ${ svgBackgroundColor.g }, ${ svgBackgroundColor.b }, ${ svgBackgroundColor.a })`}}
                >
                    <SelectableLayer
                        position={selectedElement.position}
                        width={activeElementDims.width}
                        height={activeElementDims.height}
                        selectedElementType={selectedElement.type}
                    />
                    <ElementList 
                        elements={elements}
                        onMovableActive={this.onMovableActive}
                        onMovableDown={this.onMovableDown}
                    />
                    
                </svg>
                <button onClick={this.addText}>Add text</button>
                <ImageUploader
                    onImageUpload={this.onImageUpload}
                />
                { activeElementIndex !== null ? <div>
                    <button onClick={this.removeElement}> Remove Circle </button>
                    <button onClick={() => this.moveFront(activeElementIndex)}> front </button>
                    <button onClick={() => this.moveBack(activeElementIndex)}> back </button>
                    {
                      selectedElement.type === 'text' ? <input type='text'  onChange={this.editOnchange(activeElementIndex)} value={selectedElement.props.children}/>
                       :null
                    } 
                </div> : null}
                <ChromePicker 
                    onChange={this.changeSvgBackgroundColor} 
                    color={svgBackgroundColor} 
                />
            </div>

        );
    }
}

export default App;

import React from 'react';
import PropTypes from 'prop-types';

const ElementList = ({elements,onMovableActive,onMovableDown}) => {

	return (
			
        elements.map(
            (element, index) => {
                const { component, props, position} = element
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
	)
}

ElementList.propTypes = {
    elements:PropTypes.array.isRequired,
    onMovableActive:PropTypes.func.isRequired,
    onMovableDown:PropTypes.func.isRequired

}

ElementList.defaultProps = {
    elements:[{
        component:'',
        props: {},
        position:{
            x:0,y:0
        }
    }],
    onMovableActive:() => void(0),
    onMovableDown:() => void(0)
}

export default ElementList;
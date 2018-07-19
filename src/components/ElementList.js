import React from 'react';

const ElementList = ({elements,onMovableActive,onMovableDown}) => {

	return (
		<div>
			{
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
            }
		</div>
		)
}

// ElementList.propTyps= {
    
// }

export default ElementList;
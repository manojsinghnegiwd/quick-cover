import React from 'react'

const HiddenElement = ({
    children
}) => {
    return <div style={{
        display: 'none'
    }}>
        {children}
    </div>
}

export default HiddenElement
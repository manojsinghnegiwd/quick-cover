import React, { Fragment, PureComponent } from 'react'
import ReactDOMServer from 'react-dom/server'

import HiddenElement from './HiddenElement'
import { MovableMarkup } from './Movable'

import { fileToDataUrl, createElement } from '../utils/elements'

export default class ImageUploader extends PureComponent {

    openImageUploader = () => {

        this.fileUploader.click()

    }

    onImageUpload = e => {

        if(e.target.files && e.target.files.length) {

            const file = e.target.files[0]

            fileToDataUrl(file)
                .then(
                    dataUrl => {

                        const Image = 'image'

                        const MovableImage = MovableMarkup(ReactDOMServer.renderToStaticMarkup(<Image href={dataUrl} />), true)

                        const element = createElement(MovableImage)

                        this.props.onImageUpload({
                            dataUrl,
                            file,
                            element
                        })

                    }
                )

        }

    }

    render () {

        const {
            button
        } = this.props

        return (

            <Fragment>
                <HiddenElement>
                    <input onChange={this.onImageUpload} type="file" ref={ c => this.fileUploader =  c} />
                </HiddenElement>
                <span onClick={this.openImageUploader}>
                    { button }
                </span>
            </Fragment>

        )

    }

}

ImageUploader.defaultProps = {
    onImageUpload: () => {},
    button: <button>Upload Image</button>
}
import React, { Fragment, PureComponent } from 'react'
import HiddenElement from './HiddenElement';
import { fileToDataUrl } from '../utils/elements';

export default class ImageUploader extends PureComponent {

    openImageUploader = () => {

        this.fileUploader.click()

    }

    onImageUpload = e => {

        if(e.target.files && e.target.files.length) {

            const file = e.target.files[0]

            fileToDataUrl(file)
                .then(
                    dataUrl => this.props.onImageUpload({
                        dataUrl,
                        file
                    })
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
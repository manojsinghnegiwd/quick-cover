export const createElement = (component, props = {}, position = { x: 0, y: 0 }) => {

    return {
        component,
        position,
        props
    }

}

export const fileToDataUrl = file =>
    new Promise (
        (resolve, reject) => {

            if (!file) {

                return reject('file is undefined')

            }

            const fileReader = new FileReader()

            fileReader.addEventListener("load", function () {

                resolve(fileReader.result)

            }, false);

            fileReader.readAsDataURL(file)

        }
    )
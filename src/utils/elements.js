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

export const shiftIndex = (arr, baseIndex, targetIndex) => {

    const newArr = [...arr]

    if(newArr[baseIndex] && newArr[targetIndex]) {
        const temp = newArr[targetIndex]
        newArr[targetIndex] = newArr[baseIndex]
        newArr[baseIndex] = temp

        return {
            updatedELements: newArr,
            updatedIndex: targetIndex
        }
    }

    return {
        updatedELements: newArr,
        updatedIndex: baseIndex
    }

}

export const updateOrder = (elements, direction, index) => {
    if(direction == 'front') {
        return shiftIndex(elements, index, index + 1)
    } else if ( direction == 'back') {
        return shiftIndex(elements, index, index - 1)
    }

    return {
        updatedELements: elements,
        updatedIndex: index
    }
}
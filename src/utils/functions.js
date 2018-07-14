export const partial = (func, ...firstArguments) => {
    return (...laterArguments) => func(...firstArguments, ...laterArguments)
}
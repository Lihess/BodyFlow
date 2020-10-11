const cmToInch = (data) => {
    return parseFloat((data / 2.54).toFixed(2))
}

const inchToCm = (data) => {
    return parseFloat((data * 2.54).toFixed(2))
}

export {cmToInch, inchToCm};
const cmToInch = (data) => {
    return (data / 2.54).toFixed(2)
}

const inchToCm = (data) => {
    return (data * 2.54).toFixed(2)
}

export {cmToInch, inchToCm};
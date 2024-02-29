const growthRate5Y = (array) => {
    if (array.length < 5) {
        return (Math.pow((array[0] / array[array.length - 1]), 1 / (array.length - 1)) - 1) * 100
    } else {
        return (Math.pow((array[0] / array[4]), 1 / 5) - 1) * 100
    }

}

const growthRate10Y = (array) => {
    if (array.length < 10) {
        return (Math.pow((array[0] / array[array.length - 1]), 1 / (array.length - 1)) - 1) * 100
    } else {
        return (Math.pow((array[0] / array[9]), 1 / 10) - 1) * 100
    }
}

const average5Y = (array) => {
    let sum = 0
    for (let i = 0; i < 5; i++) {
        sum += array[i]
    }
    return sum / 5;
}
// getEpsGrowth5Y();
export {
    growthRate5Y,
    growthRate10Y,
    average5Y
}
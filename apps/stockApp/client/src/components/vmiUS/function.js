const calculateDiscountRate = (beta) => {
    let discountRate = 0
    switch (true) {
        case beta <= 0.8: discountRate = 5; break;
        case beta <= 1: discountRate = 5.9; break;
        case beta <= 1.1: discountRate = 6.3; break;
        case beta <= 1.2: discountRate = 6.7; break;
        case beta <= 1.3: discountRate = 7.2; break;
        case beta <= 1.4: discountRate = 7.6; break;
        case beta <= 1.5: discountRate = 8; break;
        case beta > 1.5: discountRate = 8.4; break;
        default: discountRate = 7.2; break;
    }
    return discountRate;
}

const calculateDataIV = (netIncome, eps5Y, discountRate, gdpGrowthRate) => {
    const insintricValue = []
    const netIncome1 = netIncome * (1 + eps5Y)
    const discountFactor1 = 1 / (1 + discountRate)
    const discountValue1 = netIncome1 * discountFactor1

    insintricValue.push({
        netIncome: netIncome1,
        discountFactor: discountFactor1,
        discountValue: discountValue1
    });

    [...Array(4).keys()].forEach((index) => {
        const netIncome = insintricValue[index].netIncome * (1 + eps5Y)
        const discountFactor = insintricValue[index].discountFactor / (1 + discountRate)
        const discountValue = netIncome * discountFactor
        insintricValue.push({ netIncome, discountFactor, discountValue })
    });

    [4, 5, 6, 7, 8].forEach((index) => {
        const netIncome = insintricValue[index].netIncome * (1 + eps5Y / 2)
        const discountFactor = insintricValue[index].discountFactor / (1 + discountRate)
        const discountValue = netIncome * discountFactor
        insintricValue.push({ netIncome, discountFactor, discountValue })
    });

    [9, 10, 11, 12, 13, 14, 15, 16, 17, 18].forEach((index) => {
        const netIncome = insintricValue[index].netIncome * (1 + gdpGrowthRate)
        const discountFactor = insintricValue[index].discountFactor / (1 + discountRate)
        const discountValue = netIncome * discountFactor
        insintricValue.push({ netIncome, discountFactor, discountValue })
    });

    return insintricValue;
}

const calculateInitialIV = (netIncome, eps5Y, discountRate, gdpGrowthRate) => {
    let initialIV = 0
    const data = calculateDataIV(netIncome, eps5Y, discountRate, gdpGrowthRate);
    data.forEach(e => {
        initialIV += e.discountValue
    })
    return initialIV;
};

const toRender = (num) => {
    if (num === undefined || typeof (num) !== "number") {
        return ""
    }
    return num.toFixed(2);
}

export {
    calculateDiscountRate,
    calculateInitialIV,
    calculateDataIV,
    toRender
}
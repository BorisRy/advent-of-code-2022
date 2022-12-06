const { crateArrangment, displayCrates, rearrangmentSteps } = require('./day-05.solution.part1')

displayCrates()
rearrangmentSteps.forEach(step => rearrangeCrates(step))

function rearrangeCrates(step) {
    const [amount, fromCol, toCol] = step
    const crates = getTopCrates(amount, fromCol)
    for (let i = crates.length - 1; i >= 0; i--) {
        const crate = crates[i]
        placeCrate(toCol, crate)
    }
    displayCrates()
}

function getTopCrates(amount, fromCol) {
    const crates = []
    for (let i = 0; i < amount; i++) {
        const crateIdx = crateArrangment.findIndex((row, idx) => {
            return (row[fromCol] !== ' ')
        })
        const crate = crateArrangment[crateIdx][fromCol]
        crateArrangment[crateIdx][fromCol] = ' '
        crates.push(crate)
    }
    return crates
}


function placeCrate(toCol, crate) {
    let firstEmptyIdx = -1
    while (firstEmptyIdx === -1) {
        firstEmptyIdx = crateArrangment.findIndex((row, idx, arr) => {
            if (idx < arr.length - 1) {
                return (row[toCol] === ' ' && arr[idx + 1][toCol] !== ' ')
            } else {
                return (row[toCol] === ' ')
            }
        })
        if (firstEmptyIdx === -1) crateArrangment.splice(0, 0, Array(9).fill(' '))
    }

    crateArrangment[firstEmptyIdx][toCol] = crate
}
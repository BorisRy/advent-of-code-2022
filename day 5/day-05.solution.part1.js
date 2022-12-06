const fs = require('fs')

const input = fs.readFileSync('./day-05.input.txt', 'utf-8').split('\r\n')
const idx = input.findIndex(line => line === '')


// Return a matrix with the crates
const crateArrangment = input
    .slice(0, idx - 1)
    .map(row => row.split('').map((item, idx, arr) => {
        if (idx === 0 || idx % 4 === 0) {
            let currentSegment = arr.slice(idx, idx + 3)
            return currentSegment[1]
        }
    }))
    .map(row => row.filter(crate => crate))

// Get an array with the steps in the form of [x, y, z]
// z is the amount of crates, y is the source column and z is destination column
const rearrangmentSteps = input
    .slice(idx + 1)
    .map(step => step.split(' '))
    .map(step => [+step[1], +step[3] - 1, +step[5] - 1])



// displayCrates()
// rearrangmentSteps.forEach(step => rearrangeCrates(step))


function rearrangeCrates(step) {
    const [amount, fromCol, toCol] = step
    for (let i = 0; i < amount; i++) {
        const crate = getTopCrate(fromCol)
        placeCrate(toCol, crate)
        displayCrates()
    }
}

function getTopCrate(fromCol) {
    const crateIdx = crateArrangment.findIndex((row, idx) => {
        return (row[fromCol] !== ' ')
    })
    const crate = crateArrangment[crateIdx][fromCol]
    crateArrangment[crateIdx][fromCol] = ' '
    return crate
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

function displayCrates() {
    let cratesString = ''
    crateArrangment.forEach(row => {
        row.forEach(crate => cratesString += `[${crate}]`)
        cratesString += "\n"
    })

    console.log(cratesString)
}

module.exports = {
    crateArrangment,
    displayCrates,
    rearrangmentSteps
}
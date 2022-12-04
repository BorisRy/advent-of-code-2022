const fs = require('fs')

const pairs = fs.readFileSync('day-04.input.txt', 'utf-8')
    .split('\r\n')
    .map(pair => pair.split(',').map(range => range.split('-').map(id => +id)))

const fullyOverlappingPairs = pairs.reduce((acc, pair) => {
    if (isFullyContained(pair[0], pair[1])) {
        acc += 1
    }
    return acc
}, 0)

const partiallyOverlappingPairs = pairs.reduce((acc, pair) => {
    if (areOverlapping(pair[0], pair[1])) {
        acc += 1
    }
    return acc
}, 0)

console.log('fullyOverlappingPairs:', fullyOverlappingPairs)
console.log('partiallyOverlappingPairs:', partiallyOverlappingPairs)


function isFullyContained(range1, range2) {
    const range1StartsAt = range1[0]
    const range1EndsAt = range1[1]
    const range2StartsAt = range2[0]
    const range2EndsAt = range2[1]

    return (range1StartsAt >= range2StartsAt && range1EndsAt <= range2EndsAt) || (range2StartsAt >= range1StartsAt && range2EndsAt <= range1EndsAt)
}

function areOverlapping(range1, range2) {
    const range1StartsAt = range1[0]
    const range1EndsAt = range1[1]
    const range2StartsAt = range2[0]
    const range2EndsAt = range2[1]

    return (range1StartsAt >= range2StartsAt && range1StartsAt <= range2EndsAt) ||
        (range2StartsAt >= range1StartsAt && range2StartsAt <= range1EndsAt) ||
        (range1EndsAt >= range2StartsAt && range1EndsAt <= range2EndsAt) ||
        (range2EndsAt >= range1StartsAt && range2EndsAt <= range1EndsAt)
}

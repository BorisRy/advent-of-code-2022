const fs = require('fs')
const { keyPart1, keyPart2 } = require('./game.keys')

const roundPairs = fs.readFileSync('./day-02.input.txt', 'utf8')
    .split('\r\n')
    .map(pair => pair.split(' '))

const totalScorePart1 = roundPairs.reduce((totalScore, round) => totalScore + roundResultPart1(round[0], round[1]), 0)
const totalScorePart2 = roundPairs.reduce((totalScore, round) => totalScore + roundResultPart2(round[0], round[1]), 0)

console.log('totalScorePart1:', totalScorePart1)
console.log('totalScorePart2:', totalScorePart2)

function roundResultPart1(opponent, you) {
    return keyPart1[you].score + keyPart1[you][opponent]
}

function roundResultPart2(opponent, outcome) {
    return keyPart2[outcome].score + keyPart2[outcome][opponent]
}



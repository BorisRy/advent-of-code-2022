const fs = require('fs')


// Part 1
const sumOfDuplicates = fs.readFileSync('day-03.input.txt', 'utf-8')
    .split('\r\n')
    .map(rucksack => [rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)]) // split each rucksack into compartments
    .map(rucksack => findDuplicateItem(rucksack[0], rucksack[1])) // find the duplicate item
    .map(duplicateItem => getPriority(duplicateItem)) // get the priority of each item
    .reduce((total, item) => total + item, 0) // sum the priorities

// Part 2
const sumOfBadges = fs.readFileSync('day-03.input.txt', 'utf-8')
    .split('\r\n')
    .reduce((acc, rucksack, i, arr) => { // split the elves into groups of 3
        const currIdx = i + 1
        if (currIdx % 3 === 0) {
            const currGroup = arr.slice(currIdx - 3, currIdx)
            acc.push(currGroup)
        }
        return acc
    }, [])
    .map(group => findDuplicateItemGroup(group)) // Find the item that appears in all elf rucksacks(badge)
    .reduce((acc, badge) => acc + getPriority(badge), 0) // sum all the badges





function findDuplicateItemGroup(group) {
    const elf1 = group[0]
    const elf2 = group[1]
    const elf3 = group[2]
    return elf1.split('').find(item => elf2.includes(item) && elf3.includes(item))
}

function getPriority(item) {
    let asciiValue = item.charCodeAt()
    if (asciiValue >= 97 && asciiValue <= 122) return Math.abs(item.charCodeAt() - 96)
    else return Math.abs(item.charCodeAt() - 38)
}

function findDuplicateItem(cmp1, cmp2) {
    return cmp1.split('').find(item => cmp2.includes(item))
}
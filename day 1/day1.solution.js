const fs = require('fs')

const elfCaloriesArray = fs.readFileSync('./day-01.input.txt', 'utf-8').split('\r\n')


const getHighestCalorieElf = (calArray) => {
    const elfCalories = []
    let totalCalories = 0
    calArray.forEach(foodItem => {
        if (foodItem === '') {
            elfCalories.push(totalCalories)
            totalCalories = 0
        }
        totalCalories += +foodItem
    })

    const highestCalorieElf = elfCalories.sort((a, b) => b - a)[0]
    const topThreeElvesTotal = elfCalories.slice(0, 3).reduce((sum, elf) => sum + elf, 0)

    console.log('highestCalorieElf:', highestCalorieElf)
    console.log('topThreeElvesTotal:', topThreeElvesTotal)
}

getHighestCalorieElf(elfCaloriesArray)


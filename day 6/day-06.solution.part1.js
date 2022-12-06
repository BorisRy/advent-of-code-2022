const fs = require('fs')

const datastream = fs.readFileSync('./day-06.input.txt', 'utf-8')


const packetMarker = findMarkerIndex(false)
const messageMarker = findMarkerIndex(true)

console.log('packetMarker:', packetMarker)
console.log('messageMarker:', messageMarker)

function findMarkerIndex(isMessage) {
    let markerIdx = datastream.split('').findIndex((char, idx, arr) => {
        let segmentToTest
        if (isMessage) segmentToTest = arr.slice(idx, idx + 14)
        else segmentToTest = arr.slice(idx, idx + 4)
        return isSegmentUnique(segmentToTest, isMessage)
    })
    if (isMessage) return (markerIdx + 14)
    else return (markerIdx + 4)

}

function isSegmentUnique(segment, isMessage) {
    const set = new Set(segment)
    if (isMessage) return set.size === 14
    else return set.size === 4
}



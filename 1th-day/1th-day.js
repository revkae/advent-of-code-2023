const fs = require('fs');

const WORDS =
    new Map([["zero", 0],["one", 1],["two", 2],["three", 3],["four", 4],["five", 5],["six", 6],["seven", 7],["eight", 8],["nine", 9]])

function readContent(callback) {
    fs.readFile("input", 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err}`);
            return;
        }
        const input = data.split("\n")
        const test = ["abc2x3oneight"]

        callback(input)
    });
}

function findWords(value) {
    let words = new Map()
    let isFinished = false
    let amount = 0
    let toReplace = new Map()
    while (!isFinished) {
        WORDS.forEach((vn, key) => {
            if (value.includes(key) && !words.has(value.indexOf(key))) {
                words.set(value.indexOf(key), key)
                let replaceValue = ""
                for (let i = 0; i < key.length; i++) {
                    replaceValue += "-"
                }
                toReplace.set(key, replaceValue)
                amount++
            }
        })
        // toReplace.forEach((value, key) => {
        //     value = value.replace(key, value)
        // })
        if (amount === 0) {
            isFinished = true
        } else {
            amount = 0
        }
    }

    return words
}

readContent((data) => {
    let answer = 0

    data.forEach((value) => {
        let words = findWords(value)

        for(let i = 0; i < value.length; i++){
            if (!isNaN(value[i])) {
                words.set(i, value[i])
            }
        }

        words = new Map(Array.from(words).sort((a, b) => a[0] - b[0]))
        console.log(words)

        let first = words.values().next().value
        let last = ([...words.values()].pop())

        if (WORDS.has(first)) {
            first = WORDS.get(first)
        }
        if (WORDS.has(last)) {
            last = WORDS.get(last)
        }
        console.log(first + " " + last)

        let result = first + "" + last

        answer += parseInt(result)
        words.clear()
    })

    console.log(answer)
})

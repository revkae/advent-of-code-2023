const readline = require('readline');
const fs = require('fs');

const filePath = 'input';

const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

let engine = []

rl.on('line', (line) => {
    let part = []
    line.split('').forEach(piece => {
        part.push(piece)
    })
    engine.push(part)
});

rl.on('close', () => {
    let sum = getParts()
    console.log(sum)
});

class Part {
    constructor(positions) {
        this.positions = positions
    }

    getNum() {
        let number = ""
        this.positions.forEach(position => {
            number += engine[position.y][position.x]
        })
        return number
    }

    isPartNum() {
        let result = false;

        this.positions.forEach(position => {
            if (this.check(position))
                result = true;
        })
        // if (this.checkLeft(this.positions[1]) || this.checkRight(this.positions[this.positions.length - 1])) {
        //     return true;
        // }
        //
        // for (let i = 1; i < this.positions.length - 1; i++) {
        //     let position = this.positions[i];
        //     if (this.checkMiddle(position)) {
        //         return true;
        //     }
        // }

        return result;
    }

    isSign(position) {
        let something = engine[position.y][position.x];
        return something !== "." && isNaN(something);
    }

    check(position) {
        let controls = [
            {x: position.x, y: position.y + 1},
            {x: position.x, y: position.y - 1},
            {x: position.x - 1, y: position.y},
            {x: position.x - 1, y: position.y + 1},
            {x: position.x - 1, y: position.y - 1},
            {x: position.x + 1, y: position.y},
            {x: position.x + 1, y: position.y + 1},
            {x: position.x + 1, y: position.y - 1}
        ]

        for (let control of controls) {
            if (engine.length <= control.y ||
                engine[0].length <= control.x || control.y < 0 || control.x < 0) {
                continue;
            }

            if (this.isSign(control)) {
                return true;
            }
        }

        return false;
    }
}

function getParts() {
    let positions = []
    let foundNumber = true;
    let parts = []
    for (let y = 0; y < engine.length; y++) {
        for (let x = 0; x < engine[y].length; x++) {
            if (!isNaN(engine[y][x])) {
                foundNumber = true;
                positions.push({y, x})
            } else if (foundNumber === true) {
                parts.push(new Part(positions))
                foundNumber = false;
                positions = []
            }
        }
    }

    let sum = 0;
    parts.forEach(part => {
        if (part.isPartNum()) {
            sum += parseInt(part.getNum());
        }
    })

    return sum;
}

function getPartNumbers() {

}


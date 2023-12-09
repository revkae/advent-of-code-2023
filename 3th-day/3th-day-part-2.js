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
        this.sign = ""
        this.signPose = "";
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
            if (this.check(position)) {
                result = true;
            }
        })

        return result;
    }

    isSign(position) {
        let something = engine[position.y][position.x];
        return something !== "." && isNaN(something);
    }

    getSign(position) {
        return engine[position.y][position.x]
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
                this.sign = this.getSign(control)
                this.signPose = control
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
            // if (engine[y][x] === "*") {
            //     stars.push({x, y})
            // }
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
    let partNums = []
    let sameStars = new Map()
    let sameStarParts = new Map()
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].isPartNum()) {
            if (parts[i].sign !== "*") {
                partNums.push(parts[i])
                continue;
            }

            let pos = parts[i].signPose.x + " " + parts[i].signPose.y;
            if (!sameStars.has(pos)) {
                sameStars.set(pos, 1)
            } else {
                sameStars.set(pos, sameStars.get(pos) + 1)
            }
            partNums.push(parts[i])
        }
    }

    for (let key of sameStars.keys()) {
        if (sameStars.get(key) === 1) {
            sameStars.delete(key)
        } else {
            sameStarParts.set(key, [])
        }
    }

    for (let key of sameStars.keys()) {
        let firstOne = ""
        let secondOne = ""
        let firstIndex = -1;
        let secondIndex = -1;
        for (let i = 0; i < partNums.length; i++) {
            let part = partNums[i]
            if (part.sign !== "*") continue;

            let pos = part.signPose.x + " " + part.signPose.y;

            if (key === pos) {
                if (firstOne === "") {
                    firstOne = part
                    firstIndex = i
                } else {
                    secondOne = part
                    secondIndex = i
                }
            }
        }
        if (firstOne !== "" && secondOne !== "") {
            sameStarParts.set(key, {firstOne, secondOne})
        }
        if (firstIndex !== -1 && secondIndex !== -1) {
            partNums.splice(firstIndex, 1)
            partNums.splice(secondIndex, 1)
        }
    }

    // for (let i = 0; i < partNums.length; i++) {
    //     let part = partNums[i];
    //     if (part.sign !== "*") continue;
    //
    //     let pos = part.signPose.x + " " + part.signPose.y;
    //     if (sameStars.has(pos)) {
    //         let newList = sameStarParts.get(pos)
    //         newList.push(part)
    //         sameStarParts.set(pos, newList)
    //         partNums.splice(i, 1);
    //     }
    // }

    partNums.forEach(part => {
        sum += parseInt(part.getNum());
    })


    for (let part of sameStarParts.values()) {
        //console.log(part.firstOne.getNum())
        sum += parseInt(part.firstOne.getNum()) * parseInt(part.secondOne.getNum());
    }

    return sum;
}
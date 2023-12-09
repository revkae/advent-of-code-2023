const fs = require('fs')

const RED_POS = 12;
const GREEN_POS = 13;
const BLUE_POS = 14;

class Game {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
    product() {
        return this.green * this.red * this.blue;
    }
}

function giveSmallest(sessions, color) {
    let result = -1;

    sessions.forEach(session => {
        session.split(",").forEach(part => {
            if (part.includes(color)) {
                part = part.trimStart()
                result = Math.max(result, parseInt(part.split(" ")[0]));

                return "";
            }
        })
    })

    if (result === -1) {
        return 1;
    }
    return result;
}

function readContent(callback) {
    fs.readFile("input", "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err}`);
            return;
        }

        const input = data.split("\n");
        const games = [];

        input.forEach((data) => {
            let sessions = data.split(":")[1].split(";")
            let red = giveSmallest(sessions, "red")
            let green = giveSmallest(sessions, "green")
            let blue = giveSmallest(sessions, "blue")

            let game = new Game(red, green, blue);
            console.log("RED: " + red)
            console.log("GREEN: " + green)
            console.log("BLUE: " + blue)
            console.log(games.length + ": " + game.product())
            games.push(game.product())
        })
        callback(games);
    })
}



readContent((data) => {
    let sum = 0;
    data.forEach(re => {
        sum += re;
    })
    console.log(sum)
})
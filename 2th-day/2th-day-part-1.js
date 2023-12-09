const fs = require('fs')

const RED_POS = 12;
const GREEN_POS = 13;
const BLUE_POS = 14;

class Game {
    constructor(id, reds, greens, blues) {
        this.id = id;
        this.reds = reds;
        this.greens = greens;
        this.blues = blues;
    }
    isPossible() {
        let result = true;

        this.reds.forEach(red => {
            if (red > RED_POS) {
                result = false;
                return;
            }
        })

        this.blues.forEach(blue => {
            if (blue > BLUE_POS) {
                result = false;
                return;
            }
        })

        this.greens.forEach(green => {
            if (green > GREEN_POS) {
                result = false;
                return;
            }
        })

        return result;
    }
}

function giveRightOne(session, color) {
    let result = -1;

    session.split(",").forEach(part => {
        if (part.includes(color)) {
            part = part.trimStart()
            result = part.split(" ")[0];
            return "";
        }
    })

    if (result !== -1) {
        return result;
    }
    return "";
}

function readContent(callback) {
    fs.readFile("input", "utf8", (err, data) => {
        if (err) {
            console.error(`Error reading the file: ${err}`);
            return;
        }

        const input = data.split("\n");
        const games = [];

        let count = 1;
        input.forEach((data) => {
            let sessions = data.split(":")[1].split(";")
            let reds = []
            let greens = []
            let blues = []
            sessions.forEach(session => {
                let red = giveRightOne(session, "red")
                if (red !== "")
                    reds.push(parseInt(red))

                let green = giveRightOne(session, "green")
                if (green !== "")
                    greens.push(parseInt(green))

                let blue = giveRightOne(session, "blue")
                if (blue !== "")
                    blues.push(parseInt(blue))
            })

            let game = new Game(count, reds, greens, blues);
            if (game.isPossible()) {
                games.push(game)
            }

            count++;
        })
        callback(games);
    })
}



readContent((data) => {
    let sum = 0;
    data.forEach(game => {
        sum += game.id;
    })
    console.log(sum)
})
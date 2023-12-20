import {separate} from "./card.js";
import readline from 'readline'
import fs from 'fs'

const filePath = 'input';

const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

let cards = []

rl.on('line', (line) => {
    cards.push(line)
});

rl.on('close', () => {
    let points = separate(cards)
    let sum = points.reduce((acc, point) => acc + parseInt(point), 0);

    console.log(sum)
});


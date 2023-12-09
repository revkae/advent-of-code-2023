
export function separate(cards) {
    let result = []

    cards.forEach(card => {
        let split = card.split(":")[1].split("|")
        let winner = split[0].trimStart().split(" ").filter(Boolean)
        let our = split[1].trimStart().split(" ").filter(Boolean)

        console.log("winner: " + winner)
        console.log("winnerCount: " + winner.length)
        console.log("our: " + our)
        console.log("ourCount: " + our.length)

        result.push({winner, our})
    })

    return calculate(result)
}

function calculate(cards) {
    let points = []
    cards.forEach(card => {
        let currentPoint = 0;
        card.our.forEach(num => {
            if (currentPoint === 0 && card.winner.includes(num)) {
                currentPoint = 1;
                return;
            }

            if (!card.winner.includes(num)) return;

            currentPoint *= 2;
        })

        points.push(currentPoint)
        currentPoint = 0;
    })

    return points;
}
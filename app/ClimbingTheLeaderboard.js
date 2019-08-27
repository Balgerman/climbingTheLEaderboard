'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the climbingLeaderboard function below.
function climbingLeaderboard(scores, alice) {
const result =[];
let lastScore = null;
let currentScoreIndex = 0;
let lastRank = 1;
alice = alice.reverse();
alice.forEach((aliceValue, key) => {
    while (currentScoreIndex < scores.length) {
        let scoreValue = scores[currentScoreIndex];
        if (aliceValue >= scoreValue){
            result.push(lastRank);
            break;
        }
      if (scoreValue !== lastScore){
           lastRank += 1;
           lastScore = scoreValue;
        }
        currentScoreIndex += 1;
    } 
    if (currentScoreIndex >= scores.length)  {
        result.push(lastRank);
    } 
});
return result.reverse();
    
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const scoresCount = parseInt(readLine(), 10);

    const scores = readLine().split(' ').map(scoresTemp => parseInt(scoresTemp, 10));

    const aliceCount = parseInt(readLine(), 10);

    const alice = readLine().split(' ').map(aliceTemp => parseInt(aliceTemp, 10));

    let result = climbingLeaderboard(scores, alice);

    ws.write(result.join("\n") + "\n");

    ws.end();
}
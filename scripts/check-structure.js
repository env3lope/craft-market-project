import { stat } from 'node:fs';

const dirsToCheck = ['./src/assets', './src/components', './src/context', './src/hooks', './src/pages'];

for (let i = 0; i < dirsToCheck.length; i++) {
    stat(dirsToCheck[i], (err, stats) => {
        if (stats === undefined) {
            throw new Error(`${err.code}: Директорії ${dirsToCheck[i]} не існує.`)
        }
        console.log(`Директорія ${dirsToCheck[i]} існує.`)
    })
}
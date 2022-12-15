const n = 5;

printPyramid90Deg(n)
console.log()
printPyramid(n)
console.log()
printDiamond(n)

function printPyramid90Deg(n){
    for (let i = 1; i < n + 1; i++) {
        const row = '*'.repeat(i);
        console.log(row)
    }
}

function printPyramid(n){
    for (let i = 1; i < n + 1; i++) {
        const rowSpace = ' '.repeat(n - i)
        const row = '*'.repeat(i * 2 - 1)

        console.log(rowSpace + row + rowSpace)
    }
}

function printDiamond(n){
    printPyramid(n)
    for (let i = n - 1; i > 0 ; i--) {
        const rowSpace = ' '.repeat(n - i)
        const row = '*'.repeat(i * 2 - 1)

        console.log(rowSpace + row + rowSpace)
    }
}
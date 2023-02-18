import rLine from "readline";

const cmd = rLine.createInterface(process.stdin, process.stdout)

export function coinGame() {
    const choose = Math.floor(Math.random() * 2) + 1
    printMenu(choose)
}

function printMenu(choose){
    console.log(" ")
    console.log("1: Орел")
    console.log("2: Решка")
    console.log("3: Вихід")
    cmd.question("Виберіть номер\n", (answer) => {
        switchMenu(parseInt(answer), choose)
    })
}

function switchMenu(number, choose) {
    if(number !== 1 && number !== 2 && number !== 3) {
        coinGame()
        return
    }

    if(number === 3){
        process.exit()
    }

    if(number === choose){
        console.log("Ви виграли")
    } else{
        console.log("Ви програли")
    }

    console.log(`Вибрали ${number === 1 ? "Орел" : "Решка"} - Випало ${choose === 1 ? "Орел" : "Решка"}`)

    coinGame()
}

coinGame()
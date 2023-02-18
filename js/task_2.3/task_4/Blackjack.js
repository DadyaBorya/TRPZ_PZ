import rLine from "readline";

const cmd = rLine.createInterface(process.stdin, process.stdout)

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
const suits = ["Clubs", "Diamonds", "Hears", "Spades"]
const desk = new Array(52)

function makeDesk() {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
           desk[i * ranks.length + j] = {rank: ranks[j], suit: suits[i], value: values[j], took: false}
        }
    }
}

let playerCards = []
let botCards = []

function game() {
    makeDesk()
    playerCards = []
    botCards = []
    playerCards = [getRandomCard(), getRandomCard()]
    botCards = [getRandomCard(), getRandomCard()]
    printGameMenu()
}

function printCards(cards){
    for (let i = 0; i < cards.length; i++) {
        console.log("Карта ->", cards[i].suit + " " + cards[i].rank)
        console.log("Значення ->", cards[i].value)
    }
    console.log("Сума ->", getSumCards(cards))
}

function getSumCards(cards) {
    let sum = 0
    for (let i = 0; i < cards.length; i++) {
        sum += parseInt(cards[i].value)
    }

    return sum
}

function printGameMenu() {
    if(getCountCardInDesk() === 0) {
        gameOver()
    }
    console.log("Ваші карти:")
    printCards(playerCards)
    console.log("1. Взяти ще")
    console.log("2. Зупинитись")
    cmd.question("Виберіть номер\n", (answer) => {
       let number = parseInt(answer)
       if(number === 1) {
           playerCards.push(getRandomCard())
           printGameMenu()
       } else if(number === 2){
           gameOver()
       } else {
           printGameMenu()
       }
    })

}

function getCountCardInDesk() {
    let count = 0
    for (let i = 0; i < desk.length; i++) {
        if(!desk[i].took){
            count++
        }
    }
    return count
}

function botAI() {
    if(getSumCards(botCards) >= 21 || getSumCards(botCards) === 20) {
        return;
    }

    if(getSumCards(botCards) > 12 && getSumCards(botCards) < 20){
        let number = Math.floor(Math.random() * 2);
        if(number === 0) {
            return;
        }
    }

    botCards.push(getRandomCard())
    botAI()
}

function gameOver() {
    botAI()
    console.log()
    console.log("Карти комп'тера")
    printCards(botCards)
    console.log()
    console.log("Карти гравця")
    printCards(playerCards)
    console.log()
    compareCardsSum()
    console.log()
    game()
}

function compareCardsSum(){
    let sumCardsPlayer = getSumCards(playerCards);
    let sumCardsBot = getSumCards(botCards);
    console.log("Сума карт гравця:", sumCardsPlayer)
    console.log("Сума карт комп'ютера:", sumCardsBot)
    if(sumCardsPlayer === sumCardsBot) {
        console.log("Сума карт рівна. Переможця немає")
        return
    }

    if(sumCardsPlayer <= 21 && sumCardsBot <= 21){
        let max = Math.max(sumCardsPlayer, sumCardsBot);
        max === sumCardsPlayer ? console.log("Гравець переміг") : console.log("Комп'ютер переміг")
        return
    }

    if(sumCardsPlayer > 21 && sumCardsBot > 21){
        let min = Math.min(sumCardsPlayer, sumCardsBot);
        min === sumCardsPlayer ? console.log("Гравець переміг") : console.log("Комп'ютер переміг")
        return
    }

    if(sumCardsPlayer >= 21 && sumCardsBot <= 21 || sumCardsPlayer <= 21 && sumCardsBot >= 21){
        let min = Math.min(sumCardsPlayer, sumCardsBot);
        min === sumCardsPlayer ? console.log("Гравець переміг") : console.log("Комп'ютер переміг")
    }
}

function getRandomCard(){
    if(getCountCardInDesk() !== 0){
        const randomNum = Math.floor(Math.random() * desk.length)
        if(desk[randomNum].took){
            return getRandomCard()
        }
        desk[randomNum].took = true
        return desk[randomNum]
    }
}

game()


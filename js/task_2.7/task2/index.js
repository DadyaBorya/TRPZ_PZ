import csvToJson from "csvtojson"
import path from "path";
import prompt from "prompt-async"
import fs from "fs";


const dirname = path.resolve()

const difLevels = {
    "Європа": {
        difficult: "Перший рівень",
        total: 0,
        correct: 0
    },
    "Азія": {
        difficult: "Другий рівень",
        total: 0,
        correct: 0
    },
    "Південа Америка": {
        difficult: "Трерій рівень",
        total: 0,
        correct: 0
    },
    "Африка": {
        difficult: "Четвертий рівень",
        total: 0,
        correct: 0
    },
}


async function startGame() {
    await setLoginLog()
    const questions = await getQuestions()
    const textInput = "Введіть своє ім'я";
    const username = await getInput(textInput)
    const sequenceQuestions = getRandomQuestions(questions)

    let totalQuestions = 0

    for (let i = 0; i < sequenceQuestions.length; i++) {
        printQuestion(sequenceQuestions[i])
        const answer = await getAnswer()

        totalQuestions++
        difLevels[sequenceQuestions[i].partsWorld].total++

        if (answer != getQuestionCorrectIndex(sequenceQuestions[i])) {
            console.log(`Задано запитань: ${totalQuestions}, Правильних відповідей: ${totalQuestions - 1}.`)
            await writeUserLog(username[textInput], totalQuestions, totalQuestions - 1)
            await updateLoginLog()
            break
        }
        difLevels[sequenceQuestions[i].partsWorld].correct++
        await updateLoginLog()
    }
    if (totalQuestions === sequenceQuestions.length) {
        console.log(`Вітаємо! Ви Виграли! Задано запитань: ${totalQuestions}, Правильних відповідей: ${totalQuestions}.`)
        await writeUserLog(username[textInput], totalQuestions, totalQuestions)
    }

    await continueOrEnd()
}

async function getAnswer() {
    const inputText = "Виберіть відповідь"
    let result = await getInputRange(inputText, 1, 4);
    return result[inputText]
}

function getRandomQuestions(questions, sequenceQuestions = []) {

    while (questions.length !== 0) {
        const length = questions.length
        const index = Math.floor(Math.random() * length)
        const question = questions[index]

        questions = questions.filter(i => i !== question)
        sequenceQuestions.push(question)
    }

    return sequenceQuestions
}


async function getQuestions() {
    const pathToFile = path.resolve(dirname, "data/capital_country.csv")
    const questionsArr = await csvToJson().fromFile(pathToFile);
    return questionsArr
}

async function getInput(text) {
    prompt.start()
    return await prompt.get(text)
}

async function getInputRange(text, low, high) {
    let result = await getInput(text)
    if (result[text] >= low && result[text] <= high) {
        return result
    }
}

function printQuestion(question) {
    console.log("Рівень складності:", difLevels[question.partsWorld].difficult)
    console.log("Питання:", question.question)
    for (let i = 1; i <= 4; i++) {
        console.log(`${i}. ${question["answer" + i]}`)
    }
    console.log()
}

function getQuestionCorrectIndex(question) {
    for (let i = 1; i <= 4; i++) {
        if (question["answer" + i] === question.correctAnswer) {
            return i
        }
    }
    return -1
}

async function continueOrEnd() {
    const inputText = "Для продовження нажміть 'Y', щоб вийти любу другу клавішу"
    const char = await getInput(inputText)
    if (char[inputText].toLowerCase() === "y") {
        await startGame()
    }
}

async function writeUserLog(username, total, passed) {
   await fs.appendFileSync(path.resolve(dirname, "data/user.log"), `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}, Користувач: ${username}, Задано запитань: ${total}, Правильних відповідей: ${passed}.\n`)
}

async function setLoginLog() {
    let buffer = fs.readFileSync(path.resolve(dirname, "data/level.log"));
    const levelArr = buffer.toString().split("\n")
    const values = []
    for (let i = 0; i < levelArr.length; i++) {
        const result = levelArr[i].match("Задано:(\\d+).*Правильних:(\\d+)")
        values.push({total: result[1], correct: result[2]})
    }

    let i = 0
    for (let difLevelsKey in difLevels) {
        difLevels[difLevelsKey].total = values[i].total
        difLevels[difLevelsKey].correct = values[i].correct
        i++
    }
}

async function updateLoginLog() {
    const log = `Перший рівень – Задано:${difLevels["Європа"].total}, Правильних:${difLevels["Європа"].correct},
Другий рівень – Задано:${difLevels["Азія"].total}, Правильних:${difLevels["Азія"].correct},
Третій рівень – Задано:${difLevels["Південа Америка"].total}, Правильних:${difLevels["Південа Америка"].correct},
Четвертий рівень - Задано:${difLevels["Африка"].total}, Правильних:${difLevels["Африка"].correct}`

    fs.writeFileSync(path.resolve(dirname, "data/level.log"), log)
}

startGame()
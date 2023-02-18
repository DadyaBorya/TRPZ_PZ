import {currentPath, mainPath, printMenu, textMainMenu} from "../menus/MainMenu.js";
import {printStackEvents} from "../emitter/FsEmitter.js";
import fs from "fs";
import {getInput, getInputRange} from "../userInput/UserInput.js";
import colors from "colors";
import path from "path";
import {getAllFilesFromMainPath} from "./FileData.js";
import {fsEmitter} from "../index.js";


export async function showEditFile() {
    console.clear()
    currentPath()
    console.log("Виберіть файл редагування")
    await printStackEvents()

    let files = await getAllFilesFromMainPath(mainPath)

    let index = 0
    files.forEach(i => {
        console.log(`${++index}: ${colors["green"](i)}`)
    })

    console.log(`${++index}: Назад в меню`)

    const number = await getInputRange(textMainMenu, 1, index)

    if (number[textMainMenu] === index.toString()) {
        await printMenu()
        return
    }

    await showEditRowFile(
        fs.readFileSync(path.join(mainPath, files[number[textMainMenu] - 1])).toString().split("\n"),
        files[number[textMainMenu] - 1]
    )

}

async function showEditRowFile(fileData, fileName) {
    console.clear()
    await currentPath()
    console.log("Редагування файла", fileName, "по строково")
    await printStackEvents()
    console.log()

    let index = 0
    fileData.forEach(i => {
        console.log(`${i}`)
    })
    console.log(`${++index}. Редагування строку`)
    console.log(`${++index}. Видалити строку`)
    console.log(`${++index}. Додати строку`)
    console.log(`${++index}. Зберегти файл`)
    console.log(`${++index}. Назад в меню`)


    const number = await getInputRange(textMainMenu, 1, index)

    if (number[textMainMenu] === index.toString()) {
        await printMenu()
        return
    }

    if (number[textMainMenu] === (index - 1).toString()) {
        const applyInput = `Для підтвердження редагування файлу напишіть 'y'`

        const apply = await getInput(applyInput)
        if (apply[applyInput].toLowerCase() === "y") {
            await saveFile(fileData, fileName)
            fsEmitter.emit("justMessage", `Файл ${fileName} був успішно збережений`)

        }
        await showEditRowFile(fileData, fileName)
        return
    }

    if (number[textMainMenu] === (index - 2).toString()) {
        await addRow(fileData, fileName)
        return
    }

    if (number[textMainMenu] === (index - 3).toString()) {
        await removeRow(fileData, fileName)
        return
    }

    if (number[textMainMenu] === (index - 4).toString()) {
        await editRow(fileData, fileName)
    }
}


async function addRow(fileData, fileName) {
    console.clear()
    await currentPath()
    console.log("Додавання строки в файл", fileName)
    let index = 0
    fileData.forEach(i => {
        console.log(`${++index}. ${i}`)
    })
    console.log(`${++index}. `)
    console.log(`${++index}. Назад`)

    const inputText = "Виберіть строку для вставлення пустої строку"

    const number = await getInputRange(inputText, 1, index)

    if (number[inputText] === index.toString()) {
        await showEditRowFile(fileData, fileName)
        return
    }

    let newFileData = []
    if(parseInt(number[inputText]) === fileData.length + 1) {
        newFileData = fileData
        newFileData.push("")
    } else {
        for (let i = 0, j = 0; i < index; i++) {
            if (j === parseInt(number[inputText]) - 1) {
                newFileData.push("")
                --i
            } else {
                newFileData.push(fileData[i])
            }
            ++j
        }
    }
    console.log(newFileData.filter(i => i !== undefined))

    fsEmitter.emit("justMessage", `В файлі ${fileName} було вставлено строку в строку №${number[inputText]}`)
    await showEditRowFile(newFileData.filter(i => i !== undefined), fileName)
}

async function removeRow(fileData, fileName) {
    console.clear()
    await currentPath()
    console.log("Видалення строки з файлу", fileName)
    let index = 0
    fileData.forEach(i => {
        console.log(`${++index}. ${i}`)
    })
    console.log(`${++index}. Назад`)

    const inputText = "Виберіть строку для видалення"

    const number = await getInputRange(inputText, 1, index)

    if (number[inputText] === index.toString()) {
        await showEditRowFile(fileData, fileName)
        return
    }

    let newFileData = []
    for (let i = 0; i < index; i++) {
        if (i !== parseInt(number[inputText]) - 1) {
            newFileData.push(fileData[i])
        }
    }

    fsEmitter.emit("justMessage", `В файлі ${fileName} було видалено строку №${number[inputText]}`)
    await showEditRowFile(newFileData.filter(i => i !== undefined), fileName)
}

async function editRow(fileData, fileName) {
    console.clear()
    await currentPath()
    console.log("Редагування строки в файлі", fileName)
    let index = 0
    fileData.forEach(i => {
        console.log(`${++index}. ${i}`)
    })
    console.log(`${++index}. Назад`)

    const inputText = "Виберіть строку для редагування"

    const number = await getInputRange(inputText, 1, index)

    if (number[inputText] === index.toString()) {
        await showEditRowFile(fileData, fileName)
        return
    }

    const newRowInputText = "Введіть нові значення для строки"

    console.clear()
    await currentPath()
    console.log(`Редагування строки:\n '${fileData[number[inputText] - 1]}'`)
    let newRow = await getInput(newRowInputText);

    fileData[number[inputText] - 1] = newRow[newRowInputText]
    fsEmitter.emit("justMessage", `В файлі ${fileName} було змінено строку №${number[inputText]}`)
    await showEditRowFile(fileData, fileName)
}

async function saveFile(fileData, fileName) {
    await fs.writeFileSync(path.join(mainPath, fileName), fileData.join("\n"))
}

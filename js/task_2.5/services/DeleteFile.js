import {currentPath, mainPath, printMenu, textMainMenu} from "../menus/MainMenu.js";
import {printStackEvents} from "../emitter/FsEmitter.js";
import fs from "fs";
import colors from "colors";
import {getInput, getInputRange} from "../userInput/UserInput.js";
import path from "path";
import {fsEmitter} from "../index.js";


export async function showDeleteFile() {
    console.clear()
    currentPath()
    console.log("Виберіть файл або папку для видалення")
    await printStackEvents()
    const findAllFiles = source => fs.readdirSync(source, {withFileTypes: true})
        .map(dirent => {
            if(dirent.isDirectory()) {
                return {name: dirent.name, isDirectory: dirent.isDirectory()}
            }

            if (dirent.isFile()) {
                return {name : dirent.name, isDirectory: dirent.isDirectory()}
            }
        })

    let files = findAllFiles(mainPath)

    let index = 0
    files.forEach(i => {
        console.log(`${++index}: ${colors[i.isDirectory ? "blue" : "green"](i.name)}`)
    })

    console.log(`${++index}: Назад в меню`)

    const number = await getInputRange(textMainMenu, 1, index)

    if (number[textMainMenu] === index.toString()) {
        await printMenu()
        return
    }
    const file = files[number[textMainMenu] - 1]
    console.clear()
    currentPath()

    console.log(`Видалення ${!file.isDirectory ? "файлу" : "папки"} '${colors[file.isDirectory ? "blue" : "green"](file.name)}'`)

    const getInputName = `Для підтвердження видалення ${!file.isDirectory ? "файлу" : "папки"} напишіть 'Y'`

    const name = await getInput(getInputName)

    if(name[getInputName].toLowerCase() !== "y"){
        await showDeleteFile()
        return
    }

    if(file.isDirectory) {
        await deleteDirectory(path.join(mainPath, file.name))
    } else {
        await deleteFile(path.join(mainPath, file.name))
    }
    fsEmitter.emit("deleteFile", file.name)

    await showDeleteFile()
}

async function deleteFile(path) {
    await fs.unlinkSync(path)
}

async function deleteDirectory(path) {
    await fs.rmdirSync(path)
}
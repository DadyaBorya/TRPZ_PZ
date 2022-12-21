import {currentPath, mainPath, printMenu, textMainMenu} from "../menus/MainMenu.js";
import {printStackEvents} from "../emitter/FsEmitter.js";
import {getInput, getInputRange} from "../userInput/UserInput.js";
import colors from "colors";
import fs from "fs";
import path from "path";
import {fsEmitter} from "../index.js";
import {showEditFile} from "./EditFile.js";

export async function showRenameFile() {
    console.clear()
    currentPath()
    console.log("Виберіть файл або папку для перейменування")
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

    console.log(`Перейменування ${!file.isDirectory ? "файлу" : "папки"} '${colors[file.isDirectory ? "blue" : "green"](file.name)}'`)

    const getInputName = `Введіть нову назву ${!file.isDirectory ? "файлу" : "папки"}`

    const name = await getInput(getInputName)

    if(name[getInputName].trim() === "") {
        fsEmitter.emit("noCorrectFileName")
        await showEditFile()
    }

    const applyInput = `Для підтвердження редагування ${!file.isDirectory ? "файлу" : "папки"} напишіть 'y'`

    const apply = await getInput(applyInput)
    if(apply[applyInput].toLowerCase() !== "y"){
        await showRenameFile()
        return
    }

    await rename(path.join(mainPath, file.name), name[getInputName])
    const objFile = {
        oldFileName: file.name,
        newFileName: name[getInputName]
    }
    fsEmitter.emit("renameFile", objFile)
    await showRenameFile()
}

async function rename(path, newName) {
    console.log(path, newName)
    await fs.renameSync(path, newName)
}
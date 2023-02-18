import colors from "colors";
import {printStackEvents} from "../emitter/FsEmitter.js";
import {getInputRange} from "../userInput/UserInput.js";
import {changeMainPath, currentPath, mainPath, printMenu, textMainMenu} from "../menus/MainMenu.js";
import {fsEmitter} from "../index.js";
import path from "path";
import fs from "fs";

let changedPath = ""
let delimiter = ""


export async function showReplace() {
    if (!delimiter) {
        setDelimiter()
    }

    console.clear()
    currentPath()
    await printStackEvents()
    const folders = await getAllFoldersFromMainPath();

    let index = 0
    folders.forEach(i => {
        console.log(`${++index}: ${colors["blue"](i)}`)
    })

    console.log(`${++index}: Вийти з папки`)
    console.log(`${++index}: Зберегти поточний шлях`)
    console.log(`${++index}: Назад в меню`)

    const number = await getInputRange(textMainMenu, 1, index)

    if (number[textMainMenu] === index.toString()) {
        changeMainPath(changedPath === "" ? mainPath : changedPath)
        changedPath = ""
        fsEmitter.emit("replaceCatalog", mainPath)
        await printMenu()
        return
    }

    if (number[textMainMenu] === (index - 1).toString()) {
        changedPath = ""
        fsEmitter.emit("replaceCatalog", mainPath)
        await printMenu()
        return
    }

    if (number[textMainMenu] === (index - 2).toString()) {
        changeMainPath(replacePath());
        fsEmitter.emit("replaceCatalog", mainPath)
        await showReplace()
        return
    }

    changeMainPath(replacePathWithFolder(folders[number[textMainMenu] - 1]))
    fsEmitter.emit("replaceCatalog", mainPath)
    await showReplace()
}

function replacePath() {
    if (changedPath === "") {
        changedPath = mainPath
    }

    const index = mainPath.lastIndexOf(delimiter)
    if (index === -1 || index === 0) {
        console.log("Кінець!")
        return mainPath
    }
    return mainPath.substring(0, index)
}

export function replacePathWithFolder(folder) {
    const newPath = path.join(mainPath, folder)
    if (changedPath === "") {
        changedPath = mainPath
    }

    return newPath
}

function setDelimiter() {
    const osValue = process.platform;
    if (osValue === 'darwin') {
        delimiter = "/"
    } else if (osValue === 'win32') {
        delimiter = "\\"
    } else if (osValue === 'linux') {
        delimiter = "/"
    }
}

export async function getAllFoldersFromMainPath() {
    const getFolders = source => fs.readdirSync(source, {withFileTypes: true})
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
    return getFolders(mainPath);
}
import {currentPath, mainPath, printMenu, textMainMenu} from "../menus/MainMenu.js";
import {printStackEvents} from "../emitter/FsEmitter.js";
import fs from "fs";
import {getInput, getInputRange} from "../userInput/UserInput.js";
import colors from "colors";
import path from "path";


export async function showFileInfo() {

    console.clear()
    currentPath()
    console.log("Виберіть файл або папку для показу інформації")
    await printStackEvents()
    const findAllFiles = source => fs.readdirSync(source, {withFileTypes: true})
        .map(dirent => {
            if (dirent.isDirectory()) {
                return {name: dirent.name, isDirectory: dirent.isDirectory()}
            }

            if (dirent.isFile()) {
                return {name: dirent.name, isDirectory: dirent.isDirectory()}
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
    console.clear()
    await currentPath()
    console.log("Ви зараз переглядаєте інформацію про", files[number[textMainMenu] - 1].name)
    await getFileInfo(files[number[textMainMenu] - 1].name)
    await getInput("Натисність клавішу 'ENTER' для переходу в меню")
    await printMenu()
}

async function getFileInfo(fileName) {
    let stats = await fs.statSync(path.join(mainPath, fileName));

    console.log("size:", stats["size"])
    console.log("mode:", stats["mode"])
    console.log("others Execute:", (stats["mode"] & 1 ? "x" : "-"))
    console.log("others Write:", (stats["mode"] & 2 ? "w" : "-"))
    console.log("others Read:", (stats["mode"] & 4 ? "r" : "-"))

    console.log("group Execute:", (stats["mode"] & 10 ? "x" : "-"))
    console.log("group Write:", (stats["mode"] & 20 ? "w" : "-"))
    console.log("group Read:", (stats["mode"] & 40 ? "r" : "-"))

    console.log("owner Execute:", (stats["mode"] & 100 ? "x" : "-"))
    console.log("owner Write:", (stats["mode"] & 200 ? "w" : "-"))
    console.log("owner Read:", (stats["mode"] & 400 ? "r" : "-"))
    console.log("file:" + (stats.isFile() ? "f" : "-"))
    console.log("directory:" + (stats.isDirectory() ? "d" : "-"))
}
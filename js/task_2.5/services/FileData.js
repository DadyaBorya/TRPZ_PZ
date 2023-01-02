import {changeMainPath, currentPath, mainPath, printMenu, textMainMenu} from "../menus/MainMenu.js";
import {printStackEvents} from "../emitter/FsEmitter.js";
import colors from "colors";
import fs from "fs";
import {getInput, getInputRange} from "../userInput/UserInput.js";
import {fsEmitter} from "../index.js";
import path from "path";



export async function ShowFileData(){
    console.clear()
    currentPath()
    await printStackEvents()
    const files = await getAllFilesFromMainPath();

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

    console.clear()
    console.log("Ви зараз переглядаєте файл", files[number[textMainMenu] - 1])
    console.log()

    let data = fs.readFileSync(path.join(mainPath, files[number[textMainMenu] - 1]))
    console.log(data.toString())
    console.log()
    await getInput("Натисність клавішу 'ENTER' для переходу в меню")
    await printMenu()
}

export async function getAllFilesFromMainPath() {
    const getFolders = source => fs.readdirSync(source, {withFileTypes: true})
        .filter(file => !file.isDirectory())
        .map(file => file.name)
    return getFolders(mainPath);
}
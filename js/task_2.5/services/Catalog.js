import path from "path";
import fs from "fs";
import colors from "colors";
import {printStackEvents} from "../emitter/FsEmitter.js";
import {currentPath, mainPath, printMenu, textMainMenu} from "../menus/MainMenu.js";
import {fsEmitter} from "../index.js";
import {getInputRange} from "../userInput/UserInput.js";

export async function showCatalog(){
    console.clear()
    const base = path.parse(mainPath).base
    fsEmitter.emit("showCatalog", base)
    await printStackEvents()
    currentPath()
    let high = 0;

    const doColorFiles = source => fs.readdirSync(source, {withFileTypes: true})
        .map(dirent => {
            if(dirent.isDirectory()) {
                return `${colors["blue"](dirent.name)}`
            }

            if (dirent.isFile()) {
                return `${colors["green"](dirent.name)}`
            }
        })

    await doColorFiles(mainPath).forEach((file, index) => {
        high++
        console.log(`${index + 1}: ${file}`)
    })
    high++
    console.log(`${high}: Назад в меню`)

    await getInputRange(textMainMenu, high, high)
    fsEmitter.emit("exitCatalog", base)

    await printMenu()
}
import {printStackEvents} from "../emitter/FsEmitter.js";
import {currentPath, mainPath, printMenu} from "../menus/MainMenu.js";
import {getInput} from "../userInput/UserInput.js";
import {fsEmitter} from "../index.js";
import fs from "fs";
import path from "path";

export const creteFileText = "Введіть назву файлу:\n"

export async function showCreateFile() {
    console.clear()
    await printStackEvents()
    currentPath()
    const fileName = await getInput(creteFileText);
    if(fileName[creteFileText].trim() === ""){
        fsEmitter.emit("noCorrectFileName")
        await showCreateFile()
    }

    await creatFile(fileName[creteFileText])
    fsEmitter.emit("createFile", fileName[creteFileText])
    await printMenu()
}

async function creatFile(filename) {
    fs.open(path.join(mainPath, filename), 'w', (err) => {
        if(err) throw err;
    });
}
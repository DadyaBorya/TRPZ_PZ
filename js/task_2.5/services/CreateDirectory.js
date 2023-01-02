import {printStackEvents} from "../emitter/FsEmitter.js";
import {currentPath, mainPath, printMenu} from "../menus/MainMenu.js";
import {getInput} from "../userInput/UserInput.js";
import {fsEmitter} from "../index.js";
import {creteFileText} from "./CreateFile.js";
import path from "path";
import fs from "fs";

export async function showCreateDirectory() {
    console.clear()
    await printStackEvents()
    currentPath()
    const fileName = await getInput(creteFileText);
    if(fileName[creteFileText].trim() === ""){
        fsEmitter.emit("noCorrectFileName")
        await showCreateDirectory()
    }

    await createDirectory(fileName[creteFileText])
    fsEmitter.emit("createFile", fileName[creteFileText])
    await printMenu()
}

async function createDirectory(fileName) {
    try {
        await fs.mkdirSync(path.join(mainPath, fileName))
    } catch (e) {
        fsEmitter.emit("error", e.message)
        await showCreateDirectory()
    }
}
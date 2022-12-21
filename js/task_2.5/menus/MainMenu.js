import {printStackEvents} from "../emitter/FsEmitter.js";
import {getInputRange} from "../userInput/UserInput.js";
import * as path from "path";
import {showCatalog} from "../services/Catalog.js";
import {showReplace} from "../services/ChangeCatolog.js";
import {showCreateFile} from "../services/CreateFile.js";
import {ShowFileData} from "../services/FileData.js";
import {showRenameFile} from "../services/RenameFile.js";
import {showDeleteFile} from "../services/DeleteFile.js";
import * as os from "os";
import {showFileInfo} from "../services/FileInfo.js";
import {showEditFile} from "../services/EditFile.js";
import {showCreateDirectory} from "../services/CreateDirectory.js";

export const menu = [
    "1. перегляд вмісту каталогу;",
    "2. перехід між каталогами;",
    "3. створити файл;",
    "4. створити папку;",
    "5. перегляд вмісту файлу;",
    "6. перейменування файла або папки;",
    "7. видалення файла або папки;",
    "8. редагуваггя файла;",
    "9. інформація про файл або папку;",
    "0. вихід",
]

export let mainPath = path.resolve()

export const textMainMenu = "Введіть номер операції"

export function changeMainPath(path) {
    mainPath = path
}

export function currentPath() {
    console.log("Ви зараз перебуваєте в", mainPath)
}

export async function printMenu() {
    console.clear()
    await printStackEvents()
    currentPath()
    menu.forEach(i => console.log(i))
    let number = await getInputRange(textMainMenu, 1, menu.length)

    switch (number[textMainMenu]) {
        case "1":
            await showCatalog()
            break
        case "2":
            await showReplace()
            break
        case "3":
            await showCreateFile()
            break
        case "4":
            await showCreateDirectory()
            break
        case "5":
            await ShowFileData()
            break
        case "6":
            await showRenameFile()
            break
        case "7":
            await showDeleteFile()
            break
        case "8":
            await showEditFile()
            break
        case "9":
            await showFileInfo()
            break
        case "0":
            break
        default:
            await printMenu()
            break
    }
}
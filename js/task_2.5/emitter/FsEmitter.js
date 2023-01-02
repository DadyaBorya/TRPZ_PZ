export const stackEvents = []

export function emitterEvents(fsEmitter) {
    fsEmitter.on("showCatalog", (folder) => {
        console.log("Ви відкрили папку:", folder)
    })

    fsEmitter.on("exitCatalog", (folder) => {
        stackEvents.push(`Ви вийшли з папки: ${folder}`)
        console.log("Ви вийшли з папки:", folder)
    })

    fsEmitter.on("replaceCatalog", (path) => {
        stackEvents.push(`Ви змінили шлях на: ${path}`)
        console.log("Ви змінили шлях на", path)
    })

    fsEmitter.on("createdFile", (fileName) => {
        stackEvents.push(`Було створено файл: ${fileName}`)
        console.log("Було створено файл", fileName)
    })

    fsEmitter.on("noCorrectFileName", () => {
        stackEvents.push(`Не правильно введено назву файлу`)
        console.log("Не правильно введено назву файлу")
    })

    fsEmitter.on("createFile", (file) => {
        stackEvents.push(`Було створено файл: ${file}`)
        console.log("Було створено файл:", file)
    })

    fsEmitter.on("renameFile", (objFile) => {
        stackEvents.push(`Було перейменовано файл ${objFile.oldFileName} на ${objFile.newFileName}`)
        console.log(`Було перейменовано файл ${objFile.oldFileName} на ${objFile.newFileName}`)
    })

    fsEmitter.on("deleteFile", (file) => {
        stackEvents.push(`Було видалено файл ${file}`)
        console.log(`Було видалено файл ${file}`)
    })

    fsEmitter.on("error", (e) => {
        stackEvents.push(e)
        console.log(e)
    })

    fsEmitter.on("justMessage", (message) => {
        stackEvents.push(message)
        console.log(message)
    })
}


export async function printStackEvents() {
    while(stackEvents.length !== 0) {
        console.log(stackEvents.pop())
    }
}

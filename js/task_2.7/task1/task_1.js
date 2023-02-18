import prompt from "prompt-async"
import path from "path";
import fs from "fs";


function main() {
    const promise = new Promise(
        async (resolve, reject) => {
            const pathFile = await prompt.get("Enter path to csv file")
            resolve(pathFile["Enter path to csv file"])
        })
        .then((pathFile) => {
            checkFile(pathFile)
            return pathFile
        })
        .catch((e) => {
            console.log(e)
        })
        .then((pathFile) => {
            let buffer = fs.readFileSync(pathFile)
            const pathParse = path.parse(pathFile)
            const jsString = csvToArray(buffer.toString());
            fs.writeFileSync(path.resolve(pathParse.dir, pathParse.name + ".js"), jsString)
        })
        .catch((e) => {
            console.log(e)
        })
}




function checkFile(pathFile) {
    if (path.parse(pathFile).ext !== ".csv") {
        throw Error("This file isn't csv format")
    }

    if (!fs.existsSync(pathFile)) {
        throw Error("Can't find a file")
    }
}

function csvToArray(str, delimiter = ",") {
    const rows = str.split("\r\n").filter(i => i !== "")
    const headers = rows[0].split(",")
    rows.shift()

    const startString = "[\n"
    const endString = "\n]"

    const maxHeadersIndex = headers.length

    const body = rows.map((row) => {
        const values = row.split(delimiter)
        let tempString = "    {\n"
        return headers.reduce((object, header, index) => {
            const value = isNaN(parseInt(values[index])) ? `"${values[index]}"` : values[index]
            tempString += " ".repeat(8)
            tempString += `${headers[index]}: ${value}`
            if(index !== maxHeadersIndex - 1) {
                tempString += ","
                tempString += "\n"
            } else {
                tempString += "\n    }"
            }
            return tempString;
        }, tempString)

    });

    return startString + body.join(",\n") + endString
}

main()
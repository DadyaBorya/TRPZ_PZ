const path = require("path");
const os = require("os");

function main() {
    const filepath = "home/yappa/Downloads/McSkill.exe"
    getFileStats(filepath)
}

function getFileStats(filepath){
    console.log("Повний шлях:", filepath)

    let name = path.parse(filepath).name;
    console.log("Назва файлу:", name);

    let ext = path.parse(filepath).ext;
    console.log("Розширення файлу:", ext)

    if(filepath[1] === ":"){
        console.log("Windows")
    } else {
        console.log("Linux")
    }
}

main()
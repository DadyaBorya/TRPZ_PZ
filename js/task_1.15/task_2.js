function getExt(path) {
    if(typeof path !== "string"){
        console.log("Непарвильний тип даних")
        return undefined
    }

    let regExpMatchArray = path.match("[.]([^.]+)$");
    return regExpMatchArray !== null ? regExpMatchArray[1] : null
}

function main(){
    console.log(getExt("maib.js.maib.js.maib.js"))
}

main()
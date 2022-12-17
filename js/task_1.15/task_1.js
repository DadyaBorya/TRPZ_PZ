function main() {
    console.log(convertNumberToObject(12))
}

function convertNumberToObject(number) {
    if(typeof number !== "number"){
        console.log("Непарвильний тип даних")
        return {}
    }

    if(number < 0 || number > 9999){
        console.log("Межі числа повині бути в межах 0 до 9999")
        return {}
    }

    let newObj = {
        "одиниці": 0,
        "дестятки": 0,
        "сотні": 0,
        "тисячи": 0
    }
    let i = 0
    while (number !== 0){
        newObj[Object.keys(newObj)[i]] = parseInt(number % 10)
        number = parseInt(number / 10)
        i++
    }

    return newObj
}

main()
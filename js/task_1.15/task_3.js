let vowelsArr = ["а", "е", "є", "и", "і", "ї", "о", "у", "ю", "я"]
let noVowelsArr = ["б", "в", "г", "д", "ж", "з", "й", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х", "ц", "ч", "ш", "щ"]
function main(){
    console.log(countVowelsAndNoVowels("деякий текст"))
}

function countVowelsAndNoVowels(text){
    let words = text.split(" ")
    let countV = 0
    let countNoV = 0
    words.forEach(i => {
        if(vowelsArr.indexOf(i[0].toLowerCase()) !== -1){
            countV++
        } else if(noVowelsArr.indexOf(i[0].toLowerCase()) !== -1){
            countNoV++
        }
    })
    return {
        "текст" : text,
        "голосних" : countV,
        "приголосних" : countNoV
    }
}

main()
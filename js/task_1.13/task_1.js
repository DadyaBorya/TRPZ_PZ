function main() {

    let selectedLang = selectLang()
    let number = -1
    while (number === -1){
        number = selectWeek(selectedLang)
    }
    printWeek(selectedLang, number)
}

function printWeek(lang, number) {


    if(lang === 1){
        const enMap = {
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
            7: "Sunday"
        }
        alert(enMap[number])
    } else {
        const uaMap = {
            1: "Понеділок",
            2: "Вівторок",
            3: "Середа",
            4: "Четверг",
            5: "П'ятниця",
            6: "Субота",
            7: "Неділя"
        }
        alert(uaMap[number])
    }
}

function selectLang(){
    let lang = prompt("Виберіть мову('ua' чи 'en')")
    if(lang.toLowerCase() !== "ua" && lang.toLowerCase() !== "en") {
        alert("Неправильний ввід даних")
        selectLang()
    }
    return lang.toLowerCase() === "ua" ? 2 : 1
}

function selectWeek(lang){
    const map = {
        1 : "Enter the day number of the week (from 1 to 7)?",
        2 : "Введіть номер дня неділі від 1 до 7?"
    }
    let select = parseInt(prompt(map[lang]))
    if(typeof select !== "number" || isNaN(select)){
        alert("Неправильний ввід даних")
        return -1
    }

    if(select > 7 || select <= 0){
        alert("Неправильний ввід даних")
        return -1
    }


    return select
}

main()
function main() {
    formatNowDate()
}

const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четверг", "П'ятниця", "Субота"]
const months = ["Січня", "Лютого", "Березня", "Квітня", "Травня", "Червня", "Липня", "Серпня", "Вересня", "Жовтня", "Листопада", "Грудня"]

function formatNowDate() {
    let date = new Date();
    let strDate = `${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, ${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} року`
    console.log(strDate)
    return strDate

}

main()
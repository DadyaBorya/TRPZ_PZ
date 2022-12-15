const weekNumber = Math.floor(Math.random() * 7) + 1

const hashMap = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday"
}

console.log(weekNumber, "->", hashMap[weekNumber])
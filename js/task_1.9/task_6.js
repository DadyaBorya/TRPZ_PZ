const monthNumber = parseInt(prompt("Enter month number"))

const hashMap = {
    1: {month: "January", season: "Winter"},
    2: {month: "February", season: "Winter"},
    3: {month: "March", season: "Spring"},
    4: {month: "April", season: "Spring"},
    5: {month: "May", season: "Spring"},
    6: {month: "June", season: "Summer"},
    7: {month: "July", season: "Summer"},
    8: {month: "August", season: "Summer"},
    9: {month: "September", season: "Autumn"},
    10: {month: "October", season: "Autumn"},
    11: {month: "November", season: "Autumn"},
    12: {month: "December", season: "Winter"},
}


alert("monthNumber " + monthNumber)
alert(hashMap[monthNumber])


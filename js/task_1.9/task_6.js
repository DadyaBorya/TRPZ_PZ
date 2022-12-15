const monthNumber = parseInt(prompt("Enter month number"))
let month = class {
    constructor(name, season) {
        this.name = name;
        this.season = season;
    }
};
const hashMap = {
    1: new month("January", "Winter"),
    2: new month("February", "Winter"),
    3: new month("March", "Spring"),
    4: new month("April", "Spring"),
    5: new month("May", "Spring"),
    6: new month("June", "Summer"),
    7: new month("July", "Summer"),
    8: new month("August", "Summer"),
    9: new month("September", "Autumn"),
    10: new month("October", "Autumn"),
    11: new month("November", "Autumn"),
    12: new month("December", "Winter"),
}


console.log("monthNumber", monthNumber)
console.log(hashMap[monthNumber])


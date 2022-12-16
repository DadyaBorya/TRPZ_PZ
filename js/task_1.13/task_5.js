function sequence(start = 0, step = 1) {
    let callNumber = start;
    return function() {
        let returnValue = callNumber; // значение для вывода
        callNumber += step; // готовимся к следующему шагу
        return returnValue;
    }
}


let generator = sequence(10, 3)
let generator2 = sequence()
let generator3 = sequence(10)

console.log(generator())
console.log(generator())
console.log(generator2())
console.log(generator2())
console.log(generator3())
console.log(generator3())
function createGreetable (str) {

    const result = str,
        greet = function (greeting) {
            return `${greeting}, ${str}!`
        };
    return {
        str: str,
        greet: greet
    }
}

const g = createGreetable('Oleg');
console.log(g.greet("Hello"))

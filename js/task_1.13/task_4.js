function createGreetable (str) {
    return {
        str: str,
        greet: function (greeting) {
            return `${greeting}, ${str}!`
        }
    }
}

const g = createGreetable('Oleg');
console.log(g.greet("Hello"))

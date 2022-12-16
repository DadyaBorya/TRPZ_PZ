function pluck(characters, atr) {
    const newCharacters = []
    characters.forEach((character, i) => {
        const newObj = {}
        newObj[atr] = character[atr]
        newCharacters[i] = newObj
    })

    return newCharacters
}

function main() {
    let characters = [
        {name: "barney", age: 36},
        {name: "fred", age: 40}
    ];
    console.log (pluck(characters, "age"));
    console.log(characters)
}

main()
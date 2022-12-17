function main() {
    console.log(countRepeatWord("fadsf dsaf fadsf fda"))
}

function countRepeatWord(str) {
    let count = {};
    str.split(" ").forEach(function(i) { count[i] = (count[i]||0) + 1;});
    return count
}

main()
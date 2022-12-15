const n = 100;
let i = 1;
while (i <= n) {
    let j = 2;
    while (j <= i) {
        if (i % j === 0 && j < i) {
            break;
        } else if (j === i) {
            console.log(i);
        }
        j++;
    }
    i++;
}


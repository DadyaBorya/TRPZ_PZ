const n = 10;
let i = 0;
do {
    if(i === 0){
        console.log(i + " це нуль")
    } else if (i % 2 === 0){
        console.log(i + " парне число")
    } else {
        console.log(i + " непарне чилсо")
    }
    i++;
} while (i <= n)
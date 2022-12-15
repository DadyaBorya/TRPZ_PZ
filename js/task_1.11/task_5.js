function isDivisible(n, x, y){
    if(n <= 0 || x <= 0 || y <= 0){
        return false;
    }

    return n % x === 0 && n % y === 0
}

console.log(isDivisible(10, 4, 5))
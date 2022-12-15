function main() {
    const num = 337
    console.log("isNegative", isNegative(num))
    console.log("isSimpleNum", isSimpleNum(num))
    console.log("isDivOnNums", isDivOnNums(num, [2, 5, 3, 6, 9]))
}

function isNegative(num) {
    return num < 0
}

function isSimpleNum(num) {
   if(num === 2 || num === 3) {
       return true
   }

   return num % 2 !== 0 && num % 3 !== 0
}

function isDivOnNums(num, arr){
    for (let i = 0; i < arr.length; i++) {
        if(num % arr[i] !== 0){
            return false
        }
    }

    return true
}

main()
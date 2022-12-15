
function main(){
    const arr = [5, 4, 2, 7, 1]

    sortArr(arr)

    let max = maxElSortedArr(arr)
    console.log("max", max)

    let min = minElSortedAr(arr)
    console.log("min", min)

    let sum = sumArr(arr)
    console.log("sum", sum)

    console.log("avg", sum / arr.length)

    console.log("All no pair elements in arr")
    printAllNonPairElArr(arr)
}

function sortArr(arr) {
    arr.sort()
}

function maxElSortedArr(arr){
    return arr[arr.length - 1]
}

function minElSortedAr(arr){
    return arr[1]
}

function sumArr(arr){
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i])
    }
    return sum
}

function printAllNonPairElArr(arr){
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] % 2 !== 0) {
            console.log(arr[i])
        }
    }
}

main()




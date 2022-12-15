function main(){
    let doubleArr = []
    fillDoubleArr(doubleArr, 5, 5)
    console.log("Before")
    console.log(doubleArr)
    console.log()
    
    changeNegativeElMainDig(doubleArr)
    console.log("After")
    console.log(doubleArr)
}

function fillDoubleArr(arr, sizeX, sizeY){
    for (let i = 0; i < sizeY; i++) {
        arr[i] = []
        for (let j = 0; j < sizeX; j++) {
            arr[i][j] = Math.floor(Math.random() * 20) - 10
        }
    }
}

function changeNegativeElMainDig(doubleArr) {
    for (let i = 0; i < 5; i++) {
        doubleArr[i][i] = doubleArr[i][i] > 0 ? 1 : 0
    }
}

main()

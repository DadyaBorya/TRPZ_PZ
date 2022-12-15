function main(){
    let arr = [2, 3, "vc", "dfds"]
    powArr(arr)
    console.log(arr)
}

function powArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === "number"){
            arr[i] = Math.pow(arr[i], 2)
        }
    }
}

main()
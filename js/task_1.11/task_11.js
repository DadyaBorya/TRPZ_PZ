function main(){
    let arr = [2, 2, 4, 1, 1, 5, 5, 6, 6, 7]
    console.log(distinct(arr))
}

function distinct(arr){
    let set = new Set()
    for (let i = 0; i < arr.length; i++) {
        set.add(arr[i])
    }
    return [...set]
}

main()
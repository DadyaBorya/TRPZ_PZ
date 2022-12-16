class Desk {
    constructor(width, height) {
        this.width = width
        this.height = height
    }

    print(){
        let count = this.height
        let row = true
        let rowAlp = " "
        for (let i = 0; i < this.height; i++) {
            let str = count
            for (let j = this.width; j >= 1; j--) {
                if(row){
                    str += "#"
                } else {
                    str += "@"
                }
                row = !row
            }
            count--;
            if(this.width % 2 === 0){
                row = !row
            }
            console.log(str)
        }

        for (let i = 0; i < this.width; i++) {
            rowAlp += String.fromCharCode( 65 + i )
        }
        console.log(rowAlp)
    }
}

function main(){
    let desk = new Desk(10, 10)
    desk.print()
}
main()
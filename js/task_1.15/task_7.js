function main() {
    while (true) {
        const number = randomNumber()
        let find = false
        let i = 0
        while (!find) {
            i++
            let result = parseInt(prompt("Введіть число від 0 до 100"))

            if(result === number){
                alert(`За ${i} спроб ви вгадали число ${number}`)
                find = true
            }

            if (result > number) {
                let minus = Math.abs(result - number);
                if(minus < 10) {
                    alert("Трішки меньше")
                } else if(minus < 30){
                    alert("Меньше")
                } else {
                    alert("На багато меньше")
                }
            }

            if (result < number) {
                let minus = Math.abs(result - number);
                if(minus < 10) {
                    alert("Трішки більше")
                } else if(minus < 30){
                    alert("Більше")
                } else {
                    alert("На багато більше")
                }
            }
            console.log(`${new Date().toLocaleString()} Спроба ${i}: число ${result} - ${find ? "вірно" : "не вірно"}`)
        }

        if(!confirm(`Хочете продовжити?`)){
            return
        }
    }
}

function randomNumber(){
    return Math.floor(Math.random() * 100)
}

main()
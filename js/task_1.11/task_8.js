function add(num1, num2) {
    alert(num1 + num2)
}

function sub(num1, num2) {
    alert(num1 - num2)
}

function mul(num1, num2) {
    alert(num1 * num2)
}

function div(num1, num2) {
    if (num2 === 0){
        alert("Can't div 0")
        return
    }
    alert(num1 / num2)
}

function main(){
    let firstNum = parseInt(prompt("Enter first number"))
    let secondNum = parseInt(prompt("Enter second number"))
    let choose = parseInt(prompt("Choose the number of action\n1. Add\n2. Sub\n3. Mul\n4. Div"))
    switchMenu(choose, firstNum, secondNum)
}

function switchMenu(num, firstNum, secondNum) {
    switch (num) {
        case 1:
            add(firstNum, secondNum)
            break;
        case 2:
            sub(firstNum, secondNum)
            break;
        case 3:
            mul(firstNum, secondNum)
            break;
        case 4:
            div(firstNum, secondNum)
            break;
    }
}

main()
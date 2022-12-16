class Worker {
    constructor(name, surname, rate, days) {
        this.name = name
        this.surname = surname
        this.rate = rate
        this.days = days
    }

    getSalary(){
        return this.rate * this.days
    }

    printSalary(){
        console.log(`${this.name} ${this.surname} has ${this.getSalary()}$ for ${this.days} days`)
    }
}

function main() {
    let worker = new Worker("Monkey D", "Luffy", 1_000_000, 7);
    worker.printSalary()
}

main()
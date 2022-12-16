class Task {
    constructor(name, description, startDate, endDate) {
        this.name = name
        this.description = description
        this.startDate = startDate
        this.endDate = endDate
    }

    print(){
        console.log("Ваша задача:", this.name)
        console.log("Опис задачі:", this.description)
        console.log("Початок:", this.startDate)
        console.log("Кінець:", this.endDate)
    }
}

class WorkTask extends Task {
    constructor(name, description, startDate, endDate, stateWork, isDone) {
        super(name, description, startDate, endDate);
        this.stateWork = stateWork
        this.isDone = isDone
    }

    print() {
        super.print();
        console.log("Відсоток виконання:", this.stateWork + "%")
        console.log(this.isDone ? "Завдання зроблено." : "Завдання в процесі.")
    }
}

function main() {
    let workTask = new WorkTask(
        "Випускний",
        "Святкування випуску",
        new Date(2021, 6, 26),
        new Date(2022, 6, 26),
        87,
        false
        );
    workTask.print()

}

main()
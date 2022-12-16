export class Generator{
    constructor(name, generate) {
        this.name = name
        this.generateDay = generate
        this.generateNigth = generate
    }

    static generate(generators, isDay) {
        let sum = 0
        if(isDay) {
            generators.forEach(i => sum += i.generateDay)
        } else {
            generators.forEach(i => sum += i.generateNigth)
        }
        return sum
    }

    print(){
        console.log("Назва:", this.name)
        console.log("Генерація вдень в мегават:", this.generateDay)
        console.log("Генерація вночі в мегават:", this.generateNigth)
    }
}
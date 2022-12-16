import {Generator} from "./Generator.js";

export class House {
    solarPanels = []
    powerStations = []
    needEnergyDay = 4
    needEnergyNight = 1

    constructor(name, countFlats, powerLine) {
        if(countFlats < 1 || countFlats > 400){
            throw new Error("Кількість квартир повино бути в межах від 1 до 400")
        }
        this.name = name
        this.countFlats = countFlats
        this.powerLine = powerLine
    }

    addSolarPanel(solarPanel){
        this.solarPanels.push(solarPanel)
    }

    addSolarPanels(solarPanels) {
        solarPanels.forEach(i => this.addSolarPanel(i))
    }

    addPowerStation(powerStation){
        this.powerStations.push(powerStation)
    }

    addPowerStations(powerStations) {
        powerStations.forEach(i => this.addPowerStation(i))
    }

    countTotalEnergyDay(){
        return Generator.generate(this.solarPanels, true) + Generator.generate(this.powerStations, true) + this.tookEnergyFromPowerLineDay()
    }

    countTotalEnergyNight(){
        return Generator.generate(this.solarPanels, false) + Generator.generate(this.powerStations, false) + this.tookEnergyFromPowerLineNight()
    }

    countNeedEnergyInDay(){
        return (this.countFlats * this.needEnergyDay) / 1000
    }

    countNeedEnergyInNight(){
        return (this.countFlats * this.needEnergyNight) / 1000
    }

    isEnoughEnergyInDay(){
        return this.residueEnergyInDay() >= 0
    }

    isEnoughEnergyInNight(){
        return this.residueEnergyInNight() >= 0
    }

    residueEnergyInDay(){
        return (this.countTotalEnergyDay() - this.countNeedEnergyInDay()) - this.gaveEnergyFromPowerLineDay()
    }

    residueEnergyInNight(){
        return (this.countTotalEnergyNight() - this.countNeedEnergyInNight()) - this.gaveEnergyFromPowerLineNight()
    }

    tookEnergyFromPowerLineDay() {
        let sum = 0
        this.powerLine.tookEnergyDay.forEach(h => {
            sum += h.count
        })
        return Math.trunc(sum * 100) / 100
    }

    tookEnergyFromPowerLineNight() {
        let sum = 0
        this.powerLine.tookEnergyNight.forEach(h => {
            sum += h.count
        })
        return Math.trunc(sum * 100) / 100
    }

    gaveEnergyFromPowerLineNight() {
        let sum = 0
        this.powerLine.gaveEnergyNight.forEach(h => {
            sum += h.count
        })
        return Math.trunc(sum * 100) / 100
    }

    gaveEnergyFromPowerLineDay() {
        let sum = 0
        this.powerLine.gaveEnergyDay.forEach(h => {
            sum += h.count
        })
        return Math.trunc(sum * 100) / 100
    }

    bill(){
        this.printBillGaveEnergyDay()
        this.printBillGaveEnergyNight()
        this.printBillTookEnergyDay()
        this.printBillTookEnergyNight()
    }

    printBillGaveEnergyDay(){
        if(this.powerLine.gaveEnergyDay.size > 0) {
            console.log("Продаж мегават вдень:")
            let sum = 0
            let sumElectricity = 0
            this.powerLine.gaveEnergyDay.forEach((value, key, map) => {
                console.log(`Продано ${value.count} мегават на суму ${Math.trunc((value.price * value.count) * 100) / 100} будинку ${key}`)
                sum += value.price * value.count
                sumElectricity += value.count
            })
            console.log("Зароблено на продажі вдень:", Math.trunc(sum * 100) / 100)
            console.log("Загальна кількість проданих мегават", Math.trunc(sumElectricity * 100) / 100)
            console.log()
        }
    }

    printBillTookEnergyNight(){
        if(this.powerLine.tookEnergyNight.size > 0) {
            console.log("Купівля мегават вночі:")
            let sum = 0
            let sumElectricity = 0
            this.powerLine.tookEnergyNight.forEach((value, key, map) => {
                console.log(`Борг ${value.count} мегават на суму ${Math.trunc((value.price * value.count) * 100) / 100} будинку ${key}`)
                sum += value.price * value.count
                sumElectricity += value.count
            })
            console.log("Борг вночі:", Math.trunc(sum * 100) / 100)
            console.log("Загальна кількість куплених мегават", Math.trunc(sumElectricity * 100) / 100)
            console.log()
        }
    }

    printBillTookEnergyDay(){
        if(this.powerLine.tookEnergyDay.size > 0) {
            console.log("Купівля мегават вдень:")
            let sum = 0
            let sumElectricity = 0
            this.powerLine.tookEnergyDay.forEach((value, key, map) => {
                console.log(`Борг ${value.count} мегават на суму ${Math.trunc((value.price * value.count) * 100) / 100} будинку ${key}`)
                sum += value.price * value.count
                sumElectricity += value.count
            })
            console.log("Борг вдень:", Math.trunc(sum * 100) / 100)
            console.log("Загальна кількість куплених мегават", Math.trunc(sumElectricity * 100) / 100)
            console.log()
        }
    }

    printBillGaveEnergyNight(){
        if(this.powerLine.gaveEnergyNight.size > 0) {
            console.log("Продаж мегават вдень:")
            let sum = 0
            let sumElectricity = 0
            this.powerLine.gaveEnergyNight.forEach((value, key, map) => {
                console.log(`Продано ${value.count} мегават на суму ${Math.trunc((value.price * value.count) * 100) / 100} будинку ${key}`)
                sum += value.price * value.count
                sumElectricity += value.count
            })
            console.log("Зароблено на продажі вночі:", Math.trunc(sum * 100) / 100)
            console.log("Загальна кількість проданих мегават", Math.trunc(sumElectricity * 100) / 100)
            console.log()
        }
    }

    printInfo(){
        console.log("*-*".repeat(12))
        console.log("Назва будинку:", this.name)
        console.log()
        console.log("Всі електростанції:")
        this.powerStations.length > 0 ? console.table(this.powerStations) : console.log("Немає електростанцій")
        console.log()
        console.log("Всі сонячні панелі:")
        this.solarPanels.length > 0 ? console.table(this.solarPanels) : console.log("Немає сонячних панелей")
        console.log()
        console.log("Cумарне виробництво в мегават вдень:", this.countTotalEnergyDay())
        console.log("Cумарне споживання в мегават вдень:", this.countNeedEnergyInDay())
        if(this.isEnoughEnergyInDay()){
            console.log("Залишок мегават вдень:", this.residueEnergyInDay())
        } else {
            console.log("Брак мегават вдень", Math.abs(Math.trunc(this.residueEnergyInDay() * 100) / 100))
        }

        console.log()
        console.log("Cумарне виробництво в мегават вночі:", this.countTotalEnergyNight())
        console.log("Cумарне споживання в мегават вночі:", this.countNeedEnergyInNight())
        if(this.isEnoughEnergyInNight()){
            console.log("Залишок мегават вночі:", this.residueEnergyInNight())
        } else {
            console.log("Брак мегават вночі", Math.abs(Math.trunc(this.residueEnergyInNight() * 100) / 100))
        }
        console.log()
        console.log("Потужність в мегават електропередачі:", this.powerLine.power)
        console.log("Ціна за мегават електропередачі:", this.powerLine.price)
        console.log()
        this.bill()
    }
}
export class PowerLine {
    constructor(power, price) {
        this.power = power
        this.price = price
    }

    tookEnergyNight = new Map()
    tookEnergyDay = new Map()
    gaveEnergyNight = new Map()
    gaveEnergyDay = new Map()
}
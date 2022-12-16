import {Generator} from "./Generator.js";

export class SolarPanel extends Generator {
    constructor(name, generate, type, generateNight) {
        super(name, generate)
        this.generateNigth = generateNight
        this.type = type
    }

    static createSolarPanel(name, generate, type, generateNight){
        return new SolarPanel(name, generate, type, generateNight)
    }

    print() {
        super.print();
        console.log("Тип:", this.type)
    }
}
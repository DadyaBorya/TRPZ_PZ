import {Generator} from "./Generator.js";

export class PowerStation extends Generator {
    constructor(name, generate, type) {
        super(name, generate)
        this.type = type
    }

    static createPowerStation(name, generate, type){
        return new PowerStation(name, generate, type)
    }

    print() {
        super.print();
        console.log("Тип:", this.type)
    }
}
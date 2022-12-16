import {House} from "./House.js";
import {PowerLine} from "./PowerLine.js";
import {SolarPanel} from "./SolarPanel.js";
import {PowerStation} from "./PowerStation.js";
import {HouseUtils} from "./HouseUtils.js";

function main() {
    // Створюємо домівлі
    const houses = [
        new House("SkyHouse", 400, new PowerLine(200, 5)),
        new House("Villa", 200, new PowerLine(400, 10)),
        new House("Olya", 300, new PowerLine(1000, 7))
    ]

    // Створюємо сонячні панелі
    const firstSolarPanels = [
        SolarPanel.createSolarPanel("Solar panel 1", 5, "Small", 0),
        SolarPanel.createSolarPanel("Solar panel 2", 3, "Medium", 0),
        SolarPanel.createSolarPanel("Solar panel 3", 5, "Large", 0),
    ]

    houses[0].addSolarPanels(firstSolarPanels)

    // Створюємо ТЕС
    const firstPowerStations = [
        PowerStation.createPowerStation("Power station 1", 30, "Small"),
        PowerStation.createPowerStation("Power station 2", 50, "Medium"),
        PowerStation.createPowerStation("Power station 3", 100, "Large"),
    ]

    houses[0].addPowerStations(firstPowerStations)

    // Авто розподілення енергії між домівлями
    HouseUtils.distributeEnergy(houses)

    // Вивід інформації
    houses.forEach(i => i.printInfo())
}

main()
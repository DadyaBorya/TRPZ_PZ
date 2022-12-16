export class HouseUtils {
    static residueEnergyHousesDay = []
    static residueEnergyHousesNight = []
    static deficitEnergyHousesDay = []
    static deficitEnergyHousesNight = []

   static distributeEnergy(houses) {
        this.clear()
        this.distributeHouses(houses)
        this.distributeEnergyHouseDay()
        this.distributeEnergyHouseNight()
   }

   static clear(){
        this.residueEnergyHousesNight = []
        this.residueEnergyHousesDay = []
        this.deficitEnergyHousesDay = []
        this.deficitEnergyHousesNight = []
   }

   static distributeHouses(houses) {
        houses.forEach(h => {
            if(h.isEnoughEnergyInDay()){
                this.residueEnergyHousesDay.push(h)
            } else {
                this.deficitEnergyHousesDay.push(h)
            }

            if(h.isEnoughEnergyInNight()){
                this.residueEnergyHousesNight.push(h)
            } else {
                this.deficitEnergyHousesNight.push(h)
            }
        })
    }

    static distributeEnergyHouseDay(){
        this.residueEnergyHousesDay.forEach(rh => {
            let totalEnergy = Math.trunc(rh.residueEnergyInDay() * 100) / 100;
            let energyPowerLineLeft = rh.powerLine.power
            this.deficitEnergyHousesDay.forEach(dh => {
                let deficitEnergy = Math.abs(Math.trunc(dh.residueEnergyInDay() * 100) / 100)
                if(totalEnergy > deficitEnergy && energyPowerLineLeft > deficitEnergy) {
                    totalEnergy = Math.trunc((totalEnergy - deficitEnergy) * 100) / 100
                    dh.powerLine.tookEnergyDay.set(rh.name, {count: deficitEnergy, price: rh.powerLine.price})
                    rh.powerLine.gaveEnergyDay.set(dh.name, {count: deficitEnergy, price: rh.powerLine.price})
                    this.deficitEnergyHousesDay = this.deficitEnergyHousesDay.filter(h => h.name !== dh.name)
                    energyPowerLineLeft -= deficitEnergy
                } else if(totalEnergy !== 0) {
                    if(energyPowerLineLeft < deficitEnergy){
                        totalEnergy = energyPowerLineLeft
                    }
                    dh.powerLine.tookEnergyDay.set(rh.name, {count: totalEnergy, price: rh.powerLine.price})
                    rh.powerLine.gaveEnergyDay.set(dh.name, {count: totalEnergy, price: rh.powerLine.price})
                    this.residueEnergyHousesDay = this.residueEnergyHousesDay.filter(h => h.name !== rh.name)
                    totalEnergy = 0
                }
            })
        })
    }

    static distributeEnergyHouseNight(){
        this.residueEnergyHousesNight.forEach(rh => {
            let totalEnergy = Math.trunc(rh.residueEnergyInNight() * 100) / 100;
            this.deficitEnergyHousesNight.forEach(dh => {
                let deficitEnergy = Math.abs(Math.trunc(dh.residueEnergyInNight() * 100) / 100)
                if(totalEnergy > deficitEnergy) {
                    totalEnergy = Math.trunc((totalEnergy - deficitEnergy) * 100) / 100
                    dh.powerLine.tookEnergyNight.set(rh.name, {count: deficitEnergy, price: rh.powerLine.price})
                    rh.powerLine.gaveEnergyNight.set(dh.name, {count: deficitEnergy, price: rh.powerLine.price})
                    this.deficitEnergyHousesNight = this.deficitEnergyHousesNight.filter(h => h.name !== dh.name)
                } else if(totalEnergy !== 0) {
                    dh.powerLine.tookEnergyNight.set(rh.name, {count: totalEnergy, price: rh.powerLine.price})
                    rh.powerLine.gaveEnergyNight.set(dh.name, {count: totalEnergy, price: rh.powerLine.price})
                    this.residueEnergyHousesNight = this.residueEnergyHousesNight.filter(h => h.name !== rh.name)
                    totalEnergy = 0
                }
            })
        })
    }
}
class Random {

   static nexDouble(low, high){
      if(low > high){
       throw new Error("Low should be smaller than high")
      }
      let range = high - low
      return Math.trunc(low + range * Math.random() * 100) / 100;
   }
    static nexInt(low, high){
     if(low > high){
      throw new Error("Low should be smaller than high")
     }
     let range = high - low
     return Math.floor(low + range * Math.random())
    }
    static nexElement(array){
      if(array.length === 0){
       throw new Error("Length should be more than 0")
      }

      return array[this.nexInt(0, array.length)]
    }
}

function main(){
 const arr = [1, 5, 6, 7, 8, 9, 0]

 console.log(Random.nexDouble(1.5, 3.5))
 console.log(Random.nexInt(4, 20))
 console.log(Random.nexElement(arr))
}

main()
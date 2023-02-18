const path = require("path");
const fs = require("fs")

class TestService {
    async getTest() {
        const data = fs.readFileSync(path.resolve(process.cwd(), "data/test.json"));
        const arr = JSON.parse(data.toString())
        return arr;
    }

    async getResultTest(answers) {
        const arr = await this.getTest()
        let count = 0
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].correct === answers["question" + i]) {
                count++
            }
            arr[i].userAnswer = answers["question" + i]
            arr[i].success =  arr[i].userAnswer === arr[i].correct
            if(arr[i].success) {
                arr[i][arr[i].userAnswer + "_color"] = "green"
            } else {
                arr[i][arr[i].userAnswer + "_color"] = "blue"
                arr[i][arr[i].correct + "_color"] = "green"
            }
        }
        console.log(arr)
        return {
            arr, count
        }
    }
}

module.exports = new TestService()
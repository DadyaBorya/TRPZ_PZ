const fs = require("fs");
const path = require("path");

class UserService {
    async clientData(ip, port) {
        const date = new Date();
        const dateStr =
            ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
            ("00" + date.getDate()).slice(-2) + "/" +
            date.getFullYear() + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2);

        let rawData = fs.readFileSync(path.resolve(process.cwd(), "data/client.json"));

        let obj = {}
        let newObj = {}

        let index = 0

        if(rawData.toString()) {
            obj = JSON.parse(rawData.toString())
            const keys = Object.keys(obj)
            index = keys[keys.length - 1]
        }

        newObj[parseInt(index) + 1] = {
            IpAddrClient: ip,
            port,
            Time: dateStr
        }

        fs.writeFileSync(path.resolve(process.cwd(), "data/client.json"), JSON.stringify(Object.assign(obj, newObj)))

        return newObj
    }
}

module.exports = new UserService()
const userService = require("../services/UserService")
class UserController {
    async clientData(req, res, next) {
        const remoteAddress = req.connection.remoteAddress;
        const remotePort = req.connection.remotePort;
        const data = await userService.clientData(remoteAddress, remotePort)

        return res.json(data)
    }
}

module.exports = new UserController()
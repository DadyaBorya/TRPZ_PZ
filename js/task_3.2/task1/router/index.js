const Router = require("express").Router
const userController = require("../controllers/UserController")
const htmlController = require("../controllers/HTMLController")
const router = new Router()

router.post("/client_data", userController.clientData)
router.get("/", htmlController.index)

module.exports = router
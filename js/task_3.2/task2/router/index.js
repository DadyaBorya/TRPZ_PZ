const Router = require("express").Router
const htmlController = require("../controllers/HTMLController")
const testController = require("../controllers/TestController")
const router = new Router()

// router.post("/client_data", userController.clientData)
router.get("/", htmlController.index)
router.post("/create-user", testController.createUser)
router.get("/test/:user", htmlController.test)
router.post("/end-test", htmlController.endTest)

module.exports = router
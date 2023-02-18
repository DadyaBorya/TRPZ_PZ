const querystring = require('querystring');
const testService = require("../services/TestService")

class HTMLController {
    async index(req, res, next) {
        res.render("index")
    }

    async test(req, res, next) {
        const {name, surname} = querystring.decode(req.params.user)

        if (!name || !surname) {
            res.redirect("/");
        }
        const tests = await testService.getTest(10)

        res.render("test", {tests, name, surname})
    }

    async endTest(req, res, next) {
        const {name, surname} = req.body
        if(!name || !surname) {
            res.render("/")
        }
        const {arr, count} = await testService.getResultTest(req.body);

        res.render("end-test", {arr, count, name, surname})
    }
}

module.exports = new HTMLController()
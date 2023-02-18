const querystring = require('querystring');
class TestController {
    async createUser(req, res, next) {
        const query = querystring.stringify(req.body)
        res.redirect('/test/' + query);
    }
}

module.exports = new TestController()
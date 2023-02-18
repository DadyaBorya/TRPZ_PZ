const path = require("path");

class HTMLController {
    index(req, res) {
        res.sendFile(path.join(process.cwd(), '/public/html/index.html'));
    }
}

module.exports = new HTMLController()
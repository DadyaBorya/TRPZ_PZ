const express = require("express")
const router = require("./router/index")
const bodyParser = require('body-parser');

const PORT = 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(router)

app.set("view engine", "ejs")
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
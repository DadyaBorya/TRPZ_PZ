const express = require("express")
const router = require("./router/index")

const PORT = 5000
const app = express()

app.use(express.json())
app.use(router)

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
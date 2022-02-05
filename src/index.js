const express = require('express')
require('./db/mongoose')
const clientRouter = require('./router/client')

const PORT = process.env.PORT || 3050

const app = express()

app.use(clientRouter)

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`)
})
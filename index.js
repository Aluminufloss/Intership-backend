const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const cors = require('cors');
const PORT = process.env.PORT || 5000

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
  }

const app = express()
app.use(cors(corsOptions)); 
app.use(express.json())
app.use("/", authRouter)

const start = async () => {
    try {
        mongoose.connect(`mongodb+srv://nilchenko2020:1111@cluster.k0i96s3.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();
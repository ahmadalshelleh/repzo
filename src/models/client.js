const mongoose = require('mongoose')
const { clear } = require('../cache/redis')

const clientSchema = new mongoose.Schema({
    name: {
        type: String
    }
})

clientSchema.post('save', async () => {
    await clear('last_report')
    await clear('report_time')
})


const Client = mongoose.model('Client', clientSchema)

module.exports = Client
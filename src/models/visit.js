const mongoose = require('mongoose')
const { clear } = require('../cache/redis')

const visitSchema = new mongoose.Schema({
    client: {
        type: String
    },
    user: {
        type: String
    },
    time: {
        type: Number
    }
})

visitSchema.post('save', async () => {
    await clear('last_report')
    await clear('report_time')
})

const Visit = mongoose.model('Visit', visitSchema, 'visits')

module.exports = Visit
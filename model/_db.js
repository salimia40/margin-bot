module.exports = db = (() => {
    const mongoose = require('mongoose')
    const config = require('../config')
    mongoose.connect(config.db_url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        authSource: 'admin'
    }).then(console.log('connected')).catch(console.error)
    return mongoose
})()
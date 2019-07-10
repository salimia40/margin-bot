let path = require('path')
Object.assign(process.env,require('dotenv').config({path: path.join(__dirname,'t-app.env')}))

require('./src/app')
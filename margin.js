let path = require('path')
Object.assign(process.env,require('dotenv').config({path: path.join(__dirname,'margin.env')}))
require('./src/app')


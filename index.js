console.log(process.env.DB_NAME)
console.log(process.env.TOKEN)

if(process.env.DB_NAME == undefined) process.env.DB_NAME = 'mrbottest'
if(process.env.TOKEN == undefined) process.env.TOKEN = '837589296:AAEIvsMmiH94_eZhy1_t3I3my2cvjOsu3iI'

require('./src/app')

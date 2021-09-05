const colors = require("colors"),
mongoose = require('mongoose'),
discord = require("discord.js"),
MONGO_DDB = process.env["KM_MONGO"]
module.exports = {
	name: 'ready',
  async execute(client) {
    mongoose.connect(MONGO_DDB, {
      useUnifiedTopology: true, 
      useNewUrlParser: true, 
      useCreateIndex: true,
      useFindAndModify : false
    }).then(
      console.log(`
_______________________________
[✅]==> Mongo-DB Connection is OK 
_______________________________
    `.brightGreen)
    ).catch(e =>{
      console.log("MongoDB Connection Error".red)
    })
  }
}
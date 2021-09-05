const express = require('express'),
colors = require("colors"),
server = express();
server.all('/', (req, res)=>{
    res.send('KINGMAN SYSTEM 94% Done')
})
function keepAlive(){
  server.listen(3000, ()=>{
      console.log(`
_______________________________
[✅]===> HOST IS READY  
_______________________________    
      `.yellow)
  });
}
module.exports = keepAlive;
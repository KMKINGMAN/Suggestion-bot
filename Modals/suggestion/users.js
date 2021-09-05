const { Schema, model } = require('mongoose');
const Suggestion = Schema({
    UserID:{
        type: String
    },
    GuildID:{
      type: String,
    },
    MsgID:{
      type: String,
      require: true
    },
    Replay:[{
      Admine: String,
      Replay: String
    }],
    Sug:{
      type: String
    }
});
module.exports = model('Suggestion System User', Suggestion);
const { Schema, model } = require('mongoose');
const Suggestion = Schema({
    GuildID:{
        type: String,
        required: true
    },
    ChannelID:{
      type: String,
    }
});
module.exports = model('Suggestion System', Suggestion);
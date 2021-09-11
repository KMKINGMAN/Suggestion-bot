const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js"),
GUILDMODAL = require('../../Modals/suggestion/main'),
USERSMODAL = require('../../Modals/suggestion/users')
 module.exports = {
   name: "sug-reply",
   category: "suggenstion",
   usage: [
     "[message id] [reply]"
   ],
   description: "to set suggestion channel",
   run: async(client, kmsg, args, PREFIX, KMSG)=>{
    let chick = await KMSG.PremM("MANAGE_CHANNELS")
    if(!chick){
      return KMSG.ERR('You Need \`MANAGE_CHANNELS\` premssion to do this action')
    }
    let replay = args.slice(1).join(' '),
    GuildData = await GUILDMODAL.findOne({
      GuildID: kmsg.guild.id
    });
    if(!GuildData || !kmsg.guild.channels.cache.get(GuildData.ChannelID)){
      return await KMSG.ERR("Please set up a suggestion channel")
    }
    if(!args[0]){
      return await KMSG.ERR("Please enter message ID")
    }
    if(!replay){
      return await KMSG.ERR("Please enter a reply")
    }
    let UserData = await USERSMODAL.findOne({
      MsgID : args[0]
    })
    if(!UserData){
      return await KMSG.ERR("Invalid message id")
    }
    let Chnnel = kmsg.guild.channels.cache.get(GuildData.ChannelID)
    if(!Chnnel) return;
    let message = await Chnnel
    .messages.fetch(UserData.MsgID).catch(E => {return})
    if(!message){
      return await KMSG.ERR("i can't find this messagee")
    }
    await UserData.Replay.push({
      "Admine": kmsg.author.id,
      "Replay": replay
    })
    UserData.save()
    let reps = UserData.Replay.map((D) => `**Admin: <@${D.Admine}>\nReply: \`${D.Replay}\`**`),
    name = kmsg.author.tag,
    name2 = client.users.cache.get(UserData.UserID).tag,
    ava = client.users.cache.get(UserData.UserID).displayAvatarURL()
    let embed = new MessageEmbed()
    .setAuthor(`${name2}`, ava)
    .setTitle(`**[✅] Replay**`)
    .setColor(`GREEN`)
    .setDescription(`**${UserData.Sug}**`)
    .addField(`**Replies**`,reps.join('\n'))
    message.edit({embeds : [embed]});
   const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setLabel('GO TO REPLAY')
        .setStyle('LINK')
        .setURL(`https://discord.com/channels/${kmsg.guild.id}/${Chnnel.id}/${UserData.MsgID}`)
    );
    await KMSG.SEND('Added New Replay', 'New Replay Were Added ' + replay, row)
    let nc = new MessageEmbed()
    .setAuthor(`${name2}`, ava)
    .setTitle(`**[✅] Some admin replay to your suggesion**`)
    .setDescription(`**\`${name}\` Reply to your suggestion **\n**REPLAY: \`${replay}\`\n[Click Here](https://discord.com/channels/${kmsg.guild.id}/${Chnnel.id}/${UserData.MsgID})**`)
    let user = kmsg.guild.members.cache.get(UserData.UserID)
    user.send({embeds: [nc], components: [row]}).catch((e) =>{})
    }
 }

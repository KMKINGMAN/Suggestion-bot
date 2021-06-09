/**
.-----------------------------------------------------------------------------.
||Es| |F1 |F2 |F3 |F4 |F5 | |F6 |F7 |F8 |F9 |F10|                  KINGMAN    |
||__| |___|___|___|___|___| |___|___|___|___|___|              +962792914245  |
| _____________________________________________     ________    ___________   |
||~  |! |" |§ |$ |% |& |/ |( |) |= |? |` || |<-|   |Del|Help|  |{ |} |/ |* |  |
||`__|1_|2_|3_|4_|5_|6_|7_|8_|9_|0_|ß_|´_|\_|__|   |___|____|  |[ |]_|__|__|  |
||<-  |Q |W |E |R |T |Z |U |I |O |P |Ü |* |   ||               |7 |8 |9 |- |  |
||->__|__|__|__|__|__|__|__|__|__|__|__|+_|_  ||               |__|__|__|__|  |
||Ctr|oC|A |S |D |F |G |H |J |K |L |Ö |Ä |^ |<'|               |4 |5 |6 |+ |  |
||___|_L|__|__|__|__|__|__|__|__|__|__|__|#_|__|       __      |__|__|__|__|  |
||^    |> |Y |X |C |V |B |N |M |; |: |_ |^     |      |A |     |1 |2 |3 |E |  |
||_____|<_|__|__|__|__|__|__|__|,_|._|-_|______|    __||_|__   |__|__|__|n |  |
|   |Alt|A  |                       |A  |Alt|      |<-|| |->|  |0    |. |t |  |
|   |___|___|_______________________|___|___|      |__|V_|__|  |_____|__|e_|  |
|                    https://github.com/MeKingman                             |
`-----------------------------------------------------------------------------'
 */
const sug = require('../../me-modals/sug/main')
const st = require('../../me-modals/sug/sugst')
const kingman = require('../../kingmanclass/general')
const { MessageEmbed } = require("discord.js");
 module.exports = {
   name: "sugreplay",
   category: "GENERAL",
   aliases :['رد'],
   description: "للرد على الاقتراح",
   run: async (client, kmsg, args, PREFIX) => {
      const fu = new kingman.MESSAGE(kmsg)
      if(!kmsg.member.hasPermission('MANAGE_MESSAGES')){
        return await fu.ERR(`You need the: \`MANAGE_MESSAGES\` Permissio`)
      }
      let mesgid = args[0]
      if(!mesgid) {
        return await fu.ERR(`You must specify the message id \n Usage: \`${PREFIX}${module.exports.name} <MSGID> <REPLAY>\``)
      }
      let data = await sug.findOne({MsgID:mesgid})
      if(!data) {
        return await fu.ERR(`invailde message id \n Usage: \`${PREFIX}${module.exports.name} <MSGID> <REPLAY>\``)
      }
      let replay = kmsg.content.split(' ').slice(2).join(" ")
      if(!replay) {
        return await fu.ERR(`You must specify the Replay \n Usage: \`${PREFIX}${module.exports.name} <MSGID> <REPLAY>\``)
      }
      let setting = await st.findOne({GuildID:kmsg.guild.id})
      if(!setting) {
        return fu.ERR(`The Sug channel was not found`)
      }
      let channel = kmsg.guild.channels.cache.get(setting.ChannelID);
      if(!channel) {
        return fu.ERR(`The Sug channel was not found`)
      }
       let embed = new MessageEmbed()
       .setAuthor(`${client.users.cache.get(data.UserID).tag}`, client.users.cache.get(data.UserID).displayAvatarURL())
       .setTitle(`**[✅] Replay**`)
       .setColor(`GREEN`)
       .setDescription(`**${data.Sug}**`)
       .addField(`** Replay by \`[${kmsg.author.tag}]\`**`,`\n **\`${replay} \`**`)
       .setFooter(`Req by ${client.users.cache.get(data.UserID).tag}`, client.users.cache.get(data.UserID).avatarURL({ dynamic: true, size: 1024 }))
           channel.messages.fetch(data.MsgID).then(async msg => {
            await fu.SEND(`The Replay has been recorded`, `see replay on [Click Here](https://discord.com/channels/${kmsg.guild.id}/${channel.id}/${data.MsgID})`)
            let replayu = new MessageEmbed()
            .setAuthor(kmsg.author.tag, kmsg.author.avatarURL({ dynamic: true, size: 1024 }))
            .setColor('RED')
            .setDescription(`**Your suggestion has been answered by  \`${kmsg.author.tag}\`**\n ** \` Reply : ${replay}\`**\n **[Click Here](https://discord.com/channels/${kmsg.guild.id}/${channel.id}/${data.MsgID})**`)
            .setFooter(kmsg.guild.name, client.user.avatarURL({ dynamic: true, size: 1024 }))
            client.users.cache.get(data.UserID).send(replayu)
            msg.edit(embed);
        })
    }
 }

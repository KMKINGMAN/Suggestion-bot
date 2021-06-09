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
   name: "sug",
   category: "GENERAL",
   description: "لانشاء اقتراح",
   aliases :['اقتراح'],
   run: async (client, kmsg, args, PREFIX) => {
     const fu = new kingman.MESSAGE(kmsg)
     let content = kmsg.content.split(' ').slice(1).join(" ")
     if(!content) {
       return await fu.ERR(`You must write Sug content`)
     }
     
     let dbch = await st.findOne({GuildID: kmsg.guild.id})
     if (!dbch) {
       return await fu.ERR(`Suggestions Channel is'n prepared`)
     }
     let sugmsg = new MessageEmbed()
     .setAuthor(kmsg.author.tag, kmsg.author.avatarURL({ dynamic: true, size: 1024 }))
     .setColor(`GREEN`)
     .setTitle(`**New suggestion**`)
     .setDescription(`**${content}**`)
     .setFooter(`Req by ${kmsg.author.tag}`, kmsg.author.avatarURL({ dynamic: true, size: 1024 }))
     let msg = await kmsg.guild.channels.cache.get(dbch.ChannelID).send(sugmsg)
     let sugdb = await sug.create({
       UserID: kmsg.author.id,
       Sug: content,
       Time: Date.now(),
       MsgID: msg.id
     })
     await sugdb.save().then(s=> {
       kmsg.react('✅')
     }).catch(() => {
        kmsg.react('❌')
     })
     msg.react('✅')
     msg.react('❌')
    }
 }

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
const { MessageEmbed } = require("discord.js");
const { MessageAttachment } = require("discord.js");
const sug = require('../../me-modals/sug/main')
const st = require('../../me-modals/sug/sugst')
module.exports = {
	name: 'messageReactionAdd',
	async execute(reaction, user, client) {
    if(user.partial) await user.fetch();
    if(reaction.partial) await reaction.fetch();
    if(reaction.message.partial) await reaction.message.fetch(); 
    let gdata = await st.findOne({GuildID:reaction.message.guild.id})
    if(!gdata) return;
    if(!reaction.emoji.name === '✅' || reaction.emoji.name === '❌') return;
    if(user.bot) return;
    console.log(reaction.message.id)
    let data = await sug.findOne({MsgID:reaction.message.id})
    if(!data) return;
    let es = new MessageEmbed()
    .setAuthor(user.tag, user.avatarURL({ dynamic: true, size: 1024 }))
    .setColor('BLUE')
    .setDescription(`**Thank you for using our suggestion bot you react[${reaction.emoji}] to <@${data.UserID}> suggestion **\n **[MESSAGE](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${data.MsgID})**`)
    .setFooter(reaction.message.guild.name, client.user.avatarURL({ dynamic: true, size: 1024 }))
    try {
      user.send(es)
    } catch(e) {
      console.log(` `)
    }    
  }
}

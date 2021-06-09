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
class MESSAGE {
  constructor(message){
    this.message = message
  }
  async GetUser(){
    return this.message.mentions.users.first();
  }
  async SEND(x ,y) {
    let info = new MessageEmbed()
    .setColor('GOLD')
    .setAuthor(this.message.author.tag, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    .setTitle(`**\✅ ${x}**`)
    .setDescription(`**${y}**`)
    .setFooter(`Req By ${this.message.author.tag}`, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    this.message.channel.send(info)

  }
  async ERR(x) {
    let info = new MessageEmbed()
    .setColor('GOLD')
    .setAuthor(this.message.author.tag, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    .setTitle(`**\⚠ Error**`)
    .setDescription("**\⛔ " + x + " **")
    .setFooter(`Req By ${this.message.author.tag}`, this.message.author.avatarURL({ dynamic: true, size: 1024 }))
    this.message.channel.send(info)
  }
  async GetChannel(id){
    let channel = this.message.mentions.channels.first() || this.message.guild.channels.cache.get(id)
    return channel
  }

}
module.exports = {
	MESSAGE
}

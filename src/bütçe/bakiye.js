const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bakiye',
  description: 'Kullanıcının veya belirli bir kullanıcının bakiyesini kontrol eder.',
  çalıştırılıyor(message, args) {
    let memberId;
    
    if (message.mentions.members.size > 0) {
      memberId = message.mentions.members.first().id;
    } else {
      memberId = message.author.id;
    }
    
    const guildId = message.guild.id;
    const currentBalance = db.get(`bakiye_${guildId}_${memberId}`) || 0;

    const formattedBalance = currentBalance.toLocaleString('en-EN'); 

    const username = message.guild.members.cache.get(memberId).id;

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Bakiye Bilgisi`)
      .setDescription(`
<@${username}> Kullanıcısının Toplam Bakiyesi **${formattedBalance}€**`)
.setFooter(`Sorgulayan ${message.author.username}`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

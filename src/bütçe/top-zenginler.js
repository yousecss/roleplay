const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'zenginlik-sıralaması',
  description: 'Sunucudaki en zengin kullanıcıları listeler.',
  async çalıştırılıyor(message, args) {
    const allMembers = message.guild.members.cache;

    const humanMembers = allMembers.filter(member => !member.user.bot);

    const members = Array.from(humanMembers.values());
    const sortedMembers = members.sort((a, b) => {
      const balanceA = db.get(`bakiye_${message.guild.id}_${a.user.id}`) || 0;
      const balanceB = db.get(`bakiye_${message.guild.id}_${b.user.id}`) || 0;
      return balanceB - balanceA; 
    });

    const topMembers = sortedMembers.slice(0, Math.min(sortedMembers.length, 10));

    const topRichEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('En Zengin Kullanıcılar')
      .setDescription(topMembers.map((member, index) => {
        const balance = db.get(`bakiye_${message.guild.id}_${member.user.id}`) || 0;
        return `${index + 1}. ${member} \nServeti: **${balance.toLocaleString('tr-TR')}€**`;
      }).join('\n'))
      .setTimestamp();

    message.channel.send({ embeds: [topRichEmbed] });
  },
};

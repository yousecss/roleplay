const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'maaş-ver',
  description: 'Teknik direktöre maaş verir.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !maaş-ver @rol veya @kullanici <Para>');
    }

    const mentionedRole = message.mentions.roles.first();
    const mentionedUser = message.mentions.users.first();

    const para = parseInt(args[1]);

    if (isNaN(para) || para <= 0) {
      return message.channel.send('Geçerli bir maaş miktarı belirtmelisiniz.');
    }

    if (mentionedRole) {
      mentionedRole.members.forEach(member => {
        const guildId = message.guild.id;
        const memberId = member.id;
        const currentBalance = db.get(`bakiye_${guildId}_${memberId}`) || 0;
        db.set(`bakiye_${guildId}_${memberId}`, currentBalance + para);
      });

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${mentionedRole.name} Rolüne Maaş Verildi`)
        .setDescription(`${mentionedRole.name} rolündeki tüm üyelere ${para} € maaş verildi.`)
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    if (mentionedUser) {
      const guildId = message.guild.id;
      const memberId = mentionedUser.id;
      const currentBalance = db.get(`bakiye_${guildId}_${memberId}`) || 0;
      db.set(`bakiye_${guildId}_${memberId}`, currentBalance + para);

      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${mentionedUser.tag} Kullanıcısına Maaş Verildi`)
        .setDescription(`${para} € maaş ${mentionedUser.tag}'a verildi.`)
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    return message.channel.send('Belirtilen rol veya kullanıcı bulunamadı.');
  },
};

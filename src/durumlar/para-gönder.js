const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'para-gönder',
  description: 'Belirtilen kullanıcıya para gönderir.',
  çalıştırılıyor(message, args) {
    if (args.length !== 2) {
      return message.channel.send('Kullanım: !para-gonder @kullanici <miktar>');
    }

    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      return message.channel.send('Belirtilen kullanıcı bulunamadı.');
    }

    const gonderilecekMiktar = parseInt(args[1]);
    if (isNaN(gonderilecekMiktar) || gonderilecekMiktar <= 0) {
      return message.channel.send('Geçerli bir miktar belirtmelisiniz.');
    }

    const guildId = message.guild.id;
    const memberId = message.author.id;
    const currentBalance = db.get(`bakiye_${guildId}_${memberId}`) || 0;

    if (gonderilecekMiktar > currentBalance) {
      return message.channel.send('Yetersiz bakiye.');
    }

    db.subtract(`bakiye_${guildId}_${memberId}`, gonderilecekMiktar);
    db.add(`bakiye_${guildId}_${mentionedUser.id}`, gonderilecekMiktar);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Para Gönderme Başarılı')
      .setDescription(`${message.author.tag}, ${mentionedUser.tag}'a ${gonderilecekMiktar} € gönderdi. Yeni bakiye: ${currentBalance - gonderilecekMiktar} €`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

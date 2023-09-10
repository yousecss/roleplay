const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'maaş-al',
  description: 'Belirtilen kullanıcının bakiyesinden para çeker.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.channel.send('Bu komutu kullanma izniniz yok.');
    }

    if (args.length !== 2) {
      return message.channel.send('Kullanım: !maaş-al @kullanici <miktar>');
    }

    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      return message.channel.send('Belirtilen kullanıcı bulunamadı.');
    }

    const cekilecekMiktar = parseInt(args[1]);
    if (isNaN(cekilecekMiktar) || cekilecekMiktar <= 0) {
      return message.channel.send('Geçerli bir miktar belirtmelisiniz.');
    }

    const guildId = message.guild.id;
    const memberId = mentionedUser.id;
    const currentBalance = db.get(`bakiye_${guildId}_${memberId}`) || 0;

    if (cekilecekMiktar > currentBalance) {
      return message.channel.send('Kullanıcının yeterli bakiyesi yok.');
    }

    db.subtract(`bakiye_${guildId}_${memberId}`, cekilecekMiktar);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Maaş Çekme Başarılı')
      .setDescription(`${mentionedUser.tag}'ın hesabından ${cekilecekMiktar} € çekildi. Yeni bakiye: ${currentBalance - cekilecekMiktar} €`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

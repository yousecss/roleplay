const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'isim',
  description: 'Belirtilen kullanıcının ismini değiştirir.',
  çalıştırılıyor(message, args) {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
        return message.channel.send('Bu komutu kullanma izniniz yok.');
      }
    if (args.length < 2) {
      return message.channel.send('Kullanım: !isim @kullanıcı İsim');
    }

    const targetUser = message.mentions.members.first();
    if (!targetUser) {
      return message.channel.send('Belirtilen kullanıcı bulunamadı.');
    }

    const newName = args.slice(1).join(' ');

    targetUser.setNickname(newName)
      .then(() => {
        const embed = new MessageEmbed()
          .setColor('GREEN')
          .setDescription(`**${targetUser.user.tag}** kullanıcısının ismi **${newName}** olarak değiştirildi.`)
          .setTimestamp();

        message.channel.send({ embeds: [embed] });
      })
      .catch(error => {
        console.error('İsim değiştirme hatası:', error);
        message.channel.send('er');
      });
  },
};

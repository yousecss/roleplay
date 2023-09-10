const db = require('croxydb');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'başarı',
  description: 'Kullanıcının başarılarını gösterir.',
  çalıştırılıyor(message, args) {
    let kullanıcı;

    if (message.mentions.users.first()) {
      kullanıcı = message.mentions.users.first();
    } else {
      kullanıcı = message.author;
    }

    const başarılar = db.get(`başarılar_${kullanıcı.id}`);

    if (!başarılar || başarılar.length === 0) {
      const embed = new MessageEmbed()
        .setTitle(`${kullanıcı.username} Başarı Veritabanında Yok`)
        .setDescription(`Kullanıcının Başarısı Bulunamamkta :x:`)
        .setColor('#0099ff')
        .setTimestamp();

      return message.channel.send({ embeds: [embed] });
    }

    const embed = new MessageEmbed()
      .setTitle(`${kullanıcı.tag}'in Başarıları`)
      .setDescription(başarılar.map((başarı, index) => `
${başarı.sıra}. ${başarı.açıklama}`).join('\n'))
      .setColor('#0099ff')
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};
